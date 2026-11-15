import { connect } from './connect.js';
import upload from 'pg-upload';

const db = await connect();
const timestamp = (await db.query('select now() as timestamp')).rows[0]['timestamp'];
console.log(`Recreating database on ${timestamp}...`);

await db.query('drop table if exists artists');
await db.query('drop table if exists albums');
await db.query('drop table if exists genres');
await db.query('drop table if exists playlists');
await db.query('drop table if exists tracks');
await db.query('drop table if exists playlist_track');


// Insert tables in the remote database
/*

await db.query(`
    insert into actors (actor_id,stage_name,nationality,sex)
    values (1,foobar,DA,M)
`);
console.log(`Inserted table actors`);
*/

await db.query(`
    create table artists (
        artist_id           integer primary key,
        stage_name          text,
        nationality         char(2)
    )
`);


await db.query(`
    create table albums (
        album_id            integer primary key,
        title               Text,
        artist_id           integer,
        release_date        date,
        riaa_certificate    text
    )
`);

await db.query(`
    create table genres (
        name                text,
        genre_id            integer primary key,
        description         text
    )
`);

await db.query(`
    create table playlists (
        playlist_id         bigint primary key,
        created             timestamp,
        user_id             bigint,
        name                text
    )
`);

await db.query(`
    create table tracks (
        track_id        integer primary key,
        title           text,
        album_id        integer,
        media_type_id   integer,
        genre_id        integer,
        milliseconds    integer,
        bytes           bigint,
        unit_price      numeric(10, 2)
    ) 
`);

await db.query(`
    create table playlist_track (
        playlist_id         bigint,
        track_id            integer
    )
`);


// Upload data from CSV files into the tables on remote
/*
await upload(db, 'db/actors.csv', `
copy actors (actor_id, stage_name, nationality, sex)
from stdin
with csv encoding 'UTF-8'
`);
console.log(`Uploaded to table actors`);
*/
await upload(db, 'db/artists.csv', `
copy artists (artist_id, stage_name, nationality)
from stdin
with csv encoding 'UTF-8'
`);
console.log(`Uploaded to table artists`);


await upload(db, 'db/albums.csv', `
copy albums (album_id, title, artist_id, release_date, riaa_certificate)
from stdin
with csv header encoding 'UTF-8'
`);
console.log(`Uploaded to table albums`);


await upload(db, 'db/genres.csv', `
copy genres (name, genre_id, description)
from stdin
with csv header encoding 'UTF-8'
`);
console.log(`Uploaded to table genres`);


await upload(db, 'db/playlists.csv', `
copy playlists (playlist_id, created, user_id, name)
from stdin
with csv header encoding 'UTF-8'
`);
console.log(`Uploaded to table playlists`);


await upload(db, 'db/tracks.csv', `
copy tracks (track_id, title, album_id, media_type_id, genre_id, milliseconds, bytes, unit_price)
from stdin
with csv header encoding 'UTF-8'
`);
console.log(`Uploaded to table tracks`);


await upload(db, 'db/playlist_track.csv', `
copy playlist_track (playlist_id, track_id)
from stdin
with csv header encoding 'UTF-8'
`);
console.log(`Uploaded to table playlist_track`);


await db.end();
console.log('Database successfully recreated.');