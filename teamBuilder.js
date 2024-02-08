
const leagueData = {
    "master": {
        "mega scizor": 6, "mega salamence": 6,
        "dialga": 4, "groudon": 4, "meloetta": 4, "mewtwo": 4, "solgaleo": 4, "mega steelix": 4, "xerneas": 4, "zacian": 4,
        "mega aggron": 3, "mega blastoise": 3, "giratina (altered)": 3, "giratina (origin)": 3,
        "mega charizard x": 2, "dragonite": 2, "landorus (therian)": 2, "lugia": 2, "melmetal": 2, "palkia": 2, "reshiram": 2, "mega slowbro": 2, "yveltal": 2, "zarude": 2, "zekrom": 2,
        "mega abomasnow": 1, "mega blaziken": 1, "florges": 1, "genesect": 1, "heatran": 1, "kyurem": 1, "mew": 1, "rayquaza": 1
    },
    "great": {
        "annihilape": 7, "azumarill": 7, "carbink": 7, "gligar": 7, "lanturn": 7, "lickitung": 7, "medicham": 7, "registeel": 7, "skarmory": 7,
        "bastiodon": 5, "deoxys (defense)": 5, "dewgong": 5, "mandibuzz": 5, "ninetales (alolan)": 5, "poliwrath": 5, "sableye": 5, "sandslash (alolan)": 5, "serperior": 5, "swampert": 5, "talonflame": 5, "toxapex": 5, "umbreon": 5, "vigoroth": 5, "whiscash": 5,
        "altaria": 2, "charizard": 2, "charjabug": 2, "clefable": 2, "clodsire": 2, "cresselia": 2, "diggersby": 2, "dragonite": 2, "dubwool": 2, "froslass": 2, "greedent": 2, "jellicent": 2, "mantine": 2, "pelipper": 2, "pidgeot": 2, "quagsire": 2, "steelix": 2, "stunfisk (galarian)": 2, "tapu fini": 2, "toxicroak": 2, "venusaur": 2, "wigglytuff": 2
        // Note: Untiered Pokémon would be any not listed, with a default point value of 1 when calculating.
    }
};

let currentLeague = 'master'; // Default league
let totalPoints = 0;
let team = new Set();

function populateDatalist(league) {
    const dataList = document.getElementById("pokemonList");
    dataList.innerHTML = ''; // Clear existing options
    Object.keys(leagueData[league]).forEach(pokemon => {
        let option = document.createElement("option");
        option.value = pokemon;
        dataList.appendChild(option);
    });
}

document.getElementById("pokemonInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addPokemon();
    }
});

function switchLeague(league) {
  currentLeague = league;
  totalPoints = 0; // Reset points
  team.clear(); // Clear the current team
  document.getElementById("teamList").innerHTML = ''; // Clear the team list UI
  updateTotalPoints(); // Reset points display
  populateDatalist(league); // Populate the datalist with the new league's Pokémon
}

function addPokemon() {
    const pokemonInput = document.getElementById("pokemonInput");
    const pokemonName = pokemonInput.value.trim().toLowerCase();

    if (isBanned(pokemonName)) {
        return; // Avoid adding banned Pokémon
    }

    const pokemonPoints = leagueData[currentLeague][pokemonName] || 0;

    if (totalPoints + pokemonPoints <= 8) {
      totalPoints += pokemonPoints;
      updateTeamList(pokemonName, pokemonPoints);
      updateTotalPoints();
  
      team.add(pokemonName); // Add to the set to track the added Pokémon
      pokemonInput.value = ''; // Clear the input field
    } else {
      // Handle points limit exceeded without adding Pokémon
      console.log("Points limit exceeded, can't add more Pokémon");
    }
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

    // Check if points limit is exceeded
    if (totalPoints > 8) {
        totalPointsElement.classList.add("text-danger");
        totalPointsElement.textContent += " (limit exceeded)";
    } else {
        totalPointsElement.classList.remove("text-danger");
    }
}


populateDatalist(); 