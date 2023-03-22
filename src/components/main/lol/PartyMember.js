import { Typography, Box, ImageList, Button } from '@mui/material';

import { PieChart } from 'react-minimal-pie-chart';

import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

const PartyInfo = props => {
  // 파티원 자세히 보기를 하는 함수
  const openViewDetailHandler = () => props.onViewDetail(true);

  const winRate = 70;
  const tier = 'Platinum 4';
  const line = 'SPT';
  const nickname = '완도수산새우도둑';
  const mic = false;
  const most3 = ['Lux', 'Aatrox', 'Shen'];

  return (
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
          <Button sx={{color: 'black', p: 0}}>
            <Typography
              noWrap
              sx={{
                width: 160,
                fontSize: 18,
                fontWeight: 800,
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
              onClick={openViewDetailHandler}>
              {nickname}
            </Typography>
          </Button>
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
  );
}

export default PartyInfo;