import React, { useState } from 'react';
import { Button, Input, Card, Form, message } from 'antd';
import { AuthFormValues } from '../../types';
import authService from '../../services/auth';

import { setReduxLogin } from '../../reducers/authReducer';
import { useAppDispatch } from '../../hooks';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useAppDispatch();

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  const onFinish = (values: AuthFormValues) => {
    if (isLogin) {
      dispatch(setReduxLogin(values.email, values.password))
        .then(() => {
          messageApi.success('Logged in successfully');
        })
        .catch(() => {
          messageApi.error("Couldn't log in. Please check your inputs.");
        });
    } else {
      authService
        .signup(values)
        .then(() => {
          messageApi.success('Signed up successfully');
          messageApi.info('You can now login with your account.');
          setIsLogin(true);
        })
        .catch(() => {
          messageApi.error("Couldn't sign up. Please check your inputs.");
        });
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-50'>
      {contextHolder}
      <div className='flex flex-col items-center gap-24'>
        <h1 className='text-5xl text-primary'>Welcome to the Productiva!</h1>
        <Card className='shadow-md text-center w-[600px] mb-12'>
          <h2 className='text-xl mb-4'>{isLogin ? 'Login' : 'Sign Up'}</h2>
          <Form
            name={isLogin ? 'login' : 'signup'}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout='vertical'
          >
            {!isLogin && (
              <Form.Item
                className='text-left '
                label={<span className='font-medium'>Full Name</span>}
                name='name'
                rules={[
                  { required: true, message: 'Please input your full name!' },
                ]}
                validateTrigger='onBlur'
              >
                <Input placeholder='Full Name' className='mb-2' />
              </Form.Item>
            )}
            <Form.Item
              className='text-left '
              label={<span className='font-medium'>E-mail</span>}
              name='email'
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Please input a valid email!',
                },
              ]}
              validateTrigger='onBlur'
            >
              <Input placeholder='E-mail' className='mb-2' />
            </Form.Item>
            <Form.Item
              className='text-left '
              label={<span className='font-medium'>Password</span>}
              name='password'
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 3, message: 'Password must be at least 3 characters!' },
              ]}
              validateTrigger='onBlur'
            >
              <Input.Password placeholder='Password' className='mb-2' />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' block>
                {isLogin ? 'Login' : 'Sign Up'}
              </Button>
            </Form.Item>
          </Form>
          <p className='mt-8'>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <span
              className='text-green-700 cursor-pointer'
              onClick={handleSwitch}
            >
              {isLogin ? 'Sign up' : 'Login'}
            </span>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
