import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyPage from './pages/MyPage';
import KakaoLoginRedirect from './pages/KakaoLoginRedirect';

// Games
import LeagueofLegends from './pages/LeagueofLegends';
import Valorant from './pages/Valorant';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/kakao/login' element={<KakaoLoginRedirect />} />
        <Route path='/kakao/register' element={<RegisterPage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/lol/*' element={<LeagueofLegends />} />
        <Route path='/valorant' element={<Valorant />} />
      </Routes>
    </Router>
  );
}
