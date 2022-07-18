const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controller');
const multer = require('../config/multer.config');



//* route pour créer un post
router.post('/', multer, postCtrl.createPost)

//* route pour recuperer tout les posts
router.get('/', postCtrl.getAllPosts)

module.exports = router;