import React, { useEffect, useState } from "react";
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
} from "antd";
import { FieldArray, Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { CheckOutlined } from "@ant-design/icons";
import LicenseForm from "./application-form";
import axios from "axios";
import { useApplyToLicenseMutation } from "./portal.query";
import { useAuth } from "../shared/auth/use-auth";
import { baseUrl } from "../shared/config";

const { Step } = Steps;

interface LicenseRegistrationFormValues {
  agree: boolean;
  experienceList: string[];
  educationList: string[];
  certificationList: string[];
  applicationType: string;
  applierType: string;
  educationId: string;
  certificateId: string;
  experienceId: string;
}

const LicenseRegistrationForm: React.FC = () => {
  /*  */
  const [apply, { data, isLoading }] = useApplyToLicenseMutation();
  const { session } = useAuth();

  const initialValues = {
    agree: false,
    experienceList: [],
    educationList: [],
    certificationList: [],
    applicationType: "",
    applierType: "",
    educationId: [], // Updated: initialize as an empty array
    certificateId: [], // Updated: initialize as an empty array
    experienceId: [], // Updated: initialize as an empty array
  };

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
    applicationType: Yup.string().required("Application Type is required"),
    applierType: Yup.string().required("Applier Type is required"),
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

  /*  */
  const [currentStep, setCurrentStep] = useState(0);
  const { Panel } = Collapse;
  const { Option } = Select;

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    // Handle form submission
    // ...

    console.log("values", values);
    setSubmitting(false);
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
            {/*  */}
            <Field name="category">
        <Radio.Group
          options={[
            { label: "Health Professionals", value: "healthProfessionals" },
            { label: "Health Facilities", value: "healthFacilities" },
            { label: "Food and Health-Related Institutions", value: "foodAndHealthInstitutions" },
          ]}
        />
      
    </Field>
    <Field name="applicationType" as={Select}>
      <Option value="issue">Issue</Option>
      <Option value="renew">Renew</Option>
      <Option value="revoke">Revoke</Option>
      <Option value="suspend">Suspend</Option>
      <Option value="remove">Remove</Option>
    </Field>
<LicenseForm/>

         {/*    <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formikProps) => (
                <Form
                  layout="vertical"
                  className="space-between-4 space-y-20"
                  onFinish={formikProps.handleSubmit}
                >
                  <Form.Item
                    label="Application Type"
                    validateStatus={
                      formikProps.errors.applicationType &&
                      formikProps.touched.applicationType
                        ? "error"
                        : ""
                    }
                    help={
                      formikProps.errors.applicationType &&
                      formikProps.touched.applicationType
                        ? formikProps.errors.applicationType
                        : ""
                    }
                  >
                    <Field name="applicationType" as={Input} />
                  </Form.Item>

                  <Form.Item
                    label="Applier Type"
                    validateStatus={
                      formikProps.errors?.applierType &&
                      formikProps.touched?.applierType
                        ? "error"
                        : ""
                    }
                    help={
                      formikProps.errors?.applierType &&
                      formikProps?.touched?.applierType
                        ? formikProps?.errors?.applierType
                        : ""
                    }
                  >
                    <Field name="applierType" as={Input} />
                  </Form.Item>

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
                          {experience.name}
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
                        <Option key={certificate?.id} value={certificate?.id}>
                          {certificate?.certificateTitle}
                        </Option>
                      ))}
                    </Field>
                  </Form.Item>
                </Form>
              )}
            </Formik> */}

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
    { title: "Confirmation", content: "Confirmation Content" },
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
          agree: false,
          experienceList: [],
          educationList: [],
          certificationList: [],
          applicationType: "",
          applierType: "",
          educationId: "",
          certificateId: "",
          experienceId: "",
        }}
        validationSchema={Yup.object({
          experienceList: Yup.array().min(
            1,
            "Please select at least one experience"
          ),
          educationList: Yup.array().min(
            1,
            "Please select at least one education"
          ),
          certificationList: Yup.array().min(
            1,
            "Please select at least one certification"
          ),
          applicationType: Yup.string().required(
            "Application Type is required"
          ),
          applierType: Yup.string().required("Applier Type is required"),
          educationId: Yup.string().required("Education ID is required"),
          certificateId: Yup.string().required("Certificate ID is required"),
          experienceId: Yup.string().required("Experience ID is required"),
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
            <div className="my-4">{steps[currentStep].content}</div>
            <div className="flex justify-between">
              {currentStep > 0 && (
                <Button
                  type="primary"
                  className="bg-primary text-white"
                  onClick={prevStep}
                >
                  Previous
                </Button>
              )}
              <Button
                type="primary"
                className="bg-blue-500 flex items-center"
                icon={currentStep === 0 ? <CheckOutlined /> : null}
                onClick={nextStep}
              >
                {currentStep === 0 ? "Agree and Continue" : "Next"}
              </Button>
              {/* {currentStep === steps.length - 1 && (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-primary-100 text-primary-100"
                  disabled={formikProps.isSubmitting}
                >
                  Submit
                </Button>
              )} */}
            </div>
            {/* Error messages */}
            {/* {currentStep === 0 && (
              <div className="mt-4">
                <Form.Item>
                  <Checkbox
                    name="agree"
                    checked={formikProps.values.agree}
                    onChange={formikProps.handleChange}
                  >
                    I agree to the terms and conditions
                  </Checkbox>
                  <ErrorMessage name="agree" component="div" className="text-red-600" />
                </Form.Item>
              </div>
            )} */}
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default LicenseRegistrationForm;
