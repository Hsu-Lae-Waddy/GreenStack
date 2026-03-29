import joblib
import numpy as np

# Load files
model = joblib.load("Backend\chatbot\pkl_files\crop_model_cat.pkl")
scaler = joblib.load("Backend\chatbot\pkl_files\scaler_cat.pkl")

# Example input (YOU MUST CONFIRM ORDER)
features = [90, 40, 40, 25, 80, 6.5, 200]

# Convert to array
input_data = np.array([features])

# Apply scaling
input_scaled = scaler.transform(input_data)

# Predict
prediction = model.predict(input_scaled)

print(prediction)