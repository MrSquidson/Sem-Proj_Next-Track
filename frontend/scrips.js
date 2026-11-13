// ==========================================
// 1. ARRAY (Datastruktur)
// HVAD ER DET?: Et array er en liste, der kan gemme flere værdier i én variabel.
// HVORFOR VALGT?: Vi bruger et array ('userSelectedGenres') til at huske, 
// hvilke genrer brugeren har stemt på, så vi kan sende dem videre til databasen eller backenden senere.
// ==========================================
let userSelectedGenres = [];


// ==========================================
// 2. FUNKTION (Genbrugelig koderblok)
// HVAD ER DET?: En funktion er en samling kode, der først kører, når den bliver aktiveret 
// (i dette tilfælde når brugeren klikker på en knap).
// ==========================================
function toggleGenre(button, genreName) {

    // ==========================================
    // 3. DOM MANIPULATION & KLASSER
    // Vi bruger '.toggle()'. Den tjekker: Hvis knappen IKKE har klassen 'checked', 
    // så sæt den på. Hvis den HAR den, så fjern den. Det skifter farven på knappen.
    // ==========================================
    let isChecked = button.classList.toggle('checked');

    // ==========================================
    // 4. BETINGELSE (if / else)
    // Vi tjekker om knappen er markeret eller ej, og gør to forskellige ting.
    // ==========================================
    if (isChecked) {
        // HVIS VALGT: Vi bruger metoden '.push()' til at tilføje genren til vores array.
        userSelectedGenres.push(genreName);
        console.log("Tilføjet til array:", genreName);

    } else {
        // HVIS FRAVALGT: Vi finder genrens plads (index) i arrayet...
        let index = userSelectedGenres.indexOf(genreName);
        
        // ...og hvis den findes (index er større end -1), fjerner vi den igen med '.splice()'.
        if (index > -1) {
            userSelectedGenres.splice(index, 1);
        }
        console.log("Fjernet fra array:", genreName);
    }

    // Vi udskriver hele arrayet i konsollen (Tryk F12 i browseren -> Console), 
    // så vi hele tiden kan bevise over for lærerne, at dataen bliver gemt korrekt!
    console.log("Aktuelle valgte genrer i array:", userSelectedGenres);
}