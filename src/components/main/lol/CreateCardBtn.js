import {
  Button,
  Select,
  TextField,
  Typography,
  Box,
  Modal,
  Grid,
  Stack,
  InputLabel,
  MenuItem,
  FormControl,
  Switch,
  ToggleButtonGroup,
  ToggleButton,
  ButtonGroup,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { Fragment, useEffect, useState } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import { api } from '../../../api/api';
import CloseIcon from '@mui/icons-material/Close';

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

const CreateCardBtn = (props) => {
  //작성하기 Modal 창에서 사용자에게 입력받을 정보
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

  //연결된 아이디 Switch에 사용할 state와 함수
  const [idConnected, setIdConnected] = useState(
    userInput.length ? true : false
  );
  const handleSwitch = (e) => {
    setIdConnected(!idConnected);
  };

  //아이디 인증에 사용할 state와 함수
  const [certyfiedId, setCertifiedId] = useState(false);
  const certifyNickname = () => {
    //나중에 서버로 nickname 보내서 인증받는 유효성 검사
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
  const handleBackdropClick = (e) => {
    e.stopPropagation();
  };
  const postModalInfo = async () => {
    console.log(userInput);
    //서버로 전송
    await api.post(`/api/lol/board`, { ...userInput }).catch((error) => {
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
            // height: '60%',
            bgcolor: 'white',
            padding: '10px 30px 15px 30px',
            // minHeight: '70vw',
            // minWidth: '1000px',
            // maxHeight: '650px',
            maxWidth: '700px',
            border: '1px solid #dddddd',
          }}
        >
          {/* 아이디 */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
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
                {/* 나중에 redux의 유저 정보를 통해 불러와야함 */}
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
          {/* 큐타입 */}
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
            <ToggleButton value='DUO_RANK'>듀오 랭크</ToggleButton>
            <ToggleButton value='FREE_RANK'>자유 랭크</ToggleButton>
            <ToggleButton value='NORMAL'>노말 게임</ToggleButton>
            <ToggleButton value='ARAM'>무작위 총력전</ToggleButton>
          </ToggleButtonGroup>
          {/* 티어 */}
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
            <ToggleButton value='IRON'>IRON</ToggleButton>
            <ToggleButton value='BRONZE'>BRONZE</ToggleButton>
            <ToggleButton value='SILVER'>SILVER</ToggleButton>
            <ToggleButton value='GOLD'>GOLD</ToggleButton>
            <ToggleButton value='PLATINUM'>PLATINUM</ToggleButton>
            <ToggleButton value='DIAMOND'>DIAMOND</ToggleButton>
            <ToggleButton
              value='MASTER'
              disabled={userInput.type === 'DUO_RANK' ? true : false}
            >
              MASTER
            </ToggleButton>
            <ToggleButton
              value='ALL'
              disabled={userInput.type === 'DUO_RANK' ? true : false}
            >
              상관없음
            </ToggleButton>
          </ToggleButtonGroup>
          {/* 포지션 */}
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
            <ToggleButton value='TOP'>TOP</ToggleButton>
            <ToggleButton value='JUG'>JUG</ToggleButton>
            <ToggleButton value='MID'>MID</ToggleButton>
            <ToggleButton value='ADC'>ADC</ToggleButton>
            <ToggleButton value='SUP'>SUP</ToggleButton>
            <ToggleButton value='ALL'>상관없음</ToggleButton>
          </ToggleButtonGroup>
          {/* 카드 만료 시간 */}
          <ModalText text={'카드 만료 시간'} />
          <Box>
            <FormControl size='small' sx={{ width: '300px' }}>
              <Select value={userInput.expire} onChange={handleExpire}>
                <MenuItem value='FIFTEEN_M'>15분</MenuItem>
                <MenuItem value='THIRTY_M'>30분</MenuItem>
                <MenuItem value='ONE_H'>1시간</MenuItem>
                <MenuItem value='TWO_H'>2시간</MenuItem>
                <MenuItem value='THREE_H'>3시간</MenuItem>
                <MenuItem value='SIX_H'>6시간</MenuItem>
                <MenuItem value='TWELVE_H'>12시간</MenuItem>
                <MenuItem value='TWENTY_FOUR_H'>24시간</MenuItem>
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
