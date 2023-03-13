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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { Fragment, useEffect, useState } from 'react';
import { api } from '../../../api/api';

const ModalText = ({ text }) => {
  return (
    <Typography
      sx={{
        marginTop: '10px',
        marginLeft: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
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
    position: 'NONE',
    voice: 'n',
    expire: 'FIFTEEN_M',
    content: '',
  });

  //사용자의 입력을 통해 userInput의 값을 변경하는 함수
  const handleName = (e) => {
    setUserInput({ ...userInput, name: e.target.value });
  };
  const handleType = (e) => {
    setUserInput({ ...userInput, type: e.target.value });
  };
  const handleTier = (e) => {
    setUserInput({ ...userInput, tier: e.target.value });
  };
  const handlePosition = (e) => {
    setUserInput({ ...userInput, position: e.target.value });
  };
  const handleVoice = (e) => {
    setUserInput({ ...userInput, voice: e.target.checked ? 'y' : 'n' });
  };
  const handleExpire = (e) => {
    setUserInput({ ...userInput, expire: e.target.value });
  };
  const handleContent = (e) => {
    setUserInput({ ...userInput, content: e.target.value });
  };

  //연결된 아이디 Switch에 사용할 state와 함수
  const [idConnected, setIdConnected] = useState(props.name ? true : false);
  const handleSwitch = (e) => {
    setIdConnected(!idConnected);
  };

  //Modal 관련 state와 함수
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
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
            width: '70%',
            height: '70%',
            bgcolor: 'white',
            padding: '5px',
            minHeight: '600px',
            minWidth: '600px',
            maxHeight: '650px',
            maxWidth: '800px',
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
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                연결된 아이디 : {props.name ? props.name : '-'}
              </Typography>
            </Box>
            <TextField
              fullWidth
              label='연결할 아이디를 입력해주세요'
              placeholder='연결할 아이디를 입력해주세요'
              disabled={idConnected}
              onChange={handleName}
            />
            {/* 큐타입 */}
            <FormControl fullWidth>
              <ModalText text={'큐 타입을 선택해주세요.'} />
              {/* <InputLabel>큐 타입을 선택해주세요.</InputLabel> */}
              <Select
                defaultValue='DUO_RANK'
                value={userInput.type}
                // label='큐 타입을 선택해주세요.'
                onChange={handleType}
              >
                <MenuItem
                  disabled
                  value=''
                  sx={{
                    display: 'none',
                  }}
                >
                  <em>-</em>
                </MenuItem>
                <MenuItem value='DUO_RANK'>2인 랭크 게임</MenuItem>
                <MenuItem value='FREE_RANK'>자유 랭크 게임</MenuItem>
                <MenuItem value='NORMAL'>비공개 선택</MenuItem>
                <MenuItem value='ARAM'>무작위 총력전</MenuItem>
              </Select>
            </FormControl>
            {/* 티어 */}
            <FormControl fullWidth>
              <ModalText text={'파티원의 티어를 선택해주세요.'} />
              {/* <InputLabel>파티원의 티어를 선택해주세요.</InputLabel> */}
              <Select
                value={userInput.tier}
                defaultValue='IRON'
                // label='파티원의 티어을 선택해주세요'
                onChange={handleTier}
              >
                <MenuItem
                  disabled
                  value=''
                  sx={{
                    display: 'none',
                  }}
                >
                  <em>-</em>
                </MenuItem>
                <MenuItem value='NONE'>상관없음</MenuItem>
                <MenuItem value='IRON'>아이언</MenuItem>
                <MenuItem value='BRONZE'>브론즈</MenuItem>
                <MenuItem value='SILVER'>실버</MenuItem>
                <MenuItem value='GOLD'>골드</MenuItem>
                <MenuItem value='PLATINUM'>플레티넘</MenuItem>
                <MenuItem value='DIAMOND'>다이아몬드</MenuItem>
                <MenuItem value='MASTER'>마스터</MenuItem>
              </Select>
            </FormControl>
            {/* 포지션 */}
            <FormControl fullWidth>
              <ModalText text={'파티원의 포지션을 선택해주세요.'} />
              {/* <InputLabel>파티원의 포지션을 선택해주세요.</InputLabel> */}
              <Select
                value={userInput.position}
                defaultValue='NONE'
                // label='파티원의 포지션을 선택해주세요.'
                onChange={handlePosition}
              >
                <MenuItem
                  disabled
                  value=''
                  sx={{
                    display: 'none',
                  }}
                >
                  <em>-</em>
                </MenuItem>
                <MenuItem value='NONE'>상관없음</MenuItem>
                <MenuItem value='TOP'>탑</MenuItem>
                <MenuItem value='JUG'>정글</MenuItem>
                <MenuItem value='MID'>미드</MenuItem>
                <MenuItem value='ADC'>원딜</MenuItem>
                <MenuItem value='SUP'>서포터</MenuItem>
              </Select>
            </FormControl>
            {/* 카드 만료 시간 */}
            <FormControl fullWidth>
              <ModalText text={'카드 만료 시간을 선택해주세요.'} />
              {/* <InputLabel>카드 만료 시간을 선택해주세요.</InputLabel> */}
              <Select
                defaultValue='FIFTEEN_M'
                value={userInput.expire}
                // label='카드 만료 시간을 선택해주세요.'
                onChange={handleExpire}
              >
                <MenuItem
                  disabled
                  value=''
                  sx={{
                    display: 'none',
                  }}
                >
                  <em>-</em>
                </MenuItem>
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'start',
              }}
            >
              <Switch defaultChecked={false} onChange={handleVoice} />
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                음성채팅 사용 여부를 선택해주세요.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ height: '80%' }}>
            <ModalText text={'카드 내용 작성하기'} />
            <TextField
              sx={{ bgcolor: 'white' }}
              onChange={handleContent}
              fullWidth
              multiline={true}
              minRows={17} // 이거 어떻게 처리하지...
              placeholder='카드의 내용을 작성해주세요'
            />
          </Grid>
          <Grid
            item
            xs={12}
            display='flex'
            justifyContent='space-around'
            alignItems='center'
            sx={{ backgroundColor: 'white' }}
          >
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-around'
              sx={{ width: '100%' }}
            >
              <Button
                onClick={closeModal}
                startIcon={<BackspaceIcon />}
                variant='contained'
                size='large'
              >
                뒤로가기
              </Button>
              <Button
                onClick={postModalInfo}
                startIcon={<EditIcon />}
                variant='contained'
                size='large'
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
