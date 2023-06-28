import React, { useEffect, useState } from "react";
import { Card, Collapse, Button, Input, Form, message, DatePicker, Upload } from "antd";
import axios from "axios";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import { useArchiveCertificateMutation } from "../portal.query";
import { useAuth } from "../../shared/auth/use-auth";
import { Notify } from "../../shared/notification/notify";
import { baseUrl } from "../../configs/config";
import Empty from "../../shared/empty-state";
import PreviewFile from "./preview-file";

const { Panel } = Collapse;

interface Certificate {
  id: string;
  Institution: string;
  name: string;
  certificateTitle: string;
  startDate: string;
  receivedDate: string;
  [key: string]: string | number; // Index signature
}

const CertificateInformation: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const { session } = useAuth();
  const[archiveCertificate,{isLoading}]=useArchiveCertificateMutation()
  const [openedPanelId, setOpenedPanelId] = useState<string | null>(null);
  console.log("openedPanelId at certificate",openedPanelId)

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}user/get-certificate-by-userId/${session?.userInfo?.userId}`
        // Replace "userId" with the actual ID of the user
      );
      setCertificates(response.data);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };
  const [file, setFile] = useState<any>();

  const handleFileChange = (file:any) => {
    setFile(file);
  };
  const handleCreateCertificate = async (certificate: Certificate) => {
    const { id, ...otherProps } = certificate;
    console.log("otherProps", otherProps);

    const formData = new FormData();
    formData.append("attachmentUrl",file)
    try {
    const response=  await axios.post(`${baseUrl}user/add-certificate-to-user`, {
        Institution: certificate.Institution,
        name: certificate.name,
        certificateTitle: certificate.certificateTitle,
        startDate: certificate.startDate,
        receivedDate: certificate.receivedDate,
        userId: session?.userInfo?.userId,
      });
      if(response?.data?.id){
        setOpenedPanelId(response?.data?.id)
        await axios.post(
          `${baseUrl}user/add-certificate-attachment/${response?.data?.id??"fbf99cfa-a2c1-45fe-a8f3-fed50db7e735"}/${session?.userInfo?.userId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      message.success("Certificate info added successfully");
    } catch (error) {
      console.error("Error creating certificate:", error);
      message.error("Error in adding certificate info");
    }
  };

  const handleDeleteCertificate = async (certificate: Certificate) => {
    console.log("certificate", certificate);
    try {
      await axios.post(`${baseUrl}user/delete-certificate/${certificate.id}`);
      const updatedCertificates = certificates.filter(
        (cert) => cert.id !== certificate.id
      );
      setCertificates(updatedCertificates);
      message.success("Certificate info deleted successfully");
    } catch (error) {
      console.error("Error deleting certificate:", error);
      message.error("Error in deleting certificate info");
    }
  };


  
  const handleArchiveCertificate = async (certificate: Certificate) => {
    console.log("certificate", certificate);
    try {
    await archiveCertificate (certificate.id);
      const updatedCertificates = certificates.filter(
        (cert) => cert.id !== certificate.id
      );
      setCertificates(updatedCertificates);
      message.success("Certificate info archive successfully");
    } catch (error) {
      console.error("Error archiving certificate:", error);
      message.error("Error in archiving certificate info");
    }
  };

 
  const handleAddCertificate = () => {
    if (certificates.length > 0) {
      const firstInstitution = certificates[0];
      const isFirstInstitutionEmpty = Object.values(firstInstitution).every(
        (value) => value === ""
      );

      if (isFirstInstitutionEmpty) {
        message.error(
          "Please fill in the certificate  information before adding another ."
        );
        return; // Exit the function early if the first Institution is empty
      }
    }
    const newCertificate: Certificate = {
      Institution: "",
      name: "",
      certificateTitle: "",
      startDate: "",
      receivedDate: "",
      id: "",
    };
    setCertificates([...certificates, newCertificate]);
  };

  const handleCertificateChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedCertificates = [...certificates];
    updatedCertificates[index][field] = value;
    setCertificates(updatedCertificates);
  };

  const handleUpdateCertificate = async (certificate: Certificate) => {
    try {
      await axios.post(
        `http://20.21.120.66:3000/api/user/update-certificate`,
        certificate
      );
      Notify("success", "Certificate info updated successfully");
    } catch (error) {
      console.error("Error updating certificate:", error);
      Notify("error", "Error in updating certificate info");
    }
  };

  const [expanded, setExpanded] = useState(false);
  const handleButtonClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card title="" className="w-3/2 mx-auto mt-6">
      <Collapse activeKey={expanded ? "1" : ""}>
        <Panel
          header={
            <h3 className="font-bold text-lg">Certificate Information</h3>
          }
          key="1"
          extra={
            <>
              <div className="flex">
                {expanded ? (
                  <Button
                    type="primary"
                    className="flex justify-center items-center bg-primary text-white hover:text-white"
                    onClick={handleAddCertificate}
                  >
                    <PlusOutlined /> Certificate
                  </Button>
                ) : null}

                <Button className="ml-5" onClick={handleButtonClick}>
                  {expanded ? "Collapse" : "Expand"}
                </Button>
              </div>
            </>
          }  
        >
           {certificates?.length === 0 ? (
            <>
            <Empty/>
            </>
            ):(
            <>
          {certificates.map((certificate: Certificate, index: number) => (
            <Collapse key={index} defaultActiveKey={0}                 
              onChange={() => setOpenedPanelId(certificate.id)}
            >
              <Panel
                className="mb-2"
                header={`Certificate ${index + 1}`}
                key={certificate.id}
                extra={
                  <div className="flex space-x-2">
                    <Button
                      type="primary"
                      danger
                      onClick={() => handleArchiveCertificate(certificate)}
                    >
                      Archive
                    </Button>
                    <Button
                      type="primary"
                      danger
                      onClick={() => handleDeleteCertificate(certificate)}
                    >
                      Delete
                    </Button>
                  </div>
                }
              >
                  <div className="flex">
                      <div className="w-1/2 h-100">
                <Form layout="vertical">
                  <Form.Item label="Institution">
                    <Input
                      value={certificate.Institution}
                      onChange={(e) =>
                        handleCertificateChange(
                          index,
                          "Institution",
                          e.target.value
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Name">
                    <Input
                      value={certificate.name}
                      onChange={(e) =>
                        handleCertificateChange(index, "name", e.target.value)
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Certificate Title">
                    <Input
                      value={certificate.certificateTitle}
                      onChange={(e) =>
                        handleCertificateChange(
                          index,
                          "certificateTitle",
                          e.target.value
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    rules={[{ required: true }]}
                    label="Issued Date"
                    name={`startDate${index}`}
                    initialValue={
                      certificate.startDate
                        ? moment(certificate.startDate)
                        : undefined
                    }
                  >
                    <DatePicker
                      onChange={(date) =>
                        handleCertificateChange(
                          index,
                          "startDate",
                          date ? date.format("YYYY-MM-DD") : ""
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    rules={[{ required: true }]}
                    label="Received Date"
                    name={`receivedDate_${index}`}
                    initialValue={
                      certificate.receivedDate
                        ? moment(certificate.receivedDate)
                        : undefined
                    }
                  >
                    <DatePicker
                      onChange={(date) =>
                        handleCertificateChange(
                          index,
                          "receivedDate",
                          date ? date.format("YYYY-MM-DD") : ""
                        )
                      }
                    />
                  </Form.Item>
                  
                  <Form.Item
        name="attachment"
        label="Attachment"
        rules={[{ required: true, message: "Please upload a file" }]}
      >
        <Upload
          name="attachment"
          listType="picture"
          beforeUpload={(file) => {
            handleFileChange(file);
            return false;
          }}
        >
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
<div className="mt-2 mb-10">
  <PreviewFile entityType="certificate" entityId={openedPanelId }/>
</div>
                  <div className="flex space-x-4">
                    <Button
                      type="primary"
                      className="bg-primary"
                      onClick={() => handleCreateCertificate(certificate)}
                   >
                      Save
                    </Button>
                   {/*  <Button
                      type="primary"
                      danger
                      onClick={() => handleDeleteCertificate(certificate)}
                    >
                      Delete
                    </Button> */}
                  </div>
                </Form>
                </div>
             
                      </div>
              </Panel>
            </Collapse>
          ))}
          </>)}
        </Panel>
      </Collapse>
    </Card>
  );
};

export default CertificateInformation;
