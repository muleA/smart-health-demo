/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Card,
  Collapse,
  Button,
  Input,
  DatePicker,
  Form,
  Upload,
  message,
  Empty,
} from "antd";
import moment from "moment";
import axios from "axios";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  useAddEducationMutation,
  useArchiveEducationMutation,
} from "../portal.query";
import { baseUrl } from "../../configs/config";
import { useAuth } from "../../shared/auth/use-auth";
import { Notify } from "../../shared/notification/notify";
import PreviewFile from "./preview-file";

const { Panel } = Collapse;

interface Education {
  id: string; // Unique identifier for each education
  Institution: string;
  attachment?: any;
  professionalTitle: string;
  studentIdNumber: string;
  fieldOfStudy: string;
  receivedDate: string;
  [key: string]: string | number; // Index signature
}

const EducationForm: React.FC = () => {
  const [educations, setEducations] = useState<Education[]>([]);
  const [file, setFile] = useState<any>();
  const [openedPanelId, setOpenedPanelId] = useState<string | null>(null);
  console.log("openedPanelId", openedPanelId);

  const handleFileChange = (file: any) => {
    setFile(file);
  };
  const [archive, { isLoading: archiving }] = useArchiveEducationMutation();
  const { session } = useAuth();

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
  const [addEducation, { data, isLoading }] = useAddEducationMutation();
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
    const { id, ...otherProps } = education;
    try {
      addEducation(otherProps);
      /*   await axios.post(`${baseUrl}api/user/add-education`,
c        education
    ); */
      message.success("Education Info updated successfully");
    } catch (error) {
      console.error("Error updating education:", error);
      message.error("error happened in Education Info updated successfully");
    }
  };
  console.log("baseUrl", baseUrl);
  const handleCreateEducations = async (education: Education) => {
    const { id, ...otherProps } = education;
    const formData = new FormData();
    formData.append("attachmentUrl", file);
    try {
      const response = (await addEducation({
        ...otherProps,
        userId: session?.userInfo?.userId,
      })) as any;
      console.log("response", response);
      if (response?.data?.id) {
        setOpenedPanelId(response?.data?.id)

        const fileUrl = (await axios.post(
          `${baseUrl}user/add-education-attachment/${response?.data?.id}/${session?.userInfo?.userId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )) as any;
      }

      message.success("Education Info updated successfully");
    } catch (error) {
      console.error("Error updating education:", error);
      message.error("error happened in Education Info updated successfully");
    }
  };

  const handleDeleteEducation = async (education: Education) => {
    try {
      await axios.post(`${baseUrl}user/delete-education/${education.id}`);
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

  const handleArchiveEducation = async (education: Education) => {
    try {
      await archive(education.id);
      const updatedEducations = educations.filter(
        (edu) => edu.id !== education.id
      );
      setEducations(updatedEducations);
      message.success("Education Info Archived successfully");
    } catch (error) {
      console.error("Error deleting education:", error);
      Notify("error", "error in deleting Education Info");
    }
  };

  const handleAddEducation = () => {
    if (educations.length > 0) {
      const firstEducation = educations[0];
      const isFirstEducationEmpty = Object.values(firstEducation).every(
        (value) => value === ""
      );

      if (isFirstEducationEmpty) {
        message.error(
          "Please fill in the education information before adding another education."
        );
        return; // Exit the function early if the first education is empty
      }
    }

    const newEducation: Education = {
      id: "", // Generate a unique ID for the new education
      Institution: "",
      professionalTitle: "",
      studentIdNumber: "",
      fieldOfStudy: "",
      attachment: "",
      receivedDate: "",
    };

    setEducations([newEducation, ...educations]);
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
          {educations?.length === 0 ? (
            <>
              <Empty />
            </>
          ) : (
            <>
              {educations.map((education: Education, index: number) => (
                <Collapse
                  key={index}
                  expandIconPosition="right"
                  defaultActiveKey={0}
                  onChange={() => setOpenedPanelId(education.id)}
                >
                  <Panel
                    className="mb-2"
                    header={`Education ${index + 1}`}
                    key={education.id}
                    extra={
                      <div className="flex space-x-2">
                        <Button
                          type="primary"
                          danger
                          onClick={() => handleArchiveEducation(education)}
                        >
                          Archive
                        </Button>
                        <Button
                          type="primary"
                          danger
                          onClick={() => handleDeleteEducation(education)}
                        >
                          Delete
                        </Button>
                      </div>
                    }
                  >
                    <div className="flex">
                      <div className="w-1/2 h-100">
                        <Form
                          form={form}
                          layout="vertical"
                          className="my-2"
                          onFinish={() => handleCreateEducations(education)}
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
                            className="w-full"
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
                          <Form.Item
                            name="attachment"
                            label="Attachment"
                            className="flex space-x-10"
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
                          {openedPanelId ? (
                            <PreviewFile
                              entityId={openedPanelId}
                              entityType="education"
                            />
                          ) : null}

                          </div>
                          <div className="flex justify-between">
                            <Button
                              htmlType="submit"
                              className="bg-primary"
                              type="primary"
                              loading={isLoading}
                            >
                              Save
                            </Button>
                            {/*   <Button
                          htmlType="submit"
                          className="bg-primary"
                          type="primary"
                        >
                          Update
                        </Button> */}
                          </div>
                        </Form>
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

export default EducationForm;
