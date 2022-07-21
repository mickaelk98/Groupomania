const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const auth = require('../middleware/auth')
const verifUserInput = require('../middleware/verifInput')
const multer = require('../config/multer.config')

//* route pour s'inscrire
router.post('/signup', verifUserInput, userCtrl.signup)

//* route pour se connecter
router.post('/login', userCtrl.login)

//* route pour recuperer le profil d'un utilisateur
router.get('/:id', auth, userCtrl.getUserProfil)

//* route pour supprimer un profil
router.delete('/:id', auth, userCtrl.deleteUser)

//* route pour modifier un profil
router.put('/:id', auth, multer, userCtrl.updateProfil)


module.exports = router;