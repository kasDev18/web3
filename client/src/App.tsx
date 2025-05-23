import { useState } from "react";
import { connectWallet, getBalance, getAccounts } from "./utils/web3utils";
import toast from "react-hot-toast";
import { styled } from "@mui/material/styles";
import { Box, Button, Grid, Paper, CircularProgress } from "@mui/material";

import { getTransactions } from "./utils/api/transactions";
import type { Transaction } from "./utils/types/Transaction.types";

import Transactions from "./components/transactions/Transactions";
import { columns } from "./components/transactions/TransactionGrid";
import Balance from "./components/Balance";
import { getUserEthData } from "./utils/api/Ethereum";
import Address from "./components/eth/Address";
import ETHBalance from "./components/eth/ETHBalance";
import BlockNumber from "./components/eth/BlockNumber";
import GasPrice from "./components/eth/GasPrice";

function App() {
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);

  const [fetchETHData, setFetchETHData] = useState<boolean>(false);
  const [ethAddress, setEthAddress] = useState<string>("");
  const [ethGasPrice, setEthGasPrice] = useState<string>("");
  const [ethBalance, setEthBalance] = useState<string>("");
  const [ethBlockNumber, setEthBlockNumber] = useState<number | null>(null);

  /* Handle loading state when connecting to MetaMask */ 
  const handleLoading = () => {
    setLoading(true);
  };

  const handleConnect = async () => {
    try { 
      handleLoading();
      const wallet = await connectWallet(); /* Connect to MetaMask */

      const address = await getAccounts(wallet); /* Get the connected account address */
      const balance = await getBalance(wallet, address); /* Get the balance of the connected account */
      const transactionsRaw = await getTransactions();  /* Fetch last 10 transactions from the API */

      /* If transactionsRaw is string[], map to Transaction[] */
      const transactions = transactionsRaw.map((tx: any) => tx);

      setLoading(false);
      setAddress(address);
      setBalance(balance);
      setConnected(!connected);
      setTransactions(transactions);

      toast.success("Connected to MetaMask");
    } catch (err: any) {
      toast.error(err.message || "An error occurred");
    }
  };

  const fetchUserEth = async () => {
    setTransactions(null); /* Clear transactions when fetching ETH data */
    setAddress(""); /* Clear address when fetching ETH data */
    setBalance(""); /* Clear balance when fetching ETH data */
    const userETHData = await getUserEthData(); /* Fetch user ETH data from the API */
    const eth = userETHData.data; 

    /* Set ETH data */
    setEthAddress(eth.address); 
    setEthGasPrice(eth.gasPrice);
    setEthBalance(eth.balance);
    setEthBlockNumber(eth.blockNumber);

    setFetchETHData(true); /* Set fetchETHData to true to show ETH data */

    console.log(eth);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid>
          <Item
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              color: "black",
              // margin: "0 auto",
              padding: "20px",
              background: "#ffff",
              width: "30vw",
            }}
          >
            <Box>
              <h2>Connect Ethereum Wallet</h2>
              <img
                src="https://seekvectors.com/files/download/ba7461f159709ecdb2e66cc6814679d8.png"
                alt="ethereum_logo"
                width={"250px"}
                height={"250px"}
              />
            </Box>
            {address && (
              <h3 style={{ color: "grey" }}>
                <strong>{address}</strong>
              </h3>
            )}
            <Box
              sx={[
                {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "transparent",
                  padding: "0 15px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  marginTop: "20px",
                },
                connected && { border: "1px solid green" },
              ]}
            >
              <h3
                style={
                  connected ? { color: "green" } : { color: "grey" }
                }
              >
                {connected && !loading
                  ? "Connected"
                  : !connected && loading
                  ? "Connecting"
                  : "Not Connected"}
                &nbsp;
                {loading && <CircularProgress size={15} color="inherit" />}
              </h3>
              <Box style={{ display: "flex", gap: "10px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleConnect}
                  {...(connected && { disabled: true })}
                >
                  Connect &nbsp;
                  <img
                    src="https://cdn.iconscout.com/icon/free/png-512/metamask-2728406-2261817.png"
                    alt=""
                    width={"20px"}
                    height={"20px"}
                  />
                </Button>
                {connected && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={fetchUserEth}
                  >
                    ETH Data
                  </Button>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                fontFamily: "monospace",
              }}
            >
              {balance && <Balance balance={balance} />}
            </Box>
          </Item>
        </Grid>
        {/* {transactions && connected && ( */}
        {connected && (
          <Grid>
            <Item
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                color: "black",
                margin: "0 auto",
                padding: "20px",
                background: "#ffff",
                width: "30vw",
              }}
            >
              {transactions ? (
                <Transactions transactions={transactions} columns={columns} />
              ) : 
                !fetchETHData ? (<>Fetching ETH Data {<CircularProgress size={15} color="inherit" />}</>) : (
                <Box
                  sx={{
                    
                    height: "100%",
                  }}
                >
                  <h1>
                    <strong>Ethereum Data</strong>
                  </h1>
                  <hr  style={{ width: "100%" }}/>
                 <Address address={ethAddress} />
                 <ETHBalance balance={ethBalance} />
                 <BlockNumber block={ethBlockNumber} />
                 <GasPrice gas_price={ethGasPrice} />
                </Box>
              )}
              
            </Item>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default App;
