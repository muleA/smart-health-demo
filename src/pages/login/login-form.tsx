import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../shared/auth/use-auth';
import { useNavigate } from 'react-router-dom';
import { UserAddOutlined } from '@ant-design/icons';

const LoginForm = () => {
  const { submitLoginRequest, session } = useAuth();
  const router = useNavigate();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
       submitLoginRequest(values);
    },
  });

  return (
    <Card className='text-center mx-auto mx-72 w-50 mt-10'>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Login</h1>
      </div>
      <div className="p-4 w-50 mx-auto flex ">
        <div className='w-1/3'>
          <img src="/4957136.jpg"alt="login Image"/>
        </div>
        <div className='mt-20 w-2/3'>
        <Form layout="vertical" className='w-2/3' onFinish={formik.handleSubmit}>
          <Form.Item
            label="Email"
            name="username"
            validateStatus={formik.errors.username ? 'error' : ''}
            help={formik.errors.username}
          >
            <Input value={formik.values.username} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            validateStatus={formik.errors.password ? 'error' : ''}
            help={formik.errors.password}
          >
            <Input.Password value={formik.values.password} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" className='text-white bg-primary' htmlType="submit">
              Sign in
            </Button>
          </Form.Item>
        
        </Form>
        </div>
       
      </div>
    </Card>
  );
};

export default LoginForm;
