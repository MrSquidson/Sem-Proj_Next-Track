
import express from 'express';
import { pool } from '../db/connect.js';

const db = pool();

const port = 3002;
const server = express();

// Gør frontend-filer tilgængelige og modtager JSON-data fra brugeren
server.use(express.static('frontend'));
server.use(express.json());
server.use(onEachRequest);
// server.get('/api/artists', onGetArtists);
server.get('/api/genre/:genre/playlist/:amount', onGetPlaylistByGenre);

async function onGetPlaylistByGenre(request, response) {
    // genre får let variable da vi gerne vil rette den hvis genren indeholder en / 
    let genre = request.params.genre;
    const amount = request.params.amount;
    
    if (genre == "Rap") {
        genre = "Hip Hop/Rap";
    }

    const songs = await db.query(`
        SELECT t.title, art.stage_name
        FROM tracks t
        JOIN albums alb on t.album_id = alb.album_id
        JOIN artists art on alb.artist_id = art.artist_id
        JOIN genres g on t.genre_id = g.genre_id
        WHERE g.name = '${genre}'
        LIMIT ${amount}
        `);
        response.json(songs)
}


// Logger når serveren er startet
function onServerReady() {
    console.log('Webserver running on port', port);
}

// Logger alle HTTP-forespørgsler til serveren
function onEachRequest(request, response, next) {
    console.log(new Date(), request.method, request.url);
    next();
}

// Starter Express-serveren
server.listen(port, onServerReady);
