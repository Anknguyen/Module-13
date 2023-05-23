const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get all tags
router.get('/', (req, res) => {
  try {
    const tags = Tag.findAll({
      include: [Product]
    });
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tags' });
  }
});

// Get a specific tag
router.get('/:id', (req, res) => {
  try {
    const tag = Tag.findByPk(req.params.id, {
      include: [Product]
    });
    if (tag) {
      res.json(tag);
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the tag' });
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  try {
    const { tag_name } = req.body;
    const tag = await Tag.create({ tag_name });
    res.status(201).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create the tag' });
  }
});

// Update a tag
router.put('/:id', async (req, res) => {
  try {
    const { tag_name } = req.body;
    const tag = await Tag.findByPk(req.params.id);

    if (tag) {
      tag.tag_name = tag_name;
      await tag.save();
      res.json(tag);
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the tag' });
  }
});

// Delete a tag
router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);

    if (tag) {
      await tag.destroy();
      res.json({ message: 'Tag deleted successfully' });
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete the tag' });
  }
});

module.exports = router;
