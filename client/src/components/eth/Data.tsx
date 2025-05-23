import { Box } from "@mui/material";

type IndexProps = {
  value: string | number | null;
  title: string;
  suffix?: string;
};

export default function Data({ ...props }: IndexProps) {
  return (
    <Box
      style={{
        textAlign: "center",
        display: "flex",
        fontFamily: "monospace",
      }}
    >
      <p style={{ color: "rgba(139, 133, 133, 0.87)" }}>
        <strong>{props.title}:</strong>
      </p>
      <p style={{ marginLeft: "10px" }}>
        <strong>{props.value} {props.suffix}</strong>
      </p>
    </Box>
  );
}
