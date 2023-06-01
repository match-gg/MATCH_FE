import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { api } from '../../../api/api';
// import { getDatabase, ref, push, update, child } from 'firebase/database';

import {
  Button,
  Select,
  TextField,
  Typography,
  Box,
  Modal,
  Stack,
  MenuItem,
  FormControl,
  Switch,
  ToggleButtonGroup,
  ToggleButton,
  OutlinedInput,
  Divider,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import BackspaceIcon from '@mui/icons-material/Backspace';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import CloseIcon from '@mui/icons-material/Close';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CircularProgress from '@mui/material/CircularProgress';

import { platformData, typeData, tierData, expireData } from './CreateCardBtn.d';
import { chatRoomActions } from '../../../store/chatRoom-slice';

const CreateCardBtn = (props) => {
  const { accessToken } = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const refreshToken = localStorage.getItem('matchGG_refreshToken');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 로그인 된 사용자의 기본 닉네임 가져오기.
  const registeredNickname = user.games['lol'];

  console.log(registeredNickname);

  // 닉네임 인증여부 확인에 사용할 state와 함수
  const [isIdChecked, setIsIdChecked] = useState(false);

  // 닉네임 조회 시 로딩 상태 변수
  const [isLoading, setIsLoading] = useState(false);

  // 사용자 계정에 연결된 닉네임 사용 여부.
  const [useExistNickname, setUseExistNickname] = useState(registeredNickname ? true : false);

  // 사용자 input에 변동사항 있는지 확인 -> 모달 닫기 전 확인하는 데에 사용.
  const [isChanged, setIsChanged] = useState(false);

  const [userInput, setUserInput] = useState({
    name: registeredNickname ? registeredNickname : '',
    platform: 'STEAM',
    type: 'NORMAL_DUO',
    tier: 'BRONZE',
    expire: 'FIFTEEN_M',
    voice: 'n',
    content: '',
  });

  const handleName = (e) => {
    setUserInput({ ...userInput, name: e.target.value.trim() });
    setIsChanged(true);
  };

  const handlePlatform = (e, newValue) => {
    if (newValue === null) {
      return;
    }
    setUserInput({ ...userInput, platform: newValue });
    setIsChanged(true);
  };

  const handleType = (_e, newValue) => {
    if (newValue === null) return;
    setUserInput({ ...userInput, type: newValue });
    setIsChanged(true);
  };

  const handleTier = (_e, newValue) => {
    if (newValue === null) return;
    setUserInput({ ...userInput, tier: newValue });
    setIsChanged(true);
  };

  const handleExpire = (e) => {
    setUserInput({ ...userInput, expire: e.target.value });
    setIsChanged(true);
  };

  const handleVoice = (_e, newValue) => {
    if (newValue === null) return;
    setUserInput({ ...userInput, voice: newValue });
    setIsChanged(true);
  };

  const handleContent = (e) => {
    setUserInput({ ...userInput, content: e.target.value.trim() });
    setIsChanged(true);
  };

  const handleSwitch = (e) => {
    setUseExistNickname((prevState) => !prevState);
    setIsChanged(true);
  };

  // 새로 입력한 닉네임 조회하기
  // const certifyNickname = async () => {
  //   setIsLoading(true);

  //   await api
  //     .get(`/api/pubg/user/exist/${userInput.name}`)
  //     .then(async (response) => {
  //       if (response.status === 200) {
  //         await api.get(`/api/lol/user/${userInput.name}`).then((_response) => {
  //           setIsLoading(false);
  //           setIsIdChecked(true);
  //         });
  //       } else {
  //         setIsIdChecked(false);
  //         setIsLoading(false);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   setIsLoading(false);
  //   setIsChanged(true);
  // };

  //Modal 관련 state와 함수
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModalConfirm = () => {
    if (isChanged) {
      if (window.confirm('현재 창을 나가면 입력하신 정보가 사라지게됩니다.\n정말 나가시겠습니까?'))
        closeModal();
    } else {
      closeModal();
    }
  };

  //모달 창 나가면 동작하는 함수
  const closeModal = () => {
    setOpen(false);
    setUserInput({
      name: registeredNickname ? registeredNickname : '',
      platform: 'STEAM',
      type: 'NORMAL_DUO',
      tier: 'BRONZE',
      expire: 'FIFTEEN_M',
      voice: 'n',
      content: '',
    });
    setIsIdChecked(false);
    setUseExistNickname(registeredNickname ? true : false);
  };

  //모달 창 외부 클릭 시 나가지는 동작을 막는 함수
  const handleBackdropClick = (e) => {
    e.stopPropagation();
  };

  //채팅방 생성 함수
  // const createChatroom = async (boardId, totalUser) => {
  //   const chatroomRef = ref(getDatabase(), 'chatRooms');
  //   const key = push(chatroomRef).key;
  //   //서버로 보낼 데이터
  //   const chatRoomInfo = {
  //     boardId: Number(boardId),
  //     chatRoomId: key,
  //     totalUser,
  //   };
  //   await api
  //     .post(`/api/chat/lol`, chatRoomInfo, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         'Refresh-Token': refreshToken,
  //       },
  //     })
  //     .catch((error) => console.log(error))
  //     .then(async (response) => {
  //       //서버 전송 성공시
  //       if (response.status === 200) {
  //         //파이어베이스의 Realtime DB에 저장될 객체
  //         const newChatroom = {
  //           isDeleted: false,
  //           key,
  //           roomId: boardId,
  //           createdBy: user.games['lol'],
  //           memberList: [{ nickname: user.games['lol'], oauth2Id: user.oauth2Id }],
  //           timestamp: new Date().toString(),
  //         };
  //         //Ref에 접근해서 데이터 update
  //         await update(child(chatroomRef, key), newChatroom)
  //           .catch((error) => console.log(error))
  //           .then((_response) => {
  //             dispatch(chatRoomActions.ADD_JOINED_CHATROOM(key));
  //             closeModal();
  //           });
  //       }
  //     });
  // };

  // //글 작성 완료시 서버로 데이터 전송
  // const postModalInfo = async () => {
  //   setIsPending(true);

  //   await api
  //     .post(`/api/lol/board`, userInput, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         'Refresh-Token': refreshToken,
  //       },
  //     })
  //     .catch((error) => {
  //       alert('게시글 작성중 문제가 발생하였습니다.\n잠시 후 다시 시도해주세요.');
  //       console.log(error);
  //       setIsPending(false);
  //     })
  //     .then((response) => {
  //       const boardId = response.data;
  //       //채팅방 개설
  //       createChatroom(boardId, 5);
  //       // 인원수 제한이 5로 되어있는 것 같은데 5로 고정할 건지 고민좀 해봐야 할 듯

  //       setIsPending(false);
  //       navigate(0);
  //     });
  // };

  // 게시글 등록 과정 대기 상태 관리
  const [isPending, setIsPending] = useState(false);

  return (
    <Fragment>
      <Button
        variant='outlined'
        sx={{
          height: 36,
          borderColor: '#dddddd',
          color: 'black',
          '&:hover': {
            borderColor: '#dddddd',
            color: 'black',
            backgroundColor: '#f3f3f3'
          }
        }}
        onClick={openModal}>
        글 작성하기
      </Button>
      <Modal
        open={open}
        onClose={closeModal}
        disableEscapeKeyDown
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        slotProps={{ backdrop: { onClick: handleBackdropClick } }}>
        <Stack
          direction='column'
          justifyContent='center'
          alignItems='stretch'
          sx={{
            bgcolor: 'white',
            px: 2,
            py: 2,
            minWidth: 500,
            borderRadius: 1
          }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1
            }}>
            <Typography component='h1' sx={{ fontSize: 18 }}>
              새 게시글 등록
            </Typography>
            <CloseIcon color='primary' onClick={closeModalConfirm} sx={{ mr: 1, fontSize: 18 }} />
          </Box>
          <Divider sx={{ mb: 1 }} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}>
            <Switch
              defaultChecked={registeredNickname ? true : false}
              onChange={handleSwitch}
              disabled={isPending ? true : registeredNickname ? false : true}
              size='medium'
            />
            <Typography
              color={useExistNickname ? 'primary' : 'grey'}
              sx={{
                fontSize: 14,
                fontWeight: 'bold'
              }}>
              이 아이디 사용하기 : {registeredNickname ? registeredNickname : '연결된 아이디 없음'}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            <Typography
              component='h2'
              sx={{
                fontSize: 16,
                fontWeight: 400,
                color: 'grey'
              }}>
              플레이할 닉네임
            </Typography>
            <OutlinedInput
              size='small'
              placeholder='닉네임을 입력하세요.'
              disabled={isPending ? true : useExistNickname}
              onChange={handleName}
              error={isIdChecked ? false : true}
              endAdornment={
                isLoading ? (
                  <CircularProgress color='primary' size={16} />
                ) : (
                  <Button
                    position='end'
                    sx={{ whiteSpace: 'nowrap' }}
                    // onClick={certifyNickname}
                    disabled={isPending ? true : useExistNickname}>
                    {isIdChecked ? '인증완료' : '인증하기'}
                  </Button>
                )
              }
              sx={{
                width: 320,
                height: 36,
                fontSize: 14,
                color: isIdChecked ? 'primary' : 'grey'
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2
            }}>
            <Typography
              component='h2'
              sx={{
                fontSize: 16,
                fontWeight: 400,
                color: 'grey'
              }}>
              플레이할 플랫폼 타입
            </Typography>
            <ToggleButtonGroup
              exclusive
              disabled={isPending ? true : false}
              value={userInput.platform}
              onChange={handlePlatform}
              sx={{
                '& .MuiToggleButton-root.Mui-selected': {
                  backgroundColor: '#4f90db',
                  color: 'white'
                },
                '& > *': {
                  height: 36,
                  px: '10px',
                  fontSize: 14
                }
              }}>
              {platformData.map((data, idx) => {
                return (
                  <ToggleButton key={idx} value={data.value}>
                    {data.text}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2
            }}>
            <Typography
              component='h2'
              sx={{
                fontSize: 16,
                fontWeight: 400,
                color: 'grey'
              }}>
              플레이할 큐 타입
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              mt: 1
            }}>
            <ToggleButtonGroup
              value={userInput.type}
              onChange={handleType}
              exclusive
              sx={{
                '& .MuiToggleButton-root.Mui-selected': {
                  backgroundColor: '#4f90db',
                  color: 'white'
                },
                '& > *': {
                  height: 36,
                  px: '10px',
                  fontSize: 14
                }
              }}>
              {typeData.map((data, idx) => {
                return (
                  <ToggleButton key={idx} value={data.value}>
                    {data.text}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2
            }}>
            <Typography
              component='h2'
              sx={{
                fontSize: 16,
                fontWeight: 400,
                color: 'grey'
              }}>
              원하는 파티원의 티어
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              mt: 1
            }}>
            <ToggleButtonGroup
              value={userInput.tier}
              exclusive
              onChange={handleTier}
              sx={{
                '& .MuiToggleButton-root.Mui-selected': {
                  backgroundColor: '#4f90db',
                  color: 'white'
                },
                '& > *': {
                  height: 36,
                  px: '10px',
                  fontSize: 14
                }
              }}>
              {tierData.map((data, idx) => {
                return (
                  <ToggleButton key={idx} value={data.value}>
                    {data.text}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2
            }}>
            <Typography
              component='h2'
              sx={{
                fontSize: 16,
                fontWeight: 400,
                color: 'grey'
              }}>
              파티찾기 지속시간
            </Typography>
            <FormControl sx={{ width: 240 }} disabled={isPending ? true : false}>
              <Select
                value={userInput.expire}
                onChange={handleExpire}
                sx={{
                  color: 'grey',
                  height: 36,
                  '& > *': {
                    fontSize: 14
                  }
                }}>
                {expireData.map((data, idx) => {
                  return (
                    <MenuItem key={idx} value={data.value} sx={{ color: 'grey' }}>
                      {data.text}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2
            }}>
            <Typography
              component='h2'
              sx={{
                fontSize: 16,
                fontWeight: 400,
                color: 'grey'
              }}>
              인게임 보이스 or 음성채팅 사용 여부
            </Typography>
            <ToggleButtonGroup
              exclusive='true'
              disabled={isPending ? true : false}
              value={userInput.voice}
              onChange={handleVoice}
              sx={{
                '& .MuiToggleButton-root.Mui-selected': {
                  backgroundColor: '#4f90db',
                  color: 'white'
                },
                '& > *': {
                  height: 36,
                  px: 1.5,
                  fontSize: 14
                }
              }}>
              <ToggleButton key={'micOn'} value={'y'}>
                <MicIcon sx={{ mr: 1, fontSize: 18 }} />
                사용
              </ToggleButton>
              <ToggleButton key={'micOff'} value={'n'}>
                <MicOffIcon sx={{ mr: 1, fontSize: 18 }} />
                사용안함
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              sx={{ bgcolor: 'white' }}
              onChange={handleContent}
              fullWidth
              multiline
              disabled={isPending ? true : false}
              minRows={4}
              maxRows={4}
              placeholder='140자 이내로 원하는 파티원에 대한 설명이나, 자신을 소개해 보세요.'
              inputProps={{ maxLength: 140 }}
            />

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'grey',
                mt: 1
              }}>
              <HelpOutlineIcon sx={{ fontSize: 16 }} />
              <Typography
                sx={{
                  color: 'grey',
                  pl: 1,
                  fontSize: 12
                }}>
                20자 이상 작성해야 합니다.
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ mt: 1 }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'white',
              mt: 1
            }}>
            <Button
              onClick={closeModalConfirm}
              startIcon={<BackspaceIcon />}
              variant='contained'
              disabled={isPending ? true : false}
              size='large'
              sx={{
                bgcolor: '#808080',
                mr: 1,
                width: 124,
                height: 36,
                p: 0,
                ':hover': {
                  bgcolor: '#a0a0a0'
                }
              }}>
              뒤로가기
            </Button>
            <Button
              // onClick={postModalInfo}
              startIcon={!isPending && <EditIcon />}
              variant='contained'
              size='large'
              disabled={
                isPending ? true : userInput.content.length >= 20 && (isIdChecked || useExistNickname) ? false : true
              }
              sx={{
                height: 36,
                width: 124,
                p: 0
              }}>
              {isPending ? <CircularProgress sx={{ color: 'white' }} size={20} /> : '작성하기'}
            </Button>
          </Box>
        </Stack>
      </Modal>
    </Fragment>
  );
};

export default CreateCardBtn;
