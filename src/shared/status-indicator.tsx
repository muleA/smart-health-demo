import { Circle } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

type StatusIndicatorProps = {
  color: string;
  text: string;
};

const StatusIndicator = ({ color, text }: StatusIndicatorProps): JSX.Element => {
  return (
 <Box display={"flex"} gap={0.7} alignItems={"center"}>
<Circle sx={{ fontSize: "12px", color: `${color}` }} />
<Typography color={color} variant="body2">
  {text}
</Typography>
 </Box>
  );
};

export default StatusIndicator;
