from fastapi import FastAPI
from pydantic import BaseModel
import torch
import re
from transformers import DistilBertTokenizerFast, DistilBertForSequenceClassification

app = FastAPI()

# ---- Load Model Once ----
model_path = "naajissiddiqui/ingredient-hazard-distilbert"

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

class IngredientInput(BaseModel):
    ingredients: str


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


# -------- API ENDPOINT --------
@app.post("/analyze")
def analyze(data: IngredientInput):

    raw_text = data.ingredients

    # Clean input
    ingredients_list = clean_ingredients(raw_text)

    print("Cleaned ingredients:", ingredients_list)

    results = []

    for idx, ing in enumerate(ingredients_list):
        hazards = analyze_ingredient(ing, idx)

        if hazards:
            results.append({
                "ingredient": ing,
                "position": idx + 1,
                "hazards": hazards
            })

    return {
        "harmful_ingredients": results,
        "total_ingredients": len(ingredients_list)
    }
