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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BackspaceIcon from '@mui/icons-material/Backspace';
import MicIcon from '@mui/icons-material/Mic';
import CloseIcon from '@mui/icons-material/Close';

import { api } from '../../../api/api';

//글 작성 모달 창의  각 입력 영역의 텍스트
const ModalText = ({ text, type }) => {
  return (
    <Typography
      color={type === 'ARAM' ? '#c3c3c3' : 'primary'}
      sx={{
        marginTop: '10px',
        fontSize: '16px',
      }}
    >
      {text}
    </Typography>
  );
};

const typeData = [
  {
    value: 'DUO_RANK',
    text: '듀오 랭크',
  },
  {
    value: 'FREE_RANK',
    text: '자유 랭크',
  },
  {
    value: 'NORMAL',
    text: '노말 게임',
  },
  {
    value: 'ARAM',
    text: '무작위 총력전',
  },
];

const tierData = [
  {
    value: 'IRON',
    text: 'IRON',
  },
  {
    value: 'BRONZE',
    text: 'BRONZE',
  },
  {
    value: 'SILVER',
    text: 'SILVER',
  },
  {
    value: 'GOLD',
    text: 'GOLD',
  },
  {
    value: 'PLATINUM',
    text: 'PLATINUM',
  },
  {
    value: 'DIAMOND',
    text: 'DIAMOND',
  },
  {
    value: 'MASTER',
    text: 'MASTER',
  },
  {
    value: 'ALL',
    text: '상관없음',
  },
];

const positionData = [
  {
    value: 'TOP',
    text: 'TOP',
  },
  {
    value: 'JUG',
    text: 'JUG',
  },
  {
    value: 'MID',
    text: 'MID',
  },
  {
    value: 'ADC',
    text: 'ADC',
  },
  {
    value: 'SUP',
    text: 'SUP',
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
  //모달에서 사용자의 입력 값을 담을 state, 초기값
  //name은 lol 페이지에서 버튼에 props 값으로 줄 예정
  const [userInput, setUserInput] = useState({
    name: props.name ? props.name : '',
    type: 'DUO_RANK',
    tier: 'IRON',
    position: 'TOP',
    expire: 'FIFTEEN_M',
    voice: 'n',
    content: '',
  });

  //사용자의 입력을 통해 userInput의 값을 변경하는 함수
  const handleName = (e) => {
    setUserInput({ ...userInput, name: e.target.value });
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
  };

  const handleTier = (e, newValue) => {
    if (newValue === null) {
      return;
    }
    setUserInput({ ...userInput, tier: newValue });
  };

  const handlePosition = (e, newValue) => {
    if (newValue === null) {
      return;
    }
    setUserInput({ ...userInput, position: newValue });
  };

  const handleExpire = (e, newValue) => {
    setUserInput({ ...userInput, expire: e.target.value });
  };

  const handleVoice = (e) => {
    setUserInput({ ...userInput, voice: e.target.checked ? 'y' : 'n' });
  };

  const handleContent = (e) => {
    setUserInput({ ...userInput, content: e.target.value });
  };

  //연결된 아이디 Switch 컴포넌트에 사용할 state와 함수
  const [idConnected, setIdConnected] = useState(
    userInput.length ? true : false
  );
  const handleSwitch = (e) => {
    setIdConnected(!idConnected);
  };

  //아이디 인증에 사용할 state와 함수
  const [certyfiedId, setCertifiedId] = useState(false);
  const certifyNickname = () => {
    //나중에 서버로 nickname 보내서 인증받는 유효성 검사 추가해야함
    //일단은 true로 바꾸게 작성해놈
    setCertifiedId(true);
  };

  //Modal 관련 state와 함수
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModalConfirm = () => {
    if (
      window.confirm(
        '현재 창을 나가면 입력하신 정보가 사라지게됩니다.\n정말 나가시겠습니까?'
      )
    ) {
      closeModal();
    } else {
      return;
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
        BackdropProps={{ onClick: handleBackdropClick }}
      >
        {/* hideBackdrop 속성을 사용하면 배경 클릭해도 안닫히기는 하는데 배경이 blur 처리되는것도 동작하지 않음 (그냥 배경을 안만들어주는듯) */}
        <Stack
          direction='column'
          justifyContent='center'
          alignItems='stretch'
          sx={{
            top: '50%',
            left: '50%',
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            width: '60vw',
            bgcolor: 'white',
            padding: '10px 30px 15px 30px',
            maxWidth: '700px',
            border: '1px solid #dddddd',
          }}
        >
          {/* 아이디  영역*/}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'start',
                alignItems: 'center',
              }}
            >
              <Switch
                defaultChecked={props.name ? true : false}
                onChange={handleSwitch}
              />
              <Typography
                color={idConnected ? 'primary' : 'grey'}
                sx={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                현재 계정 사용 : {props.name ? props.name : '-'}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  cursor: 'pointer',
                  boxShadow: '0 0 2px 1px #4f8fdb',
                },
              }}
            >
              <CloseIcon color='primary' onClick={closeModalConfirm} />
            </Box>
          </Box>
          <Box
            sx={{ maxWidth: '350px', display: 'felx', flexDirection: 'row' }}
          >
            <OutlinedInput
              size='small'
              fullWidth
              placeholder='연결할 아이디를 입력해주세요.'
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
            />
          </Box>
          {/* 큐타입  영역*/}
          <ModalText text={'플레이할 큐타입'} />
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
          {/* 티어  영역*/}
          <ModalText text={'원하는 파티원의 티어'} type={userInput.type} />
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
          {/* 포지션  영역*/}
          <ModalText text={'원하는 파티원의 포지션'} type={userInput.type} />
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
          {/* 카드 만료 시간  영역*/}
          <ModalText text={'카드 만료 시간'} />
          <Box>
            <FormControl size='small' sx={{ width: '300px' }}>
              <Select value={userInput.expire} onChange={handleExpire}>
                {expireData.map((data, idx) => {
                  return (
                    <MenuItem key={idx} value={data.value}>
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
              flexDirection: 'row',
              justifyContent: 'start',
            }}
          >
            <Box sx={{ display: 'flex', marginTop: '10px' }}>
              <Switch defaultChecked={false} onChange={handleVoice} />
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                <MicIcon color={userInput.voice === 'y' ? 'primary' : ''} />
                음성채팅 사용 여부
              </Typography>
            </Box>
          </Box>
          <Box xs={6} sx={{ height: '80%' }}>
            <ModalText text={'카드 내용 작성하기'} />
            <TextField
              sx={{ bgcolor: 'white' }}
              onChange={handleContent}
              fullWidth
              multiline
              minRows={5} // 이거 어떻게 처리하지...
              maxRows={5}
              placeholder='카드의 내용은 140자 이내로 작성해주세요.'
              inputProps={{ maxLength: 140 }}
            />
          </Box>
          <Box
            xs={12}
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            sx={{ backgroundColor: 'white', marginTop: '20px' }}
          >
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-around'
              sx={{ width: '100%' }}
            >
              <Button
                onClick={closeModalConfirm}
                startIcon={<BackspaceIcon />}
                variant='contained'
                size='large'
                sx={{
                  bgcolor: '#808080',
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
            </Stack>
          </Box>
        </Stack>
      </Modal>
    </Fragment>
  );
};

export default CreateCardBtn;
