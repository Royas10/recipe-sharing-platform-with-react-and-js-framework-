const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new recipe
router.post('/', async (req, res) => {
  const { title, ingredients, instructions, cookingTime } = req.body;
  
  try {
    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      cookingTime
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;