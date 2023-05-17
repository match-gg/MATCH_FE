import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { api } from '../../../api/api';
import {
  getDatabase,
  ref,
  push,
  update,
  child,
  // serverTimestamp,
} from 'firebase/database';

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

import {
  typeData,
  tierData,
  positionData,
  expireData,
} from './CreateCardBtn.d';
import { chatRoomActions } from '../../../store/chatRoom-slice';

const CreateCardBtn = (props) => {
  const { accessToken } = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const refreshToken = localStorage.getItem('matchGG_refreshToken');
  const dispatch = useDispatch();

  // 로그인 된 사용자의 기본 닉네임 가져오기.
  // const registeredNickname = user.games['lol'];
  //테스트용임 나중에 지워야함!
  const registeredNickname = 'test밍꾸라지';

  // 닉네임 인증여부 확인에 사용할 state와 함수
  const [isIdChecked, setIsIdChecked] = useState(false);

  // 닉네임 조회 시 로딩 상태 변수
  const [isLoading, setIsLoading] = useState(false);

  // 사용자 계정에 연결된 닉네임 사용 여부.
  const [useExistNickname, setUseExistNickname] = useState(
    registeredNickname ? true : false
  );

  // 사용자 input에 변동사항 있는지 확인 -> 모달 닫기 전 확인하는 데에 사용.
  const [isChanged, setIsChanged] = useState(false);

  const [userInput, setUserInput] = useState({
    name: registeredNickname ? registeredNickname : '',
    type: 'DUO_RANK',
    tier: 'IRON',
    position: 'TOP',
    expire: 'FIFTEEN_M',
    voice: 'n',
    content: '',
  });

  const handleName = (e) => {
    setUserInput({ ...userInput, name: e.target.value.trim() });
    setIsChanged(true);
  };

  const handleType = (e, newValue) => {
    if (newValue === null) {
      return;
    } else if (newValue === 'ARAM') {
      setUserInput({
        ...userInput,
        tier: 'ALL',
        position: 'ALL',
        type: newValue,
      });
    } else if (userInput.type === 'ARAM' && newValue !== 'ARAM') {
      setUserInput({
        ...userInput,
        tier: 'IRON',
        position: 'TOP',
        type: newValue,
      });
    } else if (
      newValue === 'DUO_RANK' &&
      (userInput.tier === 'MASTER' ||
        userInput.tier === 'ALL' ||
        userInput.position === 'ALL')
    ) {
      setUserInput({
        ...userInput,
        tier: 'IRON',
        position: 'TOP',
        type: newValue,
      });
    } else {
      setUserInput({ ...userInput, type: newValue });
    }
    setIsChanged(true);
  };

  const handleTier = (_e, newValue) => {
    if (newValue === null) return;
    setUserInput({ ...userInput, tier: newValue });
    setIsChanged(true);
  };

  const handlePosition = (_e, newValue) => {
    if (newValue === null) return;
    setUserInput({ ...userInput, position: newValue });
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
  const certifyNickname = async () => {
    setIsLoading(true);

    await api
      .get(`/api/lol/user/exist/${userInput.name}`)
      .then(async (response) => {
        if (response.status === 200) {
          await api.get(`/api/lol/user/${userInput.name}`).then((_response) => {
            setIsLoading(false);
            setIsIdChecked(true);
          });
        } else {
          setIsIdChecked(false);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
    setIsChanged(true);
  };

  //Modal 관련 state와 함수
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModalConfirm = () => {
    if (isChanged) {
      if (
        window.confirm(
          '현재 창을 나가면 입력하신 정보가 사라지게됩니다.\n정말 나가시겠습니까?'
        )
      )
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
      type: 'DUO_RANK',
      tier: 'IRON',
      position: 'TOP',
      voice: 'n',
      expire: 'FIFTEEN_M',
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
  const createChatroom = async (boardId, totalUser) => {
    const chatroomRef = ref(getDatabase(), 'chatrooms');
    const key = push(chatroomRef).key;
    const chatRoomInfo = {
      boardId: Number(boardId),
      chatRoomId: key,
      totalUser,
    };
    await api
      .post(`/api/chat/lol`, chatRoomInfo, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Refresh-Token': refreshToken,
        },
      })
      .catch((error) => console.log(error))
      .then(async (response) => {
        if (response.status === 200) {
          const newChatroom = {
            roomId: key,
            createdBy: userInput.name,
            members: [userInput.name],
          };
          await update(child(chatroomRef, key), newChatroom)
            .catch((error) => console.log(error))
            .then((_response) => {
              dispatch(chatRoomActions.ADD_JOINED_CHATROOM(key));
              closeModal();
            });
        }
      });
  };

  //글 작성 완료시 서버로 데이터 전송
  const postModalInfo = async () => {
    await api
      .post(`/api/lol/board`, userInput, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Refresh-Token': refreshToken,
        },
      })
      .catch((error) => {
        alert('게시글 작성중 문제가 발생하였습니다.\n다시 시도해주세요.');
        console.log(error);
      })
      .then((response) => {
        const boardId = response.data;
        //채팅방 개설
        createChatroom(boardId, 5);
      });
  };

  return (
    <Fragment>
      <Button
        variant='outlined'
        sx={{
          height: 40,
          borderColor: '#dddddd',
          color: 'black',
          '&:hover': {
            borderColor: '#dddddd',
            color: 'black',
            backgroundColor: '#f3f3f3',
          },
        }}
        onClick={openModal}
      >
        글 작성하기
      </Button>
      <Modal
        open={open}
        onClose={closeModal}
        disableEscapeKeyDown
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        slotProps={{ backdrop: { onClick: handleBackdropClick } }}
      >
        <Stack
          direction='column'
          justifyContent='center'
          alignItems='stretch'
          sx={{
            width: '50%',
            bgcolor: 'white',
            px: 4,
            py: 3,
            maxWidth: 640,
            borderRadius: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1,
            }}
          >
            <Typography component='h1' sx={{ fontSize: 28, ml: 1 }}>
              새 게시글 등록
            </Typography>
            <CloseIcon
              color='primary'
              onClick={closeModalConfirm}
              sx={{ mr: 1 }}
            />
          </Box>
          <Divider sx={{ mb: 1 }} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <Switch
              defaultChecked={registeredNickname ? true : false}
              onChange={handleSwitch}
              disabled={registeredNickname ? false : true}
            />
            <Typography
              color={useExistNickname ? 'primary' : 'grey'}
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              이 아이디 사용하기 :{' '}
              {registeredNickname ? registeredNickname : '연결된 소환사명 없음'}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              component='h2'
              sx={{
                fontSize: 20,
                fontWeight: 400,
                color: 'grey',
              }}
            >
              등록할 소환사 명
            </Typography>
            <OutlinedInput
              size='small'
              placeholder='리그오브레전드 소환사 명을 입력하세요.'
              disabled={useExistNickname}
              onChange={handleName}
              endAdornment={
                isLoading ? (
                  <CircularProgress color='primary' size={20} />
                ) : (
                  <Button
                    position='end'
                    sx={{ whiteSpace: 'nowrap' }}
                    onClick={certifyNickname}
                    disabled={useExistNickname}
                  >
                    인증하기
                  </Button>
                )
              }
              sx={{ width: 360 }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2,
            }}
          >
            <Typography
              component='h2'
              sx={{
                fontSize: 20,
                fontWeight: 400,
                color: 'grey',
              }}
            >
              플레이할 큐 타입
            </Typography>
            <ToggleButtonGroup
              exclusive
              value={userInput.type}
              onChange={handleType}
              sx={{
                '& .MuiToggleButton-root.Mui-selected': {
                  backgroundColor: '#4f90db',
                  color: 'white',
                },
                '& > *': {
                  height: 40,
                  px: '10px',
                },
              }}
            >
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
              mt: 2,
            }}
          >
            <Typography
              component='h2'
              sx={{
                fontSize: 20,
                fontWeight: 400,
                color: 'grey',
              }}
            >
              원하는 파티원의 티어
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              mt: 1,
            }}
          >
            <ToggleButtonGroup
              disabled={userInput.type === 'ARAM' ? true : false}
              value={userInput.tier}
              onChange={handleTier}
              exclusive
              sx={{
                '& .MuiToggleButton-root.Mui-selected': {
                  backgroundColor: '#4f90db',
                  color: 'white',
                },
                '& > *': {
                  height: 40,
                  px: '10px',
                },
              }}
            >
              {tierData.map((data, idx) => {
                return (
                  <ToggleButton
                    key={idx}
                    value={data.value}
                    disabled={
                      (data.value === 'MASTER' || data.value === 'ALL') &&
                      userInput.type === 'DUO_RANK'
                        ? true
                        : false
                    }
                  >
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
              mt: 2,
            }}
          >
            <Typography
              component='h2'
              sx={{
                fontSize: 20,
                fontWeight: 400,
                color: 'grey',
              }}
            >
              원하는 파티원의 포지션
            </Typography>
            <ToggleButtonGroup
              disabled={userInput.type === 'ARAM' ? true : false}
              value={userInput.position}
              exclusive
              onChange={handlePosition}
              sx={{
                '& .MuiToggleButton-root.Mui-selected': {
                  backgroundColor: '#4f90db',
                  color: 'white',
                },
                '& > *': {
                  height: 40,
                  px: '10px',
                },
              }}
            >
              {positionData.map((data, idx) => {
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
              mt: 2,
            }}
          >
            <Typography
              component='h2'
              sx={{
                fontSize: 20,
                fontWeight: 400,
                color: 'grey',
              }}
            >
              파티찾기 지속시간
            </Typography>
            <FormControl sx={{ width: 240 }}>
              <Select
                value={userInput.expire}
                onChange={handleExpire}
                sx={{ color: 'grey', height: 40 }}
              >
                {expireData.map((data, idx) => {
                  return (
                    <MenuItem
                      key={idx}
                      value={data.value}
                      sx={{ color: 'grey' }}
                    >
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
              mt: 2,
            }}
          >
            <Typography
              component='h2'
              sx={{
                fontSize: 20,
                fontWeight: 400,
                color: 'grey',
              }}
            >
              인게임 보이스 or 음성채팅 사용 여부
            </Typography>
            <ToggleButtonGroup
              exclusive='true'
              value={userInput.voice}
              onChange={handleVoice}
              sx={{
                '& .MuiToggleButton-root.Mui-selected': {
                  backgroundColor: '#4f90db',
                  color: 'white',
                },
                '& > *': {
                  height: 40,
                  px: 1.5,
                },
              }}
            >
              <ToggleButton key={'micOn'} value={'y'}>
                <MicIcon sx={{ mr: 1 }} />
                사용
              </ToggleButton>
              <ToggleButton key={'micOff'} value={'n'}>
                <MicOffIcon sx={{ mr: 1 }} />
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
                mt: 1,
              }}
            >
              <HelpOutlineIcon />
              <Typography
                sx={{
                  color: 'grey',
                  pl: 1,
                }}
              >
                20자 이상 작성해야 합니다.
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ mt: 2 }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'white',
              mt: 2,
            }}
          >
            <Button
              onClick={closeModalConfirm}
              startIcon={<BackspaceIcon />}
              variant='contained'
              size='large'
              sx={{
                bgcolor: '#808080',
                mr: 2,
                ':hover': {
                  bgcolor: '#a0a0a0',
                },
              }}
            >
              뒤로가기
            </Button>
            <Button
              onClick={postModalInfo}
              startIcon={<EditIcon />}
              variant='contained'
              size='large'
              disabled={
                userInput.content.length >= 20 &&
                (isIdChecked || useExistNickname)
                  ? false
                  : true
              }
            >
              작성하기
            </Button>
          </Box>
        </Stack>
      </Modal>
    </Fragment>
  );
};

export default CreateCardBtn;
