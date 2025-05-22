const axios = require("axios");
const { ethers } = require("ethers");
const { ETHERSCAN_API_KEY, ETHERSCAN_URI, DUMMY_ADDRESS } = process.env;

// const getBalance = async (address) => {
//   const windowProvider = window.ethereum;
//   await windowProvider.request({ method: "eth_requestAccounts" });

//   const provider = new ethers.BrowserProvider(windowProvider);
//   const balanceBigInt = await provider.getBalance(address);
//   const balance = ethers.formatEther(balanceBigInt);
//   return parseFloat(balance).toFixed(2).toString();
// };

const connectWallet = async (req, res) => {
  const { address } = req.params;

  const url = `${ETHERSCAN_URI}?chainid=1&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${ETHERSCAN_API_KEY}`;

  const response = await axios.get(url);
  const data = response.data;

  // const remainingBalance = await getBalance(address)

  if (data.status !== "1") {
    throw new Error("Failed to fetch transactions");
  }

  const result = data.result;

  res.status(200).json({
    result,
  });

};

module.exports = { connectWallet };
