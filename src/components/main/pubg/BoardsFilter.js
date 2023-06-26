import React from 'react';
import { useSelector } from 'react-redux';

// mui components
import { Grid, FormControl, Select, MenuItem, Button } from '@mui/material';

// styled-components

// mui icons
import { Refresh } from '@mui/icons-material';

import CreateCardBtn from './CreateCardBtn';

// data for filter
import { platformList, typeList, tierList } from './BoardsFilter.d';

const BoardsFilter = ({ filterProps }) => {
  const { isLogin } = useSelector((state) => state.user);

  const { platform, platformHandler, type, typeHandler, tier, tierHandler } = filterProps;

  return (
    <Grid
      container
      sx={{
        width: { xs: '95%', lg: 1180 },
        m: 0,
        backgroundColor: 'white',
        border: '1px solid #dddddd',
        borderRadius: 4,
        minHeight: 56,
        alignItems: 'center',
        p: 1
      }}
    >
      <Grid item xs={4} sm={3} md={2} lg={1.5} sx={{ pr: 1 }}>
        <FormControl sx={{ width: '100%' }} size='small'>
          <Select id='platform-select' value={platform} onChange={platformHandler}>
            {platformList.map((item, _index) => {
              return (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4} sm={3} md={2} lg={1.4} sx={{ pr: 1 }}>
        <FormControl sx={{ width: '100%' }} size='small'>
          <Select id='game-type-select' value={type} onChange={typeHandler}>
            {typeList.map((item, index) => {
              return (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4} sm={3} md={2} lg={1.4} sx={{ pr: 1 }}>
        <FormControl sx={{ width: '100%' }} size='small'>
          <Select id='game-type-select' value={tier} onChange={tierHandler}>
            {tierList.map((item, index) => {
              return (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={7} md={4.5} lg={3.5} sx={{ pr: 1, pb: 1 }}></Grid>
      <Grid
        item
        sm
        sx={{
          p: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        {isLogin && <CreateCardBtn />}
        <Button sx={{ height: 40, color: '#3d3939' }} onClick={null}>
          새로고침
          <Refresh />
        </Button>
      </Grid>
    </Grid>
  );
};

export default BoardsFilter;