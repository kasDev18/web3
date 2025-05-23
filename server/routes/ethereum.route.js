const express = require('express');
const userETHRouter = express.Router();

const { connectWallet } = require('../controllers/Ethereum.controller.js');

userETHRouter.post('/eth/:address', connectWallet);

module.exports = userETHRouter; 