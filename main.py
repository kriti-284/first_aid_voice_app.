from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware  # 👈 add this near imports

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"] to restrict it
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class UserInput(BaseModel):
    symptom: str

# ✅ Load only the model (no separate vectorizer)
model = joblib.load("first_aid_model.pkl")

@app.get("/")
def home():
    return {"message": "✅ First Aid Assistant API is running successfully!"}

@app.post("/predict")
def predict_first_aid(user_input: UserInput):
    try:
        text = [user_input.symptom]   # model expects a list of strings
        prediction = model.predict(text)
        return {"first_aid_steps": prediction.tolist()}
    except Exception as e:
        return {"error": str(e)}


