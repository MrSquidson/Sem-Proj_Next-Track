# NextTrack
*NextTrack is an imaginary project that through a stroke of luck sits on 93% of the market of 16-23yr/o's that listen to music. 
The project as it's name implies- picks "the next track" for a queue of music*


## Installation / Setup

1. Make a `.env` file that contains the following secrets to your remote NeonDB SQL server;
   ```
   PG_HOST=
   PG_PORT=5432
   PG_DATABASE=
   PG_USER=neondb_owner 
   PG_PASSWORD=
   ```
2. run `npm install` to install dependancies. 
3. Run `npm run qs` this runs the createDb.js file with node, and starts the server.js with nodemon.
4. Open the server in your browser on https://localhost:3002 or https://127.0.0.1:3002 

