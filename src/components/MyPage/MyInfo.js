import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import { PieChart } from 'react-minimal-pie-chart';

const MyInfo = ({ userInfo }) => {
  const { matchCount, likeCount, dislikeCount, email, created } = userInfo;

  // 받은 평가 중 좋아요 비율
  const totalRated = likeCount + dislikeCount;
  const likeRate = (100 * (likeCount / totalRated)).toFixed(1);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        paddingLeft: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          height: '35%',
          flexDirection: 'column',
          paddingTop: 2,
          width: '90%',
        }}
      >
        <Typography variant='h6' sx={{ color: 'black', fontWeight: '600' }}>
          받은 평가
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Box sx={{ flexBasis: 96 }}>
            {likeCount + dislikeCount === 0 ? '받은 평가 없음' : (
              <PieChart
                data={[{ value: `${likeRate}`, color: '#5383e8', name: 'likeRate' }]}
                reveal={parseInt(likeRate)} // 퍼센트 치수
                lineWidth={30} // 두께
                startAngle={270}
                background='#E84057'
                animate
                label={({ dataEntry }) => dataEntry.value + '%'}
                labelStyle={{
                  fontSize: 18,
                  fontWeight: 700,
                  fill: '#5383e8',
                }}
                labelPosition={0}
              />
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              height: '100%',
              alignItems: 'center',
            }}
          >
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
          flexDirection: 'column',
          mt: 8,
          width: '90%',
        }}
      >
        <Box>
          <Typography variant='h6' sx={{ color: 'black', fontWeight: '600' }}>
            이메일 및 가입 일자
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 4,
          }}
        >
          <Typography
            variant='h7'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              color: 'black',
              fontWeight: '700',
              width: 120,
            }}
          >
            이메일
          </Typography>
          <Typography
            sx={{
              width: 360,
              textAlign: 'center',
              background: '#D9D9D9',
              fontWeight: '600',
              borderRadius: 2,
              padding: 1,
              marginLeft: 1,
            }}
          >
            {email || '이메일 정보제공 미동의'}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
          }}
        >
          <Typography
            variant='h7'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              color: 'black',
              fontWeight: '700',
              width: 120,
            }}
          >
            가입 일자
          </Typography>
          <Typography
            sx={{
              width: 360,
              textAlign: 'center',
              background: '#B5D0F5',
              fontWeight: '600',
              borderRadius: 2,
              padding: 1,
              marginLeft: 1,
            }}
          >
            {created || '가입 일자'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MyInfo;
