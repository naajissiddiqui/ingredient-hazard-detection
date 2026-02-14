from fastapi import FastAPI
from pydantic import BaseModel
import torch
from transformers import DistilBertTokenizerFast, DistilBertForSequenceClassification

app = FastAPI()

# ---- Load Model Once ----
model_path = "ingredient_hazard_model"

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
        if p >= 0.6:
            hazards.append({
                "label": label_names[i],
                "confidence": float(p)
            })

    # Position weighting (example rule)
    if position <= 1:
        for h in hazards:
            if h["label"] == "added_sugar":
                h["confidence"] = min(1.0, h["confidence"] + 0.2)

    return hazards

@app.post("/analyze")
def analyze(data: IngredientInput):
    ingredients = [i.strip() for i in data.ingredients.split(",")]

    results = []

    for idx, ing in enumerate(ingredients):
        hazards = analyze_ingredient(ing, idx)

        if hazards:
            results.append({
                "ingredient": ing,
                "position": idx + 1,
                "hazards": hazards
            })

    return {
        "harmful_ingredients": results,
        "total_ingredients": len(ingredients)
    }
