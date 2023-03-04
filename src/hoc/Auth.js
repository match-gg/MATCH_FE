import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthHoc = (SpecificComponent, option, adminRoute = null) => {
  /*
    option : null -> 누구나 출입 가능한 페이지
             true -> 로그인한 유저만 출입이 가능한 페이지
             false -> 로그인한 유저는 출입이 불가능한 페이지
  */

  function AuthenticationCheck(props) {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const isAdmin = useSelector((state) => state.user.isAdmin);
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoggedIn) {
        if (option) navigate('/login');
      } else {
        if (adminRoute && isAdmin) {
          alert('관리자 계정만 허용된 페이지 입니다.');
          navigate(-1);
        } else {
          if (option === false) navigate(-1);
        }
      }
    }, [navigate, isLoggedIn, isAdmin]);

    return <SpecificComponent />;
  }
  return AuthenticationCheck;
};

export default AuthHoc;
