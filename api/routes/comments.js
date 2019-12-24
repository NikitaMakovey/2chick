const express = require('express');
const router = express.Router();

const CommentController = require('../../app/controllers/CommentController');

router.get('/', CommentController.getComments);
router.post('/', CommentController.createComment);
router.get('/:id', CommentController.getComment);
router.put('/:id', CommentController.updateComment);
router.delete('/:id', CommentController.deleteComment);

module.exports = router;