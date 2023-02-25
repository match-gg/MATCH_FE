import { useState } from 'react';
import RegisterWrapper from '../components/Register/RegisterWrapper';

const RegisterPage = () => {
  //회원가입 시나리오 최상위 컴포넌트
  //registerInfo에 회원가입 시나리오 진행에서 입력받은 정보들이 저장되어있음

  const [registerInfo, setRegisterInfo] = useState({
    agreeTerm1: false,
    agreeTerm2: false,
    favGame: '',
    games: {},
    // phoneNumber: 0,
  });

  return (
    <RegisterWrapper
      registerInfo={registerInfo}
      setRegisterInfo={setRegisterInfo}
    />
  );
};

export default RegisterPage;
