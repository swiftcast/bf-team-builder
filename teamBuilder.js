const pointsMap = {
    "Mega Scizor": 6, "Mega Salamence": 6,
    "Dialga": 4, "Groudon": 4, "Meloetta": 4, "Mewtwo": 4, "Solgaleo": 4, "Mega Steelix": 4, "Xerneas": 4, "Zacian": 4,
    "Mega Aggron": 3, "Mega Blastoise": 3, "Giratina (Altered)": 3, "Giratina (Origin)": 3,
    "Mega Charizard X": 2, "Dragonite": 2, "Landorus (Therian)": 2, "Lugia": 2, "Melmetal": 2, "Palkia": 2, "Reshiram": 2, "Mega Slowbro": 2, "Yveltal": 2, "Zarude": 2, "Zekrom": 2,
    "Mega Abomasnow": 1, "Mega Blaziken": 1, "Florges": 1, "Genesect": 1, "Heatran": 1, "Kyurem": 1, "Mew": 1, "Rayquaza": 1
};

let totalPoints = 0;

function addPokemon() {
    const pokemonInput = document.getElementById("pokemonInput");
    const pokemonName = pokemonInput.value.trim();
    const pokemonPoints = pointsMap[pokemonName] || 0;

    if (pokemonName && !isBanned(pokemonName) && (totalPoints + pokemonPoints) <= 8) {
        totalPoints += pokemonPoints;
        updateTeamList(pokemonName, pokemonPoints);
        updateTotalPoints();
    } else {
        alert("Invalid Pokémon or points limit exceeded.");
    }

    pokemonInput.value = ''; // Clear the input field
}

function isBanned(pokemonName) {
    const banned = ["Mega Charizard Y", "Mega Garchomp", "Mega Gardevoir", "Mega Gengar", "Mega Gyarados", "Primal Groudon", "Primal Kyogre", "Mega Latias", "Mega Latios", "Mega Rayquaza", "Mega Swampert", "Mega Tyranitar", "Zygarde (Complete)"];
    return banned.includes(pokemonName);
}

function updateTeamList(pokemonName, pokemonPoints) {
    const teamList = document.getElementById("teamList");
    const listItem = document.createElement("li");
    listItem.textContent = `${pokemonName} (${pokemonPoints} points)`;
    teamList.appendChild(listItem);
}

function updateTotalPoints() {
    const totalPointsElement = document.getElementById("totalPoints");
    totalPointsElement.textContent = totalPoints;
}
