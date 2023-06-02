import React, { useEffect, useState } from "react";
import { Card, Collapse, Button, Input, Form, message, DatePicker } from "antd";
import axios from "axios";
import { Notify } from "../shared/notification/notify";
import { baseUrl } from "../shared/config";
import { useAuth } from "../shared/auth/use-auth";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";

const { Panel } = Collapse;

interface Certificate {
  id:string;
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

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}user/get-experience-by-userId/${session?.userInfo?.userId}`
        // Replace "userId" with the actual ID of the user
      );
      setCertificates(response.data);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  const handleCreateCertificate = async (certificate: Certificate) => {
    const { id, ...otherProps } = certificate;
    console.log("otherProps",otherProps)

    try {
      await axios.post(
          `${baseUrl}user/add-certificate-to-user`,
        {Institution:certificate.Institution,name:certificate.name,certificateTitle:certificate.certificateTitle,startDate:certificate.startDate,receivedDate:certificate.receivedDate,userId:session?.userInfo?.userId}
      );
      message.success("Certificate info added successfully");
    } catch (error) {
      console.error("Error creating certificate:", error);
      message.error("Error in adding certificate info");
    }
  };

  const handleDeleteCertificate = async (certificate: Certificate) => {
    try {
      await axios.post(
        `${baseUrl}user/delete-certificate/${certificate.id}`
      );
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

  const handleAddCertificate = () => {
    const newCertificate: Certificate = {
      Institution: "",
      name: "",
      certificateTitle: "",
      startDate: "",
      receivedDate: "",
      id: ""
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
          header={<h3 className="font-bold text-lg">Certificate Information</h3>}
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
          {certificates.map((certificate: Certificate, index: number) => (
            <Collapse key={index}>
              <Panel
                className="mb-2"
                header={`Certificate ${index + 1}`}
                key={certificate.id}
                extra={
                  <Button
                    type="primary"
                    danger
                    onClick={() => handleDeleteCertificate(certificate)}
                  >
                    Delete
                  </Button>
                }
              >
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
              
                  <div className="flex space-x-4">
                    <Button
                      type="primary"
                      className="bg-primary"
                      onClick={() => handleCreateCertificate(certificate)}
                    >
                      Save
                    </Button>
                    <Button
                      type="primary"
                      danger
                      onClick={() => handleDeleteCertificate(certificate)}
                    >
                      Delete
                    </Button>
                  </div>
                </Form>
              </Panel>
            </Collapse>
          ))}
        </Panel>
      </Collapse>
    </Card>
  );
};

export default CertificateInformation;
