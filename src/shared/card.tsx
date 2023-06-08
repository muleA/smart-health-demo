import { Button, Card, Collapse } from 'antd';
import React, { useState } from 'react';

const { Panel } = Collapse;

type CollapsibleCardProps = {
  dropped?: boolean;
  loading?:boolean;
  className?: string;
  title: string | JSX.Element;
  subTitle?: string;
  customAction?: React.ReactNode;
  children: React.ReactNode;
  isOpenedByDefault?: boolean;
};

const CollapsibleCard = (props: CollapsibleCardProps) => {
  const [isDropped, setIsDropped] = useState<boolean>(
    props?.dropped === true
      ? props?.dropped
      : props?.isOpenedByDefault === true
      ? true
      : false
  );

  return (
    <Card className={props.className} rootClassName='mb-2' style={{ paddingBottom: 0 }} loading={props?.loading}>
      <Collapse bordered={true} activeKey={isDropped ? '1' : undefined}>
        <Panel
          header={
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="text-base font-bold">{props.title}</div>
                {props.subTitle && (
                  <div className="text-xs font-light">{props.subTitle}</div>
                )}
              </div>
              <div className="flex">
                {props.customAction && isDropped && (
                  <div className="mr-2">{props.customAction}</div>
                )}
                <Button
                  className="px-2 py-2 bg-primary text-white"
                  type="primary"
                  size="small"
                  onClick={() => setIsDropped(!isDropped)}
                >
                  {isDropped ? "Collapse" : "Expand"}
                </Button>
              </div>
            </div>
          }
          key="1"
        >
          {props.children}
        </Panel>
      </Collapse>
    </Card>
  );
};

export default CollapsibleCard;
