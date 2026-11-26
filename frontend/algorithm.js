// Historik over valgte sange i afspilningsrunden
let playedSongs = [];

// Funktion til at vælge næste sang
function nextTrack(playlist, playedSongs) {

    // Filtrerer allerede valgte sange fra
    const pool = playlist.filter(song =>
        !playedSongs.includes(song.id)
    );

    // Stopper, hvis der ikke er flere sange tilbage
    if (pool.length === 0) {
        return null;
    }

    // Genererer et tilfældigt indeks
    const index = Math.floor(Math.random() * pool.length);

    // Vælger en sang fra puljen
    const nextSong = pool[index];

    // Gemmer sangens ID i historikken
    playedSongs.push(nextSong.id);

    // Returnerer den næste sang
    return nextSong;
}