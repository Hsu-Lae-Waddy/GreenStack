from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore, auth
import os,json
import jwt
import datetime
import joblib
import numpy as np

app = Flask(__name__)
SECRET_KEY = "c2f9a7d4e8b1c3f6a9d0e5f7b2c4a8d1e6f9b3c7a2d5e8f1"

# Firebase init
# Load from env

# for production
# firebase_key = os.environ.get("FIREBASE_KEY")
# firebase_dict = json.loads(firebase_key)

# firbase initialization
firebase_dict = "./firebase-auth.json"
cred = credentials.Certificate(firebase_dict)
firebase_admin.initialize_app(cred)

db = firestore.client()
collection = db.collection("users")
post_collection = db.collection("posts")

CORS(app, resources={r"/*": {"origins": "*"}})

# Load ML model and scaler
model = joblib.load("model.pkl")
scaler = joblib.load("scaler.pkl")

# UI Route
@app.route("/")
def index():
    return "Firebase Database Connection is Ready"

# CREATE
@app.route("/add", methods=["POST"])
def add_data():
    data = request.json
    doc_ref = collection.add(data)
    return jsonify({"message": "Data added", "id": doc_ref[1].id})

# READ
@app.route("/get", methods=["GET"])
def get_data():
    docs = collection.stream()
    result = []
    for doc in docs:
        d = doc.to_dict()
        d["id"] = doc.id
        result.append(d)
    return jsonify(result)

# UPDATE
@app.route("/update/<id>", methods=["PUT"])
def update_data(id):
    data = request.json
    collection.document(id).update(data)
    return jsonify({"message": "Updated"})

# DELETE
@app.route("/delete/<id>", methods=["DELETE"])
def delete_data(id):
    collection.document(id).delete()
    return jsonify({"message": "Deleted"})

# Signup
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    phone = data.get("phone")
    

    if not username or not phone:
        return jsonify({"error": "Missing fields"}), 400

    # Check if phone or username already exists
    existing_users = collection.where("phone", "==", phone).stream()
    if any(existing_users):
        return jsonify({"error": "Phone number already registered"}), 409

    existing_usernames = collection.where("username", "==", username).stream()
    if any(existing_usernames):
        return jsonify({"error": "Username already taken"}), 409

    # create JWT
    token = jwt.encode({
        "user": username,
        "phone": phone,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, SECRET_KEY, algorithm="HS256")

    # Add new user
    doc_ref = collection.add({
        "username": username,
        "phone": phone,
        "created_at": firestore.SERVER_TIMESTAMP
    })

    return jsonify({
        "message": "User registered",
        "id": doc_ref[1].id,
        "token": token
    }), 201


# Login
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    phone = data.get("phone")

    if not phone:
        return jsonify({"error": "Missing fields"}), 400

    # Check if phone exists
    user_docs = collection.where("phone", "==", phone).stream()
    user_doc = next(user_docs, None)

    if not user_doc:
        return jsonify({"error": "User not found"}), 404

    user_data = user_doc.to_dict()

    # create JWT
    token = jwt.encode({
        "user": username,
        "phone": phone,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, SECRET_KEY, algorithm="HS256")

    

    return jsonify({
        "message": "Login successful",
        "user": user_data
    }), 200


# Predict route
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    
    features = [
        data["N"],
        data["P"],
        data["K"],
        data["ph"],
        data["soil_type"]
        
    ]
    
    input_data = np.array([features])
    prediction = model.predict(input_data)
    
    return jsonify({"crop": prediction[0]})

# Marketplace route
@app.route("/marketplace", methods=["GET"])
def marketplace():
    role = request.args.get("role", "").lower() 
    crop_filter = request.args.get("crop")

    # Fetch posts
    posts_ref = post_collection

    # Apply optional filters
    if crop_filter:
        posts_ref = posts_ref.where("crop_name", "==", crop_filter)

    posts_docs = posts_ref.stream()
    posts_list = []

    for doc in posts_docs:
        post_data = doc.to_dict()
        # Include broker info
        broker_doc = collection.document(post_data["broker_id"]).get()
        if broker_doc.exists:
            post_data["broker"] = broker_doc.to_dict()
        # Default values if some fields missing
        post_data["crop_name"] = post_data.get("crop_name", "")
        post_data["category"] = post_data.get("category", "All")
        post_data["description"] = post_data.get("description", "")
        post_data["price"] = post_data.get("price", "")
        post_data["unit"] = post_data.get("unit", "")
        post_data["trend"] = post_data.get("trend", "steady")
        post_data["location"] = post_data.get("location", "")
        post_data["id"] = doc.id
        posts_list.append(post_data)

    return jsonify(posts_list)



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)