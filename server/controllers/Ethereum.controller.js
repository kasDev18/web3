const Account = require("../models/Account.js");

const {
  getGasPrice,
  getBalance,
  getBlockNumber,
} = require("../services/ethServices.js");

const connectWallet = async (req, res) => {
  const { address } = req.params;
  try {
    const [gasPrice, balance, blockNumber] = await Promise.all([
      getGasPrice(),
      getBalance(address),
      getBlockNumber(),
    ]);

    await Account.findOneAndUpdate(
      { address },
      { balance, gasPrice, blockNumber },
      { upsert: true, new: true }
    );

    res.status(200).json({
      address,
      gasPrice,
      balance,
      blockNumber,
    });
  
  } catch (error) {
    console.error("Error fetching Ethereum data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { connectWallet };
