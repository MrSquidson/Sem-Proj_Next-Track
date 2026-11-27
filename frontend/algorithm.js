// Historik over valgte sange i afspilningsrunden
let playedSongs = [];

// Funktion til at vælge næste sang
function nextTrack(playlist, playedSongs) {

    // Filtrerer allerede valgte sange fra
    const filteredSongs = playlist.filter(song =>
        !playedSongs.includes(song.id)
    );

    // Stopper, hvis der ikke er flere sange tilbage
    if (filteredSongs.length === 0) {
        return null;
    }

    // Genererer et tilfældigt indeks
    const index = Math.floor(Math.random() * filteredSongs.length);

    // Vælger en sang fra puljen
    const nextSong = filteredSongs[index];

    // Gemmer sangens ID i historikken
    playedSongs.push(nextSong.id);

    // Begrænser historikken til de sidste 10 sange
    if (playedSongs.length > 10) {
        playedSongs.shift();
    }

    // Returnerer den næste sang
    return nextSong;
}