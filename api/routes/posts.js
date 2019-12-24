const express = require('express');
const router = express.Router();

const PostController = require('../../app/controllers/PostController');

router.get('/', PostController.getPosts);
router.post('/', PostController.createPost);
router.get('/:id', PostController.getPost);
router.put('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);
router.get('/:id/comments', PostController.getPostComments);

module.exports = router;