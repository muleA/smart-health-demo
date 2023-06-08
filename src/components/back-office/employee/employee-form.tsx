import { Form, Input, Button, message, Spin, Radio, Row, Col } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { Employee } from "../../../models/employee";
import { useCreateEmployeeMutation, useGetEmployeesQuery } from "./employee.query";

const EmployeeForm = (props: { id?: string; mode: "new" | "update" }) => {
  const [createEmployee, { isLoading: isUpdating }] = useCreateEmployeeMutation();
  const { data: employees, isLoading: isDetailsLoading } = useGetEmployeesQuery();

  // Define the form validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    middleName: Yup.string().required("Middle name is required"),
    lastName: Yup.string().required("Last name is required"),
    gender: Yup.string().required("Gender is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    wereda: Yup.string().required("Wereda is required"),
    kebele: Yup.string().required("Kebele is required"),
    phone: Yup.string().required("Phone number is required"),
    houseNumber: Yup.string().required("House number is required"),
    subCity: Yup.string().required("Sub city is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const { id } = useParams();

  // Define the form submission function
  const handleSubmit = async (values: Employee) => {
    try {
      if (props.mode === "new") {
        await createEmployee(values);
        message.success("Employee created successfully");
      } else if (props.mode === "update") {
        await createEmployee({ id: props.id, ...values });
        message.success("Employee updated successfully");
      }
    } catch (error) {
      message.error("Error occurred while saving employee");
    }
  };

  // Use Formik to handle form state and submission
  const formik = useFormik({
    initialValues: {
      firstName: "",
      accountId:"",
      middleName: "",
      lastName: "",
      gender: "",
      state: "",
      city: "",
      wereda: "",
      kebele: "",
      phone: "",
      houseNumber: "",
      subCity: "",
      email: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div>
      {isDetailsLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Form layout="vertical" onFinish={formik.handleSubmit}>
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Form.Item label="First Name" required>
                <Input
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className="text-red-500">{formik.errors.firstName}</div>
                )}
              </Form.Item>
              <Form.Item label="Middle Name" required>
                <Input
                  name="middleName"
                  value={formik.values.middleName}
                  onChange={formik.handleChange}
                />
                {formik.touched.middleName && formik.errors.middleName && (
                  <div className="text-red-500">{formik.errors.middleName}</div>
                )}
              </Form.Item>
              <Form.Item label="Last Name" required>
                <Input
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="text-red-500">{formik.errors.lastName}</div>
                )}
              </Form.Item>
              <Form.Item label="Email" required>
                <Input
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500">{formik.errors.email}</div>
                )}
              </Form.Item>
              <Form.Item label="Gender" required>
                <Radio.Group
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                >
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="other">Other</Radio>
                </Radio.Group>
                {formik.touched.gender && formik.errors.gender && (
                  <div className="text-red-500">{formik.errors.gender}</div>
                )}
              </Form.Item>
              <Form.Item label="State" required>
                <Input
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                />
                {formik.touched.state && formik.errors.state && (
                  <div className="text-red-500">{formik.errors.state}</div>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="City" required>
                <Input
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                />
                {formik.touched.city && formik.errors.city && (
                  <div className="text-red-500">{formik.errors.city}</div>
                )}
              </Form.Item>
              <Form.Item label="Wereda" required>
                <Input
                  name="wereda"
                  value={formik.values.wereda}
                  onChange={formik.handleChange}
                />
                {formik.touched.wereda && formik.errors.wereda && (
                  <div className="text-red-500">{formik.errors.wereda}</div>
                )}
              </Form.Item>
              <Form.Item label="Kebele" required>
                <Input
                  name="kebele"
                  value={formik.values.kebele}
                  onChange={formik.handleChange}
                />
                {formik.touched.kebele && formik.errors.kebele && (
                  <div className="text-red-500">{formik.errors.kebele}</div>
                )}
              </Form.Item>
              <Form.Item label="Phone Number" required>
                <Input
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-red-500">{formik.errors.phone}</div>
                )}
              </Form.Item>
              <Form.Item label="House Number" required>
                <Input
                  name="houseNumber"
                  value={formik.values.houseNumber}
                  onChange={formik.handleChange}
                />
                {formik.touched.houseNumber && formik.errors.houseNumber && (
                  <div className="text-red-500">{formik.errors.houseNumber}</div>
                )}
              </Form.Item>
              <Form.Item label="Sub City" required>
                <Input
                  name="subCity"
                  value={formik.values.subCity}
                  onChange={formik.handleChange}
                />
                {formik.touched.subCity && formik.errors.subCity && (
                  <div className="text-red-500">{formik.errors.subCity}</div>
                )}
              </Form.Item>
            
            </Col>
          </Row>
          <Form.Item>
            <div className="flex space-x-4">
              <Button
                type="primary"
                htmlType="submit"
                className="bg-primary"
                loading={isUpdating}
              >
                {props.mode === "new" ? "Save" : "Update"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EmployeeForm;
