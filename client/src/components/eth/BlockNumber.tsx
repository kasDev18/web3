import { Box } from "@mui/material";

export default function BlockNumber({ block }: { block: number  | null}) {
  return (
    <Box
      style={{
        textAlign: "center",
        display: "flex",
        fontFamily: "monospace",
      }}
    >
      <p style={{ color: "rgba(139, 133, 133, 0.87)" }}>
        <strong>LATEST BLOCK NUMBER:</strong>
      </p>
      <p style={{ marginLeft: "10px" }}>
        <strong>{block}</strong>
      </p>
    </Box>
  );
}