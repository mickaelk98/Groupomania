const Post = require('../models/post');

exports.createComment = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            //* si le post n'a pas été trouvé
            if (!post) {
                return res.status(404).json({ message: "Le post que vous voulez commenter n'a paas été trouvé" })
            }
            console.log(post);
            Post.updateOne(
                { _id: req.params.id },
                {
                    $push: {
                        comments: {
                            commenterId: req.body.commenterId,
                            commenterFirstName: req.body.commenterFirstName,
                            commenterLastName: req.body.commenterLastName,
                            commenterImage: req.body.commenterImage,
                            text: req.body.text,
                            timestamp: new Date().getTime()
                        }
                    }
                }
            )
                .then(() => res.status(201).json({ message: "Votre commentaire a été ajouté au post" }))
                .catch(err => res.status(400).json({ err }))
        })
        .catch(err => res.status(400).json({ err }))
}