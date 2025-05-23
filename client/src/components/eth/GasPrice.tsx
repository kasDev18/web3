import { Box } from "@mui/material";

export default function GasPrice({ gas_price }: { gas_price: string }) {
  return (
    <Box
      style={{
        textAlign: "center",
        display: "flex",
        fontFamily: "monospace",
      }}
    >
      <p style={{ color: "rgba(139, 133, 133, 0.87)" }}>
        <strong>GAS PRICE:</strong>
      </p>
      <p style={{ marginLeft: "10px" }}>
        <strong>{gas_price} Gwei</strong>
      </p>
    </Box>
  );
}