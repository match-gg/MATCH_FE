import React from 'react';
import { Button } from '@mui/material';
import { api } from '../../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import {
  ref,
  child,
  get,
  getDatabase,
  update,
  set,
  push,
  serverTimestamp,
} from 'firebase/database';
import { chatRoomActions } from '../../../store/chatRoom-slice';

const JoinPartyButton = (props) => {
  const notiToken = useSelector((state) => state.notification.notiToken);
  const dispatch = useDispatch();
  const { game, chatRoomId, id, fetchBoardDetail } = props;

  const nickname = useSelector((state) => state.user.games[`${game}`]);
  const oauth2Id = useSelector((state) => state.user.oauth2Id);

  const isNotificationPermissioned = useSelector(
    (state) => state.notification.isNotificationPermissioned
  );

  // 채팅방에 참여할 사용자 객체
  const newMember = {
    nickname,
    oauth2Id,
    notiToken: isNotificationPermissioned ? notiToken : '',
  };
  //현재 게임

  //토큰
  const { accessToken } = useSelector((state) => state.token);
  const refreshToken = localStorage.getItem('matchGG_refreshToken');

  const isBanned = async (chatRoomId, oauth2Id, chatRoomRef) => {
    let banned = false;
    await get(child(chatRoomRef, chatRoomId)).then((datasnapshot) => {
      const bannedList = datasnapshot.val().bannedList
        ? datasnapshot.val().bannedList
        : [];
      const bannedOauth2IdList = bannedList.map((member) => member.oauth2Id);
      if (bannedOauth2IdList.includes(oauth2Id)) {
        banned = true;
      }
    });
    return banned;
  };

  //파이어베이스에 추가해주는 함수
  const addFirebaseRDB = async (
    newMember,
    chatRoomId,
    chatRoomRef,
    messagesRef
  ) => {
    await get(child(chatRoomRef, chatRoomId))
      .then(async (datasnapshot) => {
        const prevMemberList = [];
        prevMemberList.push(...datasnapshot.val().memberList);
        const joinedMemberList = [...prevMemberList, newMember];
        await update(ref(getDatabase(), `chatRooms/${chatRoomId}`), {
          memberList: joinedMemberList,
        }).then(async () => {
          const lastReadRef = ref(getDatabase(), 'lastRead');
          await set(
            child(lastReadRef, `${oauth2Id}/${chatRoomId}`),
            serverTimestamp()
          );
          await set(push(child(messagesRef, chatRoomId)), {
            type: 'system',
            timestamp: serverTimestamp(),
            user: {
              nickname,
              oauth2Id,
            },
            content: `${nickname} 님이 참가하였습니다.`,
          });

          dispatch(chatRoomActions.ADD_JOINED_CHATROOMS_ID(chatRoomId));
        });
      })
      .catch((error) => console.log(error));
  };

  // 파티 참가 함수
  const joinParty = async () => {
    const chatRoomRef = ref(getDatabase(), 'chatRooms');
    const messagesRef = ref(getDatabase(), 'messages');

    // 1. 밴 당한 사용자인지 확인
    if (await isBanned(chatRoomId, oauth2Id, chatRoomRef)) {
      alert('참여할 수 없는 사용자입니다. (사유:강제퇴장)');
      dispatch(chatRoomActions.LEAVE_JOINED_CHATROOMS_ID(chatRoomId));
      return;
    }

    // 2. 서버에 파티 참가 전송
    await api
      .post(`/api/chat/${game}/${id}/member`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Refresh-Token': refreshToken,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          //파이어베이스의 Realtime DB에 추가, 리덕스에 채팅방 아이디 저장
          addFirebaseRDB(newMember, chatRoomId, chatRoomRef, messagesRef);
        }
      })
      .then(() => {
        //카드 상세보기 모달 페이지에서 파티 참가가 반영된 최신 데이터 가져오기
        fetchBoardDetail();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Button
      variant='outlined'
      size='small'
      sx={{
        p: 1,
        mt: 1,
        height: 40,
        borderColor: '#CCCCCC',
        color: '#5C5C5C',
        fontWeight: 700,
        ':hover': {
          borderColor: '#dddddd',
          backgroundColor: '#f3f3f3',
        },
      }}
      onClick={joinParty}
    >
      파티 참가
    </Button>
  );
};

export default JoinPartyButton;
