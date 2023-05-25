import React, { useEffect, useState } from "react";
import { Card, Collapse, Button, Input, Form } from "antd";
import axios from "axios";
import { Notify } from "../../shared/notification/notify";

const { Panel } = Collapse;

interface Experience {
  id: string; // Unique identifier for each experience
  tin: string;
  organizationName: string;
  subCity: string;
  woreda: string;
  kebela: string;
}

const ExperinceInformations: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await axios.get(
        "http://20.21.120.66:3000/api/user/get-experience-by-userId/cdd7e427-50f0-4231-bddb-277ba7e03ea8"
        // Replace "userId" with the actual ID of the user
      );
      setExperiences(response.data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  };
  const handleCreateExperiences = async (Experience: Experience) => {
    try {
      await axios.post(
        `http://20.21.120.66:3000/api/user/add-Experience`,
        Experience
      );
    } catch (error) {
      console.error("Error updating Experience:", error);
      Notify("success","Experience Info Added successfully")

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
      await axios.post(
        `http://20.21.120.66:3000/api/user/add-experience-to-user`,
        {
            kebela:"df",
            organizationName:"df",
            subCity:"df",
            tin:"fds",
            woreda: "df"
        }
      );
      Notify("success", "Experience info updated successfully");
    } catch (error) {
      console.error("Error updating experience:", error);
      Notify("error", "Error in updating experience info");
    }
  };

  const handleCreateExperience = async (experience: Experience) => {
    try {
      await axios.post(
        "http://20.21.120.66:3000/api/user/add-experience",
        experience
      );
      Notify("success", "Experience info added successfully");
    } catch (error) {
      console.error("Error creating experience:", error);
      Notify("error", "Error in adding experience info");
    }
  };

  const handleDeleteExperience = async (experience: Experience) => {
    try {
      await axios.post(
        `http://20.21.120.66:3000/api/user/delete-experience/${experience.id}`
      );
      const updatedExperiences = experiences.filter(
        (exp) => exp.id !== experience.id
      );
      setExperiences(updatedExperiences);
      Notify("success", "Experience info deleted successfully");
    } catch (error) {
      console.error("Error deleting experience:", error);
      Notify("error", "Error in deleting experience info");
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

  return (
    <Card title="Experience information" className="w-3/2 mx-auto mt-6">
      <Collapse>
        {experiences.map((experience: Experience, index: number) => (
          <Panel
            className="mb-2"
            header={`Experience ${index + 1}`}
            key={experience.id}
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
              <Button htmlType="submit" className="bg-primary" type="primary" onClick={handleCreateExperiences}>
                  Save
                </Button>

                <Button
                type="primary"
                className="bg-primary"
                onClick={() => handleUpdateExperience(experience)}
              >
                Update
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
        ))}
      </Collapse>
      <Button type="primary" className="bg-primary" onClick={handleAddExperience}>
        Add Experience
      </Button>
    </Card>
  );
};

export default ExperinceInformations;
