const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fs = require('fs');


//* formatage des erreurs
const handleErrors = (err) => {
    let errors = { firstName: '', lastName: '', email: '', password: '' };

    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}


//* controller d'incription
exports.signup = (req, res) => {

    //* verifie si l'identifiant et le mot de passe sont ceux de l'administrateur
    let userStatus = "";
    if (req.body.email === process.env.ADMIN_USERNAME && req.body.password === process.env.ADMIN_PASSWORD) {
        userStatus = true
    } else {
        userStatus = false
    }

    //* cryptage du mot de passe
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            //* creation d'un nouveau utilisateur avec le MDP hashé
            const user = new User({
                ...req.body,
                password: hash,
                //* ajout d'une image et d'un status par default
                image: `${req.protocol}://${req.get('host')}/images/default.jpg`,
                isAdmin: userStatus,
                description: ""
            });
            //* enregistrement du nouveau utilisateur dans la base de donnée
            user.save()
                .then(() => res.status(201).json({ message: 'Votre compte a été créé' }))
                .catch((err) => {
                    const errors = handleErrors(err)
                    res.status(400).json({ errors })
                })
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
                return res.status(401).json({ email: "Cet utilisateur n'existe pas" })
            } else {
                //* commpare le MDP de la requete et celui dans mongoDB
                bcrypt.compare(req.body.password, user.password)
                    .then(validPassword => {
                        //* si le mot de passe est incorect
                        if (!validPassword) {
                            return res.status(401).json({ password: 'Mot de passe incorect' })
                        }
                        //* sinon
                        else {
                            console.log(user._id);
                            res.status(200).json({

                                user: {
                                    _id: user._id,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    email: user.email,
                                    image: user.image,
                                    description: user.description,
                                    isAdmin: user.isAdmin,
                                    createdAt: user.createdAt
                                }
                                ,
                                token: jwt.sign(
                                    {
                                        userId: user._id,
                                        userStatus: user.isAdmin,
                                        userFirstName: user.firstName,
                                        userLastName: user.lastName,
                                        userEmail: user.email,
                                        userImage: user.image
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
    User.findOne({ _id: req.params.id }, 'firstName lastName email description image isAdmin createdAt updatedAt')
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json({ err }))
}

//* controller pour supprimer un utilisateur
exports.deleteUser = (req, res) => {
    //* si celui qui fait la requete n'a pas crée le profil
    if (req.params.id !== req.auth.userId) {
        return res.status(401).json({ message: 'Requete non autorisé' })
    }

    //* on cherche l'utilisateur que l'on veut supprimer
    User.findOne({ _id: req.params.id })
        .then(user => {
            //* si l'utilisateur n'xiste pas
            if (!user) {
                return res.status(400).json({ message: "L'utilisateur n'existe pas" })
            }
            //* sinon
            else {
                const filename = user.image.split('/images/')[1]

                console.log(filename);
                //* si l'image du profil est celle par defaut
                if (filename === 'default.jpg') {
                    User.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: "Utilisateur supprimé" }))
                        .catch(err => res.status(400).json({ err }))
                }
                //* sinon 
                else {
                    //* supprime l'image du profil et l'utilisateur
                    fs.unlink(`images/${filename}`, () => {
                        User.deleteOne({ _id: req.params.id })
                            .then(() => res.status(200).json({ message: "Utilisateur supprimé" }))
                            .catch(err => res.status(400).json({ err }))
                    })
                }
            }
        })
        .catch(err => res.status(400).json({ err }));
}

//* controller pour modifier le profil d'un utilisateur
exports.updateProfil = (req, res) => {

    //* verifie si la requete n'est pas vide
    if (req.body.firstName === "undefined" && req.body.lastName === "undefined" && req.body.email === "undefined" && req.body.password === "undefined" && req.body.description === "undefined" && !req.file) {
        return res.status(400).json({ error: "Vous devez remplir l'un des champ pour modifier le profil" })
    }

    //* si celui qui fait la requete n'a pas crée le profil
    if (req.params.id !== req.auth.userId) {
        return res.status(401).json({ error: 'Requete non autorisé' })
    }
    // console.log(req.body.password);
    if (req.body.email !== 'undefined') {
        console.log("mail");
    } else {
        console.log("pas de mail");
    }
    User.findOne({ _id: req.params.id }, 'firstName lastName email description image isAdmin createdAt')
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "l'utilisateur demandé n'a pas été trouvé" })
            }
            else {
                const userObject = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    description: req.body.description
                }
                //* si il y a une image
                if (req.file) {
                    userObject.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                }
                //* si il y a une email
                if (req.body.email !== user.email) {
                    userObject.email = req.body.email
                }
                //* si la modification comporte un mot de passe
                if (req.body.password) {

                    bcrypt.hash(req.body.password, 10)
                        .then(hash => {
                            userObject.password = hash
                            User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
                                .then(() => {
                                    return User.findOne({ _id: req.params.id }, 'firstName lastName email description image isAdmin createdAt')
                                        .then(user => res.status(201).json(user))
                                })
                                .catch(err => res.status(400).json({ err }))
                        })
                        .catch(err => res.status(400).json({ message: "echec lors du cryptage du mot de passe", err }))
                }
                //* si la modification ne comporte pas de mot de passe 
                else {
                    User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
                        .then(() => {
                            return User.findOne({ _id: req.params.id }, 'firstName lastName email description image isAdmin createdAt')
                                .then(user => res.status(201).json(user))
                        })
                        .catch(err => res.status(400).json({ err }))
                }
            }
        })
        .catch(err => res.status(400).json({ err }))
}