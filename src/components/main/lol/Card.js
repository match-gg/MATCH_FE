import {
  Card as MuiCard,
  CardContent,
  Typography,
  Box,
  ImageList,
  ImageListItem,
  Button,
} from '@mui/material';

import { PieChart } from 'react-minimal-pie-chart';

import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

const Card = (props) => {
  const winRate = 70;
  const tier = 'Platinum 4';
  const line = 'SPT';
  const nickname = '완도수산새우도둑';
  const mic = false;
  const most3 = ['Lux', 'Aatrox', 'Shen'];
  const itemText = '골드 2이상 공격적인 원딜러 구합니다. 디코 가능한 유저 환영입니다.';

  return (
    <MuiCard
      sx={{
        width: 464,
        height: 250,
        borderRadius: '8px',
        boxShadow: 'none',
        border: '1px solid #dddddd',
        mr: 3,
        mb: 3,
      }}
    >
      <CardContent
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <Box
          sx={{
            px: 2,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ flexBasis: 24, display: 'flex', flexDirection: 'row' }}>
            <Typography sx={{ color: 'skyblue', fontSize: 15, fontWeight: 700 }}>3분 전</Typography>
            <Typography sx={{ marginLeft: 1, color: 'grey', fontSize: 15, fontWeight: 700 }}>
              12분 후 만료
              {/* 나중에 데이터 값 받아서 집어넣기 */}
            </Typography>
          </Box>
          <Box sx={{ flexBasis: 88, display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ flexBasis: 64 }}>
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
                  fill: '#5383e8',
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
                justifyContent: 'center',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
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
                  }}
                >
                  {nickname}
                </Typography>
                <Box sx={{ pr: 1 }}>{mic ? <MicIcon /> : <MicOffIcon />}</Box>
              </Box>
            </Box>
            <ImageList sx={{ flexBasis: 144 }} cols={3}>
              {most3.map((item) => (
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
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                {itemText}
              </Typography>
            </Box>
            <Box
              sx={{
                flex: '0 0 80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button variant='contained' sx={{ borderRadius: '8px' }}>
                <Typography>더보기</Typography>
              </Button>
            </Box>
          </Box>
          <Box sx={{ flexBasis: 24 }}>
            <Typography sx={{ color: 'grey', fontSize: 15, fontWeight: 700 }}>
              모집현황 [ 3 / 5 ]
              {/* 나중에 데이터 값 받아서 집어넣기 */}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
