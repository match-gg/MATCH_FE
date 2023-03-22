import {
  Typography,
  Button,
  IconButton,
  Divider,
  Stack,
  Box,
  ImageList,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Modal
} from '@mui/material';

import { PieChart } from 'react-minimal-pie-chart';

import { Fragment } from 'react';

import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const ViewDetail = props => {
  const closeViewDetailHandler = () => props.onCloseViewDetail(false);

  const winRate = 70;
  const tier = 'Platinum 4';
  const line = 'SPT';
  const nickname = '완도수산새우도둑';
  const mic = false;
  const most3 = ['Lux', 'Aatrox', 'Shen'];

  // 파티원 상세 정보 임시 값
  const matchNumber = 64;
  const like = 50;
  const dislike = 12;
  const likeRate = Math.floor((like / (like + dislike)) * 100);

  return (
    <Fragment>
      <Modal
        open={props.open}
        onClose={props.onCloseModal}
        disableEnforceFocus
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Stack
          sx={{
            width: '40%',
            bgcolor: 'white',
            padding: '16px',
            borderRadius: 4
          }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography component='h1' sx={{ fontSize: 24, ml: 1 }}>
              {nickname} 님의 정보
            </Typography>
            <IconButton size='small' onClick={closeViewDetailHandler}>
              <ArrowBackIosNewIcon fontSize='inherit' />
            </IconButton>
          </Box>
          <Divider sx={{ mt: 1 }} />
          <Box
            sx={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: 'white',
              padding: '8px'
            }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', p: 1, m: '0 8px' }}>
              <Box sx={{ flexBasis: 72 }}>
                <PieChart
                  data={[{ value: `${winRate}`, color: '#5383e8', name: 'winRate' }]}
                  reveal={winRate} // 퍼센트 치수
                  lineWidth={30} // 두께
                  startAngle={270}
                  background='#E84057'
                  animate
                  label={({ dataEntry }) => dataEntry.value + '%'}
                  labelStyle={{
                    fontSize: 18,
                    fontWeight: 700,
                    fill: '#5383e8'
                  }}
                  labelPosition={0}
                />
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  pl: 1,
                  justifyContent: 'center'
                }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', pl: 1 }}>
                  <Typography>{tier}</Typography>
                  <Typography sx={{ ml: 2 }}>{line}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Typography
                    noWrap
                    sx={{
                      width: 160,
                      fontSize: 18,
                      fontWeight: 800,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      pl: 1
                    }}>
                    {nickname}
                  </Typography>
                  <Box sx={{ pr: 1 }}>{mic ? <MicIcon /> : <MicOffIcon />}</Box>
                </Box>
              </Box>
              <ImageList sx={{ flexBasis: 160 }} cols={3}>
                {most3.map(item => (
                  <Box
                    component='img'
                    src={`https://opgg-static.akamaized.net/meta/images/lol/champion/${item}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_48`}
                    alt={item}
                    loading='lazy'
                    sx={{ width: '100%', borderRadius: 2, objectFit: 'contain' }}
                  />
                ))}
              </ImageList>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 800,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  pt: 2
                }}>
                매칭전적
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', p: 3 }}>
                <Box sx={{ flexBasis: 96, mr: 3 }}>
                  <PieChart
                    data={[{ value: `${likeRate}`, color: '#5383e8', name: 'likeRate' }]}
                    reveal={likeRate} // 퍼센트 치수
                    lineWidth={30} // 두께
                    startAngle={270}
                    background='#E84057'
                    animate
                    label={({ dataEntry }) => dataEntry.value + '%'}
                    labelStyle={{
                      fontSize: 18,
                      fontWeight: 700,
                      fill: '#5383e8'
                    }}
                    labelPosition={0}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    height: '100%',
                    alignItems: 'center'
                  }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align='center'>매칭 횟수</TableCell>
                          <TableCell align='center'>좋아요</TableCell>
                          <TableCell align='center'>싫어요</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableCell align='center'>{matchNumber}</TableCell>
                        <TableCell align='center'>{like}</TableCell>
                        <TableCell align='center'>{dislike}</TableCell>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
              <Button variant='contained' size='small'>
                팔로우하기
              </Button>
            </Box>
            <Divider sx={{ pt: 3 }} />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                p: 1,
                mt: 1
              }}>
              <Button
                variant='contained'
                size='small'
                sx={{
                  bgcolor: '#808080',
                  ':hover': {
                    bgcolor: '#a0a0a0'
                  }
                }}
                onClick={closeViewDetailHandler}>
                뒤로가기
              </Button>
              <Button variant='contained' size='small' color='error'>
                신고하기
              </Button>
            </Box>
          </Box>
        </Stack>
      </Modal>
    </Fragment>
  );
}

export default ViewDetail;