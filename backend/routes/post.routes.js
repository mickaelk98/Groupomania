const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controller');
const likeCtrl = require('../controllers/like.controller');
const commentCtrl = require('../controllers/comment.controller')
const multer = require('../config/multer.config');
const auth = require('../middleware/auth');



//* route pour créer un post
router.post('/', multer, postCtrl.createPost)

//* route pour recuperer tout les posts
router.get('/', postCtrl.getAllPosts)

//* route pour modifier un post
router.put('/:id', auth, multer, postCtrl.updatePost)

//* route pour supprimer un post
router.delete('/:id', auth, postCtrl.deletePost)

//* route pour like et unlike
router.post('/like/:id', auth, likeCtrl.likePost)

//* route pour mettre un commentaire
router.post('/comment/:id', commentCtrl.createComment)

module.exports = router;