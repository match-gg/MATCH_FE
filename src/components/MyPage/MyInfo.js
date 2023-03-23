import {
  Box,
  Typography,
  Stack,
  Divider,
  Button,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { PieChart } from 'react-minimal-pie-chart';

const MyInfo = ({ userInfo }) => {

  const { matchCount, likeCount, dislikeCount, lol, overwatch, pubg, maplestory, lostark } = userInfo;

  const likeRate = matchCount === 0 ? 0 : Math.floor((likeCount / (likeCount + dislikeCount)) * 100);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        paddingLeft: 4
      }}>
      <Box
        sx={{
          display: 'flex',
          height: '35%',
          flexDirection: 'column',
          paddingTop: 2
        }}>
        <Typography variant='h6' sx={{ color: 'black', fontWeight: '600' }}>
          받은 평가
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: '100%'
          }}>
          <Box sx={{ flexBasis: 96 }}>
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
                  <TableRow>
                    <TableCell align='center'>{matchCount}</TableCell>
                    <TableCell align='center'>{likeCount}</TableCell>
                    <TableCell align='center'>{dislikeCount}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          height: '65%',
          width: '100%',
          flexDirection: 'column',
          paddingTop: 2
        }}>
        <Typography variant='h6' sx={{ color: 'black', fontWeight: '600' }}>
          게임 캐릭터 연결
        </Typography>
        <Stack
          spacing={1}
          divider={<Divider orientation='horizontal' flexItem />}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            overflow: 'auto',
            padding: 4
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%'
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: 184,
                paddingLeft: 1
              }}>
              <CircleIcon
                sx={{
                  color: `${lol.length > 0 ? '#80EE9F' : '#D9D9D9'}`,
                  fontSize: { xs: 'medium', sm: 'large' }
                }}
              />
              <Typography sx={{ paddingLeft: 1 }}>League Of Legends</Typography>
            </Box>
            <TextField
              id='standard-basic'
              variant='standard'
              defaultValue={lol}
              sx={{ marginLeft: 2, marginRight: 2, width: 184 }}
            />
            <Button>변경하기</Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%'
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: 184,
                paddingLeft: 1
              }}>
              <CircleIcon
                sx={{
                  color: `${overwatch.length > 0 ? '#80EE9F' : '#D9D9D9'}`,
                  fontSize: { xs: 'medium', sm: 'large' }
                }}
              />
              <Typography sx={{ paddingLeft: 1 }}>OverWatch 2</Typography>
            </Box>
            <TextField
              id='standard-basic'
              variant='standard'
              defaultValue={overwatch}
              sx={{ marginLeft: 2, marginRight: 2, width: 184 }}
            />
            <Button>변경하기</Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%'
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: 184,
                paddingLeft: 1
              }}>
              <CircleIcon
                sx={{
                  color: `${pubg.length > 0 ? '#80EE9F' : '#D9D9D9'}`,
                  fontSize: { xs: 'medium', sm: 'large' }
                }}
              />
              <Typography sx={{ paddingLeft: 1 }}>Battle Ground</Typography>
            </Box>
            <TextField
              id='standard-basic'
              variant='standard'
              defaultValue={pubg}
              sx={{ marginLeft: 2, marginRight: 2, width: 184 }}
            />
            <Button>변경하기</Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%'
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: 184,
                paddingLeft: 1
              }}>
              <CircleIcon
                sx={{
                  color: `${maplestory.length > 0 ? '#80EE9F' : '#D9D9D9'}`,
                  fontSize: { xs: 'medium', sm: 'large' }
                }}
              />
              <Typography sx={{ paddingLeft: 1 }}>Maple Story</Typography>
            </Box>
            <TextField
              id='standard-basic'
              variant='standard'
              defaultValue={maplestory}
              sx={{ marginLeft: 2, marginRight: 2, width: 184 }}
            />
            <Button>변경하기</Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%'
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: 184,
                paddingLeft: 1
              }}>
              <CircleIcon
                sx={{
                  color: `${lostark.length > 0 ? '#80EE9F' : '#D9D9D9'}`,
                  fontSize: { xs: 'medium', sm: 'large' }
                }}
              />
              <Typography sx={{ paddingLeft: 1 }}>Lost Ark</Typography>
            </Box>
            <TextField
              id='standard-basic'
              variant='standard'
              defaultValue={lostark}
              sx={{ marginLeft: 2, marginRight: 2, width: 184 }}
            />
            <Button>변경하기</Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default MyInfo;
