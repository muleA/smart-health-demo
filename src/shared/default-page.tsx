import { PropsWithChildren, ReactNode } from "react";
import { DefaultPageHeader, DefaultPageHeaderProps } from "./default-page-header";
import { Box, Paper } from "@mui/material";
type DefaultPageProps = {
  narrow?: boolean;
  otherComponet?: ReactNode;
} & DefaultPageHeaderProps;

export const DefaultPage = (props: PropsWithChildren<DefaultPageProps>): JSX.Element => {
  return (
 <>
 <Box
sx={{
  overflow: "auto", // Add this CSS property to enable scrolling within the wrapper
  maxHeight: "100vh", // Set the maximum height of the wrapper to the viewport height
  display: "flex",
  flexDirection: "column",
}}
{...(props.narrow && {
  alignSelf: "center",
  width: "400px",
  marginBottom: "10px",
})}
 >
<DefaultPageHeader {...props} />
{props.otherComponet}

<Paper
  component="div"
  sx={{
 minWidth: "400px",
 flex: "1", // Make the paper take up the remaining vertical space
 display: "flex", // Enable the flexbox layout to align the content vertically
 flexDirection: "column", // Stack the children vertically within the paper
  }}
  {...(props.narrow && {
 alignSelf: "center",
 width: "400px",
 marginBottom: "10px",
 })}
>
  <Box
 sx={{
overflow: "auto", // Add this CSS property to enable scrolling within the paper
flex: "1", // Make the content take up the remaining vertical space
 }}
  >
 {props.children}
  </Box>
</Paper>
 </Box>
  </>
  );
};
