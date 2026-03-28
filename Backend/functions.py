def calculate_npk_rank(data):
    OM = data["chemical"]["organic_matter_pct"]
    clay = data["physical"]["clay_pct"]
    cec = data["chemical"]["cec_cmol_kg"]
    pH = data["chemical"]["ph_h2o"]
    N = data["chemical"]["nitrogen_g_kg"]
    
    # Nitrogen rank
    if N < 1.0:
        N_rank = "Low"
    elif N <= 2.5:
        N_rank = "Medium"
    else:
        N_rank = "High"
    
    # Phosphorus rank
    P_score = 0.4*OM + 0.3*clay + 0.3*pH*10
    print(f"P_Score:{P_score}")
    if P_score < 3.5:
        P_rank = "Low"
    elif P_score <= 6 and P_score >=3.5:
        P_rank = "Medium"
    else:
        P_rank = "High"
    
    # Potassium rank
    K_score = 0.4*cec + 0.4*clay + 0.2*OM*10
    print(f"K_Score:{K_score}")
    if K_score < 3.5:
        K_rank = "Low"
    elif K_score <= 6 and K_score >=3.5:
        K_rank = "Medium"
    else:
        K_rank = "High"
    
    return {"N": N_rank, "P": P_rank, "K": K_rank}

# Example usage
data ={
    "location": {
        "lat": 16.664462464531987,
        "lon": 94.91565733190768
    },
    "soil_type": {
        "texture_class": "Clay Loam",
        "fao_classification": "Ferralsols"
    },
    "physical": {
        "sand_pct": 24.18,
        "silt_pct": 40.1,
        "clay_pct": 35.7,
        "bulk_density_g_cm3": 1.26
    },
    "chemical": {
        "ph_h2o": 6.62,
        "organic_matter_pct": 6.65,
        "nitrogen_g_kg": 2.04,
        "cec_cmol_kg": 26.95
    },
    "water": {
        "capacity_field_vol_pct": 34.27,
        "capacity_wilt_vol_pct": 19.95
    },
    "_meta": {
        "latency_seconds": 27.247
    }
}

print(calculate_npk_rank(data))