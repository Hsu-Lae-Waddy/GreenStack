
import requests

def get_universal_npk_ranks(data):
    # 1. Dataset Ranges (Defined by your dataset)
    N_LIMITS = [60, 90]   # Low < 60, Med 60-90, High > 90
    P_LIMITS = [20, 50]   # Low < 20, Med 20-50, High > 50
    K_LIMITS = [80, 150]  # Low < 80, Med 80-150, High > 150

    # 2. Extract Values from API Data
    fao_type = data["soil_type"]["fao_classification"]
    texture = data["soil_type"]["texture_class"] # New input
    ph = data["chemical"]["ph_h2o"]
    n_g_kg = data["chemical"]["nitrogen_g_kg"]

    # 3. Calculate N Rank (Direct from data)
    # Total Nitrogen (g/kg) to Available Estimate conversion
    n_score = n_g_kg * 50
    if n_score < N_LIMITS[0]: n_rank = "LOW"
    elif n_score <= N_LIMITS[1]: n_rank = "MEDIUM"
    else: n_rank = "HIGH"

    # 4. Texture Modifier (Nutrient Holding Capacity)
    # Maps all 12 USDA texture classes to a retention multiplier
    texture_modifiers = {
        # Sandy (Coarse) - Low retention
        "Sand": 0.65, "Loamy Sand": 0.75, "Sandy Loam": 0.85,
        # Loamy (Medium) - Standard retention
        "Loam": 1.0, "Silt Loam": 1.0, "Silt": 1.0,
        # Clay-Loamy (Fine) - High retention
        "Clay Loam": 1.1, "Silty Clay Loam": 1.1, "Sandy Clay Loam": 1.1,
        # Clayey (Heavy) - Very high retention
        "Clay": 1.2, "Silty Clay": 1.2, "Sandy Clay": 1.2
    }
    # Default to 1.0 if texture is missing or unknown
    t_factor = texture_modifiers.get(texture, 1.0)

    # 5. Map P & K Base Potential by Soil Group
    soil_potential = {
        "Fluvisols": {"p": 0.60, "k": 0.60}, # River Delta (Rich)
        "Gleysols":  {"p": 0.50, "k": 0.55}, # Wetland
        "Ferralsols": {"p": 0.15, "k": 0.40}, # Red Upland (P-Poor)
        "Acrisols":   {"p": 0.18, "k": 0.35}, # Acidic Hills
        "Nitisols":   {"p": 0.40, "k": 0.50}, # Fertile Red Clay
        "Cambisols":  {"p": 0.45, "k": 0.45}  # Young Brown Soil
    }
    base = soil_potential.get(fao_type, {"p": 0.35, "k": 0.35})

    # 6. pH Adjustment Factor (Availability)
    if 6.0 <= ph <= 7.2:
        ph_factor = 1.2 # Optimal (Neutral)
    elif ph < 5.5:
        ph_factor = 0.7 # Acidic lock (Phosphorus is very low here)
    else:
        ph_factor = 0.9 # Alkaline lock

    # 7. Final Multi-Factor Calculation
    # We multiply: (Max Range * Soil Type Potential * Texture Holding * pH Availability)
    calc_p = (145 * base["p"] * t_factor) * ph_factor
    calc_k = (205 * base["k"] * t_factor) * ph_factor

    # 8. Final Ranking based on your dataset thresholds
    p_rank = "LOW" if calc_p < P_LIMITS[0] else ("MEDIUM" if calc_p <= P_LIMITS[1] else "HIGH")
    k_rank = "LOW" if calc_k < K_LIMITS[0] else ("MEDIUM" if calc_k <= K_LIMITS[1] else "HIGH")

    return {
        "N_RANK": n_rank,
        "P_RANK": p_rank,
        "K_RANK": k_rank
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

# Using your original data (Clay Loam Ferralsols)
# print(get_advanced_npk_ranks(data))

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



def get_weather_daily(lat, lon):
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": lat,
        "longitude": lon,
        "daily": "temperature_2m_max,temperature_2m_min,uv_index_max,windspeed_10m_max,winddirection_10m_dominant,precipitation_sum",
        "hourly": "relativehumidity_2m,surface_pressure",
        "timezone": "Asia/Yangon"
    }

    res = requests.get(url, params=params, timeout=10)
    res.raise_for_status()
    data = res.json()

    forecast = []

    for i, date in enumerate(data["daily"]["time"]):
        humidity = []
        pressure = []

        for j, t in enumerate(data["hourly"]["time"]):
            if t.startswith(date):
                humidity.append(data["hourly"]["relativehumidity_2m"][j])
                pressure.append(data["hourly"]["surface_pressure"][j])

        forecast.append({
            "date": date,
            "temp_max": data["daily"]["temperature_2m_max"][i],
            "temp_min": data["daily"]["temperature_2m_min"][i],
            "humidity": round(sum(humidity)/len(humidity), 1) if humidity else None,
            "pressure": round(sum(pressure)/len(pressure), 1) if pressure else None,
            "wind_speed": data["daily"]["windspeed_10m_max"][i],
            "wind_direction": data["daily"]["winddirection_10m_dominant"][i],
            "uv_index": data["daily"]["uv_index_max"][i],
            "rainfall": data["daily"]["precipitation_sum"][i]
        })

    return {
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