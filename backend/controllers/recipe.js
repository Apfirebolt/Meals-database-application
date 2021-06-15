const asyncHandler = require('../middleware/async');
const Recipe = require('../models/Recipe');

// @desc      Get all recipes
// @route     GET /api/v1/recipes
// @access    Public
exports.getRecipes = asyncHandler(async (req, res, next) => {
  const recipes = await Recipe.find({});
  res.status(200).json({
    success: true,
    total: recipes.length,
    data: recipes,
  })
});

// @desc      Get single recipe
// @route     GET /api/v1/recipes/:id
// @access    Public
exports.getRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: recipe
  });
});

// @desc      Create recipe
// @route     POST /api/v1/recipes
// @access    Private/User
exports.createRecipe = asyncHandler(async (req, res, next) => {
  const { name, category, ingredients, rating } = req.body;
  // Check if recipe already exists for this user.
  const recipeExists = await Recipe.findOne({
    user: req.user._id,
    name
  });

  if(recipeExists) {
    return res.status(409).json({
      success: false,
      message: 'Recipe already exists'
    })
  }
  const recipe = await Recipe.create({
    name,
    category,
    ingredients,
    rating,
    user: req.user._id
  });

  res.status(201).json({
    success: true,
    message: 'Recipe successfully created',
    data: recipe
  });
});

// @desc      Update user
// @route     PUT /api/v1/recipes/:id
// @access    Private/User
exports.updateRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findByIdAndUpdate({
    _id: req.params.id,
    user: req.user._id
  }, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    message: 'Recipe successfully updated',
    data: recipe
  });
});

// @desc      Delete recipe
// @route     DELETE /api/v1/recipes/:id
// @access    Private/User
exports.deleteRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  }, {
    useFindAndModify: false
  });
  if (!recipe) {
    return res.status(404).json({
      success: true,
      message: 'Recipe not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Recipe successfully deleted',
    data: {}
  });
});
