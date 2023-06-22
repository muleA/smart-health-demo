import {
  Button,
  Card,
  Col,
  Collapse,
  DatePicker,
  Empty,
  Form,
  Input,
  Modal,
  Row,
  Typography,
} from "antd";
import { useGetApplicationDetailByUserIdQuery } from "../../back-office.query";
import timeSince from "../../../shared/utilities/time-since";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../configs/config";
import { DownloadOutlined } from "@ant-design/icons";
import Certificate from "../certificate2";
import { useAuth } from "../../../shared/auth/use-auth";
 
export const UserApplicationsDetail = ({ id }: any) => {
  const { data, isLoading } = useGetApplicationDetailByUserIdQuery(id);
  const { Panel } = Collapse;
  const { Text } = Typography;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
const[appId,setAppId]=useState('')
  const handleApproveClick = (id:string) => {
    setAppId(id)
    setIsModalVisible(true);
  };

  const handleViewCertificate = () => {
    setModalVisible(true);
  };
  const {session}=useAuth()
console.log("session",session)
  const handleModalOk = async (values: any) => {
    console.log(values);
    try {
      // Call API using Axios
      const response = await axios.post(
        `${baseUrl}user/change-application-status-By-applicationId/${appId}`,
        {...values,userId:id?.toString()}
      );
      console.log(response.data);
      setIsModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="w-full flex">
        <div className="w-3/4">
          <Card
            title={<Text strong>Application Information</Text>}
            className="w-full"
          >
            <Collapse>
              {data?.map((application: any) => (
                <Panel
                  header={
                    <Text strong>{`${application.status} Application `}</Text>
                  }
                  key={application.id}
                >
                  <p>
                    <Text strong>Type:</Text> <Text strong>{application.type}</Text>
                  </p>
                  <p>
                    <Text strong>Category:</Text> <Text strong>{application.category}</Text>
                  </p>
                  <p>
                    <Text strong>Applier Type:</Text> <Text strong>{application.applierType}</Text>
                  </p>
                  <p>
                    <Text strong>Status:</Text>  <Text strong>{application.status}</Text>
                  </p>
                  <p>
                    <Text strong>Comment:</Text> <Text strong>{application?.comment}</Text>
                  </p>
                  <p>
                    <Text strong>Education:</Text> <Text strong>{application?.education?.name}</Text>
                    <Text strong>Attachment 1</Text>
                  </p>
                  <p>
                    <Text strong>Experience:</Text> <Text strong>{application?.experience?.name}</Text>
                    <Text strong>Attachemnt2</Text>
                  </p>
                  <p>
                    <Text strong>Certificates:</Text> <Text strong>{application?.certificate?.certificateTitle}</Text>
                    <Text strong>Attachment3</Text>
                  </p>

                  <div className="flex space-x-2">
                    <Button
                      className="bg-primary text-white"
                      onClick={()=>handleApproveClick(application.id)}
                    >
                      Approve
                    </Button>
                    <Button className="bg-red-500">Reject</Button>

                    {application.status === "APPROVE" ? (
                      <>
                        <Button
                          className="text-primary flex items-center"
                          onClick={handleViewCertificate}
                        >
                          <DownloadOutlined className="mr-1" />
                          Download License
                        </Button>
                      </>
                    ) : null}
                  </div>
                </Panel>
              ))}
            </Collapse>
          </Card>
        </div>
        <div className="w-1/4">
          <Card title={<Text strong>Personal Information</Text>}>
            {data && data.length > 0 ? (
              <>
                <p>
                  <Text strong>State:</Text> <Text strong>{data[0]?.state}</Text>
                </p>
                <p>
                  <Text strong>Sub City:</Text> <Text strong>{data[0]?.subCity}</Text>
                </p>
                <p>
                  <Text strong>Woreda:</Text> <Text strong>{data[0]?.woreda}</Text>
                </p>
                <p>
                  <Text strong>Kebele:</Text> <Text strong> {data[0]?.kebele}</Text>
                </p>
                <p>
                  <Text strong>House Number:</Text> <Text strong>{data[0]?.houseNumber}</Text>
                </p>
                <p>
                  <Text strong>Phone:</Text> <Text strong>{data[0]?.phone}</Text>
                </p>
                <p>
                  <Text strong>Professional Name:</Text> <Text strong>{data[0]?.professionalName}</Text>
                  
                </p>
                <p>
                  <Text strong>Professional Last Name:</Text> <Text strong>{data[0]?.professionalLastName}</Text>
                  
                </p>
                <p>
                  <Text strong>Qualification Level:</Text> <Text strong>{data[0]?.qualificationLevel}</Text>
                  
                </p>
                <p>
                  <Text strong>Professional License Number:</Text> <Text strong>{data[0]?.professionalLicenseNumber}</Text>
                  
                </p>
                <p>
                  <Text strong>Created At:</Text> <Text strong> {timeSince(data[0]?.createdAt)}</Text>
                 
                </p>
              </>
            ) : (
              <Empty description="No personal information found" />
            )}
          </Card>
          <Modal
            title="Add Comment and Dates"
            visible={isModalVisible}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
            footer={null} // Remove the footer
          >
            <Form onFinish={handleModalOk}>
              <Form.Item label="Status" name="status">
                <Input />
              </Form.Item>
              <Form.Item label="Comment" name="comment">
                <Input />
              </Form.Item>
              <Form.Item label="Start Date" name="validFrom">
                <DatePicker />
              </Form.Item>
              <Form.Item label="End Date" name="validTo">
                <DatePicker />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  className="bg-primary text-white"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
      <Certificate
        licenseInfo={data}
        handleModalClose={() => setModalVisible(false)}
        modalVisible={modalVisible}
      />
    </>
  );
};
