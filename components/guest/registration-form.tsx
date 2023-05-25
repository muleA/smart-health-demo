import React, { useState } from "react";
import { Modal, Steps, Form, Input, Button, Radio } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Notify } from "../../shared/notification/notify";
import { baseUrl } from "../../shared/config";
import { useAuth } from "../../shared/auth/use-auth";

const { Step } = Steps;

interface RegistrationFormProps {
  visible: boolean;
  onClose: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  visible,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [accountInfo,setAccountInfo]=useState<any>(null)
  console.log("accountInfo",accountInfo)
  const {session}=useAuth()
    console.log("session",session)
  const steps = [
    {
      title: "Step 1",
      validationSchema: Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        phone: Yup.string().required("Phone number is required"),
        password: Yup.string().required("Password is required"),
        username: Yup.string().required("name is required"),
        status: Yup.string().required("Status is required"),
      }),
    },
    {
      title: "Step 2",
      validationSchema: Yup.object({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        woreda: Yup.string().required("Woreda is required"),
        state: Yup.string().required("State is required"),
        middleName: Yup.string().required("Middle Name is required"),
        city: Yup.string().required("City is required"),
        kebele: Yup.string().required("Kebele is required"),
        houseNumber: Yup.string().required("House Number is required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
      }),
    },
  ];

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      subCity:"",
      status: "",
      firstName: "",
      lastName: "",
      woreda: "",
      gender: "male",
      state: "",
      middleName: "",
      name: "",
      city: "",
      username: "",
      kebele: "",
      houseNumber: "",
    },
    validationSchema: steps[currentStep].validationSchema,
    onSubmit: async (values) => {
/*       await createAc({  userName: values?.username,
          email: values?.email,
          phone: values?.phone,
          status: "active",
          Password: values?.password}).unwrap() */
       axios
        .post(`${baseUrl}user/create-account`, {
          userName: values?.username,
          email: values?.email,
          phone: values?.phone,
          status: "active",
          Password: values?.password,
        })
        .then((response) => {
          console.log("====response", response.data);
          setAccountInfo(response?.data)
          // Handle the response data
          Notify(
            "success",
            "User Account Created Successfully please move next steps to complete registrations"
          );
        })
        .catch((error) => {
          console.error(error);
          Notify("error", "error happened");

          // Handle the error
        });
 
      if (currentStep === steps.length - 1) {
        try {
          axios
          .post(`${baseUrl}user/create-user`, {
            accountId:accountInfo?.id,
            firstName: values?.firstName,
            lastName: values?.lastName,
            middleName:values?.middleName,
            gender: values?.gender,
            state: values?.state,
            city:values?.city,
            wereda:values?.woreda,
            kebele:values?.kebele,
            phone: values?.phone,
            houseNumber:values?.houseNumber,
            subCity:values?.subCity,
            email:accountInfo?.email

          })
          .then((response) => {
            console.log("====response", response.data);
            setAccountInfo(response?.data)
            // Handle the response data
            Notify(
              "success",
              "User Account Created Successfully please move next steps to complete registrations"
            );
          })
          .catch((error) => {
            console.error(error);
            Notify("error", "error happened");
            // Handle the error
          });
  
          onClose();
        } catch (error) {

          console.error(error); // Handles the mutation error if necessary
        }
      } else {
        setCurrentStep(currentStep + 1);
      }
    },
  });

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };
  console.log("process.env.API_BASE_URL", process.env.API_BASE_URL);

  return (
    <Modal
      visible={visible}
      title="Registration"
      onCancel={onClose}
      footer={null}
    >
      <Steps
        current={currentStep}
        items={steps.map((step) => ({ title: step.title }))}
      />

      <Form
        onFinish={formik.handleSubmit}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        layout="horizontal"
        style={{ maxWidth: 700 }}
      >
        {currentStep === 0 && (
          <>
            <Form.Item
              label="UserName"
              name="username"
              validateStatus={formik.errors.username ? "error" : ""}
              help={formik.errors.username}
            >
              <Input
                value={formik.values.username}
                onChange={formik.handleChange}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              validateStatus={formik.errors.email ? "error" : ""}
              help={formik.errors.email}
            >
              <Input
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              validateStatus={formik.errors.phone ? "error" : ""}
              help={formik.errors.phone}
            >
              <Input
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              validateStatus={formik.errors.password ? "error" : ""}
              help={formik.errors.password}
            >
              <Input.Password
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </Form.Item>

            <Form.Item
              label="Status"
              name="status"
              validateStatus={formik.errors.status ? "error" : ""}
              help={formik.errors.status}
            >
              <Input
                value={formik.values.status}
                onChange={formik.handleChange}
              />
            </Form.Item>
          </>
        )}

        {currentStep === 1 && (
          <>
            <Form.Item
              label="First Name"
              name="firstName"
              validateStatus={formik.errors.firstName ? "error" : ""}
              help={formik.errors.firstName}
            >
              <Input
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
            </Form.Item>
            <Form.Item
              label="Middle Name"
              name="middleName"
              validateStatus={formik.errors.middleName ? "error" : ""}
              help={formik.errors.middleName}
            >
              <Input
                value={formik.values.middleName}
                onChange={formik.handleChange}
              />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              validateStatus={formik.errors.lastName ? "error" : ""}
              help={formik.errors.lastName}
            >
              <Input
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
            </Form.Item>
            <Form.Item
              label="Geneder"
              validateStatus={formik.errors.gender ? "error" : ""}
              help={formik.errors.gender}
            >
              <Radio.Group>
                <Radio onChange={formik.handleChange} value="male">
                  {" "}
                  Male{" "}
                </Radio>
                <Radio onChange={formik.handleChange} value="female">
                  {" "}
                  Female{" "}
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="State"
              name="state"
              validateStatus={formik.errors.state ? "error" : ""}
              help={formik.errors.state}
            >
              <Input
                value={formik.values.state}
                onChange={formik.handleChange}
              />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              validateStatus={formik.errors.city ? "error" : ""}
              help={formik.errors.city}
            >
              <Input
                value={formik.values.city}
                onChange={formik.handleChange}
              />
            </Form.Item>

            <Form.Item
              label="SubCity"
              name="subCity"
              validateStatus={formik.errors.subCity ? "error" : ""}
              help={formik.errors.subCity}
            >
              <Input
                value={formik.values.subCity}
                onChange={formik.handleChange}
              />
            </Form.Item>
            <Form.Item
              label="Woreda"
              name="woreda"
              validateStatus={formik.errors.woreda ? "error" : ""}
              help={formik.errors.woreda}
            >
              <Input
                value={formik.values.woreda}
                onChange={formik.handleChange}
              />
            </Form.Item>
            <Form.Item
              label="kebele"
              name="kebele"
              validateStatus={formik.errors.kebele ? "error" : ""}
              help={formik.errors.kebele}
            >
              <Input
                value={formik.values.kebele}
                onChange={formik.handleChange}
              />
            </Form.Item>

           
            <Form.Item
              label="House Number"
              name="houseNumber"
              validateStatus={formik.errors.houseNumber ? "error" : ""}
              help={formik.errors.houseNumber}
            >
              <Input
                value={formik.values.houseNumber}
                onChange={formik.handleChange}
              />
            </Form.Item>
          </>
        )}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {currentStep > 0 && (
            <Button type="primary" className="bg-primary" onClick={handlePrev}>
              Previous
            </Button>
          )}
          <Button
            type="primary"
            className="bg-primary"
            htmlType="submit"
          >
            {currentStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default RegistrationForm;
