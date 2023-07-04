import {
  Button,
  Card,
  Collapse,
  Empty,
  Form,
  Input,
  Modal,
  Popconfirm,
  Typography,
  message,
} from "antd";
import {
  useChangeLicenseStatusMutation,
  useGetApplicationDetailByUserIdQuery,
  useLazyGetApplicationDetailByUserIdQuery,
} from "../../back-office.query";
import timeSince from "../../../shared/utilities/time-since";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../configs/config";
import { DownloadOutlined } from "@ant-design/icons";
import Certificate from "../certificate2";
import IsPermitted from "../../../shared/auth/is-permitted";
import { ApproveApplication } from "../../../shared/shell/permissions-list";
import { useAuth } from "../../../shared/auth/use-auth";
import PreviewFile from "../../portal/preview-file";
import { useGetUserByIdQuery } from "../../portal.query";

export const UserApplicationsDetail = ({ id }: any) => {
  // console.log('the Id sent as props is ',Session)

  const [trigger, { data, isLoading }] =
    useLazyGetApplicationDetailByUserIdQuery();
const{data:userInfo}=useGetUserByIdQuery(id)
console.log("userInfo",userInfo)
  const { Panel } = Collapse;
  const { Text } = Typography;
  const { session } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isValidateModalVisible, setIsValidateModalVisible] = useState(false);

  const [appCat, setAppCat] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [sendEmailModalVisible, setSendEmailModalVisible] = useState(false);

  const [rejectClicked, setRejectClicked] = useState(false);

  const [appId, setAppId] = useState("");
  const [educationId, setEducationId] = useState("");
  const [messageFromMinstry, setMessageFromMinistry] = useState(false);

  const handleApproveClick = (id: string) => {
    setAppId(id);
    setIsModalVisible(true);
  };
  const handleValidateEducation=(id: string)=>{
    setEducationId(id);
    setIsValidateModalVisible(true);
  }
  const handleSendEmail = () => {
    setSendEmailModalVisible(true);
  };
  const handleRejectClick = (id: string) => {
    setAppId(id);
    setIsModalVisible(true);
    setRejectClicked(true);
  };

  useEffect(() => {
    if (id) {
      trigger(id);
    }
  }, [id, trigger]);

  const handleViewCertificate = (cat: string) => {
    console.log("ca", cat);
    setModalVisible(true);
    setAppCat(cat ?? "HealthProfessional");
  };
  const[dataFromMinistry,setDataFromMinstry]=useState<any>()
  const handleModalOk = async (values: any) => {
    console.log(
      "values when the ok modal to approve or reject is clicked ",
      values
    );
    try {
      // Call API using Axios
      const response = await axios.post(
        `${baseUrl}user/change-application-status-By-applicationId/${appId}`,
        {
          ...values,
          userId: id?.toString(),
          validFrom: new Date(),
          validTo: new Date("6/21/2025"),
          issuedBy: session?.userInfo?.employeeId,
          status: rejectClicked ? "REJECTED" : "APPROVED",
        }
      );

      console.log(response.data);
      setIsModalVisible(false);
      message.success("Approved successfully");
    } catch (error) {
      console.log(error);
      message.error("error");
    }
  };
  const handleEmailModalOk = async (values: any) => {
    console.log(
      "values when the ok modal to approve or reject is clicked ",
      values
    );
    try {
      // Call API using Axios
      const response = await axios.get(
        `${baseUrl}Mailer/send-email/${userInfo?.email}//${values?.message}${values?.subject}`,
      );

      console.log(response.data);
      setIsModalVisible(false);
      message.success("Approved successfully");
    } catch (error) {
      console.log(error);
      message.error("error");
    }
  };

  const handleValidateModalOk = async (values: any) => {
    console.log(
      "values when the ok modal to approve or reject is clicked ",
      values
    );
    try {
      // Call API using Axios
      const response = await axios.get(
        `${baseUrl}user/get-education-by-educationId/${educationId}`,
      );

      console.log("data from minstry",dataFromMinistry);

      setIsModalVisible(false);
     if(response){
      setDataFromMinstry(response?.data)
      message.success("The Ministry of Education has verified the authenticity of this attachment");
      setMessageFromMinistry(true)
     } 
    
    } catch (error) {
      console.log(error);
      message.error("The Ministry of Education has not verified the authenticity of this attachment ")
    }
  };
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
    <div className="flex space-x-4">
    <Card
        title={<Text strong>Application Information</Text>}
        className="w-2/3"
        style={{ textAlign: 'left' }}
        loading={isLoading}
      >
        <Collapse       style={{ textAlign: 'left' }}
