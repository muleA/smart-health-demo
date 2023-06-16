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

export const UserApplicationsDetail = ({ id }: any) => {
  const { data, isLoading } = useGetApplicationDetailByUserIdQuery(id);
  const { Panel } = Collapse;
  const { Text } = Typography;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleApproveClick = () => {
    setIsModalVisible(true);
  };

  const handleViewCertificate = () => {
    setModalVisible(true);
  };

  const handleModalOk = async (values: any) => {
    console.log(values);
    try {
      // Call API using Axios
      const response = await axios.post(
        `${baseUrl}user/change-application-status-By-applicationId/${id}`,
        values
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
                    <Text strong>{`Application ${application.status}`}</Text>
                  }
                  key={application.id}
                >
                  <p>
                    <Text strong>Type:</Text> {application.type}
                  </p>
                  <p>
                    <Text strong>Category:</Text> {application.category}
                  </p>
                  <p>
                    <Text strong>Applier Type:</Text> {application.applierType}
                  </p>
                  <p>
                    <Text strong>Status:</Text> {application.status}
                  </p>
                  <p>
                    <Text strong>Comment:</Text> {application?.comment}
                  </p>
                  <p>
                    <Text strong>Education:</Text> {application?.education?.name}{" "}
                    <a>Attachment 1</a>
                  </p>
                  <p>
                    <Text strong>Experience:</Text> {application?.experience?.name}{" "}
                    <a>Attachemnt2</a>
                  </p>
                  <p>
                    <Text strong>Certificates:</Text> {application?.certificate?.certificateTitle}
                    <a>Attachment3</a>
                  </p>

                  <div className="flex space-x-2">
                    <Button
                      className="bg-primary text-white"
                      onClick={handleApproveClick}
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
                  <Text strong>State:</Text> {data[0]?.state}
                </p>
                <p>
                  <Text strong>Sub City:</Text> {data[0]?.subCity}
                </p>
                <p>
                  <Text strong>Woreda:</Text> {data[0]?.woreda}
                </p>
                <p>
                  <Text strong>Kebele:</Text> {data[0]?.kebele}
                </p>
                <p>
                  <Text strong>House Number:</Text> {data[0]?.houseNumber}
                </p>
                <p>
                  <Text strong>Phone:</Text> {data[0]?.phone}
                </p>
                <p>
                  <Text strong>Professional Name:</Text>{" "}
                  {data[0]?.professionalName}
                </p>
                <p>
                  <Text strong>Professional Last Name:</Text>{" "}
                  {data[0]?.professionalLastName}
                </p>
                <p>
                  <Text strong>Qualification Level:</Text>{" "}
                  {data[0]?.qualificationLevel}
                </p>
                <p>
                  <Text strong>Professional License Number:</Text>{" "}
                  {data[0]?.professionalLicenseNumber}
                </p>
                <p>
                  <Text strong>Created At:</Text>{" "}
                  {timeSince(data[0]?.createdAt)}
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
              <Form.Item label="End Date" name="validaTo">
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