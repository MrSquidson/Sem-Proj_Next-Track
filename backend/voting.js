
import { existsSync, readFileSync, writeFileSync } from "node:fs";

// Filen hvor vi gemmer stemmerne
const fil = new URL("./voting-data.json", import.meta.url);

// Standardværdier når vi starter en ny afstemning
let gemtData = {
  stemmer: [],
  afsluttet: false,
  vinder: null
};

// Henter tidligere stemmer, hvis filen findes
if (existsSync(fil)) {
  gemtData = JSON.parse(readFileSync(fil, "utf8"));
}

// Opretter vores Map med eventuelle gemte stemmer
const stemmer = new Map(gemtData.stemmer);

let afsluttet = gemtData.afsluttet;
let vinder = gemtData.vinder;

// Funktion 1: Gem stemmer

function gemStemmer() {
    //Gemmer stemmer og afstemningens status i JSON-filen
    const data = {
        stemmer: [...stemmer],
        afsluttet: afsluttet,
        vinder: vinder
    };

    writeFileSync(fil, JSON.stringify(data, null, 2));
}

// Funktion 2: Registrer en stemme

function stem(brugerId, playlistId) {
    // Man må ikke stemme efter afstemningen er afsluttet
    if (afsluttet) {
        console.log("Afstemningen er afsluttet.");
        return;
    }

    //Gemmer eller ændrer brugerens aktive stemme
    stemmer.set(brugerId, playlistId);

    //Gemmer stemmen i JSON-flen
    gemStemmer();
}

// Funktion 3: Optælling af stemmer

    function optaelStemmer() {
        const resultat = {};

        //Gennemgår alle aktive stemmer
        for(const playlist of stemmer.values()) {
            //Lægger 1 til playlistens stemmetal
            resultat[playlist] = (resultat[playlist] || 0) + 1;
        }

        return resultat;
    }


// Funktion 4: Find vinder
function findVinder() {
    const resultat = optaelStemmer();

    let flestStemmer = 0;
    let vindere = [];

    //Finder højeste stemmetal
    for (const playlist in resultat) {
        if (resultat[playlist] > flestStemmer) {
            flestStemmer = resultat[playlist];
            vindere = [playlist];
        }   else if (resultat[playlist] === flestStemmer) {
            //Tilføjer playlister med lige mange stemmer
            vindere.push(playlist);
        }
    }

    //Ingen entydig vinder ved 0 stemmer eller uafgjort
    if (vindere.length !== 1) {
        return null;
    }
    return vindere[0];
}

// Funktion 5: Afslut afstemningen

function afslutAfstemning() {
    if (afsluttet) {
        console.log("Afstemningen er allerede afsluttet.");
        return;
}

const resultat = optaelStemmer();

if (Object.keys(resultat).length === 0) {
    console.log("Ingen stemmer endnu.");
    return;
}

const muligVinder = findVinder();

//Ved stemmelighed forbliver afstemningen åben
if (muligVinder === null) {
    console.log("Uafgjort! Afstemningen fortsætter.");
    return;
}

//Gemmer vinderen og lukker afstemningen
vinder = muligVinder;
afsluttet = true;
gemStemmer();

console.log("Vinderen er:", vinder);
}

//TEST: Fire brugere stemmer:
stem(1, "Rock");
stem(2, "Rap");
stem(3, "Pop");
stem(4, "Pop");

console.log("Stemmer:", optaelStemmer());
console.log("Foreløbig vinder:", findVinder())

//Fjern // nedenunder, når du vil afslutte afstemningen
afslutAfstemning();