// ==========================================
// 1. ARRAYS (Lister med sange/albums)
// ==========================================
let userSelectedGenres = [];

let rockSongs = [
    "AC/DC - For Those About To Rock We Salute You",
    "Nirvana - Nevermind",
    "Queen - Greatest Hits I",
    "Metallica - Black Album",
    "Green Day - American Idiot",
    "Guns N' Roses - Appetite for Destruction",
    "Led Zeppelin - IV",
    "Red Hot Chili Peppers - Californication"
];

let rapSongs = [
    "House of Pain - House of Pain",
    "Body Count - Body Count",
    "Eminem - Lose Yourself (Eksempel)",
    "Drake - God's Plan (Eksempel)"
];

let popSongs = [
    "Amy Winehouse - Back to Black",
    "Amy Winehouse - Frank",
    "U2 - Pop",
    "Alanis Morissette - Jagged Little Pill",
    "Marvin Gaye - Seek And Shall Find",
    "Jamiroquai - Emergency On Planet Earth",
    "Santana - Supernatural",
    "The Police - Greatest Hits"
];

let customSongs = [];


// ==========================================
// 2. VIS SANGENE MED DET SAMME NÅR SIDEN ÅBNER
// ==========================================
window.onload = function() {
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
function showSongsOnScreen(htmlElementId, songArray) {
    let listElement = document.getElementById(htmlElementId);
    listElement.innerHTML = "";

    for (let i = 0; i < songArray.length; i++) {
        listElement.innerHTML += "<li>" + songArray[i] + "</li>";
    }
}


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