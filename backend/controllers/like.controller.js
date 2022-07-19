const Post = require('../models/post');

exports.likePost = (req, res) => {
    //* recherche le post que l'on veut liké
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (!post) {
                return res.status(404).json({ message: "le post que vous voulez liké n'a pas été trouvé" })
            }

            //* si l'id de l'utilisateur est dans userLiked (déja liké)
            if (post.usersLiked.includes(req.auth.userId)) {
                Post.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { likes: -1 },
                        $pull: { usersLiked: req.auth.userId }
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
                        $push: { usersLiked: req.auth.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: "Vous avez bien liké le post" }))
                    .catch(err => res.status(400).json({ err }))
            }
        })
        .catch(err => res.status(400).json({ err }))
}