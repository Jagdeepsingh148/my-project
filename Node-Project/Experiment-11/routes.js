const express = require('express');
const router = express.Router();
const {
  getAllCards,
  getCardById,
  addCard,
  deleteCard
} = require('./controller');

router.get('/', getAllCards);
router.get('/:id', getCardById);
router.post('/', addCard);
router.delete('/:id', deleteCard);

module.exports = router;
