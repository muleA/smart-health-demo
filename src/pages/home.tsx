import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { IdcardOutlined } from '@ant-design/icons';
import { useState } from 'react';
import LoginForm from './login/login-form';
import { useNavigate } from 'react-router-dom';
import RegistrationForm from './login/registration-form';
const { Header, Content, Footer } = Layout;

const HomePage = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [visible, setVisible] = useState(false);

    const handleLoginClick = () => {
      setShowLoginForm(true);
    };
  
    const handleLoginClose = () => {
      setShowLoginForm(false);
    };

    const handleClose = () => {
        setVisible(false);
      };
    
      const handleOpen = () => {
        setVisible(true);
      };
  
  return (
    <Layout className="min-h-screen">
      <Header className="bg-white shadow-sm">
        <div className="flex items-center justify-between">
        <div className="flex items-center">
            <IdcardOutlined className='text-primary' style={{ fontSize: '34px' }} />
            <span className="ml-2 font-bold text-primary">Professional License Management</span>
          </div>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">How It Works</Menu.Item>
            <Menu.Item key="3">About Us</Menu.Item>
          </Menu>
          <div>
            <Button onClick={handleLoginClick} type="primary" className="mr-2 bg-primary">Login</Button>
            <Button type='primary' onClick={handleOpen} className='bg-primary'>Sign Up</Button>
          </div>
        </div>
      </Header>
      <Content className="p-4" style={{ backgroundImage: 'url("/background-image.jpg")', backgroundSize: 'cover' }}>
       
          {/* Your license management content goes here */}
          <iframe src="https://embed.lottiefiles.com/animation/72157" height={600} width={600}></iframe>
      </Content>
      <Footer className="text-center bg-white py-2 text-primary">
        Professional License Management &copy; {new Date().getFullYear()}
      </Footer>
      <LoginForm visible={showLoginForm} onClose={handleLoginClose} />
<RegistrationForm visible={visible} onClose={handleClose}/>
    </Layout>

  );
};

export default HomePage;
