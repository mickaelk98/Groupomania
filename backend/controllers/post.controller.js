const Post = require('../models/post');
const fs = require('fs')


//* verifie si l'utilisateur est administrateur
const isAdmin = (email, status) => {
    if (email === process.env.ADMIN_USERNAME || status) {
        return true
    } else {
        return false
    }
}

//* controller pour créer un post
exports.createPost = (req, res) => {
    console.log(req.body.text, req.file);
    //* verifie si la post contient une image ou un text
    if (req.body.text === 'undefined' && !req.file) {
        return res.status(400).json({ error: 'Pour créer un post vous devez envoyer un message ou une image' })
    }

    //* verifi si le post contient une image ou non
    const postObject = req.file ?
        {
            ...req.body,
            posterId: req.auth.userId,
            posterFirstname: req.auth.userFirstName,
            posterLastname: req.auth.userLastName,
            posterImage: req.auth.userImage,
            likes: 0,
            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        } :
        {
            ...req.body,
            posterId: req.auth.userId,
            posterFirstname: req.auth.userFirstName,
            posterLastname: req.auth.userLastName,
            posterImage: req.auth.userImage,
            likes: 0
        }

    const post = new Post(postObject)
    post.save()
        .then(newPost => {
            res.status(201).json(newPost)
        })
        .catch(err => res.status(400).json({ err }))
}


//* controller pour recuperer tout les post
exports.getAllPosts = (req, res) => {
    Post.find().sort({ createdAt: -1 })
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
                const admin = isAdmin(req.auth.userEmail, req.auth.userStatus);
                if (post.posterId !== req.auth.userId && admin === false) {
                    return res.status(401).json({ message: 'Requete non autorisé' })
                } else {

                    //* verifi si le post contient une image ou non
                    const postObject = req.file ?
                        {
                            ...req.body,
                            posterId: req.auth.userId,
                            posterFirstname: req.auth.userFirstName,
                            posterLastname: req.auth.userLastName,
                            posterImage: req.auth.userImage,
                            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                        } :
                        {
                            ...req.body,
                            posterId: req.auth.userId,
                            posterFirstname: req.auth.userFirstName,
                            posterLastname: req.auth.userLastName,
                            posterImage: req.auth.userImage,
                        }
                    Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Le post a été modifié' }))
                        .catch(err => res.status(400).json({ err }))
                }
            })
            .catch(err => res.status(500).json({ message: "le post n'a pas pu etre modifié", err }))
    }

}

//* controller pour supprimer un post
exports.deletePost = (req, res) => {

    //* on cherche le post
    Post.findOne({ _id: req.params.id })
        .then(post => {
            //* si le post n'existe pas
            if (!post) {
                return res.status(404).json({ message: "Le post n'a pas été trouvé" })
            }
            //* si celui qui fait la requete n'est pas celui qui la crée ou admin
            const admin = isAdmin(req.auth.userEmail, req.auth.userStatus);
            if (post.posterId !== req.auth.userId && admin === false) {
                return res.status(401).json({ message: 'Requete non autorisé' })
            } else {

                //* si le post avait une image
                if (req.file) {

                    //* recupere l'image du post
                    const filename = post.image.split('/images/')[1]

                    //* supprime l'image et le post
                    fs.unlink(`images/${filename}`, () => {
                        Post.deleteOne({ _id: req.params.id })
                            .then(() => res.status(200).json({ message: "Le post a été supprimer" }))
                            .catch(err => res.status(400).json({ err }))
                    })
                }
                //* sinon suprime juste le post 
                else {
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: "Le post a été supprimer" }))
                        .catch(err => res.status(400).json({ err }))
                }
            }
        })
        .catch(err => res.status(400).json({ message: "le post n'a pas pu etre supprimé", err }))
}