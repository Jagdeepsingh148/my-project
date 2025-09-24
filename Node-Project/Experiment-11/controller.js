const { cards } = require('./model');

const getAllCards = (req, res) => {
  res.json(cards);
};

const getCardById = (req, res) => {
  const cardId = parseInt(req.params.id);
  const card = cards.find(c => c.id === cardId);

  if (card) {
    res.json(card);
  } else {
    res.status(404).json({ message: 'Card not found' });
  }
};

const addCard = (req, res) => {
  const { suit, value } = req.body;

  if (!suit || !value) {
    return res.status(400).json({ message: 'Suit and value are required' });
  }

  const newCard = {
    id: cards.length ? cards[cards.length - 1].id + 1 : 1,
    suit,
    value
  };

  cards.push(newCard);
  res.status(201).json(newCard);
};

const deleteCard = (req, res) => {
  const cardId = parseInt(req.params.id);
  const index = cards.findIndex(c => c.id === cardId);

  if (index !== -1) {
    const removed = cards.splice(index, 1);
    res.json({ message: 'Card deleted', card: removed[0] });
  } else {
    res.status(404).json({ message: 'Card not found' });
  }
};

module.exports = {
  getAllCards,
  getCardById,
  addCard,
  deleteCard
};
