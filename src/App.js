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
import { api } from './api/api';
import { chatRoomActions } from './store/chatRoom-slice';

export default function App() {
  //토큰
  const { accessToken } = useSelector((state) => state.token);
  const refreshToken = localStorage.getItem('matchGG_refreshToken');

  // 로그인 여부
  const isLogin = useSelector((state) => state.user.isLogin);

  //리덕스의 notiToken
  const notiToken = useSelector((state) => state.notification.notiToken);

  const joinedChatRooms = useSelector(
    (state) => state.chatRoom.joinedChatRooms
  );
  console.log(joinedChatRooms);

  const dispatch = useDispatch();

  const messaging = getMessaging(app);

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
  };

  // 로그인, 로그아웃 시 리덕스의 joinedChatRooms 관리
  const joinedChatRoomsHandler = () => {
    if (isLogin) {
      api
        .get(`/api/chat/rooms`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Refresh-Token': refreshToken,
          },
        })
        .then((response) => {
          response.data.chatRoomList.forEach((chatroom) => {
            dispatch(chatRoomActions.ADD_JOINED_CHATROOM(chatroom.chatRoomId));
          });
        });
    }
  };

  useEffect(() => {
    isLogin && !notiToken && activateMessages();

    joinedChatRoomsHandler();

    onMessage(messaging, (message) => {
      console.log('메세지왔음: ', message);
      // 리덕스에 메세지 저장
      dispatch(notificationActions.ADD_FOREGROUND_MSG(message));
    });
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
