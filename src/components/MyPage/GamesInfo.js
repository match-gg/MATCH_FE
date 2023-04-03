import React, { useState } from 'react';

import { Box, Typography, Button, TextField, Stack, Divider } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

const GamesInfo = ({ userInfo }) => {
  const [lol, setLol] = useState(userInfo.lol);
  const [valorant, setValorant] = useState(userInfo.valorant);

  const lolHandler = (e) => {
    setLol(e.target.value);
  };

  const valorantHandler = (e) => {
    setValorant(e.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '65%',
        width: '100%',
        flexDirection: 'column',
        paddingTop: 2,
        pl: 4,
      }}
    >
      <Typography variant='h6' sx={{ color: 'black', fontWeight: '600' }}>
        게임별 캐릭터 연결
      </Typography>
      <Stack
        spacing={3}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          overflow: 'auto',
          mt: 2,
          pl: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            paddingLeft: 1,
          }}
        >
          <Typography sx={{ px: 1, fontSize: 16, fontWeight: 600, width: 160}}>리그오브레전드</Typography>
          <TextField
            id={lol}
            size='small'
            value={lol}
            sx={{ marginLeft: 2, width: '50%', pl: 2 }}
            onChange={lolHandler}
            InputProps={{
              endAdornment: <Button sx={{ width: '30%' }}>변경하기</Button>,
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            paddingLeft: 1,
          }}
        >
          <Typography sx={{ px: 1, fontSize: 16, fontWeight: 600, width: 160 }}>발로란트</Typography>
          <TextField
            id={valorant}
            size='small'
            value={valorant}
            sx={{ marginLeft: 2, width: '50%', pl: 2 }}
            onChange={valorantHandler}
            InputProps={{
              endAdornment: <Button sx={{ width: '30%' }}>변경하기</Button>,
            }}
          />
        </Box>
      </Stack>
      <Typography variant='h6' sx={{ color: 'black', fontWeight: '600', mt: 6 }}>
        대표 게임 설정
      </Typography>
    </Box>
  );
};

export default GamesInfo;
