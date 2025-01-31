const serverIP = "http://167.99.130.136";

function updateTeamInputs() {
  const gamemode = document.getElementById("gamemode").value;
  const teamInputs = document.getElementById("teamInputs");
  teamInputs.innerHTML = "";
  let numTeams = parseInt(gamemode);
  for (let i = 1; i <= numTeams; i++) {
    let input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Name Team ${i}`;
    input.id = `team${i}`;
    teamInputs.appendChild(input);
    teamInputs.appendChild(document.createElement("br"));
  }
}

function generateMap() {
    const gridSize = document.getElementById("gridSize").value;
    const gamemode = document.getElementById("gamemode").value;
    const difficulty = document.getElementById("difficulty").value;
    let teamNames = [];

    for (let i = 1; i <= parseInt(gamemode); i++) {
        let teamName = document.getElementById(`team${i}`).value || `Team${i}`;
        teamNames.push(teamName);
    }
  
    const teamNamesString = teamNames.join(',');

    const apiUrl = `${serverIP}/create/`;

    const requestBody = {
        grid_size: parseInt(gridSize),
        game_mode: gamemode,
        team_names: teamNamesString,
        difficulty: difficulty,
    };

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log("Response received:", data);
        const responseContainer = document.getElementById("responseContainer");
        responseContainer.innerText = JSON.stringify(data, null, 2);
        responseContainer.style.display = "block";

        const img = document.getElementById("mapImage");
        img.src = `${serverIP}${data.mapURL}`;

        const imgContainer = document.getElementById("mapContainer");
        imgContainer.style.display = "block";
    })
    .catch((error) => console.error("Error fetching data:", error));
}