>
          {data ? (
            data?.map((application: any) => (
              <Panel 
              style={{ textAlign: 'left' }}
                header={
                  <Text strong>{` ${
                    application?.applicationCategory ===
                    "CompetencyCertificateforGeneralHospital"
                      ? "Competency Certificate For General Hospital"
                      : application?.applicationCategory ===
                        "HealthProfessional"
                      ? "Health Professional"
                      : application?.applicationCategory ===
                        "CompetencyCertificateforSpecialtyCenter"
                      ? "Competency Certificate For Specialty Center"
                      : application?.applicationCategory ===
                        "CompetencyCertificateforRetailPharmacy"
                      ? "Competency Certificate For Retail Pharmacy"
                      : ""
                  } Application   ${application?.status} `}</Text>
                }
                key={application?.id}
              >
                <p>
                  <Text strong>Type:</Text> {application?.applierType}
                </p>
                <p>
                  <Text strong>Category:</Text>{" "}
                  {application?.applicationCategory}
                </p>
                <p>
                  <Text strong>Applier Type:</Text>{" "}
                  <Text strong>{application?.applierType}</Text>
                </p>
                <p>
                  <Text strong>Status:</Text>{" "}
                  <Text strong>{application?.status}</Text>
                </p>
                <p>
                  <Text strong>Comment:</Text>{" "}
                  <Text strong>{application?.comment}</Text>
                </p>
                <div>
  <Text strong>Education:</Text>
  {application?.educationId?.map((item: any) => (
    <div className="flex space-x-4 mb-2" key={item}>
      <PreviewFile entityId={item} userId={id} entityType="education" />
      <Button
        className="bg-primary text-white"
        onClick={() => handleValidateEducation(item)}
      >
        Validate
      </Button>
    </div>
  ))}
</div>

<div>
  <Text strong>Experience:</Text>
  {application?.experienceId?.map((item: any) => (
    <div className="flex space-x-4 mb-2" key={item}>
      <PreviewFile entityId={item} userId={id} entityType="experience" />
      <Button
        className="bg-primary text-white"
        onClick={() => handleValidateEducation(item)}
      >
        Validate
      </Button>
    </div>
  ))}
</div>

<div>
  <Text strong>Certificates:</Text>
  {application?.certificateId?.map((item: any) => (
    <div className="flex space-x-4 mb-2" key={item}>
      <PreviewFile className="text-primary" entityId={item} userId={id} entityType="certificate" />
      <Button
        className="bg-primary text-white"
        onClick={() => handleValidateEducation(item)}
      >
        Validate
      </Button>
    </div>
  ))}
</div>


<Card>
<div className="flex space-x-2 mt-2 mb-2">
                  <IsPermitted requiredPermissions={ApproveApplication}>
               
                         <Button
                          className="bg-primary text-white"
                          onClick={() => handleSendEmail()}
                        >
                          Send Email
                        </Button>

                    {application.status !== "APPROVED" ? (
                      <>
                        <Button
                          className="bg-primary text-white"
                          onClick={() => handleApproveClick(application.id)}
                        >
                          Approve
                        </Button>
                      </>
                    ) : null}

                    {application.status !== "APPROVED" ? (
                      <>
                        <Button
                          className="bg-red-500 text-white"
                          onClick={() => handleRejectClick(application.id)}
                        >
                          Reject
                        </Button>
                      </>
                    ) : null}

                    {application.status === "APPROVED" ? (
                      <>
                        <Button
                          className="text-primary flex items-center"
                          onClick={() =>
                            handleViewCertificate(
                              application?.applicationCategory
                            )
                          }
                        >
                          <DownloadOutlined className="mr-1" />
                          Download License
                        </Button>
                      </>
                    ) : null}
                  </IsPermitted>
                </div>
</Card>
              
              </Panel>
            ))
          ) : (
            <Empty description="No  information found" />
          )}
        </Collapse>
      </Card>

      <Card className="w-1/3"         style={{ textAlign: 'left' }}
 title={<Text strong>Personal Information</Text>}>
        {data && data.length > 0 ? (
          <>
            <p>
              <Text strong>State:</Text> <Text strong>{data[0]?.state}</Text>
            </p>
            <p>
              <Text strong>Sub City:</Text>{" "}
              <Text strong>{data[0]?.subCity}</Text>
            </p>
            <p>
              <Text strong>Woreda:</Text> <Text strong>{data[0]?.woreda}</Text>
            </p>
            <p>
              <Text strong>Kebele:</Text> <Text strong> {data[0]?.kebele}</Text>
            </p>
            <p>
              <Text strong>House Number:</Text>{" "}
              <Text strong>{data[0]?.houseNumber}</Text>
            </p>
            <p>
              <Text strong>Phone:</Text> <Text strong>{data[0]?.phone}</Text>
            </p>
            <p>
              <Text strong>Professional Name:</Text>{" "}
              <Text strong>{data[0]?.professionalName}</Text>
            </p>
            <p>
              <Text strong>Professional Last Name:</Text>{" "}
              <Text strong>{data[0]?.professionalLastName}</Text>
            </p>
            <p>
              <Text strong>Qualification Level:</Text>{" "}
              <Text strong>{data[0]?.qualificationLevel}</Text>
            </p>
            <p>
              <Text strong>Professional License Number:</Text>{" "}
              <Text strong>{data[0]?.professionalLicenseNumber}</Text>
            </p>
            <p>
              <Text strong>Created At:</Text>{" "}
              <Text strong> {timeSince(data[0]?.createdAt)}</Text>
            </p>
          </>
        ) : (
          <Empty description="No personal information found" />
        )}
      </Card>
    </div>
  
      <Modal
        title="Add Comment"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={null} // Remove the footer
      >
        <Form onFinish={handleModalOk}>
          <Form.Item label="comment" name="comment">
            <Input.TextArea cols={5} rows={5} />
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
      
      <Modal
        title="Send Email Message"
        visible={sendEmailModalVisible}
        onOk={handleEmailModalOk}
        onCancel={()=>setSendEmailModalVisible(false)}
        footer={null} // Remove the footer
      >
        <Form onFinish={handleEmailModalOk}>
          <Form.Item label="Subject" name="subject">
            <Input.TextArea cols={5} rows={5} />
          </Form.Item>
          <Form.Item label="message" name="message">
            <Input.TextArea cols={5} rows={5} />
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


      <Modal
        title="Validate Attached Documents with Ministry Of Education"
        visible={isValidateModalVisible}
        onOk={handleValidateModalOk}
        onCancel={()=>setIsValidateModalVisible(false)}
        footer={null} // Remove the footer
      >
        <Form onFinish={handleValidateModalOk}>
         
