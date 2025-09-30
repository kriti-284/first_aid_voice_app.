import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
import joblib
import os

csv_file = "intent_examples.csv"

print(f"Current working directory: {os.getcwd()}")

# Load dataset
df = pd.read_csv(csv_file)

# Separate input (text) and output (label)
X = df["text"]   # <- use "text" not "symptoms"
y = df["label"]  # <- use "label" not "advice"

# Build pipeline (vectorizer + classifier)
model = make_pipeline(CountVectorizer(), MultinomialNB())

# Train model
model.fit(X, y)

# Save trained model
joblib.dump(model, "model.pkl")
print("Model trained and saved as 'model.pkl'")
