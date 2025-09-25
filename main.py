from fastapi import FastAPI
from pydantic import BaseModel
import joblib

# Load trained model
model = joblib.load("first_aid_model.pkl")

# First-aid advice dictionary
first_aid_advice = {
    "heart_attack": "Call emergency services immediately. Keep the person seated, calm, and loosen tight clothing.",
    "burn": "Cool the burn under running water for 10–20 minutes. Do not apply ice directly.",
    "fracture": "Immobilize the affected area. Avoid moving the limb. Seek medical help immediately.",
    "choking": "Give 5 back blows and 5 abdominal thrusts. If unconscious, start CPR and call emergency services.",
    "bleeding": "Apply direct pressure with a clean cloth. Keep the person still and seek medical help if severe."
}

# Initialize FastAPI
app = FastAPI()

# Define input structure
class UserInput(BaseModel):
    text: str

# Prediction endpoint
@app.post("/predict")
async def predict(data: UserInput):
    condition = model.predict([data.text])[0]
    advice = first_aid_advice.get(condition, "No advice available for this condition.")
    return {"condition": condition, "advice": advice}
