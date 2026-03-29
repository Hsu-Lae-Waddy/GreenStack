
import requests
import joblib
import numpy as np
predictModel = joblib.load("crop_model_cat.pkl")
try:
    scaler = joblib.load("scaler_cat.pkl")
except:
    scaler = None



def get_universal_npk_ranks(data):
    # FALLBACK: If data is None or empty, return Medium Ranks (1)
    if not data or "soil_type" not in data or "chemical" not in data:
        return {"N_RANK": "1", "P_RANK": "1", "K_RANK": "1"}

    # 1. Dataset Ranges
    N_LIMITS = [60, 90]   
    P_LIMITS = [20, 50]   
    K_LIMITS = [80, 150]  

    # 2. Extract Values Safely
    # Using .get() ensures that if a key is missing, we get None instead of a crash
    soil_info = data.get("soil_type", {})
    chem_info = data.get("chemical", {})

    fao_type = soil_info.get("fao_classification")
    texture = soil_info.get("texture_class")
    ph = chem_info.get("ph_h2o")
    n_g_kg = chem_info.get("nitrogen_g_kg")

    # SECONDARY FALLBACK: If the core calculation values are null, return 1
    if any(v is None for v in [fao_type, ph, n_g_kg]):
        return {"N_RANK": "1", "P_RANK": "1", "K_RANK": "1","ph":"6.5"}

    # 3. Calculate N Rank
    n_score = n_g_kg * 50
    if n_score < N_LIMITS[0]: n_rank = "0"
    elif n_score <= N_LIMITS[1]: n_rank = "1"
    else: n_rank = "2"

    # 4. Texture Modifier
    texture_modifiers = {
        "Sand": 0.65, "Loamy Sand": 0.75, "Sandy Loam": 0.85,
        "Loam": 1.0, "Silt Loam": 1.0, "Silt": 1.0,
        "Clay Loam": 1.1, "Silty Clay Loam": 1.1, "Sandy Clay Loam": 1.1,
        "Clay": 1.2, "Silty Clay": 1.2, "Sandy Clay": 1.2
    }
    t_factor = texture_modifiers.get(texture, 1.0)

    # 5. Map P & K Base Potential
    soil_potential = {
        "Fluvisols": {"p": 0.60, "k": 0.60},
        "Gleysols":  {"p": 0.50, "k": 0.55},
        "Ferralsols": {"p": 0.15, "k": 0.40},
        "Acrisols":   {"p": 0.18, "k": 0.35},
        "Nitisols":   {"p": 0.40, "k": 0.50},
        "Cambisols":  {"p": 0.45, "k": 0.45}
    }
    base = soil_potential.get(fao_type, {"p": 0.35, "k": 0.35})

    # 6. pH Adjustment Factor
    if 6.0 <= ph <= 7.2:
        ph_factor = 1.2
    elif ph < 5.5:
        ph_factor = 0.7
    else:
        ph_factor = 0.9

    # 7. Final Calculation
    calc_p = (145 * base["p"] * t_factor) * ph_factor
    calc_k = (205 * base["k"] * t_factor) * ph_factor

    # 8. Final Ranking
    p_rank = "0" if calc_p < P_LIMITS[0] else ("1" if calc_p <= P_LIMITS[1] else "2")
    k_rank = "0" if calc_k < K_LIMITS[0] else ("1" if calc_k <= K_LIMITS[1] else "2")

    return {
        "N_RANK": n_rank,
        "P_RANK": p_rank,
        "K_RANK": k_rank,
        "ph": str(ph),  # Return pH as string for consistency
    }

def get_advanced_npk_ranks(data):
    # 1. Dataset Constants
    P_MAX, K_MAX = 145, 205
    
    # 2. Extract Data
    fao_type = data["soil_type"]["fao_classification"]
    texture = data["soil_type"]["texture_class"]
    ph = data["chemical"]["ph_h2o"]
    n_g_kg = data["chemical"]["nitrogen_g_kg"]

    # 3. Nitrogen Rank (Direct calculation remains the same)
    n_score = n_g_kg * 50
    n_rank = "LOW" if n_score < 60 else ("MEDIUM" if n_score <= 90 else "HIGH")

    # 4. Texture Modifier Map (The 12 Classes)
    texture_modifiers = {
        "Sand": 0.6, "Loamy Sand": 0.7, "Sandy Loam": 0.85,
        "Loam": 1.0, "Silt Loam": 1.0, "Silt": 1.0,
        "Clay Loam": 1.1, "Silty Clay Loam": 1.1, "Sandy Clay Loam": 1.1,
        "Clay": 1.2, "Silty Clay": 1.2, "Sandy Clay": 1.2
    }
    t_factor = texture_modifiers.get(texture, 1.0)

    # 5. Base Potential by FAO Type
    soil_potential = {
        "Fluvisols": {"p": 0.60, "k": 0.60}, # River Delta
        "Gleysols":  {"p": 0.50, "k": 0.55}, # Wetland
        "Ferralsols": {"p": 0.15, "k": 0.40}, # Red Upland
        "Acrisols":   {"p": 0.18, "k": 0.35}, # Acidic Hills
        "Nitisols":   {"p": 0.40, "k": 0.50}, # Fertile Red Clay
        "Cambisols":  {"p": 0.45, "k": 0.45}  # Young Brown Soil
    }
    base = soil_potential.get(fao_type, {"p": 0.35, "k": 0.35})

    # 6. pH Factor
    ph_factor = 1.2 if 6.0 <= ph <= 7.2 else 0.8

    # 7. Final Multi-Factor Calculation
    # Formula: (Max * BasePotential * TextureFactor * pHFactor)
    calc_p = (P_MAX * base["p"] * t_factor) * ph_factor
    calc_k = (K_MAX * base["k"] * t_factor) * ph_factor

    # 8. Rank Assignment
    p_rank = "LOW" if calc_p < 20 else ("MEDIUM" if calc_p <= 50 else "HIGH")
    k_rank = "LOW" if calc_k < 80 else ("MEDIUM" if calc_k <= 150 else "HIGH")

    return {"N": n_rank, "P": p_rank, "K": k_rank}


