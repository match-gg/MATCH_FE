import { useState } from 'react';
import RegisterWrapper from '../components/Register/RegisterWrapper';

const RegisterPage = () => {
  const [registerInfo, setRegisterInfo] = useState({});
  console.log(registerInfo);

  return (
    <RegisterWrapper
      registerInfo={registerInfo}
      setRegisterInfo={setRegisterInfo}
    />
  );
};

export default RegisterPage;
