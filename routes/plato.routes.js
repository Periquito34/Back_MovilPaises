const express = require('express');
const {
  createDish,
  getAllDishes,
  updateDish,
  deleteDish,
} = require('../controllers/plato.controller');

const router = express.Router();

router.post('/', createDish);
router.get('/', getAllDishes);
router.put('/:id', updateDish);
router.delete('/:id', deleteDish);

module.exports = router;
