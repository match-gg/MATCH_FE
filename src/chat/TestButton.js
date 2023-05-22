import { Button } from '@mui/material';
import { child, get, getDatabase, push, ref, update } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../api/api';
import { chatRoomActions } from '../store/chatRoom-slice';

const TestButton = () => {
  // const target = useSelector((state) => state.games['lol']);

  const dispatch = useDispatch();

  const joinChatRoom = async () => {
    const newMemberNickname = 'T밍';
    const newMemberOauth2Id = 'kakaoTT123';
    const newUser = {
      nickname: newMemberNickname,
      oauth2Id: newMemberOauth2Id,
    };
    const chatRoomId = '-NVnTEQq78HR-wKp_bAt';
    //서버에 데이터 전송

    //파이어베이스의 해당 채팅방에 유저 추가
    const chatRoomRef = ref(getDatabase(), 'chatRooms');
    await get(child(chatRoomRef, chatRoomId))
      .then(async (datasnapshot) => {
        const prevMemberList = [];
        prevMemberList.push(...datasnapshot.val().memberList);
        const joinedMemberList = [...prevMemberList, newUser];
        await update(ref(getDatabase(), `chatRooms/${chatRoomId}`), {
          memberList: joinedMemberList,
        }).then(() =>
          dispatch(chatRoomActions.ADD_JOINED_CHATROOM(chatRoomId))
        );
      })
      .catch((error) => console.log(error));
  };

  const leaveChatRoom = async () => {
    const targetMemberNickname = 'T밍';
    const targetMemberOauth2Id = 'kakaoTT123';
    const targetUser = {
      nickname: targetMemberNickname,
      oauth2Id: targetMemberOauth2Id,
    };
    const chatRoomId = '-NVnTEQq78HR-wKp_bAt';
    //서버에 알려주기

    // 파이어베이스 채팅방의 members에 접근해서 닉네임 지우기
    const chatRoomRef = ref(getDatabase(), 'chatRooms');
    await get(child(chatRoomRef, `${chatRoomId}/memberList`))
      .then(async (datasnapshot) => {
        const prevMemberList = [...datasnapshot.val()];
        const removedMemberList = prevMemberList.filter((member) => {
          return member.oauth2Id !== targetUser.oauth2Id;
        });
        await update(ref(getDatabase(), `chatRooms/${chatRoomId}`), {
          memberList: removedMemberList,
        }).then(dispatch(chatRoomActions.LEAVE_JOINED_CHATROOM(chatRoomId)));
      })
      .catch((error) => console.log(error));
  };

  // const addChatRoom = () => {
  //   dispatch(chatRoomActions.ADD_JOINED_CHATROOM('-NT9iLlCfHtYX6VnE3MR'));
  // };

  const createChatRoom = async () => {
    const roomId = 1;
    const user = '방장';
    const memberList = [{ oauth2Id: 123, nickname: user }];

    const chatRoomRef = ref(getDatabase(), 'chatRooms');
    const key = push(chatRoomRef).key;

    const newChatRoom = {
      key,
      roomId,
      createdBy: user,
      memberList,
      timestamp: new Date().toString(),
    };

    await update(child(chatRoomRef, key), newChatRoom)
      .catch((error) => console.log(error))
      .then(() => console.log('채팅방 생성 테스트 성공'));
  };

  const kickMember = async (nickname) => {
    const chatRoomId = '-NW1_4aEj481AXLoEeoa';
    const chatRoomRef = ref(getDatabase(), 'chatRooms');
    await get(child(chatRoomRef, chatRoomId))
      .then(async (datasnapshot) => {
        const prevMemberList = [...datasnapshot.val().memberList];
        const target = prevMemberList.find(
          (member) => member.nickname === nickname
        );
        const prevBanedList = datasnapshot.val().banedList
          ? [...datasnapshot.val().banedList]
          : [];
        const newMemberList = prevMemberList.filter(
          (member) => member.nickname !== nickname
        );
        const newBanedList = [...prevBanedList, target];
        await update(ref(getDatabase(), `chatRooms/${chatRoomId}`), {
          memberList: newMemberList,
          banedList: newBanedList,
        });
      })
      .catch((error) => console.log(error));
  };

  const banTest = async () => {
    const chatRoomRef = ref(getDatabase(), 'chatRooms');
    await get(child(chatRoomRef, '-NW1_4aEj481AXLoEeoa')).then(
      (datasnapshot) => {
        const banedList = datasnapshot.val().banedList
          ? datasnapshot.val().banedList
          : [];
        const banedOuath2IdList = banedList.map((member) => member.oauth2Id);
        if (banedOuath2IdList.includes('kakaoTaxi')) {
          console.log('벤 당한 사용자임');
        }
      }
    );
  };

  return (
    <>
      <Button variant='outlined' onClick={joinChatRoom}>
        파티 참여
      </Button>
      <Button variant='outlined' onClick={leaveChatRoom}>
        파티 탈퇴
      </Button>
      {/* <Button variant='outlined' onClick={createChatRoom}>
        파티 생성
      </Button> */}
      {/* <Button variant='outlined' onClick={() => kickMember('명욱')}>
        멤버 강퇴
      </Button> */}
      <Button variant='outlined' onClick={banTest}>
        벤테스트
      </Button>
    </>
  );
};

export default TestButton;
