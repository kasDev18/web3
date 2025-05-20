import { useState } from "react";
// import { ethers } from 'ethers';
// import Web3 from 'web3';
import { connectWallet, getBalance, getAccounts } from "./utils/web3utils";
import toast from "react-hot-toast";

function App() {
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [error, setError] = useState<string>("");


  const handleConnect = async () => {
    try {
      const wallet = await connectWallet();
      const address = await getAccounts(wallet);
      const balance = await getBalance(wallet, address);

      setAddress(address);
      setBalance(balance);
    } catch (err: any) {
      // console.log(err);
      // if(err.code === 4001) return;
      toast.error(err.message || "An error occurred");
      // setError(err.message || "An error occurred");
    }
  };

  return (
    <div style={{ textAlign: "center",  border: "1px solid #ccc", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",  color: "black", margin: "0 auto", padding: "20px", background: "#ffff", width: "30vw" }}>
      <h2>Connect Ethereum Wallet</h2>
      {/* <div style={{ display: "flex", alignItems: "center" }}> */}
    <img src="https://seekvectors.com/files/download/ba7461f159709ecdb2e66cc6814679d8.png" alt="ethereum_logo" width={"250px"} height={"250px"} />
      {/* <img src="https://1000logos.net/wp-content/uploads/2022/05/MetaMask-Symbol-1536x864.png" alt="ethereum_logo" width={"300px"} height={"230px"} /> */}
      {/* </div> */}
      <div style={{ display: "flex",  justifyContent: "space-between", alignItems: "center", background: "transparent", padding: "0 15px", border: "1px solid #ccc", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"}}>
    {/* <h2>Connect Ethereum Wallet</h2> */}
    <h3 style={address && balance ? { color: "green"} : { color: "grey"}}>{address && balance ? "Connected" : "Not Connected"}</h3>
      <button onClick={handleConnect} style={{ height: "40px", background: "blue", color: "white", border: "none", borderRadius: "5px", cursor: "pointer"}}>Connect MetaMask</button>
      </div>
      
      <div style={{ textAlign: "center", marginTop: "5vh", display: "flex", justifyContent: "space-between", fontSize: "14px"}}>
          <div style={{  padding: "10px", border: "1px solid #ccc", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"}}>
            <p><strong>ADDRESS:</strong></p> 
          </div>
          <input type="text" style={{width: "100%", color: "white", textAlign: "center",}} value={address}/>
          {/* <p>
            <strong>Address:</strong> {address}
          </p>
          <p>
            <strong>Balance:</strong> {balance} ETH
          </p> */}
        </div>
        <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between", fontSize: "14px"}}>
          <div style={{ textAlign: "center", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"}}>
            <p><strong>BALANCE:</strong></p> 
          </div>
          <input type="text" style={{width: "100%", color: "white", textAlign: "center"}} value={`$${balance}`}/>
          {/* <p>
            <strong>Address:</strong> {address}
          </p>
          <p>
            <strong>Balance:</strong> {balance} ETH
          </p> */}
        </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
