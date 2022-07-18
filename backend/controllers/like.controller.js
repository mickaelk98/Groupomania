const Post = require('../models/post');

exports.likePost = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (!post) {
                return res.status(404).json({ message: "le post que vous voulez liké n'a pas été trouvé" })
            }

            //* si l'id de l'utilisateur est dans userLiked (déja liké)
            if (post.usersLiked.includes(req.body.userId)) {
                Post.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { likes: -1 },
                        $pull: { usersLiked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: "Vous avez enlevez votre like le post" }))
                    .catch(err => res.status(400).json({ err }))
            }
            //* sinon si l'utilisateur veut liké
            else {
                Post.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { likes: 1 },
                        $push: { usersLiked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: "Vous avez bien liké le post" }))
                    .catch(err => res.status(400).json({ err }))
            }
        })
        .catch(err => res.status(400).json({ err }))
}