const axios = require("axios");
const { ETHERSCAN_API_KEY, ETHERSCAN_URI, DUMMY_ADDRESS } = process.env;
  
const getTransactions = async (req, res) => {
  const { address } = req.params;

//   console.log("address", ETHERSCAN_API_KEY);
  
  const url = `${ETHERSCAN_URI}?chainid=1&module=account&action=txlist&address=${DUMMY_ADDRESS}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${ETHERSCAN_API_KEY}`;

    // console.log(url);
    

  const response = await axios.get(url);
  const data = response.data;

//   console.log(data);
  
  

  if (data.status !== "1") {
    throw new Error("Failed to fetch transactions");
  }

  res.status(200).json(data.result);
  // res.status(200).json({ message: "Get all transactions" });
};

module.exports = { getTransactions };
