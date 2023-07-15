import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
  Box,
  SxProps,
} from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Transition } from "./error-dialogue";

interface SuccessDialogProps {
  message: string;
  open: boolean;
  handleClose: () => void;
  sx?: SxProps;
}

export default function SuccessDialog({
  message,
  open,
  sx,
  handleClose,
}: SuccessDialogProps): JSX.Element {
  return (
 <Dialog
TransitionComponent={Transition}
open={open}
onClose={handleClose}
aria-describedby="alert-dialog-slide-description"
sx={{
  minWidth: "500px",
}}
 >
<Box
  display="flex"
  flexGrow={1}
  flexDirection="column"
  justifyContent="center"
  alignItems="center"
  gap={1}
  borderBottom={1}
  borderColor="#ccc"
  textAlign="center"
  padding={2}
>
  <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 66, color: "#2e7d32" }} />
</Box>
<DialogContent sx={{}}>
  <DialogContentText
 id="alert-dialog-slide-description"
 textAlign="center"
 variant="h6"
 minWidth={"300px"}
  >
 {message}
  </DialogContentText>
</DialogContent>
<DialogActions
  sx={{
 borderTop: 1,
 borderColor: "gray",
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
  }}
>
  <Button fullWidth color="success" onClick={handleClose}>
 <Typography color="success" fontWeight="bold">
Ok
 </Typography>
  </Button>
</DialogActions>
 </Dialog>
  );
}
