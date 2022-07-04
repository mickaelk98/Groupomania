const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [isEmail],
    },
    password: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        maxLength: 1000,
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

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);