<Typography>
  Are You Sure To Validate Attached Documents with Ministry oF Educations?
</Typography>
          <Form.Item>
            <Button
              type="primary"
              className="bg-primary text-white"
              htmlType="submit"
            >
              Yes
            </Button>
            <Button
              type="default"
              className=" ml-2"
              htmlType="submit"
            >
              No
            </Button>

          </Form.Item>
          
        </Form>
      </Modal>
      <Modal
        title="Validated Data From The Ministry Of Education"
        visible={messageFromMinstry}
        onOk={()=>setMessageFromMinistry(false)}
        onCancel={()=>setMessageFromMinistry(false)}
        footer={null} // Remove the footer
      >
        <Card>
         

         <p>
                  <Text strong>Institution:</Text> {dataFromMinistry?.Institution}
                </p>
                <p>
                  <Text strong>FieldOf Study:</Text>{" "}
                  {dataFromMinistry?.fieldOfStudy}
                </p>
                <p>
                  <Text strong>professional Title:</Text>{" "}
                  <Text strong>{dataFromMinistry?.professionalTitle}</Text>
                </p>
                <p>
                  <Text strong>Received Date:</Text>{" "}
                  <Text strong>{dataFromMinistry?.receivedDate}</Text>
                </p>
                <p>
                  <Text strong>student IdNumber:</Text>{" "}
                  <Text strong>{dataFromMinistry?.studentIdNumber}</Text>
                </p>
                
 
          <div>
            <Button
              type="primary"
              className="bg-primary text-white"
              htmlType="submit"
            >
              Ok
            </Button>
           

          </div>
          
        </Card>
      </Modal>
      <Certificate
        licenseInfo={data}
        appCat={appCat ?? "HealthProfessional"}
        handleModalClose={() => setModalVisible(false)}
        modalVisible={modalVisible}
      />
    </>
  );
};
