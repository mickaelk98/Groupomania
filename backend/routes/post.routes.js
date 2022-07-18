const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controller');
const multer = require('../config/multer.config');
const postAuth = require('../middleware/postAuth');



//* route pour créer un post
router.post('/', multer, postCtrl.createPost)

//* route pour recuperer tout les posts
router.get('/', postCtrl.getAllPosts)

//* route pour modifier un post
router.put('/:id', postAuth, multer, postCtrl.updatePost)

//* route pour supprimer un post
router.delete('/:id', postAuth, postCtrl.deletePost)

module.exports = router;