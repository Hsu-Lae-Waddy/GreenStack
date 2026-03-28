from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore, auth
import os,json
from werkzeug.security import generate_password_hash, check_password_hash
app = Flask(__name__)

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

CORS(app, resources={r"/*": {"origins": "*"}})

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
    password = data.get("password")

    if not username or not phone or not password:
        return jsonify({"error": "Missing fields"}), 400

    # Check if phone or username already exists
    existing_users = collection.where("phone", "==", phone).stream()
    if any(existing_users):
        return jsonify({"error": "Phone number already registered"}), 409

    existing_usernames = collection.where("username", "==", username).stream()
    if any(existing_usernames):
        return jsonify({"error": "Username already taken"}), 409

    # Hash password before saving
    hashed_password = generate_password_hash(password)

    # Add new user
    doc_ref = collection.add({
        "username": username,
        "phone": phone,
        "password": hashed_password,
        "created_at": firestore.SERVER_TIMESTAMP
    })

    return jsonify({
        "message": "User registered",
        "id": doc_ref[1].id
    }), 201


# Login
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    phone = data.get("phone")
    password = data.get("password")

    if not phone or not password:
        return jsonify({"error": "Missing fields"}), 400

    # Check if phone exists
    user_docs = collection.where("phone", "==", phone).stream()
    user_doc = next(user_docs, None)

    if not user_doc:
        return jsonify({"error": "User not found"}), 404

    user_data = user_doc.to_dict()

    # Verify password
    if not check_password_hash(user_data["password"], password):
        return jsonify({"error": "Invalid password"}), 401

    user_data["id"] = user_doc.id
    # Remove password from response
    user_data.pop("password")

    return jsonify({
        "message": "Login successful",
        "user": user_data
    }), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)