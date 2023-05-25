import React, { useEffect, useState } from "react";
import { Card, Collapse, Button, Input, DatePicker, Form, Upload } from "antd";
import moment from "moment";
import axios from "axios";
import { Notify } from "../../shared/notification/notify";
import { UploadOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

interface Education {
  id: string; // Unique identifier for each education
  Institution: string;
  professionalTitle: string;
  studentIdNumber: string;
  fieldOfStudy: string;
  receivedDate: string;
}

const EducationForm: React.FC = () => {
  const [educations, setEducations] = useState<Education[]>([]);
  
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (file: string | Blob,educationId: string | undefined) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(`http://20.21.120.66:3000/api/user/add-education-attachment/cdd7e427-50f0-4231-bddb-277ba7e03ea8/${educationId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSelectedImage(response.data.imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      handleImageUpload(info.file.originFileObj);
    }
  };

  const handleImagePreview = async (file) => {
    if (file.type.startsWith("image/")) {
      const imageUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
      setSelectedImage(imageUrl);
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
        "http://20.21.120.66:3000/api/user/get-education-by-userId/cdd7e427-50f0-4231-bddb-277ba7e03ea8"
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
        `http://20.21.120.66:3000/api/user/update-education/${education.id}`,
        education
      );
    } catch (error) {
      console.error("Error updating education:", error);
      Notify("success","Education Info updated successfully")

    }
  };

  const handleCreateEducations = async (education: Education) => {
    try {
      await axios.post(
        `http://20.21.120.66:3000/api/user/add-education`,
        education
      );
    } catch (error) {
      console.error("Error updating education:", error);
      Notify("success","Education Info updated successfully")

    }
  };


  const handleDeleteEducation = async (education: Education) => {
    try {
      await axios.post(
        `http://20.21.120.66:3000/api/user/delete-education/${education.id}`
      );
      const updatedEducations = educations.filter(
        (edu) => edu.id !== education.id
      );
      setEducations(updatedEducations);
      Notify("success","Education Info deleted successfully")
    } catch (error) {
      console.error("Error deleting education:", error);
      Notify("error","error in deleting Education Info")

    }
  };

  const handleAddEducation = () => {
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


  
  return (
    <Card title="Educational information's" className="w-3/2 mx-auto mt-6">

    <Collapse>
    {educations.map((education: Education, index: number) => (
          <Panel
            className="mb-2"
            header={`Education ${index + 1}`}
            key={education.id}
          >
            <div className="flex">

<div className="w-3/4 pr-4">
            <Form
              layout="vertical"
              onFinish={() => handleUpdateEducation(education)}
            >
              <Form.Item
                label="Institution"
                name={`Institution_${index}`}
                initialValue={education.Institution}
              >
                <Input
                  onChange={(e) =>
                    handleEducationChange(index, "Institution", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item
                label="Professional Title"
                name={`professionalTitle_${index}`}
                initialValue={education.professionalTitle}
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
              >
                <Input
                  onChange={(e) =>
                    handleEducationChange(index, "fieldOfStudy", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item
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
              <Button htmlType="submit" className="bg-primary" type="primary" onClick={handleCreateEducations}>
                  Save
                </Button>
                <Button htmlType="submit" className="bg-primary" type="primary">
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
            <div className="w-1/4 h-10">
            <input
        id="image-upload-input"
        type="file"
        style={{ display: "none" }}
        onChange={(e) => handleImagePreview(e.target.files[0])}
      />
      <Upload.Dragger
        name="image"
        showUploadList={false}
        beforeUpload={handleImagePreview}
        onChange={handleImageChange}
      >
        {selectedImage ? (
          <img src={selectedImage} alt="Selected" className="mb-4" />
        ) : (
          <div className="text-center h-20">
            <p className="mb-2">Drag & Drop or Click to Upload</p>
            <Button icon={<UploadOutlined />} onClick={handleUploadClick}>
              Select Image
            </Button>
          </div>
        )}
      </Upload.Dragger>
      {selectedImage && (
        <>
          <Button type="link" danger onClick={handleImageRemove}>
            Remove Image
          </Button>
          <Button type="primary" className="bg-primary" onClick={() => handleImageUpload(selectedImage,education.id)}>
            Upload
          </Button>
        </>
      )}
</div>
            </div>
        
          </Panel>
        ))}
      </Collapse>
      <Button className="mt-4 bg-primary text-white hover:text-white" onClick={handleAddEducation}>
        Add Education
      </Button>

   
       
    </Card>
  );
};

export default EducationForm;
