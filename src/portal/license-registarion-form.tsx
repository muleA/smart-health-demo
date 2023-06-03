import React, { useEffect, useRef, useState } from "react";
import {
  Steps,
  Button,
  Form,
  Card,
  Alert,
  Checkbox,
  Input,
  Collapse,
  Select,
  Radio,
  message,
} from "antd";
import { FieldArray, Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { CheckOutlined } from "@ant-design/icons";
import LicenseForm from "./application-form";
import axios from "axios";
import { useApplyToLicenseMutation } from "./portal.query";
import { useAuth } from "../shared/auth/use-auth";
import { baseUrl } from "../shared/config";
import type { RadioChangeEvent } from "antd";
import { Space } from "antd";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;

interface LicenseRegistrationFormValues {
  educationId: string[];
  certificateId: string[];
  experienceId: string[];
}

const LicenseRegistrationForm: React.FC = () => {
  /*  */
  const [apply, { data, isLoading }] = useApplyToLicenseMutation();
  const { session } = useAuth();

  const initialValues = {
    educationId: [], // Updated: initialize as an empty array
    certificateId: [], // Updated: initialize as an empty array
    experienceId: [], // Updated: initialize as an empty array
  };
  const [selectedEducations, setSelectedEducations] = useState([]);
const [selectedExperiences, setSelectedExperiences] = useState([]);
const [selectedCertificates, setSelectedCertificates] = useState([]);


  const [educations, setEducations] = useState<any>([]);
  const [experiences, setExperiences] = useState<any>([]);
  const [certificates, setCertificates] = useState<any>([]);

  useEffect(() => {
    fetchEducations();
    fetchExperiences();
    fetchCertificates();
  }, []);

  const fetchEducations = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}user/get-education-by-userId/${session?.userInfo?.userId}`
      );
      setEducations(response.data);
    } catch (error) {
      console.error("Error fetching educations:", error);
    }
  };

  const fetchExperiences = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}user/get-experience-by-userId/${session?.userInfo?.userId}`
      );
      setExperiences(response.data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  };

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

  const validationSchema = Yup.object().shape({
    educationId: Yup.array()
      .min(1, "At least one Education ID is required")
      .required("Education ID is required"),
    experienceId: Yup.array()
      .min(1, "At least one Experience ID is required")
      .required("Experience ID is required"),
    certificateId: Yup.array()
      .min(1, "At least one Certificate ID is required")
      .required("Certificate ID is required"),
  });


  const formRef = useRef<any>(null); // Added: Reference to the Form component
