const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');


//* route pour s'inscrire
router.post('/signup', userCtrl.signup)

//* route pour se connecter
router.post('/login', userCtrl.login)

//* route pour recuperer le profil d'un utilisateur
router.get('/:id', userCtrl.getUserProfil)

module.exports = router;