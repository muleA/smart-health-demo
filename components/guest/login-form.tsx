import React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../shared/auth/use-auth';
import { useRouter } from 'next/router';

interface LoginFormProps {
  visible: boolean;
  onClose: () => void;
}

interface FormValues {
  username: string;
  password: string;
}

const initialValues: FormValues = {
  username: '',
  password: '',
};

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm: React.FC<LoginFormProps> = ({ visible, onClose }) => {
  const { submitLoginRequest,session } = useAuth();
        const router=useRouter()
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: FormValues) => {
      console.log(values);
    const response=  submitLoginRequest(values)
        if(session){
          router.push("/home")
        }
      onClose();
    },
  });

  return (
    <Modal visible={visible} title="Login" onCancel={onClose} footer={null}>
      <Form layout="vertical" onFinish={formik.handleSubmit}>
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
          <Button type="primary" className='bg-primary' htmlType="submit">
            Login
          </Button>
          <Button onClick={onClose} style={{ marginLeft: 8 }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginForm;
