import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import AuthNavbar from '../components/auth/AuthNavbar';

const RegisterPage = () => {
  return (
    <>
      <AuthNavbar />
      <div>
        <RegisterForm />
      </div>
    </>
  );
};

export default RegisterPage;