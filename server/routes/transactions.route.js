const express = require('express');
const transactionsRouter = express.Router();

const { getTransactions} = require('../controllers/transactions.controller.js');

transactionsRouter.post('/:address', getTransactions);
// router.get('/transactions/:id', transactionsController.getTransaction);
// router.post('/transactions', transactionsController.createTransaction);
// router.put('/transactions/:id', transactionsController.updateTransaction);
// router.delete('/transactions/:id', transactionsController.deleteTransaction);

module.exports = transactionsRouter;