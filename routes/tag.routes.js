const express = require('express');
const {
  createTag,
  getAllTags,
  updateTag,
  deleteTag,
} = require('../controllers/tag.controller');

const router = express.Router();

router.post('/', createTag);
router.get('/', getAllTags);
router.put('/:id', updateTag);
router.delete('/:id', deleteTag);

module.exports = router;
