/* eslint-disable no-sequences */
import React, { useState } from "react";
import { Card, Table, Button, Tag, Typography, Spin, Modal, message, App } from "antd";
import { DeleteOutlined, DownloadOutlined, EyeOutlined, ShareAltOutlined } from "@ant-design/icons";
import Certificate from "./license";
import { useGetApplicationDetailsQuery, useArchiveApplicationMutation, useGetEducationByIdQuery, useGetLicenseByApplicationIdQuery } from "../portal.query";
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
import GenerateCertificate from "../../shared/generate-certificate1";
import { useAuth } from "../../shared/auth/use-auth";


const ApplicationDetail = () => {
  const { id } = useParams();
  const { data: ApplicationDetail, isLoading } = useGetApplicationDetailsQuery(id ?? "");
  const { data: LicenseDetail, isLoading: gettingLicenseisLoading } = useGetLicenseByApplicationIdQuery(id ?? "");
  const [archiveApp, { isLoading: applicationArchiving }] = useArchiveApplicationMutation()
  console.log("LicenseDetail", LicenseDetail);
  const [modalVisible, setModalVisible] = useState(false);
  const handleViewCertificate = () => {
    setModalVisible(true);
  };
  const navigate = useNavigate()
  const handleArchive = async () => {
    try {
      await archiveApp(id)
      message.success("application archived successfully")
      navigate("/my-applications")
    }
    catch (err) {
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
  const { session } = useAuth()
  const { data: educations, isLoading: educationLaoding } = useGetEducationByIdQuery(session?.userInfo?.userId)
  // console.log("lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll", LicenseDetail)
  return (
    <>
      {isLoading ? (
        <div className="text-center h-24 mx-auto">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>

            <Card
              title="Status of Application"
              className="mt-0 mb-2"
              extra={
                <Tag color={`${ApplicationDetail?.status === 'SUBMITED' ? 'blue' : ApplicationDetail?.status === 'REJECTED' ? 'red' : "green"}`} className="font-bold 3xl">
                  {ApplicationDetail?.status}
                </Tag>
              }
            >
              <Typography className="font-semi-bold 2xl mt-4 mb-4">
                {ApplicationDetail?.comment}
              </Typography>


              <div className="flex justify-between">

                {ApplicationDetail?.status === 'APPROVED' ? (
                  <>
                    <Button className="text-primary flex items-center" onClick={handleViewCertificate}>

                      <DownloadOutlined className="mr-1" />
                      Download License
                    </Button>

                    <Button onClick={handleShare} className="flex text-primary items-center">
                      <ShareAltOutlined className="mr-1" />
                      Share
                    </Button>
                  </>) : null}

                <Button loading={applicationArchiving} onClick={handleArchive} className="flex items-center text-white hover:text-white bg-red-400">
                  <DeleteOutlined className="mr-1" />
                  Archive
                </Button>

              </div>
            </Card>
            <Card title="Application Details" extra={`Applied ${timeSince(ApplicationDetail?.createdAt)}`}>

              <div className="card-body">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-bold">Application Category</td>
                        <td className="px-8 py-2">{ApplicationDetail?.applicationCategory}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-bold">Application Type</td>
                        <td className="px-8 py-2">{ApplicationDetail?.applicationType}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-bold">Applier Type</td>
                        <td className="px-8 py-2">{ApplicationDetail?.applierType}</td>
                      </tr>
                      {ApplicationDetail.applicationCategory !== "HealthProfessional" ? (<>
                        <tr className="border-b border-gray-200">
                          <td className="px-4 py-2 font-bold">ProfessionalName</td>
                          <td className="px-8 py-2">{ApplicationDetail?.professionalName} {ApplicationDetail?.professionalNameLastName}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="px-4 py-2 font-bold">Phone Number</td>
                          <td className="px-8 py-2">{ApplicationDetail?.phone}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="px-4 py-2 font-bold">QualificationLevel</td>
                          <td className="px-8 py-2">{ApplicationDetail?.qualificationLevel}</td>
                        </tr>
                        {ApplicationDetail?.status === 'APPROVED' ? (<>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-2 font-bold">professionalLicenseNumber</td>
                            <td className="px-8 py-2">{ApplicationDetail?.professionalLicenseNumber}</td>
                          </tr>
                        </>) : null}

                        <tr className="border-b border-gray-200">
                          <td className="px-4 py-2 font-bold">state</td>
                          <td className="px-8 py-2">{ApplicationDetail?.state}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="px-4 py-2 font-bold">Sub City</td>
                          <td className="px-8 py-2">{ApplicationDetail?.subCity}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="px-4 py-2 font-bold">Woreda</td>
                          <td className="px-8 py-2">{ApplicationDetail?.woreda}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="px-4 py-2 font-bold">Kebele</td>
                          <td className="px-8 py-2">{ApplicationDetail?.kebele}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="px-4 py-2 font-bold">House Number</td>
                          <td className="px-8 py-2">{ApplicationDetail?.houseNumber}</td>
                        </tr>
                      </>) : null}
                    </tbody>
                  </table>
                </div>
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
                    dataIndex: "",
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
            </Card>

          </div>
          <Certificate licenseInfo={ApplicationDetail} ApplicationlicenseInfo={LicenseDetail} handleModalClose={handleModalClose} modalVisible={modalVisible} />
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
