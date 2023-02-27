import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import KakaoRedirect from './pages/KakaoRedirect';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyPage from './pages/MyPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register/*' element={<RegisterPage />} />
        <Route path='/kakao/callback' element={<KakaoRedirect />} />
        <Route path='/mypage' element={<MyPage />} />
      </Routes>
    </Router>
  );
}
