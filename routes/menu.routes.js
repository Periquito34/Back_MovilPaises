const express = require('express');
const {
  createMenuSitio,
  getAllMenuSitio,
  updateMenuSitio,
  deleteMenuSitio,
} = require('../controllers/menu.controller');

const router = express.Router();

router.post('/', createMenuSitio);
router.get('/', getAllMenuSitio);
router.put('/:id', updateMenuSitio);
router.delete('/:id', deleteMenuSitio);

module.exports = router;
