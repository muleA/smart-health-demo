import {Card } from "antd";
import { PropsWithChildren, ReactNode } from "react";
import { DefaultPageHeader, DefaultPageHeaderProps } from "./default-page-header";

type DefaultPageProps = {
  narrow?: boolean;
  otherComponent?: ReactNode;
} & DefaultPageHeaderProps;

export const DefaultPage = (props: PropsWithChildren<DefaultPageProps>): JSX.Element => {
  return (
    <>
      <Card
        {...(props.narrow && {
          alignSelf: "center",
          width: "500px",
          marginBottom: "10px",
        })}
      >
        <DefaultPageHeader {...props} />
        {props.otherComponent}

        <Card
          style={{ minWidth: "500px" }}
          {...(props.narrow && {
            style: {
              padding: 25,
            },
          })}
        >
          {props.children}
        </Card>
      </Card>
    </>
  );
};
