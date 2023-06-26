import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import { useDispatch, useSelector } from 'react-redux';
import { notificationActions } from './store/notification-slice';

export default function App() {
  // 로그인 여부
  const isLogin = useSelector((state) => state.user.isLogin);
  //리덕스의 notiToken
  const notiToken = useSelector((state) => state.notification.notiToken);

  const backgroundMSG = useSelector(
    (state) => state.notification.backgroundMessages
  );

  const foregroundMessages = useSelector(
    (state) => state.notification.foregroundMessages
  );

  const dispatch = useDispatch();

  const messaging = getMessaging(app);

  // 포그라운드 상태에서 메세지 수신
  onMessage(messaging, (message) => {
    console.log('메세지왔음: ', message);
    // 리덕스에 메세지 저장
    dispatch(notificationActions.ADD_FOREGROUND_MSG(message));
  });

  // 토큰 발급
  const activateMessages = async () => {
    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
    }).catch((error) => console.log('error: generation token'));

    if (token) {
      dispatch(notificationActions.SET_NOTITOKEN(token));
      console.log('notiToken 발급 완료');
    } else {
      console.log('토큰 없음...');
    }
    // 포그라운드 상태에서 메세지 수신
    onMessage(messaging, (message) => {
      console.log('메세지왔음: ', message);
      // 리덕스에 메세지 저장
      dispatch(notificationActions.ADD_FOREGROUND_MSG(message));
    });
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
