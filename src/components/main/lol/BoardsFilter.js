import React from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { queueTypeList, tierList, PositionList } from './BoardsFilter.d';

import CreateCardButton from './CreateCardButton';

const BoardsFilter = ({ filterProps }) => {
  const { isLogin } = useSelector((state) => state.user);

  const {
    handleLane,
    handleQueueType,
    handleTier,
    lane,
    queueType,
    tier,
    refreshBoards,
  } = filterProps;

  return (
    <Grid
      container
      sx={{
        width: { xs: '95%', lg: 1180 },
        m: 0,
        backgroundColor: 'white',
        border: '1px solid #dddddd',
        borderRadius: 4,
      }}
      spacing={1}
    >
      <Grid item xs={6} sm={3.5} md={2} lg={1.5} sx={{ pr: 1 }}>
        <FormControl sx={{ width: '100%' }} size='small'>
          <Select
            id='queue-type-select'
            value={queueType}
            onChange={handleQueueType}
          >
            {queueTypeList.map((item, _index) => {
              return (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6} sm={3.5} md={2} lg={1.5} sx={{ pr: 1 }}>
        <FormControl
          sx={{ width: '100%' }}
          size='small'
          disabled={queueType === 'ARAM' ? true : false}
        >
          <Select id='tier-select' value={tier} onChange={handleTier}>
            {tierList.map((item, index) => {
              if (queueType === 'DUO_RANK') {
                if (index > 3) {
                  return (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  );
                }
              } else {
                return (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                );
              }
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={7} md={4.5} lg={3.5} sx={{ pr: 1, pb: 1 }}>
        <ToggleButtonGroup
          fullWidth
          value={lane}
          onChange={handleLane}
          sx={{
            height: 40,
          }}
          disabled={queueType === 'ARAM' ? true : false}
        >
          {PositionList.map((item, _index) => {
            return (
              <ToggleButton key={item.value} value={item.value} sx={{ p: 0 }}>
                {item.label}
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </Grid>
      <Grid
        item
        sm
        sx={{
          p: 0,
          padding: 0,
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        {isLogin && <CreateCardButton />}
        <Button sx={{ height: 40, color: '#3d3939' }} onClick={refreshBoards}>
          새로고침
          <RefreshIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

export default BoardsFilter;
