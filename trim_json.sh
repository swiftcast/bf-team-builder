#!/bin/bash

# URL of the JSON file
url="https://www.pokemoves.com/data.json"

# Use curl to download the JSON and jq to extract Pokémon names into a JSON array
curl -s "$url" | jq '[.pokemon[] | .name]' > pokemon_names.json

echo "Pokémon names have been saved to pokemon_names.json."
