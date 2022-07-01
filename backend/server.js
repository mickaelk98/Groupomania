const http = require('http');
const app = require('./app');

const port = 3000;

//* Ecoute du serveur express
app.set('port', process.env.PORT || port)

//* Creation du serveur
const server = http.createServer(app);

//* Ecoute des requete sur le port 
server.listen(process.env.PORT || port, () => {
    console.log("Serveur lancé sur le port: " + port);
});