const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


//* controller d'incription
exports.signup = (req, res) => {
    //* cryptage du mot de passe
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            //* creation d'un nouveau utilisateur avec le MDP hashé
            const user = new User({
                ...req.body,
                password: hash,
                //* ajout d'une image et d'un status par default
                image: `${req.protocol}://${req.get('host')}/images/default.jpg`,
                isAdmin: false
            });
            //* enregistrement du nouveau utilisateur dans la base de donnée
            user.save()
                .then(() => res.status(201).json({ message: 'Votre compte a été créé' }))
                .catch(err => res.status(400).json({ err }))
        })
        .catch(err => res.status(500).json({ err }));
}


//* controller de connexion
exports.login = (req, res) => {
    //* recherche si le mail est dans la base de donnée
    User.findOne({ email: req.body.email })
        //* si la requete s'est bien passée
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: "Cet utilisateur n'existe pas" })
            } else {
                //* commpare le MDP de la requete et celui dans mongoDB
                bcrypt.compare(req.body.password, user.password)
                    .then(validPassword => {
                        //* si le mot de passe est incorect
                        if (!validPassword) {
                            return res.status(401).json({ message: 'Mot de passe incorect' })
                        }
                        //* sinon
                        else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    {
                                        userId: user._id,
                                        userStatus: user.isAdmin
                                    },
                                    `${process.env.JWT_SECRET_KEY}`,
                                    { expiresIn: '24h' }
                                )
                            })
                        }
                    })
                    .catch(err => res.status(500).json({ err }))
            }
        })
        //* si la requete s'est mal passé
        .catch(err => res.status(500).json({ err }));
}

//* controller pour recuperer les information d'un utilisateur
exports.getUserProfil = (req, res) => {
    User.findOne({ _id: req.params.id }, 'firstName lastName email image isAdmin createdAt updatedAt')
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json({ err }))
}