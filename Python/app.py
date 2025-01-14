from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

app = Flask(__name__)

# Load the GoEmotions model and tokenizer
model_name = "bhadresh-savani/distilbert-base-uncased-emotion"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

# Fetch the labels dynamically and convert them to a list
emotion_labels = list(model.config.id2label.values())

# Function to predict emotion
def predict_emotion(sentence):
    # Tokenize the input sentence
    inputs = tokenizer(sentence, return_tensors="pt", truncation=True, max_length=512)
    # Get model outputs
    outputs = model(**inputs)
    # Apply softmax to get probabilities
    probs = torch.nn.functional.softmax(outputs.logits, dim=-1)
    # Get the highest confidence score and its corresponding emotion
    confidence, predicted_idx = torch.max(probs, dim=-1)
    predicted_emotion = emotion_labels[predicted_idx.item()]
    return {
        "predicted_emotion": predicted_emotion,
        "confidence": confidence.item(),
        # "all_emotions": {emotion_labels[i]: probs[0][i].item() for i in range(len(emotion_labels))}
    }

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the input sentence from the request JSON body
        data = request.json
        sentence = data.get("sentence")
        if not sentence:
            return jsonify({"error": "Sentence is required"}), 400
        
        # Predict emotion
        result = predict_emotion(sentence)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
