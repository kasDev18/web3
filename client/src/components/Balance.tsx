import { Box } from "@mui/material";

export default function Balance({ balance }: { balance: string }) {
  return (
    <Box
      style={{
        textAlign: "center",
        padding: "10px",
        display: "flex",
        fontFamily: "monospace",
      }}
    >
      <p style={{ color: "rgba(139, 133, 133, 0.87)" }}>
        <strong>BALANCE:</strong>
      </p>
      <p style={{ marginLeft: "10px" }}>
        <strong>${balance} USD</strong>
      </p>
    </Box>
  );
}