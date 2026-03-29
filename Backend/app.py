from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import firebase_admin
from groq import Groq
from functools import wraps
from firebase_admin import credentials, firestore
from functions import get_universal_npk_ranks,fetch_api_data,get_weather_with_location
from firebase_admin import credentials, firestore, auth
import os,json
import jwt
import datetime


app = Flask(__name__)
SECRET_KEY = "c2f9a7d4e8b1c3f6a9d0e5f7b2c4a8d1e6f9b3c7a2d5e8f1"

# Firebase init
# Load from env

# for production
# firebase_key = os.environ.get("FIREBASE_KEY")
# firebase_dict = json.loads(firebase_key)
# SECRET_KEY = os.environ.get("GROQ_API_KEY")
SECRET_KEY="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"  # groq key for chat bot

# firbase initialization
firebase_dict = "./firebase-auth.json"
cred = credentials.Certificate(firebase_dict)
firebase_admin.initialize_app(cred)

db = firestore.client()
collection = db.collection("users")

CORS(app, resources={r"/*": {"origins": "*"}})

# JWT verification decorator






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


@app.route('/npk-Rank',methods=['GET'])
def getNpkRank():
    data=fetch_api_data(16.60001638075996, 97.34907779784488)
    res=get_universal_npk_ranks(data)
    return jsonify({"message":"Rank Got","response":res,"datas":data})


@app.route("/get7DaysWeather",methods=["POST"])
def getWeather():
    data=request.json
    data=get_weather_with_location(data['latitude'], data['longitude'])
    return jsonify({"message":"Weather Got","response":data})


# 🤖 Chatbot (Groq)
@app.route("/chatBot", methods=["POST"])
def chat():
    client = Groq(api_key=SECRET_KEY)
    data = request.get_json()
    message = data.get("message")
    system_prompt = (
    "You are a climate-smart farming assistant for Myanmar farmers. "
    "Guidelines: Use formal, a little long (not boring long),perfect  and polite Burmese (ဗမာစာ) answers. "
    "Keep responses concise, practical, and culturally relevant. "
    "\n\nExample 1:"
    "\nUser: စပါးစိုက်ပျိုးဖို့ အကောင်းဆုံးအချိန်က ဘယ်တော့လဲ?"
    "\nAssistant: မိုးစပါးအတွက် မေလနှောင်းပိုင်းမှ ဇွန်လအတွင်း စိုက်ပျိုးခြင်းသည် အကောင်းဆုံးဖြစ်ပါသည်။ "
    "ရာသီဥတုပြောင်းလဲမှုကြောင့် မိုးရွာသွန်းမှုကို သတိပြုရန် လိုအပ်ပါသည်။"
)
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": message
                }
            ]
        )

        return jsonify({
            "reply": response.choices[0].message.content
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500



# Signup
@app.route("/login", methods=["POST"])
def auth():
    data = request.json
    username = data.get("name")
    phone = data.get("phone")

    if not username or not phone:
        return jsonify({"error": "Missing fields"}), 400

    # Check if user exists by phone
    user_docs = collection.where("phone", "==", phone).stream()
    user_doc = next(user_docs, None)

    if user_doc:
        # Phone exists → login
        user_data = user_doc.to_dict()
        if user_data.get("username") != username:
            return jsonify({"error": "Phone exists but username mismatch"}), 409

        # Generate JWT
        token = jwt.encode({
            "user": username,
            "phone": phone,
            "role":"",
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, SECRET_KEY, algorithm="HS256")
        user_data["id"] = user_doc.id
        return jsonify({
            "message": "Login successful",
            "user": user_data,
            "token": token
        }), 200

    else:
        # Phone does not exist → register
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



@app.route("/profile", methods=["POST"])
def profile():
    try:
        # 1️⃣ Get token from header
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"error": "Token missing"}), 401

        token = auth_header.split(" ")[1]
        print(token)
        # # 2️⃣ Decode JWT to get user ID
        # decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        # user_id = decoded.get("id")  # <-- store document ID in JWT during login/signup
        # if not user_id:
        #     return jsonify({"error": "User ID missing in token"}), 400

        # 3️⃣ Fetch Firestore document by ID
        doc_ref = collection.document(token)
        doc = doc_ref.get()
        if not doc.exists:
            return jsonify({"error": "User not found"}), 404

        user_data = doc.to_dict()
        user_data["id"] = doc.id

        return jsonify({"user": user_data}), 200

    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401
    except Exception as e:
        print("Error in /profile:", e)
        return jsonify({"error": "Internal server error"}), 500




@app.route("/get-user-role", methods=["POST"])
def get_user_role():
    auth_header = request.headers.get("Authorization")
    
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({"error": "Token missing or malformed"}), 401

    token = auth_header.split(" ")[1]

    try:
        # 1️⃣ Decode the token to get the actual User ID (uid)
        # If using Firebase Admin SDK:
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token['uid']
        
        # 2️⃣ Fetch the document using the UID, not the token string
        doc_ref = db.collection("users").document(uid).get()
        
        if not doc_ref.exists:
            return jsonify({"error": "User not found"}), 404

        user_data = doc_ref.to_dict()
        role = user_data.get("role", "farmer") # Get role from dict

        return jsonify({"role": role}), 200

    except Exception as e:
        print("Auth Error:", e)
        return jsonify({"error": "Invalid or expired token"}), 401



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)