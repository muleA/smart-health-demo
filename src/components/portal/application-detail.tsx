/* eslint-disable no-sequences */
import React, { useState } from "react";
import { Card, Table, Button, Tag, Typography, Spin, Modal, message, App } from "antd";
import { DeleteOutlined, DownloadOutlined, EyeOutlined, ShareAltOutlined } from "@ant-design/icons";
import Certificate from "./license";
import {  useGetApplicationDetailsQuery,useArchiveApplicationMutation } from "../portal.query";
import { useNavigate, useParams } from "react-router-dom";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinIcon,
  LinkedinShareButton,
} from "react-share";
import timeSince from "../../shared/utilities/time-since";


const ApplicationDetail = () => {
  const { id } = useParams();
  const { data: ApplicationDetail, isLoading } = useGetApplicationDetailsQuery(id ?? "");
  const [archiveApp,{isLoading:applicationArchiving}]=useArchiveApplicationMutation()
  console.log("ApplicationDetail", ApplicationDetail);
  const [modalVisible, setModalVisible] = useState(false);
  const handleViewCertificate = () => {
    setModalVisible(true);
  };
  const navigate=useNavigate()
  const handleArchive=async ()=>{
    try{
      await archiveApp(id)
      message.success("application archived successfully")
navigate("/my-applications")
    }
    catch(err){
      message.error("error happened in archiving")
    }
  }

  const handleModalClose = () => {
    setModalVisible(false);
  };
  const [shareVisible, setShareVisible] = React.useState(false);

  const handleShare = () => {
    setShareVisible(true);
  };

  const handleCancel = () => {
    setShareVisible(false);
  };
  // Sample data for demonstration


  return (
    <>
      {isLoading ? (
        <div className="text-center h-24 mx-auto">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Card title="Application Details" extra={`Applied ${timeSince(ApplicationDetail?.createdAt)}`}>
                <div className="card-body">
                  <div className="overflow-x-auto">
                    <table className="table-auto">
                      <tbody>
                        <tr>
                          <td className="px-4">Application Category</td>
                          <td className="px-8">{ApplicationDetail?.applicationCategory}</td>
                        </tr>
                        <tr>
                          <td className="px-4">Application Type</td>
                          <td className="px-8">{ApplicationDetail?.applicationType}</td>
                        </tr>
                        <tr>
                          <td className="px-4">Applier Type</td>
                          <td className="px-8">{ApplicationDetail?.applierType}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
            </Card>

            <Card
              title="Status of Application"
              className="mt-4"
              extra={
                <Tag color={`${ApplicationDetail?.status==='SUBMITED'?'blue':ApplicationDetail?.status==='REJECTED'?'red':"green"}`} className="font-bold 3xl">
                  {ApplicationDetail?.status}
                </Tag>
              }
            >
              <Typography className="font-semi-bold 2xl mt-4 mb-4">
{ApplicationDetail?.comment}             
 </Typography>

              <div className="flex justify-between">
              <App/>

                <Button className="text-primary flex items-center" onClick={handleViewCertificate}>

                  <DownloadOutlined className="mr-1" />
                  Download License
                </Button>
               
                <Button onClick={handleShare} className="flex text-primary items-center">
                  <ShareAltOutlined className="mr-1" />
                  Share
                </Button>
                <Button loading={applicationArchiving} onClick={handleArchive} className="flex items-center text-white hover:text-white bg-red-400">
                  <DeleteOutlined className="mr-1" />
                  Archive
                </Button>
              </div>
            </Card>
          </div>
          <div>
            <Card title="Educations" className="h-full">
              <Table
                dataSource={ApplicationDetail?.educationId}
                columns={[
                  { title: "Education", dataIndex: "education" },
                  {
                    title: "",
                    dataIndex: "attachment",
                  /*   render: (attachment) => (
                      <Button type="link" className="flex items-center">
                        <EyeOutlined className="mr-1" />
                        Preview Attachment
                      </Button>
                    ), */
                  },
                ]}
                pagination={false}
              />
                   <Card title="Certificates" className="mt-4 h-full">
              <Table
                dataSource={ApplicationDetail?.certificateId}
                columns={[
                  { title: "Certificate", dataIndex: "Id" },
                  {
                    title: "",
                    dataIndex: "attachment",
                  /*   render: (attachment) => (
                      <Button type="link" className="flex items-center">
                        <EyeOutlined className="mr-1" />
                        Preview Attachment
                      </Button>
                    ), */
                  },
                ]}
                pagination={false}
              />
            </Card>
            <Card title="Experiences" className="mt-4 h-full">
              <Table
                dataSource={ApplicationDetail?.experienceId}
                columns={[
                  { title: "Experience", dataIndex: "experience" },
                  {
                    title: "Attachment",
                    dataIndex: "attachment",
                  /*   render: (attachment) => (
                      <Button type="link" className="flex items-center">
                        <EyeOutlined className="mr-1" />
                        Preview Attachment
                      </Button>
                    ), */
                  },
                ]}
                pagination={false}
              />
            </Card>
            </Card>
       
          </div>
          <Certificate handleModalClose={handleModalClose} modalVisible={modalVisible} />
          <Modal
            title="Share on Social Media"
            visible={shareVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <div className="flex justify-center text-center h-12 space-x-4">
              <FacebookShareButton url={window.location.href}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={window.location.href}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
               <LinkedinShareButton url={window.location.href}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton> 
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default ApplicationDetail;
