import * as React from "react";
import { TransitionProps } from "@mui/material/transitions";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Link,
  Typography,
  Box,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useAppDispatch } from "../../../store/app-store-hook";
import { setError } from "./error-slice";


export const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
 children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ error }: any) {
  const [toggleError, setToggleError] = React.useState(false);
  const dispatch = useAppDispatch();
  const handleClose = () => {
 dispatch(setError(null));
  };
  return (
 <Dialog
open={true}
TransitionComponent={Transition}
keepMounted
onClose={handleClose}
aria-describedby="alert-dialog-slide-description"
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
  <ErrorOutlineIcon sx={{ fontSize: 86, color: "#888" }} />
  <Typography color="#888" fontSize={24}>
 {error?.message}
  </Typography>
</Box>
<DialogContent sx={{}}>
  <Box>
 <Typography>{error?.response?.data?.exceptions?.[0]?.message?.toString()}</Typography>
  </Box>
  <DialogContentText id="alert-dialog-slide-description" textAlign="center">
 {/* <Typography textAlign="center" marginBottom={2}> */}
 {/* <DialogContentText textAlign="center" marginBottom={2}> */}
 {/* </DialogContentText> */}
 {/* </Typography> */}
 <Link
// component="button"
// variant="text"
// color="warning"
onClick={() => setToggleError(!toggleError)}
 >
{toggleError ? "View Less" : "Show Error Details"}
 </Link>
  </DialogContentText>
  {toggleError && <pre>{JSON?.stringify(error, null, 2)}</pre>}
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
  <Button fullWidth color="error" onClick={handleClose}>
 <Typography color="error" variant="h6" fontWeight="bold">
DISMISS
 </Typography>
  </Button>
</DialogActions>
 </Dialog>
  );
}
