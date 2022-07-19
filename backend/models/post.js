const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    posterId: {
        type: String,
        required: true
    },
    posterFirstname: {
        type: String,
        required: true
    },
    posterLastname: {
        type: String,
        required: true
    },
    posterImage: {
        type: String,
        required: true
    },
    text: {
        type: String,
        maxlenght: [500, "Votre post ne doit pas depasser les 500 caractères"]
    },
    image: {
        type: String
    },
    likes: {
        type: Number
    },
    usersLiked: {
        type: [String],
        required: true
    },
    comments: {
        type: [
            {
                commenterId: String,
                commenterFirstName: String,
                commenterLastName: String,
                commenterImage: String,
                text: String,
                timestamp: Number
            }
        ],
        required: true
    }
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Post', postSchema)