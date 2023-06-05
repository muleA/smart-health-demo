/* eslint-disable no-sequences */
import React, { useState } from "react";
import { Card, Table, Button, Tag, Typography, Spin, Modal } from "antd";
import { DeleteOutlined, DownloadOutlined, EyeOutlined, ShareAltOutlined } from "@ant-design/icons";
import Certificate from "./license";
import {  useGetApplicationDetailsQuery } from "./portal.query";
import { useParams } from "react-router-dom";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinIcon,
  LinkedinShareButton,
} from "react-share";
import timeSince from "../shared/utilities/time-since";

const ApplicationDetail = () => {
  const { id } = useParams();
  const { data: ApplicationDetail, isLoading } = useGetApplicationDetailsQuery(id ?? "");
  console.log("ApplicationDetail", ApplicationDetail);
  const [modalVisible, setModalVisible] = useState(false);
  const handleViewCertificate = () => {
    setModalVisible(true);
  };

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
  const application = {
    title: "License Application",
    category: "Category A",
    type: "Type B",
    applierType: "Type C",
    attachments: ["Attachment 1", "Attachment 2"],
    educations: [
      { education: "Education 1", attachment: "Attachment 1" },
      { education: "Education 2", attachment: "Attachment 2" },
    ],
    certificates: [
      { certificate: "Certificate 1", attachment: "Attachment 1" },
      { certificate: "Certificate 2", attachment: "Attachment 2" },
    ],
    experiences: [
      { experience: "Experience 1", attachment: "Attachment 1" },
      { experience: "Experience 2", attachment: "Attachment 2" },
    ],
    status: "Approved",
  };

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
                          <td className="px-4">{ApplicationDetail?.applicationCategory}</td>
                        </tr>
                        <tr>
                          <td className="px-4">Application Type</td>
                          <td className="px-4">{ApplicationDetail?.applicationType}</td>
                        </tr>
                        <tr>
                          <td className="px-4">Applier Type</td>
                          <td className="px-4">{ApplicationDetail?.applierType}</td>
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
                <Tag color={`${application?.status==='SUBMITED'?'blue':application?.status==='REJECTED'?'red':"green"}`} className="font-bold 3xl">
                  {application?.status}
                </Tag>
              }
            >
              <Typography className="font-semi-bold 2xl mt-4 mb-4">
{ApplicationDetail?.comment}             
 </Typography>

              <div className="flex justify-between">
                <Button className="text-primary flex items-center" onClick={handleViewCertificate}>
                  <DownloadOutlined className="mr-1" />
                  Download License
                </Button>
                <Button className=" text-primary flex items-center">
                  <EyeOutlined className="mr-1" />
                  Preview
                </Button>
                <Button onClick={handleShare} className="flex text-primary items-center">
                  <ShareAltOutlined className="mr-1" />
                  Share
                </Button>
                <Button className="flex items-center text-white hover:text-white bg-red-400">
                  <DeleteOutlined className="mr-1" />
                  Archive
                </Button>
              </div>
            </Card>
          </div>
          <div>
            <Card title="Educations" className="h-full">
              <Table
                dataSource={application.educations}
                columns={[
                  { title: "Education", dataIndex: "education" },
                  {
                    title: "Attachment",
                    dataIndex: "attachment",
                    render: (attachment) => (
                      <Button type="link" className="flex items-center">
                        <EyeOutlined className="mr-1" />
                        Preview Attachment
                      </Button>
                    ),
                  },
                ]}
                pagination={false}
              />
                   <Card title="Certificates" className="mt-4 h-full">
              <Table
                dataSource={application.certificates}
                columns={[
                  { title: "Certificate", dataIndex: "certificate" },
                  {
                    title: "Attachment",
                    dataIndex: "attachment",
                    render: (attachment) => (
                      <Button type="link" className="flex items-center">
                        <EyeOutlined className="mr-1" />
                        Preview Attachment
                      </Button>
                    ),
                  },
                ]}
                pagination={false}
              />
            </Card>
            <Card title="Experiences" className="mt-4 h-full">
              <Table
                dataSource={application.experiences}
                columns={[
                  { title: "Experience", dataIndex: "experience" },
                  {
                    title: "Attachment",
                    dataIndex: "attachment",
                    render: (attachment) => (
                      <Button type="link" className="flex items-center">
                        <EyeOutlined className="mr-1" />
                        Preview Attachment
                      </Button>
                    ),
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