def fetch_api_data(lat,lon):
    api=f"https://www.kaegro.com/farms/api/soil?lat={lat}&lon={lon}"
    try:
        response = requests.get(api)
        response.raise_for_status()  # raise error if status code != 200
        return response.json()       # parse and return JSON data
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except requests.exceptions.ConnectionError as conn_err:
        print(f"Connection error occurred: {conn_err}")
    except requests.exceptions.Timeout as timeout_err:
        print(f"Timeout error occurred: {timeout_err}")
    except requests.exceptions.RequestException as req_err:
        print(f"Request error occurred: {req_err}")
    return None

# for production ####
# import os
# GOOGLE_MAPS_API_KEY = os.environ.get("GOOGLE_MAPS_API_KEY")  # set your API key in env


def get_weather_with_location(lat, lon):
    # =========================
    # 1️⃣ Weather API (Open-Meteo)
    # =========================
    weather_url = "https://api.open-meteo.com/v1/forecast"
    weather_params = {
    "latitude": lat,
    "longitude": lon,
    "daily": "temperature_2m_max,temperature_2m_min,uv_index_max,windspeed_10m_max,winddirection_10m_dominant,precipitation_sum",
    "hourly": "temperature_2m,relativehumidity_2m,surface_pressure",
    "current_weather": True,
    "timezone": "Asia/Yangon"
}

    try:
        weather_res = requests.get(weather_url, params=weather_params, timeout=10)
        weather_res.raise_for_status()
        weather_data = weather_res.json()
    except Exception as e:
        return {"error": f"Weather API failed: {str(e)}"}

    # =========================
    # 2️⃣ Location API (LocationIQ) - FIXED LOGIC
    # =========================
    location = {"city": None, "region": None, "country": None}

    try:
        geo_url = "https://us1.locationiq.com/v1/reverse"
        geo_params = {
            "key": "pk.fe83c8dae3bb3224baa12eb6f4174eb6",
            "lat": lat,
            "lon": lon,
            "format": "json",
        }

        geo_res = requests.get(geo_url, params=geo_params, timeout=5)
        geo_res.raise_for_status()
        geo_data = geo_res.json()

        # LocationIQ returns a flat 'address' dictionary
        addr = geo_data.get("address", {})
        location = {
            "city": addr.get("city") or addr.get("town") or addr.get("village") or addr.get("hamlet"),
            "region": addr.get("state") or addr.get("region"),
            "country": addr.get("country")
        }

    except Exception as e:
        print(f"LocationIQ Geocoding error: {e}")

    # =========================
    # 3️⃣ Process Daily Data (Optimized)
    # =========================
    forecast = []
    hourly_times = weather_data["hourly"]["time"]
    hourly_humidity = weather_data["hourly"]["relativehumidity_2m"]
    hourly_pressure = weather_data["hourly"]["surface_pressure"]

    for i, date in enumerate(weather_data["daily"]["time"]):
        # Filter hourly data for the specific day using list comprehension
        day_indices = [j for j, t in enumerate(hourly_times) if t.startswith(date)]
        
        day_humidity = [hourly_humidity[j] for j in day_indices]
        day_pressure = [hourly_pressure[j] for j in day_indices]

        forecast.append({
            "date": date,
            "temp_max": weather_data["daily"]["temperature_2m_max"][i],
            "temp_min": weather_data["daily"]["temperature_2m_min"][i],
            "temp": weather_data["hourly"]["temperature_2m"][i],
            "humidity": round(sum(day_humidity)/len(day_humidity), 1) if day_humidity else None,
            "pressure": round(sum(day_pressure)/len(day_pressure), 1) if day_pressure else None,
            "wind_speed": weather_data["daily"]["windspeed_10m_max"][i],
            "wind_direction": weather_data["daily"]["winddirection_10m_dominant"][i],
            "uv_index": weather_data["daily"]["uv_index_max"][i],
            "rainfall": weather_data["daily"]["precipitation_sum"][i]
        })

    # =========================
    # 4️⃣ Final Response
    # =========================
    return {
        "location": location,
        "units": {
            "temperature": "°C",
            "humidity": "%",
            "pressure": "hPa",
            "wind_speed": "km/h",
            "wind_direction": "°",
            "uv_index": "index",
            "rainfall": "mm"
        },
        "forecast": forecast
    }

def predict_today(data, model=predictModel, scaler=scaler):
    # Extract features list
    if isinstance(data, dict) and "features" in data:
        features = data["features"]
    elif isinstance(data, list):
        features = data
    else:
        raise ValueError("Input must be a dict with 'features' key or a list of features")

    # Convert to NumPy array and reshape
    X = np.array(features).reshape(1, -1)

    # Apply scaling if available
    if scaler:
        X = scaler.transform(X)

    probs = model.predict_proba(X)[0]

    # 4. Get indices of the top 3 highest probabilities
    top_3_indices = np.argsort(probs)[-3:][::-1]

    # 5. Map indices to crop names and confidence
    results = []
    for i in top_3_indices:
        results.append({
            "crop": model.classes_[i],
            "confidence": f"{probs[i] * 100:.2f}%"
        })
    
    return results