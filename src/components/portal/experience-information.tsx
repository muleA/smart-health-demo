import React, { useEffect, useState } from "react";
import { Card, Collapse, Button, Input, Form, message, Upload } from "antd";
import axios from "axios";
import { useAuth } from "../../shared/auth/use-auth";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import Empty from "../../shared/empty-state";
import { useArchiveExperienceMutation } from "../portal.query";
import { baseUrl } from "../../configs/config";

const { Panel } = Collapse;

interface Experience {
  id: string; // Unique identifier for each experience
  tin: string;
  organizationName: string;
  subCity: string;
  woreda: string;
  kebela: string;
  [key: string]: string | number; // Index signature
}

const ExperinceInformations: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [archiveExperience,{isLoading}]=useArchiveExperienceMutation()
  const { session } = useAuth();
  const handleImageUpload = async (
    file: string | Blob,
    experienceID: string | undefined
  ) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        `${baseUrl}user/add-experience-attachment/${experienceID}/${session?.userInfo?.userId}`,
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
    fetchExperiences();
  }, []);

  const [file, setFile] = useState<any>();

  const handleFileChange = (file:any) => {
    setFile(file);
  };
  const fetchExperiences = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}user/get-experience-by-userId/${session?.userInfo?.userId}`
        // Replace "userId" with the actual ID of the user
      );
      setExperiences(response.data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  };
  const handleCreateExperiences = async (Experience: Experience) => {
    try {
      await axios.post(`${baseUrl}user/add-Experience`, Experience);
    } catch (error) {
      console.error("Error updating Experience:", error);
      message.error("error occurred in adding experience  information's");
    }
  };
  const handleImageChange = (info: any, experienceID: any) => {
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
  const handleExperienceChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
  };

  const handleUpdateExperience = async (experience: Experience) => {
    try {
      await axios.post(`${baseUrl}user/add-experience-to-user`, {
        kebela: "df",
        organizationName: "df",
        subCity: "df",
        tin: "fds",
        woreda: "df",
      });
      message.success("Experience info updated successfully");
    } catch (error) {
      console.error("Error updating experience:", error);
      message.error("Error in updating experience info");
    }
  };

  const handleCreateExperience = async (experience: Experience) => {
    const { id, ...otherProps } = experience;

    const formData = new FormData();
    formData.append("attachmentUrl",file)
    try {
   const response=   await axios.post(`${baseUrl}user/add-experience-to-user`, {...otherProps,userId:session?.userInfo?.userId});
      if(response){
        await axios.post(
          `${baseUrl}user/add-experience-attachment/${response.id??"fbf99cfa-a2c1-45fe-a8f3-fed50db7e735"}/${session?.userInfo?.userId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      message.success("Experience info added successfully");
    } catch (error) {
      console.error("Error creating experience:", error);
      message.error("Error in adding experience info");
    }
  };

  const handleDeleteExperience = async (experience: Experience) => {
      console.log("expe",experience)
    try {
      await axios.post(`${baseUrl}user/delete-experience/${experience.id}`);
      const updatedExperiences = experiences.filter(
        (exp) => exp.id !== experience.id
      );
      setExperiences(updatedExperiences);
      message.success("Experience info deleted successfully");
    } catch (error) {
      console.error("Error deleting experience:", error);
      message.error("Error in deleting experience info");
    }
  };

  
  const handleArchiveExperience = async (experience: Experience) => {
    console.log("expe",experience)
  try {
    await archiveExperience(experience.id);
    const updatedExperiences = experiences.filter(
      (exp) => exp.id !== experience.id
    );
    setExperiences(updatedExperiences);
    message.success("Experience info Archived successfully");
  } catch (error) {
    console.error("Error archiving experience:", error);
    message.error("Error in archiving experience info");
  }
};

  const handleAddExperience = () => {
   
    if (experiences.length > 0) {
      const firstOrganization = experiences[0];
      const isFirstOrganizationEmpty = Object.values(firstOrganization).every(
        (value) => value === ""
      );

      if (isFirstOrganizationEmpty) {
        message.error(
          "Please fill in the experience  information before adding another ."
        );
        return; // Exit the function early if the first education is empty
      }
    }

    const newExperience: Experience = {
      id: "", // Generate a unique ID for the new experience
      tin: "",
      organizationName: "",
      subCity: "",
      woreda: "",
      kebela: "",
    };
    setExperiences([newExperience,...experiences]);
  };


  
  const [expanded, setExpanded] = useState(false);
  const handleButtonClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card title="" className="w-3/2 mx-auto mt-6">
      <Collapse activeKey={expanded ? "1" : ""}>
        <Panel
          header={<h3 className="font-bold text-lg">Experience information</h3>}
          key="1"
          extra={
            <>
              <div className="flex space-x-2">
                {expanded ? (
                  <Button
                    type="primary"
                    className="flex justify-center items-center bg-primary text-white hover:text-white"
                    onClick={handleAddExperience}
                  >
                    <PlusOutlined /> Experience
                  </Button>
                  
                ) : null}

                <Button className="ml-5" onClick={handleButtonClick}>
                  {expanded ? "Collapse" : "Expand"}
                </Button>
              </div>
            </>
          }
        >

          {experiences?.length === 0 ? (
          <>
          <Empty/>
          </>
          ):(
          <>
            {experiences.map((experience: Experience, index: number) => (
            <Collapse key={index} defaultActiveKey={0}>
              <Panel
                className="mb-2"
                header={`Experience ${index + 1}`}
                key={experience.id}
                extra={
                  <div className="flex space-x-2">
  <Button
                      type="primary"
                      danger
                      onClick={() => handleArchiveExperience(experience)}
                    >
                      Archive
                    </Button>
                    <Button
                      type="primary"
                      danger
                      onClick={() => handleDeleteExperience(experience)}
                    >
                      Delete
                    </Button>
                  </div>
               
                }
              >
                  <div className="flex">
           <div className="w-1/2 h-100">
                <Form layout="vertical">
                  <Form.Item label="TIN">
                    <Input
                      value={experience.tin}
                      onChange={(e) =>
                        handleExperienceChange(index, "tin", e.target.value)
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Organization Name">
                    <Input
                      value={experience.organizationName}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "organizationName",
                          e.target.value
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Sub City">
                    <Input
                      value={experience.subCity}
                      onChange={(e) =>
                        handleExperienceChange(index, "subCity", e.target.value)
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Woreda">
                    <Input
                      value={experience.woreda}
                      onChange={(e) =>
                        handleExperienceChange(index, "woreda", e.target.value)
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Kebela">
                    <Input
                      value={experience.kebela}
                      onChange={(e) =>
                        handleExperienceChange(index, "kebela", e.target.value)
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
        
                  <div className="flex space-x-4">
                    {/*    <Button htmlType="submit" className="bg-primary" type="primary" onClick={handleCreateExperiences}>
                  Save
                </Button> */}

                    <Button
                      type="primary"
                      className="bg-primary"
                      onClick={() => handleCreateExperience(experience)}
                    >
                      Save
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
                              handleImageChange(e, experience.id)
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
                                handleImageUpload(selectedImage, experience.id)
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

export default ExperinceInformations;
