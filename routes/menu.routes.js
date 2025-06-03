const express = require('express');
const {
  createMenuSitio,
  getAllMenuSitio,
  updateMenuSitio,
  deleteMenuSitio,
  findSitesByDishId, 
} = require('../controllers/menu.controller');

const router = express.Router();

router.post('/', createMenuSitio);
router.get('/', getAllMenuSitio);
router.put('/:id', updateMenuSitio);
router.delete('/:id', deleteMenuSitio);
router.get('/plato/:dishId', findSitesByDishId);

module.exports = router;
