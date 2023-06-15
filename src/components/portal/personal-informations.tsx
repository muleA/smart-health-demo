import { Card, Collapse, Form, Input, Button, Radio, message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../shared/auth/use-auth";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../configs/config";
import { JointContent } from "antd/es/message/interface";
import {useUpdateProfileMutation,useGetUserByIdQuery} from '../portal.query'
import { Edit } from "@mui/icons-material";
const { Panel } = Collapse;

const UserPage = () => {
  const { session } = useAuth();
/*   const [userData, setUserData] = useState<any>({});
 *//* 
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
  }, []); */

  const {data:userData,isLoading}=useGetUserByIdQuery(session?.userInfo?.userId)
  const[updateProfile,{isLoading:updating}]=useUpdateProfileMutation()
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string().required("Middle Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    gender: Yup.string().required("Gender is required"),
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
      firstName: userData?.firstName || "",
      middleName: userData?.middleName || "",
      lastName: userData?.lastName || "",
      gender: userData?.gender || "",
      city: userData?.city || "",
      wereda: userData?.wereda || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      kebele: userData?.kebele || "",
      subCity: userData?.subCity || "",
      houseNumber: userData?.houseNumber || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await updateProfile({...values,id:session?.userInfo?.userId});
        message.success("Profile updated Successfully")
      } catch (error) {
        console.error("Error updating user data:", error);
        message.error(error as JointContent)
      }
    },
  });
  const [expanded, setExpanded] = useState(false);
  const handleButtonClick = () => {
    setExpanded(true);
  };

  return (
    <Card className="w-3/2 mx-auto mt-6" loading={isLoading}>
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
                    disabled
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

      

              <div className="col-span-2 flex gap-4">
                <Form.Item>
                  <Button
                    type="primary"
                    className="bg-primary"
                    htmlType="submit"
                    loading={updating}
                    icon={<Edit/>}
                  >
                    Update
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
