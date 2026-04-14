from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
import torch
import re
import easyocr
import io
import numpy as np
from PIL import Image
from transformers import DistilBertTokenizerFast, DistilBertForSequenceClassification
import json
import os
from routes.auth import router as auth_router

app = FastAPI()
app.include_router(auth_router)


with open("ingredient_db.json", "r") as f:
    ingredient_db = json.load(f)

# ---- Load Model Once ----
model_path = "naajissiddiqui/ingredient-hazard-distilbert"
ocr_reader = easyocr.Reader(["en"])

tokenizer = DistilBertTokenizerFast.from_pretrained(model_path)
model = DistilBertForSequenceClassification.from_pretrained(model_path)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
model.eval()

label_names = [
    "added_sugar",
    "preservative",
    "artificial_color",
    "emulsifier",
    "processed_fat",
    "artificial_sweetener",
    "flavor_enhancer"
]

# ---- COSMETIC MODEL ----
cosmetic_model_path = "naajissiddiqui/personalcare_detection"

cosmetic_tokenizer = DistilBertTokenizerFast.from_pretrained(cosmetic_model_path)
cosmetic_model = DistilBertForSequenceClassification.from_pretrained(cosmetic_model_path)
cosmetic_model.to(device)
cosmetic_model.eval()

cosmetic_labels = [
    "high_risk",
    "moderate_risk",
    "paraben",
    "formaldehyde_releaser",
    "preservative",
    "fragrance_allergen",
   
]


class IngredientInput(BaseModel):
    ingredients: str
    user_conditions: list[str] = []


# -------- CLEANING FUNCTION --------
def clean_ingredients(text):
    text = text.lower()

    # Replace new lines with commas
    text = text.replace("\n", ",")

    # Remove extra spaces
    text = re.sub(r"\s+", " ", text)

    # Remove double commas
    text = re.sub(r",+", ",", text)

    # Remove unwanted characters (keep letters, numbers, spaces and commas)
    text = re.sub(r"[^a-z0-9, ]", "", text)

    # Split properly
    ingredients = [i.strip() for i in text.split(",") if i.strip()]

    return ingredients


# -------- MODEL ANALYSIS --------
def analyze_ingredient(ingredient, position):
    inputs = tokenizer(
        ingredient,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=64
    )
    inputs = {k: v.to(device) for k, v in inputs.items()}

    with torch.no_grad():
        logits = model(**inputs).logits
        probs = torch.sigmoid(logits).cpu().numpy()[0]

    hazards = []

    for i, p in enumerate(probs):
        if p >= 0.5:   # lowered threshold slightly from 0.6
            hazards.append({
                "label": label_names[i],
                "confidence": float(round(p, 3))
            })

    # Position weighting
    if position <= 1:
        for h in hazards:
            if h["label"] == "added_sugar":
                h["confidence"] = min(1.0, h["confidence"] + 0.2)

    return hazards

# ---------------------------------------------------
# COSMETIC ANALYSIS
# ---------------------------------------------------

def analyze_cosmetic_ingredient(ingredient, threshold=0.95):

    inputs = cosmetic_tokenizer(
        ingredient,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=64
    )

    inputs = {k: v.to(device) for k, v in inputs.items()}

    with torch.no_grad():
        logits = cosmetic_model(**inputs).logits
        probs = torch.sigmoid(logits)[0].cpu()

    hazards = []

    for label, p in zip(cosmetic_labels, probs):

        if p >= threshold:

            hazards.append({
                "label": label,
                "confidence": float(round(float(p),3))
            })

    return hazards

def get_personalized_warning(ingredient, user_conditions):
    ing = ingredient_db.get(ingredient.lower())

    if not ing:
        return []

    warnings = []

    for cond in user_conditions:
        if cond in ing.get("conditions", {}):
            data = ing["conditions"][cond]

            warnings.append({
                "condition": cond,
                "risk": data["risk"],
                "reason": data["reason"]
            })

    return warnings

