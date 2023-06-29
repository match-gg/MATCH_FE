import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyPage from './pages/MyPage';
import KakaoLoginRedirect from './pages/KakaoLoginRedirect';

// Games
import LeagueofLegends from './pages/LeagueofLegends';
import Valorant from './pages/Valorant';
import Overwatch from './pages/Overwatch';

//  notification
import app from './firebase';
import { getMessaging, getToken } from 'firebase/messaging';
import { notificationActions } from './store/notification-slice';

export default function App() {
  // 로그인 여부
  const isLogin = useSelector((state) => state.user.isLogin);

  //리덕스의 notiToken
  const notiToken = useSelector((state) => state.notification.notiToken);

  const dispatch = useDispatch();

  // 토큰 발급
  const messaging = getMessaging(app);

  const activateMessages = async () => {
    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
    }).catch((error) => console.log('error: generation token'));

    if (token) {
      dispatch(notificationActions.SET_NOTITOKEN(token));
    } else {
      console.log('토큰 없음...');
    }
  };

  useEffect(() => {
    isLogin && !notiToken && activateMessages();
  }, [isLogin]);

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
        <Route path='/overwatch' element={<Overwatch />} />
      </Routes>
    </Router>
  );
}
