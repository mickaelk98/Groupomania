const Post = require('../models/post');




//* controller pour créer un post
exports.createPost = (req, res) => {

    //* verifie si la post contient une image ou un text
    if (!req.body.text && !req.file) {
        return res.status(400).json({ message: 'Pour créer un post vous devez envoyer un message ou une image' })
    }

    //* verifi si le post contient une image ou non
    const postObject = req.file ?
        {
            ...req.body,
            likes: 0,
            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        } :
        {
            ...req.body,
            likes: 0
        }

    const post = new Post(postObject)
    post.save()
        .then(newPost => {
            res.status(201).json({ message: "post crée", newPost })
        })
        .catch(err => res.status(400).json({ err }))
}


//* controller pour recuperer tout les post
exports.getAllPosts = (req, res) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(400).json({ err }))
}

//* controller pour mettre a jour un post
exports.updatePost = (req, res) => {

    //* verifie si la post contient une image ou un text
    if (!req.body.text && !req.file) {
        return res.status(400).json({ message: 'Pour créer un post vous devez envoyer un message ou une image' })
    } else {
        //* on cherche le post
        Post.findOne({ _id: req.params.id })
            .then(post => {
                //* si le post n'existe pas
                if (!post) {
                    return res.status(404).json({ message: "Le post n'a pas été trouvé" })
                }
                //* si celui qui fait la requete n'est pas celui qui la crée ou admin
                if (post.posterId !== req.auth.userId && req.auth.status === false) {
                    return res.status(401).json({ message: 'Requete non autorisé' })
                } else {

                    //* verifi si le post contient une image ou non
                    const postObject = req.file ?
                        {
                            ...req.body,
                            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                        } :
                        {
                            ...req.body,
                        }
                    Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Le post a été modifié' }))
                        .catch(err => res.status(400).json({ err }))
                }
            })
            .catch()
    }

}