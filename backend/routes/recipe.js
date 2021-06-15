const express = require('express');
const {
  getRecipe,
  getRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe
} = require('../controllers/recipe');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

router
  .route('/')
  .get(getRecipes)
  .post(protect, createRecipe);

router
  .route('/:id')
  .get(getRecipe)
  .put(protect, updateRecipe)
  .delete(protect, deleteRecipe);

module.exports = router;
