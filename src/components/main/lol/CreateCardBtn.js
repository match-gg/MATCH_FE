import React, { Fragment, useState } from 'react';
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

import { api } from '../../../api/api';

const typeData = [
  {
    value: 'DUO_RANK',
    text: '듀오랭크',
  },
  {
    value: 'FREE_RANK',
    text: '자유랭크',
  },
  {
    value: 'ARAM',
    text: '칼바람나락',
  },
  {
    value: 'NORMAL',
    text: '일반게임',
  },
];

const tierData = [
  {
    value: 'IRON',
    text: '아이언',
  },
  {
    value: 'BRONZE',
    text: '브론즈',
  },
  {
    value: 'SILVER',
    text: '실버',
  },
  {
    value: 'GOLD',
    text: '골드',
  },
  {
    value: 'PLATINUM',
    text: '플레티넘',
  },
  {
    value: 'DIAMOND',
    text: '다이아몬드',
  },
  {
    value: 'MASTER',
    text: '마스터',
  },
  {
    value: 'ALL',
    text: '상관없음',
  },
];

const positionData = [
  {
    value: 'TOP',
    text: '탑',
  },
  {
    value: 'JUG',
    text: '정글',
  },
  {
    value: 'MID',
    text: '미드',
  },
  {
    value: 'ADC',
    text: '원딜',
  },
  {
    value: 'SUP',
    text: '서폿',
  },
  {
    value: 'ALL',
    text: '상관없음',
  },
];

const expireData = [
  {
    value: 'FIFTEEN_M',
    text: '15분',
  },
  {
    value: 'THIRTY_M',
    text: '30분',
  },
  {
    value: 'ONE_H',
    text: '1시간',
  },
  {
    value: 'TWO_H',
    text: '2시간',
  },
  {
    value: 'THREE_H',
    text: '3시간',
  },
  {
    value: 'SIX_H',
    text: '6시간',
  },
  {
    value: 'TWELVE_H',
    text: '12시간',
  },
  {
    value: 'TWENTY_FOUR_H',
    text: '24시간',
  },
];

const CreateCardBtn = (props) => {
  const [isChanged, setIsChanged] = useState(false);

  const [userInput, setUserInput] = useState({
    name: props.name ? props.name : '',
    type: 'DUO_RANK',
    tier: 'IRON',
    position: 'TOP',
    expire: 'FIFTEEN_M',
    voice: 'n',
    content: '',
  });

  const handleName = (e) => {
    setUserInput({ ...userInput, name: e.target.value });
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
      (userInput.tier === 'MASTER' || userInput.tier === 'ALL' || userInput.position === 'ALL')
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

  const handleTier = (e, newValue) => {
    if (newValue === null) {
      return;
    }
    setUserInput({ ...userInput, tier: newValue });
    setIsChanged(true);
  };

  const handlePosition = (e, newValue) => {
    if (newValue === null) {
      return;
    }
    setUserInput({ ...userInput, position: newValue });
    setIsChanged(true);
  };

  const handleExpire = (e, newValue) => {
    setUserInput({ ...userInput, expire: e.target.value });
    setIsChanged(true);
  };

  const handleVoice = (e) => {
    setUserInput({ ...userInput, voice: e.target.checked ? 'y' : 'n' });
    setIsChanged(true);
  };

  const handleContent = (e) => {
    setUserInput({ ...userInput, content: e.target.value });
    setIsChanged(true);
  };

  //연결된 아이디 Switch 컴포넌트에 사용할 state와 함수
  const [idConnected, setIdConnected] = useState(userInput.length ? true : false);
  const handleSwitch = (e) => {
    setIdConnected(!idConnected);
    setIsChanged(true);
  };

  //아이디 인증에 사용할 state와 함수
  const [certyfiedId, setCertifiedId] = useState(false);
  const certifyNickname = () => {
    //나중에 서버로 nickname 보내서 인증받는 유효성 검사 추가해야함
    //일단은 true로 바꾸게 작성해놈
    setCertifiedId(true);
    setIsChanged(true);
  };

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
      name: props.name ? props.name : '',
      type: 'DUO_RANK',
      tier: 'IRON',
      position: 'TOP',
      voice: 'n',
      expire: 'FIFTEEN_M',
      content: '',
    });
    setCertifiedId(false);
  };

  //모달 창 외부 클릭 시 나가지는 동작을 막는 함수
  const handleBackdropClick = (e) => {
    e.stopPropagation();
  };

  //글 작성 완료시 서버로 데이터 전송
  const postModalInfo = async () => {
    const userInputData = JSON.stringify({
      ...userInput,
      content: userInput.content.trim(),
    });
    // 서버로 전송
    await api.post(`/api/lol/board`, userInputData).catch((error) => {
      alert('게시글 작성중 문제가 발생하였습니다.\n다시 시도해주세요.');
      console.log(error);
      closeModal();
    });
  };

  return (
    <Fragment>
      <Button variant='outlined' sx={{ height: 40, mr: 1 }} onClick={openModal}>
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
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}
          >
            <Typography component='h1' sx={{ fontSize: 28, ml: 1 }}>
              새 게시글 등록
            </Typography>
            <CloseIcon color='primary' onClick={closeModalConfirm} sx={{ mr: 1 }} />
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
              defaultChecked={props.name ? true : false}
              onChange={handleSwitch}
              disabled={props.name ? false : true}
            />
            <Typography
              color={idConnected ? 'primary' : 'grey'}
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              이 아이디 사용하기 : {props.name ? props.name : '연결된 소환사명 없음'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
              disabled={idConnected}
              onChange={handleName}
              endAdornment={
                <Button
                  position='end'
                  sx={{ whiteSpace: 'nowrap' }}
                  onClick={certifyNickname}
                  disabled={idConnected}
                >
                  인증하기
                </Button>
              }
              sx={{ width: 360 }}
            />
          </Box>
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}
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
              size='small'
              value={userInput.type}
              onChange={handleType}
              sx={{
                '& .MuiToggleButton-root.Mui-selected': {
                  backgroundColor: '#4f90db',
                  color: 'white',
                },
                '& > *': {
                  height: 40,
                  px: 2,
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
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}
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
              size='small'
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
                  px: 1.5,
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
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}
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
              size='small'
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
                  px: 2,
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
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}
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
            <FormControl size='small' sx={{ width: 240 }}>
              <Select value={userInput.expire} onChange={handleExpire} sx={{ color: 'grey'}}>
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
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}
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
            <Box flex={{ display: 'flex', alignItems: 'center' }}>
              {userInput.voice === 'y' ? (
                <MicIcon sx={{ color: 'grey' }} />
              ) : (
                <MicOffIcon sx={{ color: 'grey' }} />
              )}
              <Switch defaultChecked={false} onChange={handleVoice} sx={{ ml: 1 }} />
            </Box>
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              sx={{ bgcolor: 'white' }}
              onChange={handleContent}
              fullWidth
              multiline
              minRows={4} // 이거 어떻게 처리하지...
              maxRows={4}
              placeholder='140자 이내로 원하는 파티원에 대한 설명이나, 자신을 소개해 보세요.'
              inputProps={{ maxLength: 140 }}
            />
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
              disabled={!(idConnected || certyfiedId)}
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