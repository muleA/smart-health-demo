import React, { ReactNode, useEffect, useState } from "react";
import {
  Modal,
  Steps,
  Form,
  Input,
  Button,
  Radio,
  Card,
  Alert,
  message,
  Spin,
} from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from "../../../shared/auth/use-auth";
import { baseUrl } from "../../../configs/config";
import { SaveFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  useArchiveEmployeeMutation,
  useCreateAccountMutation,
  useCreateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetEmployeeByEmployeeIdQuery,
  useLazyGetEmployeeByEmployeeIdQuery,
} from "./employee.query";

const EmployeeForm = (props: { mode: "new" | "update"; id?: string }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [accountInfo, setAccountInfo] = useState<any>(null);
  const [archiveEmployee, { isLoading, isError }] =
    useArchiveEmployeeMutation();
    const[deleteEmployee,{isLoading:deleteLaoding,isError:deletingError}]=useDeleteEmployeeMutation()
  const [
    createAccount,
    { isLoading: creatingAccountLoading, isError: creatingAccountError },
  ] = useCreateAccountMutation();
  const [
    createEmployee,
    { isLoading: creatingEmployeeLoading, isError: creatingEmployeeError },
  ] = useCreateEmployeeMutation();

  const { data: employeeInfo, isLoading: employeeDetailLoading } =
    useGetEmployeeByEmployeeIdQuery(props?.id as string);
  console.log("employee info", employeeInfo);

  const navigate = useNavigate();useEffect(() => {
    if (props?.mode === "update" && employeeInfo) {
      const {
        firstName,
        password,
        confirmPassword,
        state,
        name,
        lastName,
        woreda,
        email,
        phone,
        gender,
        kebele,
        city,
        subCity,
        middleName,
        username,
        houseNumber,
      } = employeeInfo as any;
      formik.setValues({
        password,
        confirmPassword,
        state,
        name,
        firstName,
        lastName,
        woreda,
        email: employeeInfo?.email,
        phone,
        gender,
        kebele,
        city,
        subCity,
        middleName,
        username,
        houseNumber,
      });
    }
  }, [props?.mode, employeeInfo]);
  const { session } = useAuth();
  console.log("session", session);
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

  
  const handleDeleteEmployee = async () => {
    try {
      await deleteEmployee(props?.id);
      deletingError
        ? message.error("Error occurred while deleting user")
        : message.success("employee deleted successfully");
      navigate("/employees");
    } catch (error) {}
  };
  const handleArchive = async () => {
    try {
      await archiveEmployee(props?.id);
      isError
        ? message.error("Error occurred while archiving user")
        : message.success("employee archived successfully");
      navigate("/employees");
    } catch (error) {}
  };
  const formik = useFormik({
    initialValues: {
      email: props?.mode === "update" ? employeeInfo?.email : "",
      phone: props?.mode === "update" ? "" : "",
      password: props?.mode === "update" ? "" : "",
      confirmPassword: props?.mode === "update" ? "" : "",
      subCity: props?.mode === "update" ? "" : "",
      firstName: props?.mode === "update" ? employeeInfo?.firstName : "",
      lastName: props?.mode === "update" ? employeeInfo?.lastName : "",
      woreda: props?.mode === "update" ? employeeInfo?.woreda : "",
      gender: props?.mode === "update" ? employeeInfo?.gender : "male",
      state: props?.mode === "update" ? "" : "",
      middleName: props?.mode === "update" ? employeeInfo?.middleName : "",
      name: props?.mode === "update" ? "" : "",
      city: props?.mode === "update" ? "" : "",
      username: props?.mode === "update" ? employeeInfo?.username : "",
      kebele: props?.mode === "update" ? "" : "",
      houseNumber: props?.mode === "update" ? "" : "",
    },
    validationSchema: steps[currentStep].validationSchema,
    onSubmit: async (values) => {
      try {
        let response: any;
        response = await createAccount({
          userName: values?.username,
          email: values?.email,
          phone: values?.phone,
          status: "active",
          Password: values?.password,
          accountType: "employee",
        });
        setAccountInfo(response?.data as any);
        creatingAccountError
          ? message.error("error happened")
          : message.success(
              "User Account Created Successfully please move next steps to complete registrations"
            );
      } catch (err) {}

      if (currentStep === steps.length - 1) {
        try {
          let employeeResponse: any;

          employeeResponse = await createEmployee({
            accountId: accountInfo?.id,
            firstName: values?.firstName,
            lastName: values?.lastName,
            middleName: values?.middleName,
            gender: values?.gender,
            state: values?.state,
            city: values?.city,
            wereda: values?.woreda,
            kebele: values?.kebele,
            phone: values?.phone,
            houseNumber: values?.houseNumber,
            subCity: values?.subCity,
            email: accountInfo?.email,
          });

          creatingEmployeeError
            ? message.error("error happened")
            : message.success("employee Created Successfully");

          setAccountInfo(employeeResponse?.data as any);
          navigate("/employees");
        } catch (error) {}
      } else {
        setCurrentStep(currentStep + 1);
      }
    },
  });

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <>
      {employeeDetailLoading ? (
        <>
          <div className="flex justify-center items-center h-24">

          <Spin size="large" className="mx-auto text-center" />
          </div>
        </>
      ) : (
        <>
          <div>
            <Steps
              current={currentStep}
              items={steps.map((step) => ({ title: step.title }))}
            />

            <Form
              onFinish={formik.handleSubmit}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              layout="vertical"
              style={{ maxWidth: 700 }}
            >
              {currentStep === 0 && (
                <>
                  <Form.Item
                    className="mt-4"
                    label="UserName"
                    name="username"
                    validateStatus={formik.errors.username ? "error" : ""}
                    help={formik.errors.username as ReactNode}
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
                    help={formik.errors.email as ReactNode}
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
                </>
              )}

              {currentStep === 1 && (
                <>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    validateStatus={formik.errors.firstName ? "error" : ""}
                    help={formik.errors.firstName as ReactNode}
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
                    help={formik.errors.middleName as ReactNode}
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
                    help={formik.errors.lastName as ReactNode}
                  >
                    <Input
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Gender"
                    validateStatus={formik.errors.gender ? "error" : ""}
                    help={formik.errors.gender as ReactNode}
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
                    help={formik.errors.woreda as ReactNode}
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
                  <Button
                    type="primary"
                    className="bg-primary"
                    onClick={handlePrev}
                  >
                    Previous
                  </Button>
                )}
                <div className="flex space-x-4">
                  {!props?.id ? (
                    <>
                      <Button
                        type="primary"
                        className="bg-primary flex items-center justify-center"
                        htmlType="submit"
                        loading={
                          currentStep === steps.length - 1
                            ? creatingAccountLoading
                            : creatingEmployeeLoading
                        }
                        icon={<SaveFilled className="mx-auto" />}
                      >
                        {currentStep === steps.length - 1 ? "Create" : "Next"}
                      </Button>
                    </>
                  ) : null}

                  {props?.id  ? (
                    <>
                    <div className="flex space-x-2">
                    <Button
                        onClick={handleDeleteEmployee}
                        className="bg-primary bg-red-500 items-center justify-center"
                        type="primary"
                        loading={deleteLaoding}
                      >
                        Delete
                      </Button>
                    <Button
                        onClick={handleArchive}
                        className="bg-primary bg-red-500 items-center justify-center"
                        type="primary"
                        loading={isLoading}
                      >
                        Archive
                      </Button>


                    </div>
                     

                    </>
                  ) : null}
                </div>
              </div>
            </Form>
          </div>
        </>
      )}
    </>
  );
};

export default EmployeeForm;
