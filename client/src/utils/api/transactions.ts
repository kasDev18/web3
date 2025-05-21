import axios from "axios"

const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;
const ETHERSCAN_URI = import.meta.env.VITE_ETHERSCAN_URI;
const DUMMY_ADDRESS = import.meta.env.VITE_DUMMY_ADDRESS;

export const getTransactions = async(): Promise<string[]> => {
    const url = `${ETHERSCAN_URI}?chainid=1&module=account&action=txlist&address=${DUMMY_ADDRESS}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${ETHERSCAN_API_KEY}`;
    
    const response = await axios.get(url);
    const data = response.data;

    return data.result
}

