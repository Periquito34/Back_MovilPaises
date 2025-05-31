const express = require('express');
const router = express.Router();

const {
  createPais,
  getAllCountries,
  updateCountry,
  deleteCountry,
} =require('../controllers/paises.controllers');

router.post('/', createPais);
router.get('/', getAllCountries);
router.put('/:id', updateCountry);
router.delete('/:id', deleteCountry);

module.exports = router;
