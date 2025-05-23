import { Box } from "@mui/material";

export default function ETHBalance({ balance }: { balance: string }) {
  return (
    <Box
      style={{
        textAlign: "center",
        display: "flex",
        fontFamily: "monospace",
      }}
    >
      <p style={{ color: "rgba(139, 133, 133, 0.87)" }}>
        <strong>BALANCE:</strong>
      </p>
      <p style={{ marginLeft: "10px" }}>
        <strong>{balance} ETH</strong>
      </p>
    </Box>
  );
}