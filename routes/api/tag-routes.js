const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tagData = await Tag.findAll({
    include: [
      {
        model: Product
      }
    ]
  }).catch((err) => {
    res.json(err)
  })
  res.json(tagData)

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tagData = await Tag.findByPk(req.params.id, {
    include: [
      {
        model: Product
      }
    ]
  })
  res.json(tagData)

});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body)
    res.status(200).json(tagData)
  } catch (err) {
    res.status(400).json(err)
  }

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag with this id' })
    }
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json({ message: 'internal server error' })
  }

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!tagData) {
      res.status(400).json({ message: 'no category with this id' })
    }
    res.status(200).json(tagData)
  } catch {
    res.status(500).json({ message: 'internal server error' })
  }

});

module.exports = router;
