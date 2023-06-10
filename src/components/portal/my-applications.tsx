import { Card, Button } from "antd";
import CustomTable from "./application-list";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function MyApplicationList() {
  const router = useNavigate();
  return (
    <>
      <Card
        size="small"
        className="mt-4"
        title="Users"
        extra={
          <Button
            onClick={() => router("/new-application")}
            type="primary"
            icon={
              <PlusOutlined
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginRight: "4px",
                  padding: "2px",
                }}
                size={24}
              />
            }
            className="bg-primary-600"
          >
            New
          </Button>
        }
      >
        <CustomTable />
      </Card>
    </>
  );
}
