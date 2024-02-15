#!/bin/bash

# URL of the JSON file
url="https://fight.pokebattler.com/pokemon"

# Download the JSON file using curl
curl -s "$url" |
# Use jq to keep only the pokemonId from each object in the "pokemon" array
jq '[.pokemon[] | {pokemonId: .pokemonId}]' > slim_pokemon.json

echo "Slimmed down file created: slim_pokemon.json"
