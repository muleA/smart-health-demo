import { Button, Select, Typography, Row, Col, ButtonProps } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { SizeType } from "antd/es/config-provider/SizeContext";

export type DefaultPageHeaderProps = {
  title: string;
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

export const DefaultPageHeader = (props: DefaultPageHeaderProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="mx-1 mb-2">
      {props.backButtonLink && props.backButtonTitle && (
        <Button
          icon={<RollbackOutlined />}
          type="text"
          onClick={() => {
            navigate(`${props.backButtonLink}`);
          }}
        >
          {props.backButtonTitle}
        </Button>
      )}

      <Row justify="space-between" align="middle" gutter={16}>
        <Col>
          <Typography.Title level={4} style={{ fontWeight: 500, fontSize: "35px" }}>
            {}
          </Typography.Title>
          {typeof props?.subTitle === "string" ? (
            <Typography.Text>{props?.subTitle}</Typography.Text>
          ) : (
            props?.subTitle
          )}
        </Col>
        <Col flex="end" style={{marginRight:"40px"}}>
          
          {props.primaryButtonProps && (
            <Button
              style={{ textTransform: "none" }}
              size={"medium" as SizeType} 
              type="primary"
              className="bg-primary text-white"
              {...props.primaryButtonProps}
            >
              {props.primaryButtonProps.children}
            </Button>
          )}
          {props.outlinedButtonProps && (
            <Button
              style={{ textTransform: "none" }}
              size={"medium" as SizeType} 
              type="default"
              {...props.outlinedButtonProps}
            >
              {props.outlinedButtonProps.children}
            </Button>
          )}
          

          {props.rightSideComponent && <div>{props.rightSideComponent}</div>}

          {props.secondaryButtonProps && (
            <Button
              style={{ textTransform: "none" }}
              size={"medium" as SizeType} 
              type={props.showWarningColor ? "ghost" : "default"}
              {...props.secondaryButtonProps}
            >
              {props.secondaryButtonProps.children}
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
};
