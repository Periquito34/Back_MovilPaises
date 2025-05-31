const express = require('express');
const {
  createSite,
  getAllSites,
  updateSite,
  deleteSite,
} = require('../controllers/sitio.controller');

const router = express.Router();

router.post('/', createSite);
router.get('/', getAllSites);
router.put('/:id', updateSite);
router.delete('/:id', deleteSite);

module.exports = router;