const navigate=useNavigate()
  const handleStep1Submit = async (values: LicenseRegistrationFormValues) => {
      console.log("valeues",values)
    try {
      // Submit the form using the formRef
      await formRef.current.submitForm();

      // Call the Axios POST API
      const response = await axios.post(
        `${baseUrl}license-application/apply`,
        {
          // Provide the form values in the request body
          educationId: values.educationId,
          certificateId: values.certificateId,
          experienceId: values.experienceId,
        }
      );

      // Handle the response as needed
      console.log("API response:", response.data);
    } catch (error) {
      console.error("Error applying to license:", error);
    }
  };


  /*  */
  const [currentStep, setCurrentStep] = useState(0);
  const { Panel } = Collapse;
  const { Option } = Select;

  const nextStep = async (formikProps:any) => {
    console.log("formikProps.values.",formikProps.values)
    if (currentStep === 0) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 1) {
      await formikProps.submitForm();
      if (formikProps.isValid) {
        setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 2) {
      try {
        await formikProps.submitForm();
  
        const response = await axios.post(`${baseUrl}user/add-applicationToUser/${session?.userInfo?.userId}`, {
          educationId: ["a87fd5c3-b5cf-4557-a814-55cb866c4668"],
          certificateId: ["978de692-d4d2-419c-a11c-e2f95ee5d96b"],
          experienceId: ["a87fd5c3-b5cf-4557-a814-55cb866c4668"],
          applierType: selectedType,
          applicationType: selectedCategory,
        });
  
        console.log("API response:", response.data);
        message.success("applied successfully")
        // Handle the response as needed
  navigate("/my-applications")
        setCurrentStep(currentStep + 1);
      } catch (error) {
        console.error("Error applying to license:", error);
        message.error("error happened")
      }
    }
  };
  

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    // Handle form submission
    // ...

    console.log("values", values);
    try {
      apply({
        ...values,
        applierType: selectedType,
        applicationType: selectedCategory,
      });
      message.success("successfully applied");
    } catch (err) {
      message.error("error occurred in applying");
    }
    setSubmitting(false);
  };
  const [selectedCategory, setSelectedCategory] = useState<any>("");
  const [selectedType, setSelectedtype] = useState<any>("");

  const handleChange = (value: string) => {
    console.log(` selected type ${value}`);
    setSelectedtype(value);
  };
  const handleCategoryChange = (value: string) => {
    console.log(value);
    setSelectedCategory(value);
  };
  const AgreeAndInstruction: React.FC = () => {
    return (
      <>
        <div>
          <h1 className="text-xl font-bold mb-2">Application Description</h1>
          <p>
            Applicants who want to get the service of New Registration of
            Professionals license by the Ethiopian Medical Authority: Submit
            their service request by filling the application form.
          </p>
        </div>
        <div>
          <h1 className="text-xl font-bold mt-8 mb-2">Who Can Apply</h1>
          <p>
            Any construction Industry professional that works in the
            construction sector and professionals that fulfill the requirements
            of the services can apply for this service. If you have work
            experience in the construction industry, you can apply for upgrading
            professional license service.
          </p>
        </div>
        <div>
          <h1 className="text-xl font-bold mt-8 mb-2">Prerequisite</h1>
          <ul className="list-disc ml-6">
            <li>
              Experience and Educational documents acquired from foreign
              countries should be authenticated by the Ministry of Foreign
              Affairs of Ethiopia.
            </li>
            <li>Attach Work experience.</li>
            <li>Attach Renewed Resident Id card (Driving license).</li>
            <li>Two 3x3 photographs.</li>
            <li>Attach Educational evidence.</li>
            <li>Attach COC (from level 1 up to 5).</li>
          </ul>
        </div>
        <div>
          <h1 className="text-xl font-bold mt-8 mb-2">
            List Of Attached Instruction Documents
          </h1>
          <Collapse ghost>
            <Panel header="View PDF" key={""}>
              <div className="flex justify-center items-center">
                <iframe
                  src="https://example.com/path/to/your/pdf.pdf"
                  title="PDF Viewer"
                  className="w-full h-3/2"
                />
              </div>
            </Panel>
          </Collapse>
        </div>
        <Card>
          {currentStep === 0 && (
            <Alert
              description="By continuing to use the system, you certify that you have read the above service request instruction and accept the applicable Terms and Conditions."
              type="info"
              showIcon
            />
          )}
        </Card>
      </>
    );
  };

  const ApplicationForm: React.FC = () => {
    return (
      <>
        <div>
          <h1 className="text-xl font-bold mb-2">Application Form</h1>
          <Card className="mx-auto mb-10 space-y-10 w-3/2">
            <Card>
              <Alert
                type="warning"
                message="Please first choose application Type and Application Category"
              ></Alert>
              <Space wrap className="space-x-6 my-4">
                <Select
                  style={{ width: 420, margin: "10px" }}
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  options={[
                    {
                      label: "Health Professionals",
                      value: "HealthProfessionals",
                    },
                    { label: "Health Facilities", value: "HealthFacilities" },
                    {
                      label: "Food and Health-Related Institutions",
                      value: "FoodandHealth-RelatedInstitutions",
                    },
                  ]}
                />
              </Space>

              <Space wrap>
                <Select
                  style={{ width: 420 }}
                  value={selectedType}
                  onChange={handleChange}
                  options={[
                    { value: "issue", label: "issue" },
                    { value: "renew", label: "renew" },
                    { value: "revoke", label: "revoke" },
                    { value: "suspend", label: "suspend" },
                    { value: "remove", label: "remove" },
                  ]}
                />
              </Space>
            </Card>

            {selectedCategory && selectedType ? (
              <>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleStep1Submit}

                >
                  {(formikProps) => (
                    <Form
                      layout="vertical"
                      className="space-between-4 space-y-20"
                      onFinish={formikProps.handleSubmit}
                    >
                      <Form.Item
                        label="Education"
                        validateStatus={
                          formikProps?.errors?.educationId &&
                          formikProps.touched.educationId
                            ? "error"
                            : ""
                        }
                        help={
                          formikProps.errors.educationId &&
                          formikProps.touched.educationId
                            ? formikProps.errors.educationId
                            : ""
                        }
                      >
                        <Field
                          name="educationId"
                          as={Select}
                          mode="multiple"
                          loading={educations.length === 0}
                          value={formikProps.values.educationId}
                          onChange={(value: any) =>
                            formikProps.setFieldValue("educationId", value)
                          }
                        >
                          {educations.map((education: any) => (
                            <Option key={education.id} value={education.id}>
                              {education.professionalTitle}
                            </Option>
                          ))}
                        </Field>
                      </Form.Item>

                      <Form.Item
                        label="Experience"
                        validateStatus={
                          formikProps.errors.experienceId &&
                          formikProps.touched.experienceId
                            ? "error"
                            : ""
                        }
                        help={
                          formikProps.errors.experienceId &&
                          formikProps.touched.experienceId
                            ? formikProps.errors.experienceId
                            : ""
                        }
                      >
                        <Field
                          name="experienceId"
                          as={Select}
                          mode="multiple"
                          loading={experiences.length === 0}
                          value={formikProps.values.experienceId}
                          onChange={(value: any) =>
                            formikProps.setFieldValue("experienceId", value)
                          }
                        >
                          {experiences.map((experience: any) => (
                            <Option key={experience.id} value={experience.id}>
                              {experience.organizationName}
                            </Option>
                          ))}
                        </Field>
                      </Form.Item>

                      <Form.Item
                        label="Certificate"
                        validateStatus={
                          formikProps.errors.certificateId &&
                          formikProps.touched.certificateId
                            ? "error"
                            : ""
                        }
                        help={
                          formikProps.errors.certificateId &&
                          formikProps.touched.certificateId
                            ? formikProps.errors.certificateId
                            : ""
                        }
                      >
                        <Field
                          name="certificateId"
                          as={Select}
                          mode="multiple"
                          loading={certificates.length === 0}
                          value={formikProps.values.certificateId}
                          onChange={(value: any) =>
                            formikProps.setFieldValue("certificateId", value)
                          }
                        >
                          {certificates?.map((certificate: any) => (
                            <Option
                              key={certificate?.id}
                              value={certificate?.id}
                            >
                              {certificate?.certificateTitle}
                            </Option>
                          ))}
                        </Field>
                      </Form.Item>
{/*                       <Button onClick={handleStep1Submit}>Save Application</Button>
 */}
                    </Form>

                    

                  )}
                </Formik>
              </>
            ) : null}

            {/*  */}
          </Card>
        </div>
        {currentStep === 0 ? (
          <>
            <Card>
              {currentStep === 0 && (
                <Alert
                  description="By continuing to use the system, you certify that you have read the above service request instruction and accept the applicable Terms and Conditions."
                  type="info"
                  showIcon
                />
              )}
            </Card>
          </>
        ) : null}
      </>
    );
  };

  const steps = [
    { title: "Instructions", content: <AgreeAndInstruction /> },
    { title: "Application Form", content: <ApplicationForm /> },
  ];

  return (
    <Card className="w-3/2 h-full">
      <h1 className="text-xl  font-bold mb-2">
        Registrations To Get Professional Licenses
      </h1>

      <h1 className="mb-10">
        New Professional Licensing Service is provided for those who have
        graduated from an accredited educational institution and/or for the
        experts of experience who have Certification of Occupational Competency
        (COC). To register as a new professional, one must not have received any
        professional licenses from this Authority before.
      </h1>
      <Formik
        initialValues={{
          educationId: [],
          certificateId: [],
          experienceId: [],
        }}
        validationSchema={Yup.object({
          experienceId: Yup.array().min(
            1,
            "Please select at least one experience"
          ),
          educationId: Yup.array().min(
            1,
            "Please select at least one education"
          ),
          certificateId: Yup.array().min(
            1,
            "Please select at least one certification"
          ),
        
        })}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <Form
            layout="vertical"
            className="space-between-4 space-y-20"
            onFinish={formikProps.handleSubmit}
          >
            <Steps current={currentStep}>
              {steps.map((step) => (
                <Step key={step.title} title={step.title} />
              ))}
            </Steps>
            <div className="my-4">{steps[currentStep]?.content}</div>
            <div className="flex justify-between">
            {/*   {currentStep > 0 && (
                <Button
                  type="primary"
                  className="bg-primary text-white"
                  onClick={prevStep}
                >
                  Previous
                </Button>
              )} */}
              <Button
                type="primary"
                className="bg-blue-500 flex items-center"
                icon={currentStep === 0 ? <CheckOutlined /> : null}
                onClick={()=>nextStep(formikProps)}
              >
                {currentStep === 0 ? "Agree and Continue":currentStep===1?"Next": "Save"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default LicenseRegistrationForm;
