// src/utils/ethersUtils.ts
import { ethers } from "ethers";
// import {toast} from "react-hot-toast";

export const connectWallet = async (): Promise<any> => {
  const windowProvider: any = window.ethereum;
  // console.log("windowProvider", windowProvider);
  

  if (!windowProvider) return {error: "Please install MetaMask!" };

  await windowProvider.request({ method: "eth_requestAccounts" });
  
  const provider = new ethers.BrowserProvider(windowProvider);
  
  return provider;
};

export const getAccounts = async (wallet: any): Promise<string> => {
  const signer = await wallet.getSigner();
  const address = await signer.getAddress();

  return address;
};


export const getBalance = async (provider: any, address: string): Promise<string> => {
    const balanceBigInt = await provider.getBalance(address);
    const balance = ethers.formatEther(balanceBigInt);
    // const gasPrice = await provider.getGasPrice();

    return parseFloat(balance).toFixed(2).toString();
};