
const leagueData = {
    "master": {
        "scizor (mega)": 6, "salamence (mega)": 6,
        "dialga": 4, "groudon": 4, "meloetta": 4, "mewtwo": 4, "solgaleo": 4, "steelix (mega)": 4, "xerneas": 4, "zacian": 4,
        "aggron (mega)": 3, "blastoise (mega)": 3, "giratina (altered)": 3, "giratina (origin)": 3,
        "charizard (mega x)": 2, "dragonite": 2, "landorus (therian)": 2, "lugia": 2, "melmetal": 2, "palkia": 2, "reshiram": 2, "slowbro (mega)": 2, "yveltal": 2, "zarude": 2, "zekrom": 2,
        "abomasnow (mega)": 1, "blaziken (mega)": 1, "florges": 1, "genesect": 1, "heatran": 1, "kyurem": 1, "mew": 1, "rayquaza": 1
    },
    "great": {
        "annihilape": 7, "azumarill": 7, "carbink": 7, "gligar": 7, "lanturn": 7, "lickitung": 7, "medicham": 7, "registeel": 7, "skarmory": 7,
        "bastiodon": 5, "deoxys (defense)": 5, "dewgong": 5, "mandibuzz": 5, "ninetales (alolan)": 5, "poliwrath": 5, "sableye": 5, "sandslash (alolan)": 5, "serperior": 5, "swampert": 5, "talonflame": 5, "toxapex": 5, "umbreon": 5, "vigoroth": 5, "whiscash": 5,
        "altaria": 2, "charizard": 2, "charjabug": 2, "clefable": 2, "clodsire": 2, "cresselia": 2, "diggersby": 2, "dragonite": 2, "dubwool": 2, "froslass": 2, "greedent": 2, "jellicent": 2, "mantine": 2, "pelipper": 2, "pidgeot": 2, "quagsire": 2, "steelix": 2, "stunfisk (galarian)": 2, "tapu fini": 2, "toxicroak": 2, "venusaur": 2, "wigglytuff": 2
        // Note: Untiered Pokémon would be any not listed, with a default point value of 1 when calculating.
    }
};

let currentLeague = 'great'; // Default league
let totalPoints = 0;
let team = new Set();
let pointsLimit = { "master": 8, "great": 17 };

function populateDatalist(league) {
    const dataList = document.getElementById("pokemonList");
    dataList.innerHTML = ''; 

    fetch('pokemon_names.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(pokemon => {
                let option = document.createElement("option");
                option.value = pokemon;
                dataList.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching Pokémon data:', error));
}

function formatPokemonId(pokemonId) {
    // Replace underscores with spaces and capitalize the first letter of each word
    return pokemonId
        .toLowerCase()
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
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
  document.getElementById("totalPoints").innerText = `Total Points: 0/${pointsLimit[league]}`;

  // Update the league title
  const leagueTitleElement = document.getElementById("leagueTitle");
  if(league === 'great') {
    leagueTitleElement.textContent = "Pokémon Great League Team Builder";
  } else if(league === 'master') {
    leagueTitleElement.textContent = "Pokémon Master League Team Builder";
  }

  document.body.className = league + '-league'; // Adjusts the body class based on the selected league
}

function addPokemon() {
    const pokemonInput = document.getElementById("pokemonInput");
    const pokemonName = pokemonInput.value.trim();
    const dataListOptions = Array.from(document.getElementById("pokemonList").options).map(option => option.value);
    
    if (/*team.has(pokemonName) || */isBanned(pokemonName, currentLeague)) {
        showToast(`${pokemonName} is banned.`);
        pokemonInput.value = ''; // Clear the input field
        return;
    }

    else if (team.has(pokemonName)) {
        showToast(`${pokemonName} is already in.`);
        pokemonInput.value = ''; // Clear the input field
        return;
    }

    else if (pokemonName == "") {
        showToast(`No Pokemon entered.`);
        pokemonInput.value = ''; // Clear the input field
        return;
    }

    else if (!dataListOptions.map(option => option.toLowerCase()).includes(pokemonName.toLowerCase())) {
        showToast(`${pokemonName} is not a valid selection.`);
        pokemonInput.value = ''; // Clear the input field
        return;
    }

    // Determine points for untiered Pokémon based on the league
    let pokemonPoints;
    if (pokemonName.toLowerCase() in leagueData[currentLeague]) {
        pokemonPoints = leagueData[currentLeague][pokemonName.toLowerCase()];
    } else {
        pokemonPoints = currentLeague === 'great' ? 1 : 0;
    }

    // Add Pokémon points to total regardless of limit
    totalPoints += pokemonPoints;
    updateTeamList(pokemonName, pokemonPoints);
    updateTotalPoints();

    team.add(pokemonName); // Add to the set to track the added Pokémon
    pokemonInput.value = ''; // Clear the input field
}

function isBanned(pokemonName, currentLeague) {
    const banned = ["charizard (mega y)", "garchomp (mega)", "gardevoir (mega)", "gengar (mega)", "gyarados (mega)", "primal groudon", "primal kyogre", "latias (mega)", "latios (mega)", "rayquaza (mega)", "swampert (mega)", "tyranitar (mega)", "zygarde (complete)"];
    return currentLeague == "master" && banned.includes(pokemonName.toLowerCase());
}
function updateTeamList(pokemonName, pokemonPoints) {
    const teamList = document.getElementById("teamList");
    const listItem = document.createElement("li");
    //listItem.classList.add("list-group-item"); // Bootstrap class to style list items

    listItem.textContent = `${pokemonName} (${pokemonPoints} points) `;
    
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
    if (totalPoints > pointsLimit[currentLeague]) {
        totalPointsElement.innerHTML = `Total Points: ${totalPoints}/${pointsLimit[currentLeague]} - Limit Exceeded!`;
        totalPointsElement.classList.add("total-points-warning");
    } else {
        totalPointsElement.innerHTML = `Total Points: ${totalPoints}/${pointsLimit[currentLeague]}`;
        totalPointsElement.classList.remove("total-points-warning");
    }
}


function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.classList.add('toast-message');
    toast.textContent = message;

    container.appendChild(toast);

    // Automatically remove the toast after animation
    toast.addEventListener('animationend', () => {
        toast.remove();
    });
}

switchLeague(currentLeague);