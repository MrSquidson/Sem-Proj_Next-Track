// ==========================================
// 1. ARRAYS (Lister med sange/albums)
// ==========================================
let userSelectedGenres = [];

const rockSongs = [];
const popSongs = [];
const rapSongs = [];

async function loadPlaylists() {
    const rockSongsResponse = await fetch('/api/genre/Rock/playlist/10');
    const rapSongsResponse = await fetch('/api/genre/Rap/playlist/10');
    const popSongsResponse = await fetch('/api/genre/Pop/playlist/10');

    if (!rockSongsResponse.ok || !rapSongsResponse.ok || !popSongsResponse.ok){
        throw new Error(`One or more API requests failed! with status(s) Rock: ${rockSongsResponse.status}, Rap: ${rapSongsResponse.status}, Pop: ${popSongsResponse.status}`)
    }

    const rockSongsJson = await rockSongsResponse.json();
    const rapSongsJson = await rapSongsResponse.json();
    const popSongsJson = await popSongsResponse.json();

    rockSongsJson.rows.forEach(Element => {
        let songString = `${Element.title} - ${Element.stage_name}`;
        rockSongs.push(songString);
    });

    rapSongsJson.rows.forEach(Element => {
        let songString = `${Element.title} - ${Element.stage_name}`;
        rapSongs.push(songString);
    });

    popSongsJson.rows.forEach(Element => {
        let songString = `${Element.title} - ${Element.stage_name}`;
        popSongs.push(songString);
    });

    const rapplay123 = document.getElementById('rapListDisplay');

    rapSongs.forEach(Element => {
        let li = document.createElement('li');
        li.textContent = Element;
        rapplay123.appendChild(li);
        console.log(Element);
    });

    const rockplay123 = document.getElementById('rockListDisplay');

    rockSongs.forEach(Element => {
        let li = document.createElement('li');
        li.textContent = Element;
        rockplay123.appendChild(li);
        console.log(Element);
    });

    const popplay123 = document.getElementById('popListDisplay');

    popSongs.forEach(Element => {
        let li = document.createElement('li');
        li.textContent = Element;
        popplay123.appendChild(li);
        console.log(Element);
    });

    
}


let customSongs = [];


// ==========================================
// 2. VIS SANGENE MED DET SAMME NÅR SIDEN ÅBNER
// ==========================================
window.onload = async function() {
    await loadPlaylists();
    console.log(rockSongs)
    showSongsOnScreen("rockListDisplay", rockSongs);
    showSongsOnScreen("rapListDisplay", rapSongs);
    showSongsOnScreen("popListDisplay", popSongs);
    showSongsOnScreen("customListDisplay", customSongs);
};


// ==========================================
// 3. GENRE-AFSTEMNING
// ==========================================
function toggleGenre(button, genreName) {
    let isChecked = button.classList.toggle('checked');

    if (isChecked) {
        userSelectedGenres.push(genreName);
    } else {
        let index = userSelectedGenres.indexOf(genreName);
        if (index > -1) {
            userSelectedGenres.splice(index, 1);
        }
    }
}


// ==========================================
// 4. TILFØJ SELV SANGE
// ==========================================
function addSong() {
    let songInput = document.getElementById('songInput');
    let listSelect = document.getElementById('listSelect');

    let songTitle = songInput.value;
    let chosenList = listSelect.value;

    if (songTitle === "") {
        alert("Hov! Du skal skrive navnet på en sang først.");
        return;
    }

    if (chosenList === "rock") {
        rockSongs.push(songTitle);
        showSongsOnScreen("rockListDisplay", rockSongs);
    } 
    else if (chosenList === "rap") {
        rapSongs.push(songTitle);
        showSongsOnScreen("rapListDisplay", rapSongs);
    } 
    else if (chosenList === "pop") {
        popSongs.push(songTitle);
        showSongsOnScreen("popListDisplay", popSongs);
    } 
    else if (chosenList === "custom") {
        customSongs.push(songTitle);
        showSongsOnScreen("customListDisplay", customSongs);
    }

    songInput.value = "";
}


// ==========================================
// 5. HJÆLPEFUNKTION: TEGN LISTERNE PÅ SKÆRMEN
// ==========================================
/*
function showSongsOnScreen(htmlElementId, songArray) {
    let listElement = document.getElementById(htmlElementId);
    listElement.innerHTML = "";

    for (let i = 0; i < songArray.length; i++) {
        listElement.innerHTML += "<li>" + songArray[i].title + songArray[i].stage_name + "</li>";
    }
}
*/

// ==========================================
// 6. SØGEMASKINE
// ==========================================
function searchSongs() {
    let searchText = document.getElementById('searchInput').value.toLowerCase();
    let resultsList = document.getElementById('searchResultsDisplay');
    resultsList.innerHTML = "";

    if (searchText === "") {
        return;
    }

    let foundSongs = [];

    for (let i = 0; i < rockSongs.length; i++) {
        if (rockSongs[i].toLowerCase().includes(searchText)) {
            foundSongs.push(rockSongs[i] + " (Rock)");
        }
    }

    for (let i = 0; i < rapSongs.length; i++) {
        if (rapSongs[i].toLowerCase().includes(searchText)) {
            foundSongs.push(rapSongs[i] + " (Rap)");
        }
    }

    for (let i = 0; i < popSongs.length; i++) {
        if (popSongs[i].toLowerCase().includes(searchText)) {
            foundSongs.push(popSongs[i] + " (Pop)");
        }
    }

    for (let i = 0; i < customSongs.length; i++) {
        if (customSongs[i].toLowerCase().includes(searchText)) {
            foundSongs.push(customSongs[i] + " (Egen Liste)");
        }
    }

    if (foundSongs.length === 0) {
        resultsList.innerHTML = "<li>Ingen sange fundet...</li>";
    } else {
        for (let i = 0; i < foundSongs.length; i++) {
            resultsList.innerHTML += "<li>" + foundSongs[i] + "</li>";
        }
    }
}

