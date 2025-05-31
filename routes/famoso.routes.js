const express = require('express');
const {
  createFamous,
  getAllFamous,
  updateFamous,
  deleteFamous,
} = require('../controllers/famoso.controller');

const router = express.Router();

router.post('/', createFamous);
router.get('/', getAllFamous);
router.put('/:id', updateFamous);
router.delete('/:id', deleteFamous);

module.exports = router;
