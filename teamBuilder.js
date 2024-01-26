const pointsMap = {
    "mega scizor": 6, "mega salamence": 6,
    "dialga": 4, "groudon": 4, "meloetta": 4, "mewtwo": 4, "solgaleo": 4, "mega steelix": 4, "xerneas": 4, "zacian": 4,
    "mega aggron": 3, "mega blastoise": 3, "giratina (altered)": 3, "giratina (origin)": 3,
    "mega charizard x": 2, "dragonite": 2, "landorus (therian)": 2, "lugia": 2, "melmetal": 2, "palkia": 2, "reshiram": 2, "mega slowbro": 2, "yveltal": 2, "zarude": 2, "zekrom": 2,
    "mega abomasnow": 1, "mega blaziken": 1, "florges": 1, "genesect": 1, "heatran": 1, "kyurem": 1, "mew": 1, "rayquaza": 1
};

let totalPoints = 0;
let team = new Set(); // To track added Pokémon and prevent duplicates

// Populate the datalist with Pokémon names
function populateDatalist() {
    const dataList = document.getElementById("pokemonList");
    Object.keys(pointsMap).forEach(pokemon => {
        let option = document.createElement("option");
        option.value = pokemon;
        dataList.appendChild(option);
    });
}

// Add event listener to allow adding Pokémon by pressing Enter
document.getElementById("pokemonInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addPokemon();
    }
});

function addPokemon() {
    const pokemonInput = document.getElementById("pokemonInput");
    const pokemonName = pokemonInput.value.trim().toLowerCase();
    const pokemonPoints = pointsMap[pokemonName] || 0;

    if (team.has(pokemonName)) {
        alert("Duplicate Pokémon not allowed.");
        return;
    }

    if (pokemonName && !isBanned(pokemonName) && (totalPoints + pokemonPoints) <= 8) {
        totalPoints += pokemonPoints;
        updateTeamList(pokemonName, pokemonPoints);
        updateTotalPoints();
    } else {
        alert("Invalid Pokémon or points limit exceeded.");
    }

    pokemonInput.value = ''; // Clear the input field
    team.add(pokemonName); 
}

function isBanned(pokemonName) {
    const banned = ["mega charizard y", "mega garchomp", "mega gardevoir", "mega gengar", "mega gyarados", "primal groudon", "primal kyogre", "mega latias", "mega latios", "mega rayquaza", "mega swampert", "mega tyranitar", "zygarde (complete)"];
    return banned.includes(pokemonName);
}

function updateTeamList(pokemonName, pokemonPoints) {
    const teamList = document.getElementById("teamList");
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item"); // Bootstrap class to style list items

    // Format Pokémon name to be capitalized
    const formattedName = pokemonName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    listItem.textContent = `${formattedName} (${pokemonPoints} points) `;
    
    // Add a remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = function() {
        listItem.remove();
        totalPoints -= pokemonPoints;
        updateTotalPoints();
    };
    
    listItem.appendChild(removeButton);
    teamList.appendChild(listItem);
}

function updateTotalPoints() {
    const totalPointsElement = document.getElementById("totalPoints");
    totalPointsElement.textContent = totalPoints;
}

populateDatalist(); 