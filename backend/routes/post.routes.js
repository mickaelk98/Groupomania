const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controller');
const multer = require('../config/multer.config');
const auth = require('../middleware/auth')



//* route pour créer un post
router.post('/', multer, postCtrl.createPost)

//* route pour recuperer tout les posts
router.get('/', postCtrl.getAllPosts)

//* route pour modifier un post
router.put('/:id', auth, multer, postCtrl.updatePost)

module.exports = router;