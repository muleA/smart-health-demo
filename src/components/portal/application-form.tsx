import React, { useEffect, useState } from "react";
import { Steps, Button, message, Collapse, Card, Alert, Input } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import classNames from "classnames";

import axios from "axios";
import { useApplyToLicenseMutation } from "../portal.query";
import { baseUrl } from "../../configs/config";
import { useAuth } from "../../shared/auth/use-auth";

const { Step } = Steps;

// Define the Yup validation schema for Step 2
const StepTwoSchema = Yup.object().shape({
  applicationType: Yup.string().required("Application Type is required"),
  applicationCategory: Yup.string().required(
    "Application Category is required"
  ),
  applierType: Yup.string().required("Applier Type is required"),
  OwnerName:Yup.string().required("Owner Name is required"),
  professionalName: Yup.string().required("Professional Name is required"),
  professionalNameLastName: Yup.string().required("Professional Last Name is required"),
  qualificationLevel: Yup.string().required("Qualification Level is required"),
  professionalLicenseNumber:Yup.string().required("Professional License Number type is Required"),
  educationId: Yup.array().min(1, "At least one Education ID is required"),
  certificateId: Yup.array().min(1, "At least one Certificate ID is required"),
  experienceId: Yup.array().min(1, "At least one Experience ID is required"),
  nameOfHealthFacility: Yup.string().required("Name of Health Facility is required"),
  facilityOwnerName: Yup.string().required("Facility Owner Name is required"),
  technicalLeaderFullName: Yup.string().required("Technical Leader Full Name is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  subCity: Yup.string().required("Sub City is required"),
  woreda: Yup.string().required("Woreda is required"),
  houseNumber: Yup.string().required("House Number is required"),
  phone: Yup.string().required("Phone is required"),

});

const StepperComponent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { Panel } = Collapse;
  const { session } = useAuth();
const[apply,{isLoading}]=useApplyToLicenseMutation()
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
          }}
          validationSchema={StepTwoSchema}
          onSubmit={ async(values) => {
            // Perform API call for Step 2
            // Replace the API call with your own implementation
            // Here, we're just logging the form values
            console.log("Step 2 form values:", values);
  try{
    await apply(values)
    message.success("application submitted successfully")
  }catch(err){
    message.error("error happened in applying")
  }
            setCurrentStep(2);
          }}
        >
          {({ values, errors, touched }) => (
            <Card className="shadow-sm">
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
                        className="mb-4"
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
                        "border-red-500 ":
                          errors.applicationType && touched.applicationType,
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
                      className="text-red-500"
                    />
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
                        "border-red-500":
                          errors.applicationCategory &&
                          touched.applicationCategory,
                      })}
                    >
                      <option value="">Select Application Category</option>
                      <option value="HealthProfessional">
                        Health Professionals
                      </option>
                      <option value="FoodandHealthRelatedInstitutions">
                        Food and Health-Related Institutions
                      </option>
                    </Field>
                    <ErrorMessage
                      name="applicationCategory"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                  {values?.applicationType && values?.applicationCategory && (
                    <>
                      <div className="mb-4">
                        <label className="font-bold">
                          Applier Type <span className="text-red-400">*</span>
                        </label>
                        <div className="mt-2 ">
                          <label>
                            <Field
                              type="radio"
                              name="applierType"
                              value="owner"
                            />
                            <span className="ml-2">Owner</span>
                          </label>
                          <label>
                            <Field
                              type="radio"
                              name="applierType"
                              className="ml-6"
                              value="delegation"
                            />
                            <span className="ml-2"></span>Delegation
                          </label>
                        </div>
                        <ErrorMessage
                          name="applierType"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      {values?.applierType === "delegation" && (
                        <div className="mb-4">
                          <label
                            htmlFor="file"
                            className="block mb-2 text-sm font-medium text-gray-700"
                          >
                            Upload File
                          </label>
                          <div className="flex items-end">
                            <label
                              htmlFor="file"
                              className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
                            >
                              Choose File
                            </label>
                            <Field
                              type="file"
                              name="file"
                              id="file"
                              className="hidden"
                            />
                            <span className="ml-2 text-gray-600" id="file-name">
                              No file selected
                            </span>
                          </div>
                          {/* <div className="mb-4 ml-10">
                          <label
                            htmlFor="file"
                            className="block mb-2 text-sm font-medium text-gray-700"
                          >
Owner Name                          </label>
                          <div className="flex items-center">
                            <label
                              className="px-10 py-2 text-sm text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
                            >
Owner Name                            </label>
                            <Field
                              type="text"
                              name="Owner Name"
                              id="ownerName"
                            />
                      
                          </div>
                        </div> */}
                        </div>
                      )}
                      <div className="mb-4">
                        <label className="mb-2 text-sm font-bold">
                          Educations <span className="text-red-400">*</span>
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
                                  className="form-checkbox"
                                />
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
                            className="text-red-500"
                          />
                        </div>
                      </div>

                      <div className="mb-2">
                        <label className="mb-2 text-sm font-bold  ">
                          Experiences <span className="text-red-400">*</span>
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
                                className="form-checkbox"
                              />
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
                          className="text-red-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="mb-2 text-sm font-bold ">
                          Certificates <span className="text-red-500">*</span>
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
                                  className="form-checkbox"
                                />
                                <span className="ml-2"> {item.name}</span>
                              </label>
                              <div></div>
                            </div>
                          ))}
                        </div>
                        <ErrorMessage
                          name="certificateId"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    </>
                  )}
                  </div>
                  <div>
                  {values?.applicationType && values?.applicationCategory && values?.applicationCategory != "HealthProfessional" && ( 
                    <>
                    <div className="font-bold text-md mb-2"> Personal Information</div>
                     <div className="grid grid-cols-2 gap-2">
                     <div className="mb-4">
                    <label htmlFor="nameOfHealthFacility">
                    Name of Health Facility and Type of Service
                      <span className="text-red-400">*</span>
                    </label>
                    <Input type="text"
                      name="nameOfHealthFacility"                     
                    ></Input >
                     <ErrorMessage
                          name="nameOfHealthFacility"
                          component="div"
                          className="text-red-500"
                        />
                    </div>
                    {values?.applierType === "delegation" && (

                    <div className="mb-4">
                    <label htmlFor="facilityOwnerName">
                    Facility Owner Name
                      <span className="text-red-400">*</span>
                    </label>
                    <Input type="text"
                      name="facilityOwnerName"                     
                    ></Input >
                     <ErrorMessage
                          name="facilityOwnerName"
                          component="div"
                          className="text-red-500"
                        />
                    </div> )}
                    <div className="mb-4">
                    <label htmlFor="technicalLeaderFullName">
                    Technical Leader full Name
                      <span className="text-red-400">*</span>
                    </label>
                    <Input type="text"
                      name="technicalLeaderFullName"                     
                    ></Input >
                     <ErrorMessage
                          name="technicalLeaderFullName"
                          component="div"
                          className="text-red-500"
                        />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="qualification">
                    Qualification
                      <span className="text-red-400">*</span>
                    </label>
                    <Input type="text"
                      name="qualificationLevel"                     
                    ></Input >
                     <ErrorMessage
                          name="qualification"
                          component="div"
                          className="text-red-500"
                        />
                    </div>
                    <div className="mb-4">
                          <label
                            htmlFor="file"
                            className="block mb-2 text-sm font-medium text-gray-700"
                          >
                            Upload Picture
                          </label>
                          <div className="flex items-center">
                            <label
                              htmlFor="file"
                              className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
                            >
                              Choose Picture
                            </label>
                            <Field
                              type="file"
                              name="file"
                              id="file"
                              className="hidden"
                            />
                            <span className="ml-2 text-gray-600" id="file-name">
                              No picture selected
                            </span>
                          </div>
                        </div>
                    <div className="mb-4">
                    <label htmlFor="address">
                    Address
                      <span className="text-red-400">*</span>
                    </label>
                    <div>
                      
                    <Input type="text"
                      name="address"                     
                      ></Input >
                      </div>
                     <ErrorMessage
                          name="address"
                          component="div"
                          className="text-red-500"
                        />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="city">
                    City
                      <span className="text-red-400">*</span>
                    </label>
                    <Input type="text"
                      name="city"                     
                    ></Input >
                     <ErrorMessage
                          name="city"
                          component="div"
                          className="text-red-500"
                        />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="subCity">
                    SubCity
                      <span className="text-red-400">*</span>
                    </label>
                    <Input type="text"
                      name="subCity"                     
                    ></Input >
                     <ErrorMessage
                          name="subCity"
                          component="div"
                          className="text-red-500"
                        />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="woreda">
                    Woreda
                      <span className="text-red-400">*</span>
                    </label>
                    <Input type="text"
                      name="woreda"                     
                    ></Input >
                     <ErrorMessage
                          name="woreda"
                          component="div"
                          className="text-red-500"
                        />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="houseNumber">
                    House No.
                      <span className="text-red-400">*</span>
                    </label>
                    <Input type="text"
                      name="houseNumber"                     
                    ></Input >
                     <ErrorMessage
                          name="houseNumber"
                          component="div"
                          className="text-red-500"
                        />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="phone">
                    Telephone No.
                      <span className="text-red-400">*</span>
                    </label>
                    <Input type="text"
                      name="phone"                     
                    ></Input >
                     <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-red-500"
                        />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="professionalLicenseNumber">
                    professionalLicenseNumber No.
                      <span className="text-red-400">*</span>
                    </label>
                    <Input type="text"
                      name="professionalLicenseNumber"                     
                    ></Input >
                     <ErrorMessage
                          name="professionalLicenseNumber"
                          component="div"
                          className="text-red-500"
                        />
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
                    </>
                  )}
                  {values?.applicationType && values?.applicationCategory === "HealthProfessional" && ( 
                    <>
                     <div className="font-bold text-md mb-2"> Personal Information</div>
                    <div className="grid grid-cols-2 gap-2">
                     <div className="mb-4">
                    <label htmlFor="professionalName">
                    First Name
                      <span className="text-red-400">*</span>
                    </label>
                    <Input type="text"
                      name="professionalName"                     
                    ></Input >
                     <ErrorMessage
                          name="professionalName"
                          component="div"
                          className="text-red-500"
                        />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="professionalNameLastName">
                    Last Name
                      <span className="text-red-400">*</span>
                    </label>
                    <Input type="text"
                      name="professionalNameLastName"                     
                    ></Input >
                     <ErrorMessage
                          name="professionalNameLastName"
                          component="div"
                          className="text-red-500"
                        />
                    </div>
                    <div className="mb-4">
                          <label
                            htmlFor="file"
                            className="block mb-2 text-sm font-medium text-gray-700"
                          >
                            Upload Picture
                          </label>
                          <div className="flex items-center">
                            <label
                              htmlFor="file"
                              className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
                            >
                              Choose Picture
                            </label>
                            <Field
                              type="file"
                              name="file"
                              id="file"
                              className="hidden"
                            />
                            <span className="ml-2 text-gray-600" id="file-name">
                              No picture selected
                            </span>
                          </div>
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
                    </>
                  )}
                  </div>
                  </div>
                </Card>
              </Form>
            </Card>
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
  <Alert className="m-2"
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
        {currentStep < steps.length - 1 && currentStep !== 0 && (
          <Button
            type="primary"
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