# -------- CLEANING FUNCTION --------
def clean_ingredients(text: str):
    if not text:
        return []

    text = text.lower()

    # 🔥 Step 1: Fix OCR mistakes (VERY IMPORTANT)
    text = text.replace("e5o0", "e500").replace("e33o", "e330")

    # 🔥 Step 2: Replace brackets with commas (KEEP CONTENT)
    text = re.sub(r"[()]", ",", text)

    # 🔥 Step 3: Replace separators
    text = re.sub(r"[;\n]", ",", text)

    # 🔥 Step 4: Remove percentages
    text = re.sub(r"\d+,\d+%|\d+%", "", text)

    # 🔥 Step 5: Remove E numbers ONLY (keep ingredient name)
    text = re.sub(r"e\d+", "", text)

    # 🔥 Step 6: Remove junk
    text = re.sub(r"[^a-z, ]", " ", text)

    # 🔥 Step 7: Normalize spaces
    text = re.sub(r"\s+", " ", text)

    # 🔥 Step 8: Split
    raw_list = [i.strip() for i in text.split(",") if i.strip()]

    # 🔥 Step 9: Remove useless words
    blacklist = ["noodle", "soup", "flakes", "water"]

    ingredients = [
        i for i in raw_list
        if i not in blacklist and len(i) > 2
    ]

    return ingredients

def format_name(name: str):
    return " ".join(word.capitalize() for word in name.split())

# -------- FLEXIBLE MATCH --------
def match_ingredient(ing: str, db_keys):
    for key in db_keys:
        if ing == key:
            return key
        
    for key in db_keys:
        if key in ing or ing in key:
            return key

    return None

# -------- API ENDPOINT --------
@app.post("/analyze")
def analyze(data: IngredientInput):

    raw_text = data.ingredients

    # Clean input
    ingredients_list = clean_ingredients(raw_text)

    print("Cleaned ingredients:", ingredients_list)

    results = []

    for idx, ing in enumerate(ingredients_list):

        # 🔥 1. MODEL PREDICTION (KEEP ORIGINAL INGREDIENT)
        hazards = analyze_ingredient(ing, idx)

        # 🔥 2. PERSONALIZED (MATCH WITH DB ONLY HERE)
        matched_key = match_ingredient(ing, ingredient_db.keys())

        personalized = []
        if matched_key:
            personalized = get_personalized_warning(
                matched_key, data.user_conditions
            )

        # 🔥 3. ADD RESULT IF ANYTHING FOUND
        if hazards or personalized:
            results.append({
                "ingredient": format_name(ing),  # show original clean text
                "position": idx + 1,
                "hazards": hazards,
                "personalized": personalized
            })

    return {
        "results": results,
        "total_ingredients": len(ingredients_list)
    }




# ---------------------------------------------------
# COSMETIC API
# ---------------------------------------------------

@app.post("/analyze-cosmetic")

def analyze_cosmetic(data: IngredientInput):

    ingredients_list = clean_ingredients(data.ingredients)

    results = []

    for ing in ingredients_list:

        # 🔥 1. MODEL PREDICTION (same as before)
        hazards = analyze_cosmetic_ingredient(ing)

          # 🔥 2. DB MATCH
        matched_key = match_ingredient(ing, ingredient_db.keys())

        personalized = []
        if matched_key:
            personalized = get_personalized_warning(
                matched_key, data.user_conditions
            )

        # 🔥 3. FORCE INCLUDE IF ANY SIGNAL
        if hazards or personalized or matched_key:
            results.append({
                "ingredient": format_name(ing),
                "hazards": hazards,
                "personalized": personalized
            })
        print("FINAL RESULTS:", results)

    return {
        "results": results,
        "total_ingredients": len(ingredients_list)
    }
# --------------------------------------------------
# OCR API
# ---------------------------------------------------

@app.post("/ocr-analyze")
async def ocr_analyze(file: UploadFile = File(...)):
    try:
        contents = await file.read()

        image = Image.open(io.BytesIO(contents)).convert("RGB")
        image_np = np.array(image)

        results = ocr_reader.readtext(image_np)

        extracted_text = " ".join([r[1] for r in results])

        print("OCR TEXT:", extracted_text)

        return {
            "extracted_text": extracted_text
        }

    except Exception as e:
        print("OCR ERROR:", str(e))
        return {
            "extracted_text": ""
        }
