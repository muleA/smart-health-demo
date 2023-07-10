import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  ButtonProps,
  Grid,
  Select,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import IsPermitted from "./auth/is-permitted";
import NumberWithCommas from "./utilities/number-commas";

export type DefaultPageHeaderProps = {
  title?: string;
  subTitle?: React.ReactNode | string;
  primaryButtonProps?: DefaultPageHeaderButtonProps;
  outlinedButtonProps?: DefaultPageHeaderButtonProps;
  secondaryButtonProps?: DefaultPageHeaderButtonProps;
  backButtonLink?: string;
  backButtonTitle?: string;
  dropdownSelector?: React.ReactNode;
  showWarningColor?: boolean;
  showTotalEmployees?: boolean;
  total?: number;
  rightSideComponent?: React.ReactElement;
};

type DefaultPageHeaderButtonProps = PropsWithChildren<ButtonProps>;

export const DefaultPageHeader = (
  props: DefaultPageHeaderProps
): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Box mx={1} mb={2}>
      {props.backButtonLink && props.backButtonTitle && (
        <Button
          startIcon={<ArrowBack />}
          color="inherit"
          size="small"
          onClick={() => {
            navigate(props.backButtonLink as any);
          }}
        >
          {props.backButtonTitle}
        </Button>
      )}

      <Grid
        container
        direction="row"
        justifyContent={"space-between"}
        flexDirection="row"
        alignItems="center"
        spacing={2}
        wrap="nowrap"
      >
        <Grid item>
          <Typography variant="h4" sx={{ fontWeight: 500, fontSize: "35px" }}>
            {props.title}
          </Typography>
          {typeof props?.subTitle === "string" ? (
            <Typography variant="subtitle1">{props?.subTitle}</Typography>
          ) : (
            props?.subTitle
          )}
        </Grid>
        <Grid item container direction="row" xs={"auto"} spacing={1}>
          {props.dropdownSelector && <Grid item>{props.dropdownSelector}</Grid>}

          {props.primaryButtonProps && (
            <Grid item>
              <Button
                style={{ textTransform: "none" }}
                size="large"
                variant="contained"
                {...props.primaryButtonProps}
              >
                {props.primaryButtonProps.children}
              </Button>
            </Grid>
          )}
          {props.outlinedButtonProps && (
            <Grid item>
              <Button
                style={{ textTransform: "none" }}
                size="large"
                variant="outlined"
                {...props.outlinedButtonProps}
              >
                {props.outlinedButtonProps.children}
              </Button>
            </Grid>
          )}

          {props.rightSideComponent && (
            <Grid item>{props.rightSideComponent}</Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
