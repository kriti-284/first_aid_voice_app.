from fastapi import FastAPI
from pydantic import BaseModel
import google.generativeai as genai
import os

# Set up the FastAPI app
app = FastAPI()

# Configuration for the generative model
# This assumes an environment variable 'GEMINI_API_KEY' is set
# If not, you'll need to provide your key directly here
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Define the request body model
class Query(BaseModel):
    query: str

# Define the chat endpoint
@app.post("/chat")
async def chat(query: Query):
    """
    Receives a query about a first aid situation and provides
    guidance based on the Google Gemini model.
    """
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        
        # A prompt to guide the model's response
        system_prompt = "You are a helpful first aid assistant. Provide clear, concise, and safe advice for first aid situations. Always include a strong disclaimer at the beginning, stating that you are not a medical professional and your advice should not replace a real doctor's or emergency services."
        
        # Combine the system prompt and the user's query
        full_prompt = f"{system_prompt}\n\nUser Query: {query.query}"
        
        response = model.generate_content(full_prompt)
        
        # Check if the response is valid
        if response and response.text:
            return {"response": response.text}
        else:
            return {"response": "I'm sorry, I couldn't generate a response. Please try again."}

    except Exception as e:
        return {"error": str(e)}

# A simple root endpoint to confirm the API is running
@app.get("/")
async def root():
    return {"message": "First Aid API is running!"}
