from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

app = Flask(__name__)
CORS(app)
model_name = "bhadresh-savani/distilbert-base-uncased-emotion"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

emotion_labels = list(model.config.id2label.values())

def predict_emotion(sentence):
    inputs = tokenizer(sentence, return_tensors="pt", truncation=True, max_length=512)
    outputs = model(**inputs)
    probs = torch.nn.functional.softmax(outputs.logits, dim=-1)
    # Get the highest confidence score and its corresponding emotion
    confidence, predicted_idx = torch.max(probs, dim=-1)
    predicted_emotion = emotion_labels[predicted_idx.item()]
    return {
        "predicted_emotion": predicted_emotion,
        "confidence": confidence.item(),
    }

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        sentence = data.get("sentence")
        if not sentence:
            return jsonify({"error": "Sentence is required"}), 400
        
        result = predict_emotion(sentence)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
