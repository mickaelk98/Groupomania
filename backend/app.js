require('dotenv').config()
const express = require('express');
const morgan = require('morgan')
require('./config/db.config')


const app = express();

//* affiche les requete envoyer au serveurdans la console
app.use(morgan('dev'));

//* traite les requetes envoyer au serveur
app.use((req, res) => {
    res.send('Requete recu par le serveur');
});

module.exports = app;