const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Get all categories
router.get('/', (req, res) => {
  try {
    const categories = Category.findAll({
      include: [Product]
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve categories' });
  }
});

// Get one category
router.get('/:id', (req, res) => {
  try {
    const category = Category.findByPk(req.params.id, {
      include: [Product]
    });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the category' });
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const { category_name } = req.body;
    const category = await Category.create({ category_name });
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create the category' });
  }
});

// Update a category
router.put('/:id', async (req, res) => {
  try {
    const { category_name } = req.body;
    const category = await Category.findByPk(req.params.id);

    if (category) {
      category.category_name = category_name;
      await category.save();
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the category' });
  }
});

// Delete a category
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (category) {
      await category.destroy();
      res.json({ message: 'Category deleted successfully' });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete the category' });
  }
});

module.exports = router;
