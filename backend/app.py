from flask import Flask, request, jsonify
import pandas as pd
import joblib
import torch
import numpy as np
from flask_cors import CORS
from sentence_transformers import SentenceTransformer, util

app = Flask(__name__)
CORS(app)

model = joblib.load('rf_disease_model_health.pkl')
le = joblib.load('label_encoder_health.pkl')
feature_names = joblib.load('feature_names_health.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    symptoms = data.get('symptoms', [])
    

    # Create input data frame with all features as 0
    input_data = pd.DataFrame(np.zeros((1, len(feature_names))), columns=feature_names)

    for sym in symptoms:
        sym = sym.lower().strip()
        if sym in input_data.columns:
            input_data.at[0, sym] = 1
    

    # Check if at least one symptom is matched
    if input_data.values.sum() == 0:
        return jsonify({'error': 'No valid symptoms matched the model features.'}), 400

    # Get probabilities for all classes
    probs = model.predict_proba(input_data)[0]

    # Get top 3 indices
    top_indices = np.argsort(probs)[::-1][:3]

    # Get diseases and their probabilities
    top_predictions = []
    for idx in top_indices:
        disease = le.inverse_transform([idx])[0]
       # probability = round(probs[idx] * 100, 2)
        top_predictions.append({
            "disease": disease,
            #"confidence": f"{probability}%"
        })

    return jsonify({"predictions": top_predictions})
# Load Model 2: Disease/Symptom → Treatment
# ---------------------------
treatment_data = joblib.load('disease_treatment_model.pkl')
treatment_model = SentenceTransformer(treatment_data['model_name'])
condition_embeddings = treatment_data['embeddings']
conditions = treatment_data['conditions']
treatments = treatment_data['treatments']

def get_treatment(query):
    """Find the best matching treatment for a condition/symptom."""
    query_embedding = treatment_model.encode(query, convert_to_tensor=True)
    scores = util.pytorch_cos_sim(query_embedding, condition_embeddings)[0]
    best_idx = int(torch.argmax(scores))
    return {
        "condition": conditions[best_idx],
        "treatment": treatments[best_idx],
        "similarity_score": float(scores[best_idx])
    }

@app.route("/predict_treatment", methods=["POST"])
def predict_treatment():
    """Predict treatment for a given disease/symptom."""
    data = request.get_json()
    if not data or "query" not in data:
        return jsonify({"error": "Please provide a 'query' field"}), 400

    result = get_treatment(data["query"])
    return jsonify(result)


# @app.route("/", methods=["GET"])
# def home():
#     return "Disease–Treatment API is running!"

if __name__ == '__main__':
    app.run(debug=True)
