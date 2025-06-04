import { ethers } from "ethers";

/**
 * DOCU: This function is used to connect metaMask wallet using window.ethereum and ethers.  <br>
 * This is being called in Ethereum controller.<br>
 * Last Updated Date: June 4, 2025 <br>
 * @function
 * @author Kas
 */
export const connectWallet = async (): Promise<any> => {
  const windowProvider: any = window.ethereum;

  if (!windowProvider) return {error: "Please install MetaMask!" };

  await windowProvider.request({ method: "eth_requestAccounts" });
  
  const provider = new ethers.BrowserProvider(windowProvider);
  
  return provider;
};

/**
 * DOCU: This function is used to get the connected account address from the MetaMask wallet.  <br>
 * This is being called in Ethereum controller.<br>
 * Last Updated Date: June 4, 2025 <br>
 * @function
 * @param {object} wallet - MetaMask wallet 
 * @author Kas
 */
export const getAccounts = async (wallet: any): Promise<string> => {
  const signer = await wallet.getSigner();
  const address = await signer.getAddress();

  return address;
};

/**
 * DOCU: This function is used to get the balance of the connected account from the MetaMask wallet.  <br>
 * This is being called in Ethereum controller.<br>
 * Last Updated Date: June 4, 2025 <br>
 * @function
 * @param {object} provider - MetaMask wallet 
 * @param {string} address - wallet address
 * @author Kas
 */
export const getBalance = async (provider: any, address: string): Promise<string> => {
    const balanceBigInt = await provider.getBalance(address);
    const balance = ethers.formatEther(balanceBigInt);

    return parseFloat(balance).toFixed(2).toString();
};