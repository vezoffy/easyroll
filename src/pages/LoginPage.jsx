import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import AuthNavbar from '../components/auth/AuthNavbar';

const LoginPage = () => {
  return (
    <>
      <AuthNavbar />
      <div>
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;