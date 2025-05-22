import axios from "axios";

const address = import.meta.env.VITE_DUMMY_ADDRESS;

export const getUserEthData = async (): Promise<any> => {
    // console.log(`/api/eth/${address}`);
    
    return await axios.post(`/api/eth/${address}`, {params: {address}})
}