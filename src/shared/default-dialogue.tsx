import {
 DialogProps,
 Dialog,
 DialogTitle,
 Typography,
 DialogActions,
 Button,
 DialogContent,
  } from "@mui/material";
  import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
  import { PropsWithChildren, ReactNode } from "react";
  import { Property } from "csstype";
  
  export type DefaultDialogProps = Required<Pick<DialogProps, "open" | "onClose">> & {
 title: string;
 subtitle?: ReactNode;
 actions?: ReactNode;
 hideClose?: boolean;
 minWidth?: Property.MinWidth;
 maxWidth?: Property.MinWidth;
 minHeight?: Property.MinHeight;
 displayBorderBottom?: boolean;
 removePadding?: boolean;
  };
  type reason = "backdropClick" | "escapeKeyDown";
  export const DefaultDialog = (props: PropsWithChildren<DefaultDialogProps>): JSX.Element => {
 const handleClose = (event: any, reason: reason): void => {
if (reason && (reason === "backdropClick" || reason === "escapeKeyDown")) return;
props.onClose(event, reason);
 };
 return (
<Dialog
  open={props.open}
  onClose={handleClose}
  PaperProps={{
 style: {
minWidth: props.minWidth ?? "430px",
maxWidth: props.maxWidth ?? "450px",
height: props.minHeight,
 },
  }}
>
  <DialogTitle
 sx={{
borderBottom: props?.displayBorderBottom ? "1px solid rgba(0, 0, 0, 0.12)" : "none",
 }}
 display="flex"
 justifyContent="space-between"
 alignItems="flex-start"
  >
 <div>
<Typography variant="h6" fontWeight="bold" component="span" sx={{ display: "block" }}>
  {props.title}
</Typography>
<Typography variant="subtitle1" component="span">
  {props.subtitle}
</Typography>
 </div>
  
 {!props.hideClose && (
<Button
  startIcon={<CloseOutlinedIcon />}
  color="error"
  onClick={() => props.onClose({}, "escapeKeyDown")}
>
  Close
</Button>
 )}
  </DialogTitle>
  
  <DialogContent sx={{ padding: props.removePadding ? 0 : 2 }}>
 {props.children}
 {props.actions && (
<DialogActions style={{ justifyContent: "space-around" }}>{props.actions}</DialogActions>
 )}
  </DialogContent>
</Dialog>
 );
  };
  