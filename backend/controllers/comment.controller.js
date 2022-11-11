const Post = require('../models/post');

exports.createComment = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            //* si le post n'a pas été trouvé
            if (!post) {
                return res.status(404).json({ message: "Le post que vous voulez commenter n'a paas été trouvé" })
            }
            Post.updateOne(
                { _id: req.params.id },
                {
                    $push: {
                        comments: {
                            ...req.body,
                            timestamp: new Date().getTime()
                        }
                    }
                }
            )
                .then(() => {
                    return Post.findOne({ _id: req.params.id })
                        .then((post) => res.status(201).json(post))
                })
                .catch(err => res.status(400).json({ err }))
        })
        .catch(err => res.status(400).json({ err }))
}