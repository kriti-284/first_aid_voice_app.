# create_model.py
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
import pickle

# Load dataset
data = pd.read_csv("data/first_aid_big_dataset.csv")

# Drop rows with missing data
data = data.dropna(subset=['symptom_text', 'condition', 'first_aid'])

# Combine text fields
data['combined_text'] = data['symptom_text'].astype(str) + " " + data['condition'].astype(str)

# Create pipeline
model = Pipeline([
    ('vectorizer', TfidfVectorizer(stop_words='english')),
    ('classifier', LogisticRegression(max_iter=1000))
])

# Train model
model.fit(data['combined_text'], data['first_aid'])

# Save trained model
with open("first_aid_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Model trained and saved successfully as first_aid_model.pkl")
print(f"Total training samples used: {len(data)}")

