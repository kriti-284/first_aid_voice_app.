import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd

# 🩺 Example data — replace or add more if you have your own
symptoms = [
    "I have a cut on my finger",
    "I got a burn on my hand",
    "I am bleeding from my nose",
    "I have a sprain in my ankle",
    "I feel dizzy and weak",
    "I got bitten by an insect"
]

# 🧠 Create and train the TF-IDF vectorizer
vectorizer = TfidfVectorizer(stop_words='english')
vectorizer.fit(symptoms)

# 💾 Save it as vectorizer.pkl
joblib.dump(vectorizer, "vectorizer.pkl")

print("✅ vectorizer.pkl has been created successfully!")
