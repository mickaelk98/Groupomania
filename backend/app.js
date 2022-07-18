require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
require('./config/db.config');
const path = require('path')


const app = express();

//* declaration des routes
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//* affiche les requete envoyer au serveur dans la console
app.use(morgan('dev'));

//* intercepte les requete de type json
app.use(express.json());

//* permet de servir des images
app.use('/images', express.static(path.join(__dirname, 'images')));

//* traite les requetes envoyer au serveur
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;