import { Card, Collapse, Form, Input, Button, Radio } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../shared/auth/use-auth";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../configs/config";
import { userInfo } from "os";

const { Panel } = Collapse;

const UserPage = () => {
  const { session } = useAuth();
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}user/get-user/${session?.userInfo?.userId}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string().required("Middle Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    gender: Yup.string().required("Gender is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    subCity: Yup.string().required("Sub City is required"),
    wereda: Yup.string().required("wereda is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone Number is required"),
  });

  useEffect(() => {
    formik.setFieldValue('firstName', userData?.firstName || "");
    formik.setFieldValue('middleName', userData?.middleName || "");
    formik.setFieldValue('lastName', userData?.lastName || "");
    formik.setFieldValue('gender', userData?.gender || "");
    formik.setFieldValue('state', userData?.state || "");
    formik.setFieldValue('city', userData?.city || "");
    formik.setFieldValue('wereda', userData?.wereda || "");
    formik.setFieldValue('email', userData?.email || "");
    formik.setFieldValue('phone', userData?.phone || "");
    formik.setFieldValue('kebele', userData?.kebele || "");
    formik.setFieldValue('subCity', userData?.subCity || "");
    formik.setFieldValue('houseNumber', userData?.houseNumber || "");
  }, [userData]);
  

  const formik = useFormik({
    initialValues: {
      firstName: userData.firstName || "",
      middleName: userData.middleName || "",
      lastName: userData.lastName || "",
      gender: userData.gender || "",
      state: userData.state || "",
      city: userData.city || "",
      wereda: userData.wereda || "",
      email: userData.email || "",
      phone: userData.phone || "",
      kebele: userData.kebele || "",
      subCity: userData.subCity || "",
      houseNumber: userData.houseNumber || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${baseUrl}user/update-user`, {...values,id:session?.userInfo?.userId},);
        setUserData(response.data);
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    },
  });
  const [expanded, setExpanded] = useState(false);
  const handleButtonClick = () => {
    setExpanded(true);
  };

  return (
    <Card className="w-3/2 mx-auto mt-6">
      <Collapse defaultActiveKey={["1"]}>
        <Panel
          header={<h3 className="font-bold text-lg">Personal Information</h3>}
          key="1"
          extra={
            <Button className="ml-5" onClick={handleButtonClick}>
              {expanded ? "Collapse" : "Expand"}
            </Button>
          }
        >
          <div>
            <Form
              layout="vertical"
              onFinish={formik.handleSubmit}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <Form.Item label="First Name" required>
                  <Input
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <div className="error">
                      {formik.errors.firstName as string}
                    </div>
                  )}
                </Form.Item>

                <Form.Item label="Middle Name" required>
                  <Input
                    name="middleName"
                    value={formik.values.middleName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.middleName && formik.errors.middleName && (
                    <div className="error">
                      {formik.errors.middleName as string}
                    </div>
                  )}
                </Form.Item>

                <Form.Item label="Last Name" required>
                  <Input
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <div className="error">
                      {formik.errors.lastName as string}
                    </div>
                  )}
                </Form.Item>

                <Form.Item label="Email" required>
                  <Input
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="error">{formik.errors.email as string}</div>
                  )}
                </Form.Item>

                <Form.Item label="Phone Number" required>
                  <Input
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="error">{formik.errors.phone as string}</div>
                  )}
                </Form.Item>
                <Form.Item label="Gender" required>
                  <Radio.Group
                    name="gender"
                    className="ml-1"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.gender}
                  >
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                  </Radio.Group>
                  {formik.touched.gender && formik.errors.gender && (
                    <div className="error">
                      {formik.errors.gender as string}
                    </div>
                  )}
                </Form.Item>
              </div>

              <div>
                <Form.Item label="State" required>
                  <Input
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.state && formik.errors.state && (
                    <div className="error">{formik.errors.state as string}</div>
                  )}
                </Form.Item>

                <Form.Item label="City" required>
                  <Input
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.city && formik.errors.city && (
                    <div className="error">{formik.errors.city as string}</div>
                  )}
                </Form.Item>

                <Form.Item label="Sub City" required>
                  <Input
                    name="subCity"
                    value={formik.values.subCity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.subCity && formik.errors.subCity && (
                    <div className="error">
                      {formik.errors.subCity as string}
                    </div>
                  )}
                </Form.Item>

                <Form.Item label="wereda" required>
                  <Input
                    name="wereda"
                    value={formik.values.wereda}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.wereda && formik.errors.wereda && (
                    <div className="error">
                      {formik.errors.wereda as string}
                    </div>
                  )}
                </Form.Item>

                <Form.Item label="Kebele" required>
                  <Input
                    name="kebele"
                    value={formik.values.kebele}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.kebele && formik.errors.kebele && (
                    <div className="error">
                      {formik.errors.kebele as string}
                    </div>
                  )}
                </Form.Item>

                <Form.Item label="House Number" required>
                  <Input
                    name="houseNumber"
                    value={formik.values.houseNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.houseNumber && formik.errors.houseNumber && (
                    <div className="error">
                      {formik.errors.houseNumber as string}
                    </div>
                  )}
                </Form.Item>
              </div>

              <div className="col-span-2 flex gap-4">
                <Form.Item>
                  <Button
                    type="primary"
                    className="bg-primary"
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </Form.Item>
                <Form.Item></Form.Item>
              </div>
            </Form>
          </div>
        </Panel>
      </Collapse>
    </Card>
  );
};

export default UserPage;
