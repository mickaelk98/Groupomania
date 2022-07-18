const Post = require('../models/post');


//* formatage des erreurs
// const handleErrors = (err) => {
//     let errors = { posterId: '' };

//     if (err.message.includes('User validation failed')) {
//         Object.values(err.errors).forEach(({ properties }) => {
//             errors[properties.path] = properties.message;
//         })
//     }
//     return errors;
// }


//* controller pour créer un post
exports.createPost = (req, res) => {

    //* verifie si la post contient une image ou un text
    if (!req.body.text && !req.file) {
        return res.status(400).json({ message: 'Pour créer un post vous devez envoyer un message ou une image pour créer un post' })
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


