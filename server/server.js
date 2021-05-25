const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});
// pg configuration -- LOCAL ONLY
const Pool = pg.Pool;
const pool = new Pool({
    database: 'jazzy_sql',
    host: 'Localhost',
    port: 5432,
})

// check to see connection
pool.on('connect', () =>{
    console.log('CONNECTED TO POSTGRES');
});
// checking if there are errors
pool.on('error', (error) => {
    console.log(error);
});

// Make POST and GET route for 'artist'

app.get('/artist', (req, res) => {
    //connect the route from /artist to SQL database
    const queryText = `SELECT * FROM "artist" ORDER BY "birthdate" DESC;`
    pool.query(queryText)
    .then( (artistList) =>{
        console.log('lists of artist', artistList.rows);
        res.send(artistList.rows);
    }).catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    })
})



// Make POST and GET route for 'song'

app.get('/artist', (req, res) => {
    console.log(`In /songs GET`);
    res.send(artistList);
});

app.post('/artist', (req, res) => {
    artistList.push(req.body);
    res.sendStatus(201);
});

app.get('/song', (req, res) => {
    console.log(`In /songs GET`);
    res.send(songList);
});

app.post('/song', (req, res) => {
    songList.push(req.body);
    res.sendStatus(201);
});


