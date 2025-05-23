const axios = require("axios");
const { ETHERSCAN_API_KEY, ETHERSCAN_API_URI } = process.env;
const redisClient = require("../utils/cache.js");

// Cache TTL in seconds
const CACHE_TTL = 3600; // Adjust as needed (30 seconds here)

/**
 * Get from cache or fetch and set if not available
 */
async function getOrSetCache(key, fetchFunction) {
  const cachedData = await redisClient.get(key);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const freshData = await fetchFunction();
  await redisClient.setEx(key, CACHE_TTL, JSON.stringify(freshData));
  return freshData;
}

/**
 * Get current gas price (ProposeGasPrice)
 */
async function getGasPrice() {
  return getOrSetCache("gas_price", async () => {
    const url = `${ETHERSCAN_API_URI}?chainid=1&module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`;
    const { data } = await axios.get(url);
    return data.result.ProposeGasPrice;
  });
}

/**
 * Get ETH balance for a given address
 */
async function getBalance(address) {
  return getOrSetCache(`balance_${address}`, async () => {
    const url = `${ETHERSCAN_API_URI}?chainid=1&module=account&action=balance&address=${address}&tag=latest&apikey=${ETHERSCAN_API_KEY}`;
    const { data } = await axios.get(url);
    return (parseFloat(data.result) / 1e18).toFixed(2); // ETH
  });
}

/**
 * Get the latest block number
 */
async function getBlockNumber() {
  return getOrSetCache("block_number", async () => {
    const url = `${ETHERSCAN_API_URI}?chainid=1&module=proxy&action=eth_blockNumber&apikey=${ETHERSCAN_API_KEY}`;
    const { data } = await axios.get(url);
    return parseInt(data.result, 16); // hex to decimal
  });
}

module.exports = {
  getGasPrice,
  getBalance,
  getBlockNumber,
};
