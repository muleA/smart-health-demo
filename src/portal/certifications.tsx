import React, { useEffect, useState } from "react";
import { Card, Collapse, Button, Input, DatePicker, Form, Upload } from "antd";
import axios from "axios";
import { Notify } from "../shared/notification/notify";
import {
  PlusCircleFilled,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { baseUrl } from "../shared/config";
import { useAuth } from "../shared/auth/use-auth";
import Empty from "../shared/empty-state";
import { useFormik } from "formik";
import * as Yup from "yup";

const { Panel } = Collapse;

interface Certificate {
  id: string; // Unique identifier for each certificate
  Institution: string;
  name: string;
  certificateTitle: string;
  startDate: string;
  receivedDate: string;
  [key: string]: string | number; // Index signature
}

const validationSchema = Yup.object().shape({
  Institution: Yup.string().required("Institution is required"),
  name: Yup.string().required("Name is required"),
  certificateTitle: Yup.string().required("Certificate Title is required"),
  startDate: Yup.string().required("Start Date is required"),
  receivedDate: Yup.string().required("Received Date is required"),
});

const CertificateForm: React.FC = () => {
  const [form] = Form.useForm();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const { session } = useAuth();
  const [selectedImage, setSelectedImage] = useState<any>(null);
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
      );
      setCertificates(response.data);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
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
      await axios.post(`${baseUrl}user/update-certificate/${certificate.id}`, certificate);
      // Handle image upload separately if needed
    } catch (error) {
      console.error("Error updating certificate:", error);
      Notify("success", "Certificate Info updated successfully");
    }
  };

  const handleCreateCertificate = async (certificate: Certificate) => {
    try {
      await axios.post(`${baseUrl}user/add-certificate`, certificate);
      // Handle image upload separately if needed
    } catch (error) {
      console.error("Error creating certificate:", error);
      Notify("success", "Certificate Info created successfully");
    }
  };

  const handleDeleteCertificate = async (certificate: Certificate) => {
    try {
      await axios.post(`${baseUrl}user/delete-certificate/${certificate.id}`);
      const updatedCertificates = certificates.filter(
        (cert) => cert.id !== certificate.id
      );
      setCertificates(updatedCertificates);
      Notify("success", "Certificate Info deleted successfully");
    } catch (error) {
      console.error("Error deleting certificate:", error);
      Notify("error", "Error in deleting Certificate Info");
    }
  };

  const onSubmit = async (certificate: Certificate) => {
    const formik = useFormik({
      initialValues: certificate,
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        if (certificate.id) {
          handleUpdateCertificate(values);
        } else {
          handleCreateCertificate(values);
        }
      },
    });

    formik.handleSubmit();
  };
 
  const handleImageUpload = async (
    file: string | Blob,
    certificateId: string | undefined
  ) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      await axios.post(
        `${baseUrl}user/add-certificate-attachment/${session?.userInfo?.userId}/${certificateId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSelectedImage(file);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleAddCertificate = () => {
    const newCertificate: Certificate = {
      id: "", // Generate a unique ID for the new certificate
      Institution: "",
      name: "",
      certificateTitle: "",
      startDate: "",
      receivedDate: "",
    };
    setCertificates([...certificates, newCertificate]);
  };

  const handleButtonClick = () => {
    setExpanded(!expanded);
  };

  const handleDateChange = (date: any, dateString: any) => {
    console.log(date, dateString);
    // Perform any desired operations with the selected date
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
  };
  
  const [expanded, setExpanded] = useState(false);

  return (
    <Card title="" className="w-3/2 mx-auto mt-3">
      <Collapse activeKey={expanded ? "1" : ""}>
        
        <Panel
          header={<h3 className="font-bold text-lg">Certificate information</h3>}
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
          {certificates.length === 0 ? (
            <Empty />
          ) : (
            <>
              {certificates.map((certificate: Certificate, index: number) => (
                <Collapse key={certificate.id}>
                  <Panel
                    className="mb-2"
                    header={`Certificate ${index + 1}`}
                    extra={
                      <Button
                        type="primary"
                        danger
                        onClick={() => handleDeleteCertificate(certificate)}
                      >
                        Delete
                      </Button>
                    }
                    key={certificate.id}
                  >
                    <div className="flex space-x-4">
                      <div className="w-1/2 bg-gray-100">
                        <Form
                          layout="vertical"
                          className="mx-auto px-4"
                          form={form}
                          initialValues={certificate}
                          onFinish={onSubmit}
                        >
                          <Form.Item
                            label="Institution"
                            name="Institution"
                            initialValue={certificate.Institution}
                            rules={[
                              {
                                required: true,
                                message: "Institution is required",
                              },
                            ]}
                          >
                            <Input
                              onChange={(e) =>
                                handleCertificateChange(
                                  index,
                                  "Institution",
                                  e.target.value
                                )
                              }
                            />
                          </Form.Item>
                          <Form.Item
                            label="Name"
                            name="name"
                            initialValue={certificate.name}
                            rules={[
                              {
                                required: true,
                                message: "Name is required",
                              },
                            ]}
                          >
                            <Input
                              onChange={(e) =>
                                handleCertificateChange(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                            />
                          </Form.Item>
                          <Form.Item
                            label="Certificate Title"
                            name="certificateTitle"
                            initialValue={certificate.certificateTitle}
                            rules={[
                              {
                                required: true,
                                message: "Certificate Title is required",
                              },
                            ]}
                          >
                            <Input
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
                            label="Start Date"
                            name="startDate"
                            initialValue={certificate.startDate}
                            rules={[
                              {
                                required: true,
                                message: "Start Date is required",
                              },
                            ]}
                          >
                            <DatePicker className="w-full" onChange={handleDateChange} />
                          </Form.Item>
                          <Form.Item
                            label="Received Date"
                            name="receivedDate"
                            initialValue={certificate.receivedDate}
                            rules={[
                              {
                                required: true,
                                message: "Received Date is required",
                              },
                            ]}
                          >
                            <DatePicker className="w-full" onChange={handleDateChange} />
                          </Form.Item>
                          <div className="flex justify-between">
                            <Button
                              htmlType="submit"
                              className="bg-primary mb-4"
                              type="primary"
                            >
                              Save
                            </Button>
                          </div>
                        </Form>
                      </div>
                      <div className="w-1/2 h-100">
                        <input
                          id="image-upload-input"
                          type="file"
                          style={{ display: "none" }}
                          /*onChange={(e) => handleImagePreview(e.target.files[0])}*/
                        />
                        <Upload.Dragger
                          name="image"
                          showUploadList={false}
                          /*beforeUpload={handleImagePreview}
                           onChange={handleImageChange}*/
                        >
                          {selectedImage ? (
                            <img
                              src={selectedImage}
                              alt="Selected"
                              className="mb-4"
                            />
                          ) : (
                            <div className="text-center h-100">
                              <p className="mb-2">Drag & Drop or Click to Upload</p>
                              <Button
                                icon={<UploadOutlined />}
                                onClick={handleUploadClick}
                              >
                                Select Image
                              </Button>
                            </div>
                          )}
                        </Upload.Dragger>
                        {selectedImage && (
                          <>
                            <Button
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
                      </div>
                    </div>
                  </Panel>
                </Collapse>
              ))}
            </>
          )}
        </Panel>
      </Collapse>
    </Card>
  );
};

export default CertificateForm;
