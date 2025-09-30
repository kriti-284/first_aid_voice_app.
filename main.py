from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

# Load trained model
model = joblib.load("model.pkl")

# ----------------------------
# Manual first-aid advice
# ----------------------------
manual_advice = {
    "choking_child": "Give 5 back blows and 5 abdominal thrusts. If the child becomes unconscious, start CPR and call emergency services.",
    "choking_adult": "Give 5 back blows and 5 abdominal thrusts. If unconscious, start CPR and call emergency services.",
    "burn": "Cool the burn under running water for 10–20 minutes. Do not apply ice directly.",
    "heart_attack": "Call emergency services immediately. Keep the person calm and seated.",
    "fracture": "Immobilize the affected area and seek medical help immediately.",
    "severe_bleeding": "Apply direct pressure with a clean cloth. Keep the person still and call emergency services.",
    "not_breathing": "Call emergency services immediately and start CPR.",
    "unconscious": "Check airway, breathing, and pulse. Place in recovery position and call emergency services.",
    "snake_bite": "Keep the patient calm and immobilized. Seek medical attention immediately.",
    "allergic_reaction": "Give antihistamines if available and seek medical help. Use epinephrine for severe reactions.",
    "heatstroke": "Move to a cool place, give water, and monitor condition. Seek medical help if severe.",
    "minor_cut": "Clean the wound with water, apply antiseptic, and cover with a clean bandage.",
    "unknown": "Observe the patient and call emergency services if necessary."
}

# ----------------------------
# Automatic advice from CSV
# ----------------------------
df = pd.read_csv("intent_examples.csv")
auto_advice = df.groupby("label")["text"].first().to_dict()

# Final advice dictionary: manual overrides CSV examples
first_aid_advice = {**auto_advice, **manual_advice}

# Initialize FastAPI
app = FastAPI(
    title="First-Aid Prediction API",
    description="Predicts medical emergency conditions and gives first-aid advice.",
    version="1.0"
)

# Root endpoint for quick check
@app.get("/")
def root():
    return {"message": "FastAPI First-Aid API is running!"}

# Input structure
class UserInput(BaseModel):
    text: str

# Prediction endpoint
@app.post("/predict")
async def predict(data: UserInput):
    # Predict condition from text
    condition = model.predict([data.text])[0]
    # Get advice (manual if available, else first CSV example)
    advice = first_aid_advice.get(condition, "No advice available for this condition.")
    return {"condition": condition, "advice": advice}
