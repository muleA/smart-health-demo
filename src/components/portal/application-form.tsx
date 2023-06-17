import React, { useEffect, useState } from "react";
import { Steps, Button, message, Collapse, Card, Alert, Input, Upload } from "antd";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import classNames from "classnames";

import axios from "axios";
import { useApplyToLicenseMutation } from "../portal.query";
import { baseUrl } from "../../configs/config";
import { useAuth } from "../../shared/auth/use-auth";
import { UploadOutlined } from "@ant-design/icons";
import RequestForm from "./upload-progress";

const { Step } = Steps;

// Define the Yup validation schema for Step 2


const StepperComponent = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const { Panel } = Collapse;
  const { session } = useAuth();
  const [apply, { isLoading }] = useApplyToLicenseMutation();
  const [educations, setEducations] = useState<any>([]);
  const [experiences, setExperiences] = useState<any>([]);
  const [certificates, setCertificates] = useState<any>([]);

 const StepTwoSchema = Yup.object().shape({
  userId: Yup.string(),
  applicationType: Yup.string(),
  applicationCategory: Yup.string(),
  applierType: Yup.string(),
  delegationFile: Yup.string(),
  applierProfilePicture: Yup.string(),
  educationId: Yup.array().of(Yup.string()),
  experienceIdId: Yup.array().of(Yup.string()),
  certificateId: Yup.array().of(Yup.string()),
  state: Yup.string(),
  subCity: Yup.string(),
  woreda: Yup.string(),
  kebele: Yup.string(),
  houseNumber: Yup.string(),
  phone: Yup.string(),
  ownerName: Yup.string(),
  lastName: Yup.string(),
  professionalName: Yup.string(),
  professionalLastName: Yup.string(),
  qualificationLevel: Yup.string(),
  professionalLicenseNumber: Yup.string(),
  createdAt: Yup.date().default(() => new Date()),
});
  

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
  const [fileName, setFileName] = useState('');

  const handleFileChange = (info: { file: any; }) => {
    const file = info.file;
    setFileName(file ? file.name : 'No file selected');
  };


  const steps = [
    {
      title: "Step 1",
      content: (
        <Card>
          <h1 className="text-xl font-bold mb-2">Step 1: Agree and Continue</h1>
          <hr className="mt-4 mb-4" />
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
              construction sector and professionals that fulfill the
              requirements of the services can apply for this service. If you
              have work experience in the construction industry, you can apply
              for upgrading professional license service.
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
          <Button
            type="primary"
            className="bg-primary text-white mt-4"
            onClick={() => setCurrentStep(1)}
          >
            Agree and Continue
          </Button>
        </Card>
      ),
    },
    {
      title: "Step 2",
      content: (
        
        <Formik
          initialValues={{
            applicationType: "",
            applicationCategory: "",
            applierType: "",
            educationId: [],
            certificateId: [],
            delegationFile:"",
            experienceId: [],
            ownerName: "",
            professionalName: "",
            professionalNameLastName: "",
            qualificationLevel: "",
            nameOfHealthFacility: "",
            facilityOwnerName: "",
            technicalLeaderFullName: "",
            address: "",
            city: "",
            subCity: "",
            woreda: "",
            houseNumber: "",
            phone: "",
            professionalLicenseNumber: "",
            oldProfessionalLicenseNumber: "",
          }}
          validationSchema={StepTwoSchema}
          onSubmit={async (values) => {
            
            // Perform API call for Step 2
            // Replace the API call with your own implementation
            // Here, we're just logging the form values
            console.log("Step 2 form values:", values);
            try {
              await apply({...values,userId:session?.userInfo?.userId}).unwrap;
               message.success("application submitted successfully");
            } catch (err) {
              message.error("error happened in applying");
            }
          }}
        >
          {({ values, errors, touched }) => (

            <><>

            </><Card className="shadow-sm">
                <Form className="rounded">
                  <h1 className="text-xl font-bold mb-2">
                    Step 2: Fill The Application Form
                  </h1>
                  <hr className="mt-4 mb-4" />
                  <Card className="mx-auto mb-10 space-y-10 w-3/2">
                    {!(values?.applicationType && values?.applicationCategory) ? (
                      <>
                        <Alert
                          type="warning"
                          className="mb-2"
                          showIcon
                          closable
                          message="Please first choose application Type and Application Category"
                        ></Alert>
                      </>
                    ) : null}

                    <div className="mb-4">
                      <label htmlFor="applicationType" className="font-bold">
                        Application Type <span className="text-red-400">*</span>
                      </label>
                      <Field
                        as="select"
                        name="applicationType"
                        className={classNames("w-full p-2 mt-2 border", {
                          "border-red-500 ": errors.applicationType && touched.applicationType,
                        })}
                      >
                        <option value="">Select Application Type</option>
                        <option value="issue">Issue</option>
                        <option value="renew">Renew</option>
                        <option value="revoke">Revoke</option>
                        <option value="suspend">Suspend</option>
                        <option value="remove">Remove</option>
                      </Field>
                      <ErrorMessage
                        name="applicationType"
                        component="div"
                        className="text-red-500" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="applicationCategory" className="font-bold">
                        Application Category{" "}
                        <span className="text-red-400">*</span>
                      </label>
                      <Field
                        as="select"
                        name="applicationCategory"
                        className={classNames("w-full p-2 mt-2 border", {
                          "border-red-500": errors.applicationCategory &&
                            touched.applicationCategory,
                        })}
                      >
                        <option value="">Select Application Category</option>
                        <option value="HealthProfessional">
                          Health Professionals
                        </option>
                        <option value="CompetencyCertificateforGeneralHospital">
                          Competency Certificate for General Hospital
                        </option>
                        <option value="CompetencyCertificateforSpecialtyCenter">
                          Competency Certificate for Specialty Center
                        </option>
                        <option value="CompetencyCertificateforRetailPharmacy">
                          Competency Certificate for Retail Pharmacy
                        </option>
                      </Field>
                      <ErrorMessage
                        name="applicationCategory"
                        component="div"
                        className="text-red-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        {values?.applicationType &&
                          values?.applicationCategory && (
                            <>
                              <div className="mb-4">
                                <label className="font-bold">
                                  Applier Type{" "}
                                  <span className="text-red-400">*</span>
                                </label>
                                <div className="mt-2 ">
                                  <label>
                                    <Field
                                      type="radio"
                                      name="applierType"
                                      value="owner" />
                                    <span className="ml-2">Owner</span>
                                  </label>
                                  <label>
                                    <Field
                                      type="radio"
                                      name="applierType"
                                      className="ml-6"
                                      value="delegation" />
                                    <span className="ml-2"></span>Delegation
                                  </label>
                                </div>
                                <ErrorMessage
                                  name="applierType"
                                  component="div"
                                  className="text-red-500" />
                              </div>
                              {values?.applierType === 'delegation' && (
                                <div className="mb-4">
                                  <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-700">
                                    Upload File
                                  </label>
                                  <input type="file" name="delegationFile" className="block mb-2 text-sm font-medium text-gray-700"/>
                                 {/*  <Upload
                                    accept=".jpg, .jpeg, .png, .gif, .pdf"
                                    beforeUpload={() => false}
                                    showUploadList={false}
                                    onChange={handleFileChange}
                                  >
                                    <Button icon={<UploadOutlined />}>Choose File</Button>
                                  </Upload> */}
                                  <span className="ml-2 text-gray-600" id="file-name">
                                    {fileName}
                                  </span>
                                  <ErrorMessage name="delegationFile" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                              )}
                              <div className="mb-4">
                                <label className="mb-2 text-sm font-bold">
                                  Educations{" "}
                                  <span className="text-red-400">*</span>
                                </label>
                                <div className="flex flex-col gap-4 mt-4 ">
                                  {educations?.map((item: any) => (
                                    <div
                                      className="flex items-center justify-start "
                                      key={item.id}
                                    >
                                      <label className="flex items-center">
                                        <Field
                                          type="checkbox"
                                          name="educationId"
                                          value={item.id}
                                          className="form-checkbox" />
                                        <span className="ml-2">
                                          {" "}
                                          {item.professionalTitle}
                                        </span>
                                      </label>
                                      <div></div>
                                    </div>
                                  ))}
                                  <ErrorMessage
                                    name="educationId"
                                    component="div"
                                    className="text-red-500" />
                                </div>
                              </div>

                              <div className="mb-2">
                                <label className="mb-2 text-sm font-bold  ">
                                  Experiences{" "}
                                  <span className="text-red-400">*</span>
                                </label>
                                {experiences?.map((item: any) => (
                                  <div
                                    className="flex items-center justify-start mt-4 mb-4"
                                    key={item.id}
                                  >
                                    <label className="flex items-center">
                                      <Field
                                        type="checkbox"
                                        name="experienceId"
                                        value={item.id}
                                        className="form-checkbox" />
                                      <span className="ml-2">
                                        {" "}
                                        {item.organizationName}
                                      </span>
                                    </label>
                                    <div></div>
                                  </div>
                                ))}
                                <ErrorMessage
                                  name="experienceId"
                                  component="div"
                                  className="text-red-500" />
                              </div>

                              <div className="flex flex-col">
                                <label className="mb-2 text-sm font-bold ">
                                  Certificates{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <div className="flex flex-col gap-4 mb-4 mt-4">
                                  {certificates?.map((item: any) => (
                                    <div
                                      className="flex items-center justify-start"
                                      key={item.id}
                                    >
                                      <label className="flex items-center">
                                        <Field
                                          type="checkbox"
                                          name="certificateId"
                                          value={item.id}
                                          className="form-checkbox" />
                                        <span className="ml-2"> {item.name}</span>
                                      </label>
                                      <div></div>
                                    </div>
                                  ))}
                                </div>
                                <ErrorMessage
                                  name="certificateId"
                                  component="div"
                                  className="text-red-500" />
                              </div>
                            </>
                          )}
                      </div>
                      <div>
                        {values?.applicationType &&
                          values?.applicationCategory &&
                          values?.applicationCategory !== "HealthProfessional" && (
                            <>
                              <div className="font-bold text-md mb-2">
                                {" "}
                                Personal Information
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="mb-4">
                                  <label htmlFor="nameOfHealthFacility">
                                    Name of Health Facility and Type of Service
                                    <span className="text-red-400">*</span>
                                  </label>
                                  <Input
                                    type="text"
                                    name="nameOfHealthFacility"
                                  ></Input>
                                  <ErrorMessage
                                    name="nameOfHealthFacility"
                                    component="div"
                                    className="text-red-500" />
                                </div>
                                {values?.applierType === "delegation" && (
                                  <div className="mb-4">
                                    <label htmlFor="facilityOwnerName">
                                      Facility Owner Name
                                      <span className="text-red-400">*</span>
                                    </label>
                                    <Input
                                      type="text"
                                      name="facilityOwnerName"
                                    ></Input>
                                    <ErrorMessage
                                      name="facilityOwnerName"
                                      component="div"
                                      className="text-red-500" />
                                  </div>
                                )}
                                <div className="mb-4">
                                  <label htmlFor="technicalLeaderFullName">
                                    Technical Leader full Name
                                    <span className="text-red-400">*</span>
                                  </label>
                                  <Input
                                    type="text"
                                    name="technicalLeaderFullName"
                                  ></Input>
                                  <ErrorMessage
                                    name="technicalLeaderFullName"
                                    component="div"
                                    className="text-red-500" />
                                </div>
                                <div className="mb-4">
                                  <label htmlFor="qualification">
                                    Qualification
                                    <span className="text-red-400">*</span>
                                  </label>
                                  <Input
                                    type="text"
                                    name="qualificationLevel"
                                  ></Input>
                                  <ErrorMessage
                                    name="qualificationLevel"
                                    component="div"
                                    className="text-red-500" />
                                </div>

                                <div className="mb-4">
                                  <label htmlFor="address">
                                    Address
                                    <span className="text-red-400">*</span>
                                  </label>
                                  <div>
                                    <Input type="text" name="address"></Input>
                                  </div>
                                  <ErrorMessage
                                    name="address"
                                    component="div"
                                    className="text-red-500" />
                                </div>
                                <div className="mb-4">
                                  <label htmlFor="city">
                                    City
                                    <span className="text-red-400">*</span>
                                  </label>
                                  <Input type="text" name="city"></Input>
                                  <ErrorMessage
                                    name="city"
                                    component="div"
                                    className="text-red-500" />
                                </div>
                                <div className="mb-4">
                                  <label htmlFor="subCity">
                                    SubCity
                                    <span className="text-red-400">*</span>
                                  </label>
                                  <Input type="text" name="subCity"></Input>
                                  <ErrorMessage
                                    name="subCity"
                                    component="div"
                                    className="text-red-500" />
                                </div>
                                <div className="mb-4">
                                  <label htmlFor="woreda">
                                    Woreda
                                    <span className="text-red-400">*</span>
                                  </label>
                                  <Input type="text" name="woreda"></Input>
                                  <ErrorMessage
                                    name="woreda"
                                    component="div"
                                    className="text-red-500" />
                                </div>
                                <div className="mb-4">
                                  <label htmlFor="houseNumber">
                                    House No.
                                    <span className="text-red-400">*</span>
                                  </label>
                                  <Input type="text" name="houseNumber"></Input>
                                  <ErrorMessage
                                    name="houseNumber"
                                    component="div"
                                    className="text-red-500" />
                                </div>
                                <div className="mb-4">
                                  <label htmlFor="phone">
                                    Telephone No.
                                    <span className="text-red-400">*</span>
                                  </label>
                                  <Input type="text" name="phone"></Input>
                                  <ErrorMessage
                                    name="phone"
                                    component="div"
                                    className="text-red-500" />
                                </div>
                                <div className="mb-4">
                                  <label htmlFor="professionalLicenseNumber">
                                    Professional License Number
                                    <span className="text-red-400">*</span>
                                  </label>
                                  <Input
                                    type="text"
                                    name="professionalLicenseNumber"
                                  ></Input>
                                  <ErrorMessage
                                    name="professionalLicenseNumber"
                                    component="div"
                                    className="text-red-500" />
                                </div>
                                {values?.applicationType !== "issue" && (
                                  <div className="mb-4">
                                    <label htmlFor="oldProfessionalLicenseNumber">
                                      Old  License Number
                                      <span className="text-red-400">*</span>
                                    </label>
                                    <Input
                                      type="text"
                                      name="oldProfessionalLicenseNumber"
                                    ></Input>
                                    <ErrorMessage
                                      name="oldProfessionalLicenseNumber"
                                      component="div"
                                      className="text-red-500" />
                                  </div>
                                )}
                              </div>

                            </>
                          )}
                        {values?.applicationType &&
                          values?.applicationCategory === "HealthProfessional" &&
                          values?.applierType === "delegation" && (
                            <>
                              <div className="font-bold text-md mb-2">
                                {" "}
                                Personal Information
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="mb-4">
                                  <label htmlFor="professionalName">
                                   Owner Full Name
                                    <span className="text-red-400">*</span>
                                  </label>
                                  <Input
                                    type="text"
                                    name="professionalName"
                                  ></Input>
                                  <ErrorMessage
                                    name="professionalName"
                                    component="div"
                                    className="text-red-500" />
                                </div>
                                <div className="mb-4">
                                  <label htmlFor="professionalNameLastName">
                                    Last Name
                                    <span className="text-red-400">*</span>
                                  </label>
                                  <Input
                                    type="text"
                                    name="professionalNameLastName"
                                  ></Input>
                                  <ErrorMessage
                                    name="professionalNameLastName"
                                    component="div"
                                    className="text-red-500" />
                                </div>
                              </div>

                     
                            </>
                          )}

                      </div>
                    </div>
                    <div className="flex justify-end mt-8">
                      <Button
                        type="primary"
                        className="bg-primary text-white"
                        htmlType="submit"

                      >
                        Submit
                      </Button>
                    </div>
                  </Card>

                </Form>
              </Card></>
          )}
        </Formik>
      ),
    },
    {
      title: "Step 3",
      content: (
        <Card>
          <h1 className="text-xl font-bold mb-2">
            Step 3: Success Information
          </h1>
          <hr className="mt-4 mb-4" />
          <p>Form submitted successfully!</p>
          <RequestForm/>

        </Card>
      ),
    },
  ];

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div>
      <Alert
        className="m-2"
        message="Note"
        description="The name you use on the application is going to be used on the license."
        type="warning"
        showIcon
        closable
      />
      <Steps current={currentStep}>
        {steps.map((step) => (
          <Step key={step.title} title={step.title} />
        ))}
      </Steps>
      <div className="mt-4">
        {steps[currentStep].content}
        {currentStep > 0 && (
          <Button
            className="mr-4  mt-4 ml-6 bg-primary text-white"
            onClick={handlePrev}
          >
            Previous
          </Button>
        )}
        {currentStep < steps.length - 1 && currentStep !== 0 &&(
          <Button
            type="primary"
            htmlType="submit"
            className="bg-primary text-white"
            onClick={handleNext}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default StepperComponent;