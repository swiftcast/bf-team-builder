import requests
import json

# URL of the JSON file
url = "https://fight.pokebattler.com/pokemon"

# Download the JSON file
response = requests.get(url)
data = response.json()

# Process the data to keep only pokemonId and handle "_MEGA"
processed_data = [
    {"pokemonId": "MEGA_" + pokemon['pokemonId'].replace("_MEGA", "") if "_MEGA" in pokemon['pokemonId'] else pokemon['pokemonId']}
    for pokemon in data['pokemon']
]

# Write the processed data to a file
with open('slim_pokemon.json', 'w') as file:
    json.dump(processed_data, file, indent=4)

print("Slimmed down file created: slim_pokemon.json")
