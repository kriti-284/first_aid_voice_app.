from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()

# ✅ Define the input format for the API
class UserInput(BaseModel):
    symptom: str

# ✅ Load your model and vectorizer
model = joblib.load("first_aid_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

@app.get("/")
def home():
    return {"message": "✅ First Aid Assistant API is running successfully!"}

@app.post("/predict")
def predict_first_aid(user_input: UserInput):
    text = [user_input.symptom]
    X = vectorizer.transform(text)
    prediction = model.predict(X)
    return {"first_aid_steps": prediction[0]}



