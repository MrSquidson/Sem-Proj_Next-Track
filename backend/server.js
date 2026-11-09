
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
