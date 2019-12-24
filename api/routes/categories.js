const express = require('express');
const router = express.Router();

const CategoryController = require('../../app/controllers/CategoryController');

router.get('/', CategoryController.getCategories);
router.post('/', CategoryController.createCategory);
router.get('/:id', CategoryController.getCategory);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;