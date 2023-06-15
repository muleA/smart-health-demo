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
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const handleImageUpload = async (
    file: string | Blob,
    certificateId: string | undefined
  ) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        `${baseUrl}user/add-certificate-attachment/${certificateId}/${session?.userInfo?.userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSelectedImage(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleImageRemove = () => {
    setSelectedImage(null);
  };

  const handleUploadClick = () => {
    // Trigger the image upload manually
    const uploadInput = document.getElementById("image-upload-input");
    if (uploadInput) {
      uploadInput.click();
    }
  };
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

  const handleCreateCertificate = async (certificate: Certificate) => {
    const { id, ...otherProps } = certificate;
    console.log("otherProps", otherProps);

    try {
      await axios.post(`${baseUrl}user/add-certificate-to-user`, {
        Institution: certificate.Institution,
        name: certificate.name,
        certificateTitle: certificate.certificateTitle,
        startDate: certificate.startDate,
        receivedDate: certificate.receivedDate,
        userId: session?.userInfo?.userId,
      });
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

  const handleImageChange = (info: any, educationId: any) => {
    if (info.file.status === "done") {
      setSelectedImage(info.file.originFileObj);
    }
  };
  const handleImagePreview = async (file: File | null) => {
    if (file && file.type.startsWith("image/")) {
      const imageUrl = await new Promise<string | ArrayBuffer | null>(
        (resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        }
      );
      setSelectedImage(imageUrl);
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
            <Collapse key={index} defaultActiveKey={0}>
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
                </div>
                <div className="w-1/2 h-100 mx-10">
                        <div className="mt-24 text-center">
                          <input
                            id="image-upload-input"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e: any) =>
                              handleImageChange(e, certificate.id)
                            }
                          />
                          <Upload.Dragger
                            name="image"
                            className="h-20"
                            showUploadList={false}
                            beforeUpload={handleImagePreview}
                            onChange={() => handleImageChange}
                          >
                            {selectedImage ? (
                              <img
                                src={selectedImage}
                                alt="Selected"
                                className="mb-4 h-20 mx-auto"
                              />
                            ) : (
                              <div className="text-center h-30">
                                <p className="mb-2">
                                  Drag & Drop or Click to Upload
                                </p>

                                <Button
                                  icon={<UploadOutlined />}
                                  onClick={handleUploadClick}
                                >
                                  Select Image
                                </Button>
                              </div>
                            )}
                          </Upload.Dragger>
                        </div>

                        {selectedImage && (
                          <>
                            <Button
                              className="mt-4"
                              type="link"
                              danger
                              onClick={handleImageRemove}
                            >
                              Remove Image
                            </Button>
                            <Button
                              type="primary"
                              className="bg-primary"
                              onClick={() =>
                                handleImageUpload(selectedImage, certificate.id)
                              }
                            >
                              Upload
                            </Button>
                          </>
                        )}

                        <div></div>
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
