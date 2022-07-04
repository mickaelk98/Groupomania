const User = require('../models/Users');
const bcrypt = require('bcrypt');


//* controller d'incription
exports.signup = (req, res) => {
    //* cryptage du mot de passe
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            //* creation d'un nouveau utilisateur avec le MDP hashé
            const user = new User({
                ...req.body,
                password: hash
            })
            //* enregistrement du nouveau utilisateur dans la base de donnée
            user.save()
                .then(() => res.status(201).json({ message: 'Votre compte a été créé' }))
                .catch(err => res.status(400).json({ err }))
        })
        .catch(err => res.status(500).json({ err }))
}

