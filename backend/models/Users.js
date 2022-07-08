const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Vous devez rentrer un prenom"],
        maxlength: [50, "Ce champ doit faire moin de 50 caractere"]
    },
    lastName: {
        type: String,
        required: [true, "Vous devez rentrez un nom"],
        maxlength: [50, "Ce champ doit faire moin de 50 caractere"]
    },
    email: {
        type: String,
        required: [true, "Vous devez rentrer une adresse email"],
        unique: [true],
        validate: [isEmail, "L'adresse que vous avez rentrez ne correspond pas a un format d'email"]
    },
    password: {
        type: String,
        required: [true, "Vous devez rentrez un mot de passe"],
        minlength: [8, "Votre mot de passe doit faire au moin 8 caractères"]
    },
    description: {
        type: String,
        maxlength: [1000, "Votre description ne doit pas depasser 1000 caractères"]
    },
    image: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
},
    {
        timestamps: true,
    })

userSchema.plugin(uniqueValidator, { message: "Cette email est déja" });

module.exports = mongoose.model('User', userSchema);