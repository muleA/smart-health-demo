import {
  Button,
  Card,
  Collapse,
  Empty,
  Form,
  Input,
  Modal,
  Typography,
  message,
} from "antd";
import { useChangeLicenseStatusMutation, useGetApplicationDetailByUserIdQuery, useLazyGetApplicationDetailByUserIdQuery } from "../../back-office.query";
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
 
export const UserApplicationsDetail = ({ id }: any) => {
  // console.log('the Id sent as props is ',Session)

  const [trigger,{ data, isLoading }] = useLazyGetApplicationDetailByUserIdQuery();

  console.log("data",data?.map((item:any)=>item?.applicationCategory))
  const { Panel } = Collapse;
  const { Text } = Typography;
const {session}=useAuth()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [appCat, setAppCat] = useState("");
console.log("appCat",appCat)
  const [modalVisible, setModalVisible] = useState(false);
  const [rejectClicked, setRejectClicked] = useState(false);

  const [appId, setAppId] = useState("");
  const handleApproveClick = (id: string) => {
    setAppId(id);
    setIsModalVisible(true);
  };
  const handleRejectClick = (id: string) => {
    setAppId(id);
    setIsModalVisible(true);
    setRejectClicked(true);
  };

  useEffect(()=>{
  if(id){
    trigger(id)
  }
  },[id, trigger])

  const handleViewCertificate = (cat:string) => {
    console.log("ca",cat)
    setModalVisible(true);
    setAppCat(cat??"HealthProfessional")
  };
  const handleModalOk = async (values: any) => {
    console.log('values when the ok modal to approve or reject is clicked ',values);
    try {
      // Call API using Axios
      const response = await axios.post(
        `${baseUrl}user/change-application-status-By-applicationId/${appId}`,
        {
          ...values,
          userId: id?.toString(),
          validFrom: new Date(),
          validTo: new Date("6/21/2025"),
          issuedBy:session?.userInfo?.employeeId,
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

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="w-full flex">
        <div className="w-1/2">
          <Card
            title={<Text strong>Application Information</Text>}
            className="w-full"
            loading={isLoading}
          >
            <Collapse>
              {data?data?.map((application: any) => (
                <Panel
                  header={
                    <Text strong>{` ${application?.applicationCategory=="CompetencyCertificateforGeneralHospital"?'Competency Certificate For General Hospital':
                    application?.applicationCategory=="HealthProfessional"?'Health Professional':
                    application?.applicationCategory=="CompetencyCertificateforSpecialtyCenter"?'Competency Certificate For Specialty Center':
                    application?.applicationCategory=="CompetencyCertificateforRetailPharmacy"?'Competency Certificate For Retail Pharmacy':''} Application   ${application?.status} `}</Text>
                  }
                  key={application.id}
                >
                  <p>
                    <Text strong>Type:</Text> {application.applierType}
                  </p>
                  <p>
                    <Text strong>Category:</Text>{" "}
                    {application.applicationCategory}
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
      <Text strong>Education:</Text>{' '}
      {application?.educationId?.map((item: any) => (
        <PreviewFile entityId={item} userId={id} entityType="education" />
      ))}
    </p>
                  <p>
                    <Text strong>Experience:</Text>{" "}
                    {application?.experienceId?.map((item: any) => (
        <PreviewFile entityId={item} userId={id} entityType="experience" />
      ))}                  </p>                     

                  <p>
                    <Text strong>Certificates:</Text>{" "}
                    {application?.certificateId?.map((item: any) => (
        <PreviewFile entityId={item} userId={id} entityType="certificate" />
      ))}
                  </p>

                  <div className="flex space-x-2">
                  <IsPermitted requiredPermissions={ApproveApplication}>

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

 
{
   application.status!=='APPROVED'?(<>
  
       <Button
                          className="bg-red-500 text-white"
                          onClick={() => handleRejectClick(application.id)}
                        >
                          Reject
                        </Button>
   </>):null
}
                   
                    {application.status === "APPROVED" ? (
                      <>
                        <Button
                          className="text-primary flex items-center"
                          onClick={()=>handleViewCertificate(application?.applicationCategory)}
                        >
                          <DownloadOutlined className="mr-1" />
                          Download License
                        </Button>
                      </>
                    ) : null}
 </IsPermitted>
 
                  </div>
                </Panel>
              )):              <Empty description="No  information found" />
            }
             
            </Collapse>
          </Card>
        </div>
        <div className="w-1/2">
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
            title="Add Comment"
            visible={isModalVisible}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
            footer={null} // Remove the footer
          >
            <Form onFinish={handleModalOk}>
              <Form.Item label="Comment" name="comment">
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
        </div>
      </div>
      <Certificate
        licenseInfo={data}
        appCat={appCat??"HealthProfessional"}
        handleModalClose={() => setModalVisible(false)}
        modalVisible={modalVisible}
      />
    </>
  );
};
