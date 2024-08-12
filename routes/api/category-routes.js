const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const catdata = await Category.findAll({
    include: [
      {
        model: Product
      }
    ]
  }).catch((err) => {
    res.json(err)
  })
  res.json(catdata)
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const catdata = await Category.findByPk(req.params.id, {
    include: [
      {
        model: Product
      }
    ]
  })
  res.json(catdata)
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const catdata = await Category.create(req.body)
    res.status(200).json(catdata)
  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const catdata = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (!catdata[0]) {
      res.status(404).json({ message: 'No category with this id' })
    }
    res.status(200).json(catdata)
  } catch (err) {
    res.status(500).json({ message: 'internal server error' })
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const catdata = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!catdata) {
      res.status(400).json({ message: 'no category with this id' })
    }
    res.status(200).json(catdata)
  } catch {
    res.status(500).json({ message: 'internal server error' })
  }
});

module.exports = router;
