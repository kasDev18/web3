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

function App() {
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);
  const [userETH, setUserETH] = useState<string[] | null >(null);
  


  const handleLoading = () => {
    setLoading(!loading);
  };

  const fetchUserEth = async () => {
    const userETHData = await getUserEthData();
    const eth = userETHData.data;
    setUserETH(eth);
    
  }

  const handleConnect = async () => {
    try {
      handleLoading();
      const wallet = await connectWallet();

      const address = await getAccounts(wallet);
      const balance = await getBalance(wallet, address);
      const transactionsRaw = await getTransactions();

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
                  address && balance ? { color: "green" } : { color: "grey" }
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
                  Connect Metamask &nbsp;
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
                    // onClick={() => {
                    //   setAddress("");
                    //   setBalance("");
                    //   setTransactions([]);
                    // }}
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
      {transactions && connected && (
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
              <Transactions transactions={transactions} columns={columns} userETH={userETH}/>
            </Item>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default App;
