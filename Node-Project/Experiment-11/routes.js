const express = require('express');
const router = express.Router();
const {
  getAllCards,
  getCardById,
  addCard,
  deleteCard
} = require('./controller');

router.use((req, res, next) => {
  console.log('Admin router middleware executed');
   const err = new Error('This is a test error');
    err.status = 400;
    next(err); 
}); 

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

router.get('/', getAllCards);
router.get('/:id', getCardById);
router.post('/', addCard);
router.delete('/:id', deleteCard);

module.exports = router;
