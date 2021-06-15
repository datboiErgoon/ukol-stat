const path = require('path');
const http = require('http');
const express = require('express');
const fs = require('fs').promises;

async function readJSON(path) {
    const data = await fs.readFile(path)
    .catch(err => console.error('Chyba načtení souboru: ', err));
    return JSON.parse(data.toString());
}

const app = express();
const server = http.createServer(app);


app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/events', (req, res) => {
    readJSON('data/udalosti.json')
    .then(data => res.send(data))
    .catch(err => res.send('Chyba lávky', err));
});

app.get('/api/events/:index', (req, res) => {
    readJSON('public/historie/data/udalosti.json')
    .then(data => res.send(data[req.params.index]))
    .catch(err => res.send('Chyba lávky', err));
});

app.get('/api/town', (req, res) => {
    readJSON('public/mapa/data/js/towns.json')
    .then(data => res.send(data))
    .catch(err => res.send('Chyba lávky', err));
});

app.get('/api/park', (req, res) => {
    readJSON('public/mapa/data/js/parks.json')
    .then(data => res.send(data))
    .catch(err => res.send('Chyba lávky', err));
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));