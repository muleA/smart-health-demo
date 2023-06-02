import React, { useEffect, useState } from "react";
import { Card, Collapse, Button, Input, Form, message } from "antd";
import axios from "axios";
import { Notify } from "../shared/notification/notify";
import { baseUrl } from "../shared/config";
import { useAuth } from "../shared/auth/use-auth";
import { PlusOutlined } from "@ant-design/icons";
import Empty from "../shared/empty-state";

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
  const handleCreateExperiences = async (Experience: Experience) => {
    try {
      await axios.post(`${baseUrl}user/add-Experience`, Experience);
    } catch (error) {
      console.error("Error updating Experience:", error);
      message.error("error occurred in adding experience  information's");
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

    
    try {
      await axios.post(`${baseUrl}user/add-experience-to-user`, {...otherProps,userId:session?.userInfo?.userId});
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

  const handleAddExperience = () => {
    const newExperience: Experience = {
      id: "", // Generate a unique ID for the new experience
      tin: "",
      organizationName: "",
      subCity: "",
      woreda: "",
      kebela: "",
    };
    setExperiences([...experiences, newExperience]);
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
              <div className="flex">
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

          {experiences?.length===0?(<><Empty/></>):(<>
            {experiences.map((experience: Experience, index: number) => (
            <Collapse>
              <Panel
                className="mb-2"
                header={`Experience ${index + 1}`}
                key={experience.id}
                extra={
                  <Button
                    type="primary"
                    danger
                    onClick={() => handleDeleteExperience(experience)}
                  >
                    Delete
                  </Button>
                }
              >
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
                    <Button
                      type="primary"
                      danger
                      onClick={() => handleDeleteExperience(experience)}
                    >
                      Delete
                    </Button>
                  </div>
                </Form>
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
