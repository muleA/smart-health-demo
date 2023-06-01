import React, { useEffect, useState } from "react";
import { Card, Collapse, Button, Input, DatePicker, Form, Upload, message } from "antd";
import moment from "moment";
import axios from "axios";
import { Notify } from "../shared/notification/notify";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useAuth } from "../shared/auth/use-auth";
import { baseUrl } from "../shared/config";

const { Panel } = Collapse;

interface Education {
  id: string; // Unique identifier for each education
  Institution: string;
  professionalTitle: string;
  studentIdNumber: string;
  fieldOfStudy: string;
  receivedDate: string;
  [key: string]: string | number; // Index signature
}

const EducationForm: React.FC = () => {
  const [educations, setEducations] = useState<Education[]>([]);

  const [selectedImage, setSelectedImage] = useState<any>(null);
   const {session}=useAuth()
  const handleImageUpload = async (
    file: string | Blob,
    educationId: string | undefined
  ) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        `${baseUrl}user/add-education-attachment/${session?.userInfo?.userId}/${educationId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSelectedImage(response.data.imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImagePreview = async (file: Blob | null) => {
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

  const handleImageChange = (info: any, educationId: any) => {
    if (info.file.status === "done") {
      handleImagePreview(info.file.originFileObj);
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
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}user/get-education-by-userId/${session?.userInfo?.userId}`
        // Replace "userId" with the actual ID of the user
      );
      setEducations(response.data);
    } catch (error) {
      console.error("Error fetching educations:", error);
    }
  };

  const handleEducationChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedEducations = [...educations];
    updatedEducations[index][field] = value;
    setEducations(updatedEducations);
  };

  const handleUpdateEducation = async (education: Education) => {
    try {
      await axios.post(
        `${baseUrl}user/update-education/${education.id}`,
        education
      );
    } catch (error) {
      console.error("Error updating education:", error);
      Notify("success", "Education Info updated successfully");
    }
  };

  const handleCreateEducations = async (education: Education) => {
    try {
      await axios.post(
        `${baseUrl}api/user/add-education`,
        education
      );
    } catch (error) {
      console.error("Error updating education:", error);
      message.success("Education Info updated successfully");
    }
  };

  const handleDeleteEducation = async (education: Education) => {
    try {
      await axios.post(
        `${baseUrl}api/user/delete-education/${education.id}`
      );
      const updatedEducations = educations.filter(
        (edu) => edu.id !== education.id
      );
      setEducations(updatedEducations);
      message.success("Education Info deleted successfully");
    } catch (error) {
      console.error("Error deleting education:", error);
      Notify("error", "error in deleting Education Info");
    }
  };


  
  const handleAddEducation = () => {
    if (educations.length > 0) {
      const lastEducation = educations[educations.length - 1];
      const isLastEducationEmpty = Object.values(lastEducation).every(
        (value) => value === ""
      );
  
      if (isLastEducationEmpty) {
        message.error(
          "Please fill in the education information before adding another education."
        );
        return; // Exit the function early if the last education is empty
      }
    }
  
    const newEducation: Education = {
      id: "", // Generate a unique ID for the new education
      Institution: "",
      professionalTitle: "",
      studentIdNumber: "",
      fieldOfStudy: "",
      receivedDate: "",
    };
  
    setEducations([...educations, newEducation]);
  };
  
  
  
  const [expanded, setExpanded] = useState(false);
  const handleButtonClick = () => {
    setExpanded(!expanded);
  };
  const [form] = Form.useForm();

  return (
    <Card title="" className="w-3/2 mx-auto mt-6">
      <Collapse activeKey={expanded ? "1" : ""}>
        <Panel
          header={<h3 className="font-bold text-lg">Education information</h3>}
          key="1"
          extra={
            <>
              <div className="flex">
                {expanded ? (
                  <Button
                    type="primary"
                    className="flex justify-center items-center bg-primary text-white hover:text-white"
                    onClick={handleAddEducation}
                  >
                    <PlusOutlined /> Education
                  </Button>
                ) : null}

                <Button className="ml-5" onClick={handleButtonClick}>
                  {expanded ? "Collapse" : "Expand"}
                </Button>
              </div>
            </>
          }
        >
          {/*  */}

          {educations.map((education: Education, index: number) => (
            <Collapse>
              <Panel
                className="mb-2"
                header={`Experience ${index + 1}`}
                key={education.id}
                extra={
                  <Button
                    type="primary"
                    danger
                    onClick={() => handleDeleteEducation(education)}
                  >
                    Delete
                  </Button>
                }
              >
                <div className="flex">
                  <div className="w-1/2 h-100">
                    <Form
                          form={form}

                      layout="vertical"
                      
                      onFinish={() => handleUpdateEducation(education)}
                    >
                      <Form.Item
                        label="Institution"
                        name={`Institution_${index}`}
                        initialValue={education.Institution}
                        rules={[{ required: true }]}
                      >
                        <Input
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "Institution",
                              e.target.value
                            )
                          }
                          
                        />
                        
                      </Form.Item>
                      <Form.Item
                        label="Professional Title"
                        name={`professionalTitle_${index}`}
                        initialValue={education.professionalTitle}
                        rules={[{ required: true }]}
                      >
                        <Input
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "professionalTitle",
                              e.target.value
                            )
                          }
                        />
                      </Form.Item>
                      <Form.Item
                        label="Student ID Number"
                        name={`studentIdNumber_${index}`}
                        initialValue={education.studentIdNumber}
                        rules={[{ required: true }]}
                      >
                        <Input
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "studentIdNumber",
                              e.target.value
                            )
                          }
                        />
                      </Form.Item>
                      <Form.Item
                        label="Field of Study"
                        name={`fieldOfStudy_${index}`}
                        initialValue={education.fieldOfStudy}
                        rules={[{ required: true }]}
                      >
                        <Input
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "fieldOfStudy",
                              e.target.value
                            )
                          }
                        />
                      </Form.Item>
                      <Form.Item
                      rules={[{ required: true }]}
                        label="Received Date"
                        name={`receivedDate_${index}`}
                        initialValue={
                          education.receivedDate
                            ? moment(education.receivedDate)
                            : undefined
                        }
                      >
                        <DatePicker
                          onChange={(date) =>
                            handleEducationChange(
                              index,
                              "receivedDate",
                              date ? date.format("YYYY-MM-DD") : ""
                            )
                          }
                        />
                      </Form.Item>
                      <div className="flex justify-between">
                        <Button
                          htmlType="submit"
                          className="bg-primary"
                          type="primary"
                          onClick={() => handleCreateEducations(education)}
                        >
                          Save
                        </Button>
                        <Button
                          htmlType="submit"
                          className="bg-primary"
                          type="primary"
                        >
                          Update
                        </Button>
                        <Button
                          type="primary"
                          danger
                          onClick={() => handleDeleteEducation(education)}
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
                        onChange={(e: any) => handleImagePreview(e)}
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
                            handleImageUpload(selectedImage, education.id)
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
        </Panel>
      </Collapse>
    </Card>
  );
};

export default EducationForm;
