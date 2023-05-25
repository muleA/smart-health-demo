import { Card, Collapse, Form, Input, Button, Radio } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../shared/auth/use-auth';
import { useGetUsersQuery } from '../auth.query';
import { useState, useEffect } from 'react';
import { baseUrl } from '../../shared/config';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { getCurrentSession } from '../../shared/auth/current-session';

const { Panel } = Collapse;

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  middleName: Yup.string().required('Middle Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  gender: Yup.string().required('Gender is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  wereda: Yup.string().required('wereda is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone Number is required'),
});

const UserPage = () => {
  const { session } = useAuth();
  const [userData, setUserData] = useState<any>({});
 console.log(jwt.decode(getCurrentSession()))
  console.log("decodedToken sessio  check",session)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseUrl}user/get-user/cdd7e427-50f0-4231-bddb-277ba7e03ea8`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);
  console.log("userData",userData)

  const formik = useFormik({
    initialValues: {
      firstName: userData.firstName,
      middleName: userData.middleName || '',
      lastName: userData.lastName || '',
      gender: userData.gender || '',
      state: userData.state || '',
      city: userData.city || '',
      wereda: userData.wereda || '',
      email: userData.email || '',
      phone: userData.phone || '',
      kebele:userData.kebele||"",
      subCity:userData.subCity||"",
      houseNumber:userData.houseNumber||"",
      id:userData.id

    },
    validationSchema,
    onSubmit: async (values) => {
      // Handle form submission and send data to the backend
      console.log(values);
      try {
        const response = await axios.post(`${baseUrl}user/update-user`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
  });
  useEffect(() => {
    formik.setValues({
      firstName: userData.firstName || '',
      middleName: userData.middleName || '',
      lastName: userData.lastName || '',
      gender: userData.gender || '',
      state: userData.state || '',
      city: userData.city || '',
      wereda: userData.wereda || '',
      email: userData.email || '',
      phone: userData.phone || '',
      kebele:userData.kebele||"",
      subCity:userData.subCity||"",
      houseNumber:userData.houseNumber,
      id:userData.id
    });
  }, [userData]);

  return (
    <Card className="w-3/2 mx-auto mt-6">
      <Collapse defaultActiveKey={['1']}>
        <Panel header={<h3 className="font-bold text-lg">Personal Information</h3>} key="1">
          <Form layout="vertical" onFinish={formik.handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <Form.Item label="First Name" required>
                <Input
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {/* Add formik error handling if needed */}
              </Form.Item>

              <Form.Item label="Middle Name" required>
                <Input
                  name="middleName"
                  value={formik.values.middleName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {/* Add formik error handling if needed */}
              </Form.Item>

              <Form.Item label="Last Name" required>
                <Input
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {/* Add formik error handling if needed */}
              </Form.Item>

              <Form.Item label="Email" required>
                <Input
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {/* Add formik error handling if needed */}
              </Form.Item>

              <Form.Item label="Phone Number" required>
                <Input
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {/* Add formik error handling if needed */}
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
                {/* Add formik error handling if needed */}
              </Form.Item>

              <Form.Item label="City" required>
                <Input
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {/* Add formik error handling if needed */}
              </Form.Item>

              <Form.Item label="wereda" required>
                <Input
                  name="wereda"
                  value={formik.values.wereda}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {/* Add formik error handling if needed */}
              </Form.Item>

              <Form.Item label="Kebele" required>
                <Input
                  name="kebele"
                  value={formik.values.kebele}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {/* Add formik error handling if needed */}
              </Form.Item>
              <Form.Item label="House Number" required>
                <Input
                  name="houseNumber"
                  value={formik.values.houseNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {/* Add formik error handling if needed */}
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
                {/* Add formik error handling if needed */}
              </Form.Item>
            </div>

            <div className="col-span-2 flex gap-4">
              <Form.Item>
                <Button type="primary" className="bg-primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
              <Form.Item>
                <Button className="bg-red-400 hover:bg-red-500 text-white" htmlType="button">
                  Delete
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Panel>
      </Collapse>
    </Card>
  );
};

export default UserPage;
