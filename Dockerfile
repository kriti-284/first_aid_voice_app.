# Use a minimal Python image
FROM python:3.10-slim

# Set working directory inside the container
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy your application code
COPY . .

# Expose the port the app will run on
EXPOSE 8080

# The command to start your application (using Gunicorn for production)
CMD gunicorn -w 4 -k uvicorn.workers.UvicornWorker "main:app" --bind "0.0.0.0:${PORT:-8080}"
