import { Box } from "@mui/material";

export default function Address({ address }: { address: string }) {
  return (
    <Box
      style={{
        textAlign: "center",
        display: "flex",
        fontFamily: "monospace",
      }}
    >
      <p style={{ color: "rgba(139, 133, 133, 0.87)" }}>
        <strong>ADDRESS:</strong>
      </p>
      <p style={{ marginLeft: "10px" }}>
        <strong>{address}</strong>
      </p>
    </Box>
  );
}