import React from "react";
import { Card, Table, Button, Tag, message, Spin } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import {
  useGetArchivedCertificatesQuery,
  useGetArchivedEducationsQuery,
  useGetArchivedExperiencesQuery,
  useRestoreCertificateMutation,
  useRestoreEducationMutation,
  useGetArchivedApplicationsQuery,
  useRestoreExperianceMutation,
} from "../portal.query";
import { useAuth } from "../../shared/auth/use-auth";
import timeSince from "../../shared/utilities/time-since";

const Archives = () => {
  const { session } = useAuth();

  const { data: educations, isLoading: educationLoading } =
    useGetArchivedEducationsQuery(session?.userInfo?.userId);
  const { data: certificates, isLoading: certificateLoading } =
    useGetArchivedCertificatesQuery(session?.userInfo?.userId);
  const { data: experiences, isLoading: experienceLoading } =
    useGetArchivedExperiencesQuery(session?.userInfo?.userId);
  const { data: applications, isLoading: applicationLoading } =
    useGetArchivedApplicationsQuery(session?.userInfo?.userId);
  const [
    restoreEducation,
    { isLoading: isRestoringEducation, isError: educationError },
  ] = useRestoreEducationMutation();
  const [
    restoreExperience,
    { isLoading: isRestoringExperience, isError: experieanceError },
  ] = useRestoreExperianceMutation();
  const [
    restoreCertificate,
    { isLoading: isRestoringCertificate, isError: certificateError },
  ] = useRestoreCertificateMutation();

  const educationTableRowProps = (
    record: any
  ): React.HTMLAttributes<HTMLElement> => {
    return {
      onClick: () => handleRestoreEducation(record.id),
    };
  };
  const applicationTableRowProps = (
    record: any
  ): React.HTMLAttributes<HTMLElement> => {
    return {
      onClick: () => handleRestoreApplication(record.id),
    };
  };
  const certificateTableRowProps = (
    record: any
  ): React.HTMLAttributes<HTMLElement> => {
    return {
      onClick: () => handleRestoreCertificate(record.id),
    };
  };
  const experianceTableRowProps = (
    record: any
  ): React.HTMLAttributes<HTMLElement> => {
    return {
      onClick: () => handleRestoreExperience(record.id),
    };
  };
  const handleRestoreEducation = async (row: any) => {
    console.log("id===", row);

    try {
      const response = await restoreEducation(row);
      console.log("response", response);
      educationError
        ? message.success("Education restored successfully")
        : message.error("Error occurred while restoring education");
    } catch (err) {}
  };

  const handleRestoreExperience = async (row: string) => {
    console.log("row at exp", row);
    try {
      await restoreExperience(row);
      experieanceError
        ? message.error("Error occurred while restoring experience")
        : message.success("Experience restored successfully");
    } catch (err) {}
  };

  const handleRestoreCertificate = async (row: string) => {
    console.log("row at cert", row);
    try {
      await restoreCertificate(row);
      certificateError
        ? message.error("Error occurred while restoring certificate")
        : message.success("Certificate restored successfully");
    } catch (err) {}
  };
  const handleRestoreApplication = async (row: string) => {
    console.log("row at cert", row);
    try {
      await restoreCertificate(row);
      message.success("Applicationrestored successfully");
    } catch (err) {
      message.error("Error occurred while restoring certificate");
    }
  };

  return (
    /*  */
    <>
      {educationLoading ||
      certificateLoading ||
      experienceLoading ||
      applicationLoading ? (
        <div className="text-center h-24 mx-auto">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Card title="Archived Applications" className="mt-4">
                <Table
                  dataSource={applications}
                  onRow={applicationTableRowProps}
                  rowKey="id"
                  scroll={{x: '100vw' }}
                  columns={[
                    { title: "Application Category", dataIndex: "applicationCategory" },
                    {
                      title: "Action",
                      dataIndex: "restore",
                      render: (row) => (
                        <Button
                          type="link"
                          className="flex flex items-center font-bold "
                          onClick={() => handleRestoreApplication(row)}
                          loading={isRestoringExperience}
                        >
                          <RedoOutlined className="mr-1" />
                          Restore
                        </Button>
                      ),
                    },
                  ]}
                />
              </Card>
              <Card title="Archived Educations" className="mt-4">
                <Table
                  dataSource={educations}
                  onRow={educationTableRowProps}
                  rowKey="id"
                  scroll={{x: '100vw' }}
                  columns={[
                    {
                      title: "Professional Title",
                      dataIndex: "professionalTitle",
                    },
                    { title: "Field Of Study", dataIndex: "fieldOfStudy" },
                    {
                      title: "Archived",
                      dataIndex: "updatedAt",
                      render: (updatedAt: any) => (
                        <Tag color="red">{timeSince(updatedAt)}</Tag>
                      ),
                    },
                    {
                      title: "Action",
                      dataIndex: "restore",
                      render: (row) => (
                        <Button
                          type="link"
                          className="flex items-center flex items-center font-bold "
                          onClick={() => handleRestoreEducation(row)}
                          loading={isRestoringEducation}
                        >
                          <RedoOutlined className="mr-1" />
                          Restore
                        </Button>
                      ),
                    },
                  ]}
                />
              </Card>
            </div>
            <div>
              <Card title="Archived Experiences" className="mt-4">
                <Table
                  dataSource={experiences}
                  onRow={experianceTableRowProps}
                  rowKey="id"
                  scroll={{x: '100vw' }}
                  columns={[
                    {
                      title: "Organization Name",
                      dataIndex: "organizationName",
                    },
                    {
                      title: "Archived",
                      dataIndex: "updatedAt",
                      render: (updatedAt: any) => (
                        <Tag color="red">{timeSince(updatedAt)}</Tag>
                      ),
                    },
                    {
                      title: "Action",
                      dataIndex: "restore",
                      render: (row) => (
                        <Button
                          type="link"
                          className="flex items-center flex items-center font-bold "
                          onClick={() => handleRestoreExperience(row)}
                          loading={isRestoringExperience}
                        >
                          <RedoOutlined className="mr-1" />
                          Restore
                        </Button>
                      ),
                    },
                  ]}
                />
              </Card>
              <Card title="Archived Certificates" className="mt-4">
                <Table
                  dataSource={certificates}
                  onRow={certificateTableRowProps}
                  rowKey="id"
                  scroll={{x: '100vw' }}
                  columns={[
                    { title: "Institution", dataIndex: "institution" },
                    {
                      title: "Certificate Title",
                      dataIndex: "certificateTitle",
                    },
                    {
                      title: "Archived",
                      dataIndex: "updatedAt",
                      render: (updatedAt: any) => (
                        <Tag color="red">{timeSince(updatedAt)}</Tag>
                      ),
                    },
                    {
                      title: "Action",
                      dataIndex: "restore",
                      render: (row) => (
                        <Button
                          type="link"
                          className="flex items-center flex items-center font-bold "
                          onClick={() => handleRestoreCertificate(row)}
                        >
                          <RedoOutlined className="mr-1" />
                          Restore
                        </Button>
                      ),
                    },
                  ]}
                />
              </Card>
            </div>
          </div>
        </>
      )}
    </>
    /*  */
  );
};

export default Archives;
