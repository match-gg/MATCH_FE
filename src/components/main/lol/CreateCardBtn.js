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

const ModalText = ({ text }) => {
  return (
    <Typography
      color='primary'
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
    setUserInput({ ...userInput, type: newValue });
  };
  const handleTier = (e, newValue) => {
    setUserInput({ ...userInput, tier: newValue });
  };
  const handlePosition = (e, newValue) => {
    setUserInput({ ...userInput, position: newValue });
  };
  const handleExpire = (e, newValue) => {
    setUserInput({ ...userInput, expire: e.target.value });
  };
  const handleVoice = (e) => {
    setUserInput({ ...userInput, voice: e.target.checked ? 'Y' : 'N' });
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
      position: 'NONE',
      voice: 'n',
      expire: 'FIFTEEN_M',
      content: '',
    });
  };
  const handleBackdropClick = (e) => {
    e.stopPropagation();
  };
  const postModalInfo = async () => {
    console.log(userInput);
    await api.post(`/api/lol/board`, { ...userInput }).catch((error) => {
      alert('게시글 작성중 문제가 발생하였습니다.\n다시 시도해주세요.');
      console.log(error);
      closeModal();
    });
  };
  console.log(idConnected, certyfiedId);
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
        <Grid
          container
          sx={{
            top: '50%',
            left: '50%',
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            width: '70vw',
            // height: '70%',
            bgcolor: 'white',
            padding: '20px 50px 15px 50px',
            // minHeight: '70vw',
            // minWidth: '1000px',
            // maxHeight: '650px',
            // maxWidth: '800px',
            boxShadow: '5px 10px 10px 1px rgba(0,0,0,.3)',
          }}
        >
          <Grid
            item
            xs={6}
            sx={{
              height: '80%',
              paddingRight: '5px',
            }}
          >
            {/* 아이디 */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'start',
              }}
            >
              <Switch
                defaultChecked={props.name ? true : false}
                onChange={handleSwitch}
              />
              <Typography
                color={idConnected ? 'primary' : 'grey'}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                현재 계정 사용 : {props.name ? props.name : '-'}
              </Typography>
            </Box>
            <Box
              sx={{ maxWidth: '350px', display: 'felx', flexDirection: 'row' }}
            >
              <OutlinedInput
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
            <Box sx={{ overflow: 'auto ' }}>
              <ToggleButtonGroup
                value={userInput.type}
                exclusive={true}
                onChange={handleType}
                sx={{
                  '& .MuiToggleButton-root.Mui-selected': {
                    // backgroundColor: '#4AD395',
                    backgroundColor: '#4f90db',
                    color: 'white',
                  },
                }}
              >
                <ToggleButton value='DUO_RANK' sx={{ whiteSpace: 'nowrap' }}>
                  듀오 랭크
                </ToggleButton>
                <ToggleButton value='FREE_RANK' sx={{ whiteSpace: 'nowrap' }}>
                  자유 랭크
                </ToggleButton>
                <ToggleButton value='NORMAL' sx={{ whiteSpace: 'nowrap' }}>
                  노말 게임
                </ToggleButton>
                <ToggleButton value='ARAM' sx={{ whiteSpace: 'nowrap' }}>
                  무작위 총력전
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            {/* 티어 */}
            <ModalText text={'원하는 파티원의 티어'} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <ToggleButtonGroup
                value={userInput.tier}
                exclusive={true}
                onChange={handleTier}
                sx={{
                  '& .MuiToggleButton-root.Mui-selected': {
                    // backgroundColor: '#4AD395',
                    backgroundColor: '#4f90db',
                    color: 'white',
                  },
                }}
              >
                <ToggleButton value='IRON'>IRON</ToggleButton>
                <ToggleButton value='BRONZE'>BRONZE</ToggleButton>
                <ToggleButton value='SILVER'>SILVER</ToggleButton>
                <ToggleButton value='GOLD'>GOLD</ToggleButton>
              </ToggleButtonGroup>
              <ToggleButtonGroup
                value={userInput.tier}
                exclusive={true}
                onChange={handleTier}
                sx={{
                  '& .MuiToggleButton-root.Mui-selected': {
                    // backgroundColor: '#4AD395',
                    backgroundColor: '#4f90db',
                    color: 'white',
                  },
                }}
              >
                <ToggleButton value='PLATINUM'>PLATINUM</ToggleButton>
                <ToggleButton value='DIAMOND'>DIAMOND</ToggleButton>
                <ToggleButton value='MASTER'>MASTER</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            {/* 포지션 */}
            <ModalText text={'원하는 파티원의 포지션'} />
            <ToggleButtonGroup
              value={userInput.position}
              exclusive={true}
              onChange={handlePosition}
              sx={{
                '& .MuiToggleButton-root.Mui-selected': {
                  // backgroundColor: '#4AD395',
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
            </ToggleButtonGroup>
            {/* 카드 만료 시간 */}
            <ModalText text={'카드 만료 시간'} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <ToggleButtonGroup
                sx={{
                  '& .MuiToggleButton-root.Mui-selected': {
                    // backgroundColor: '#4AD395',
                    backgroundColor: '#4f90db',
                    color: 'white',
                  },
                }}
                value={userInput.expire}
                exclusive
                onChange={handleExpire}
              >
                <ToggleButton value='FIFTEEN_M'>15Min</ToggleButton>
                <ToggleButton value='THIRTY_M'>30Min</ToggleButton>
                <ToggleButton value='ONE_H'>1Hour</ToggleButton>
                <ToggleButton value='TWO_H'>2Hour</ToggleButton>
              </ToggleButtonGroup>
              <ToggleButtonGroup
                sx={{
                  '& .MuiToggleButton-root.Mui-selected': {
                    // backgroundColor: '#4AD395',
                    backgroundColor: '#4f90db',
                    color: 'white',
                  },
                }}
                value={userInput.expire}
                exclusive
                onChange={handleExpire}
              >
                <ToggleButton value='THREE_H'>3Hour</ToggleButton>
                <ToggleButton value='SIX_H'>6Hour</ToggleButton>
                <ToggleButton value='TWELVE_H'>12Hour</ToggleButton>
                <ToggleButton value='TWENTY_FOUR_H'>24Hour</ToggleButton>
              </ToggleButtonGroup>
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
                  <MicIcon color={userInput.voice === 'Y' ? 'primary' : ''} />
                  음성채팅 사용 여부
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ height: '80%' }}>
            <ModalText text={'카드 내용 작성하기'} />
            <TextField
              sx={{ bgcolor: 'white' }}
              onChange={handleContent}
              fullWidth
              multiline
              minRows={20} // 이거 어떻게 처리하지...
              maxRows={20}
              placeholder='카드의 내용은 140자 이내로 작성해주세요.'
              inputProps={{ maxLength: 10 }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            sx={{ backgroundColor: 'white', marginTop: '10px' }}
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
          </Grid>
        </Grid>
      </Modal>
    </Fragment>
  );
};

export default CreateCardBtn;
