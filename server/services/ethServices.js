const axios = require("axios");
const { ETHERSCAN_API_KEY, ETHERSCAN_API_URI } = process.env;
const redisClient = require("../utils/cache.js");

/* Cache TTL in seconds */
const CACHE_TTL = 3600; // Adjust as needed (30 seconds here)

/**
 * DOCU: This function is used to get or set data in Redis.<br>
 * This is being called in getGasPrice, getBalance and getBlockNumber. <br>
 * Last Updated Date: June 3, 2025 <br>
 * @function
 * @param {object} key - cache key
 * @param {object} fetchFunction - function to fetch data 
 * @author Kas
 */
async function getOrSetCache(key, fetchFunction) {
  /* Get from cache */
  const cachedData = await redisClient.get(key);
  if (cachedData) {
    console.log("Cache hit", cachedData);
    
    return JSON.parse(cachedData);
  }

  /* Fetch and set in cache */
  const freshData = await fetchFunction();
  await redisClient.setEx(key, CACHE_TTL, JSON.stringify(freshData));
  return freshData;
}

/**
 * DOCU: This function is used to get gas price from the API and cache it in Redis.  <br>
 * This is being called in Ethereum controller.<br>
 * Last Updated Date: June 3, 2025 <br>
 * @function
 * @author Kas
 */
async function getGasPrice() {
  return getOrSetCache("gas_price", async () => {
    const url = `${ETHERSCAN_API_URI}?chainid=1&module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`;
    const { data } = await axios.get(url);
    return data.result.ProposeGasPrice;
  });
}

/**
 * DOCU: This function is used to get balance from the API and cache it in Redis.  <br>
 * This is being called in Ethereum controller.<br>
 * Last Updated Date: June 3, 2025 <br>
 * @function
 * @param {object} address - wallet address
 * @author Kas
 */
async function getBalance(address) {
  return getOrSetCache(`balance_${address}`, async () => {
    const url = `${ETHERSCAN_API_URI}?chainid=1&module=account&action=balance&address=${address}&tag=latest&apikey=${ETHERSCAN_API_KEY}`;
    const { data } = await axios.get(url);
    return (parseFloat(data.result) / 1e18).toFixed(2); /* wei to ether */
  });
}

/**
 * DOCU: This function is used to get block number from the API and cache it in Redis.  <br>
 * This is being called in Ethereum controller.<br>
 * Last Updated Date: June 3, 2025 <br>
 * @function
 * @author Kas
 */
async function getBlockNumber() {
  return getOrSetCache("block_number", async () => {
    const url = `${ETHERSCAN_API_URI}?chainid=1&module=proxy&action=eth_blockNumber&apikey=${ETHERSCAN_API_KEY}`;
    const { data } = await axios.get(url);
    return parseInt(data.result, 16); /* hex to decimal */
  });
}

module.exports = {
  getGasPrice,
  getBalance,
  getBlockNumber,
};
