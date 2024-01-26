import requests
import os
from dotenv import load_dotenv

# Load the .env file
dotenv_path = os.path.join(os.path.dirname(__file__), '../.env')
load_dotenv(dotenv_path)

# Access the NASA API key
NASA_API_KEY = os.getenv("NASA_API_KEY")

def marsweather():
    url = f"https://api.nasa.gov/insight_weather/?api_key={NASA_API_KEY}&feedtype=json&ver=1.0"
    response = requests.get(url)
    data = response.json()
    
    if 'sol_keys' in data:
        for sol in data['sol_keys']:
            # Check if both 'AT' and 'HWS' data are available for the Sol
            if 'AT' in data[sol] and 'HWS' in data[sol]:
                return data[sol]['AT'], data[sol]['HWS']
    
    return None  # Return None if no data is available

print(marsweather())