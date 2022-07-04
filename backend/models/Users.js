const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxLenght: 50,
    },
    lastName: {
        type: String,
        required: true,
        maxLenght: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: isEmail,
    },
    password: {
        type: String,
        required: true,
        minLenght: 8
    },
    description: {
        type: String,
        maxLenght: 1000,
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
},
    {
        timestamps: true,
    })

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);