import React, { useEffect, useState } from "react";
import { Card, Collapse, Button, Input, Form, message, Upload } from "antd";
import axios from "axios";
import { useAuth } from "../../shared/auth/use-auth";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import Empty from "../../shared/empty-state";
import { useArchiveExperienceMutation } from "../portal.query";
import { baseUrl } from "../../configs/config";
import PreviewFile from "./preview-file";

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
  const [archiveExperience,{isLoading}]=useArchiveExperienceMutation()
  const [file, setFile] = useState<any>();
  const [openedPanelId, setOpenedPanelId] = useState<string | null>(null);
  console.log("openedPanelId", openedPanelId);

  const handleFileChange = (file: any) => {
    setFile(file);
  };
  const { session } = useAuth();
  useEffect(() => {
    fetchExperiences();
  }, []);
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
const [expId,setExpId]=useState("")
  const handleCreateExperience = async (experience: Experience) => {
    const { id, ...otherProps } = experience;
    const formData = new FormData();
    formData.append("attachmentUrl", file);
    console.log("formData",formData)
    setExpId(id)
    try {
   const response= await axios.post(`${baseUrl}user/add-Experience-to-user`, {
        ...otherProps,
        userId: session?.userInfo?.userId,
      }) as any;
      console.log("response", response);
      if (response?.data?.id) {
        setOpenedPanelId(response?.data?.id)
        await axios.post(
          `${baseUrl}user/add-experience-attachment/${response?.data?.id}/${session?.userInfo?.userId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        ) as any;
      }

      message.success("experience Info updated successfully");
    } catch (error) {
      console.error("Error updating experience:", error);
      message.error("error happened in experience Info updated successfully");
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
        return; // Exit the function early if the first experience is empty
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
            <Collapse key={index} defaultActiveKey={0}
            onChange={() => setOpenedPanelId(experience.id)}

            >
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
                  <Form.Item label="Kebele">
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
                            rules={[
                              {
                                required: true,
                                message: "Please upload a file",
                              },
                            ]}
                          >
                            <Upload
                              name="attachment"
                              listType="picture"
                              beforeUpload={(file) => {
                                handleFileChange(file);
                                return false;
                              }}
                            >
                              <Button icon={<UploadOutlined />}>
                                Click to upload
                              </Button>
                            </Upload>
                         
                          </Form.Item>

                          <div className="mb-10">
                          {experiences?.length > 0 ? (
                            <PreviewFile
                              entityId={openedPanelId}
                              entityType="experience"
                            />
                          ) : null}

                          </div>
                  <div className="flex space-x-4">
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
