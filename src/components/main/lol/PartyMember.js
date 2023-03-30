import { Typography, Box, ImageList, Collapse } from '@mui/material';

import { PieChart } from 'react-minimal-pie-chart';

import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

import { Fragment, useState } from 'react';
import ViewDetail from './ViewDetail';

const PartyInfo = ({data}) => {
  // 상세보기 관련 state와 함수
  const [viewDetail, setViewDetail] = useState(false);
  const viewDetailHandler = () => {
    setViewDetail((prev) => !prev)
  }

  // 파티원 정보에서 쓸 임시값 (이름, 티어, 랭크, 포지션, 승률, 모스트3, 보이스)
  const {name, tier, rank, position, winRate, mostChampion, voice} = data;

  return (
    <Fragment>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          height: 88,
          width: '100%'
        }}
        onClick={viewDetailHandler}>
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
            ml: 1,
            justifyContent: 'center'
          }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography>{tier} {rank}</Typography>
            <Typography sx={{ ml: 2 }}>{position}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography
              noWrap
              sx={{
                width: 160,
                fontSize: 18,
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
              {name}
            </Typography>
            <Box sx={{ pr: 1 }}>{voice === 'Y' ? <MicIcon /> : <MicOffIcon />}</Box>
          </Box>
        </Box>
        <ImageList sx={{ flexBasis: 160 }} cols={3}>
          {mostChampion.map(item => (
            <Box
              component='img'
              src={`https://d18ghgbbpc0qi2.cloudfront.net/lol/champions/${item}.jpg?`}
              alt={item}
              loading='lazy'
              sx={{ width: '100%', borderRadius: 2, objectFit: 'contain' }}
            />
          ))}
        </ImageList>
      </Box>
      <Collapse in={viewDetail} timeout='auto' sx={{ width: '100%' }}>
        {viewDetail && <ViewDetail data={data} />}
      </Collapse>
    </Fragment>
  );
};

export default PartyInfo;
