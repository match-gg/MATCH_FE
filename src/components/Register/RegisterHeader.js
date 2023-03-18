import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography, Box } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';

import { RegisterPhases } from './datas/Register.data';

const RegisterHeader = (props) => {
  const navigate = useNavigate();

  const { phase } = props;

  return (
    <Fragment>
      <Typography
        component='h1'
        variant='h3'
        sx={{
          marginTop: 5,
          fontStyle: 'italic',
          fontSize: { xs: 35, sm: 45 },
          fontWeight: '700',
        }}
        onClick={() => navigate('/')}
      >
        Match.GG
      </Typography>
      <Box
        sx={{
          marginTop: { xs: 1, sm: 1 },
          display: 'flex',
          flexDirection: 'row',
          justifyContetns: 'center',
          alignItems: 'center',
          gap: { xs: 1, sm: 2 },
        }}
      >
        {phase > -1 && (
          <Fragment>
            {phase === 0 ? (
              <CircleIcon
                sx={{
                  color: 'grey',
                  fontSize: { xs: 'medium', sm: 'large' },
                }}
              />
            ) : (
              <CircleOutlinedIcon
                sx={{
                  color: 'grey',
                  fontSize: { xs: 'medium', sm: 'large' },
                }}
              />
            )}
            {phase === 1 ? (
              <CircleIcon
                sx={{
                  color: 'grey',
                  fontSize: { xs: 'medium', sm: 'large' },
                }}
              />
            ) : (
              <CircleOutlinedIcon
                sx={{
                  color: 'grey',
                  fontSize: { xs: 'medium', sm: 'large' },
                }}
              />
            )}
            {phase === 2 ? (
              <CircleIcon
                sx={{
                  color: 'grey',
                  fontSize: { xs: 'medium', sm: 'large' },
                }}
              />
            ) : (
              <CircleOutlinedIcon
                sx={{
                  color: 'grey',
                  fontSize: { xs: 'medium', sm: 'large' },
                }}
              />
            )}
            {phase === 3 ? (
              <CircleIcon
                sx={{
                  color: 'grey',
                  fontSize: { xs: 'medium', sm: 'large' },
                }}
              />
            ) : (
              <CircleOutlinedIcon
                sx={{
                  color: 'grey',
                  fontSize: { xs: 'medium', sm: 'large' },
                }}
              />
            )}
          </Fragment>
        )}
      </Box>
      <Typography
        component='h2'
        variant='h4'
        sx={{
          marginTop: 1,
          fontWeight: '600',
          fontSize: { xs: 20, sm: 30 },
        }}
      >
        {RegisterPhases[phase].title}
      </Typography>
      <Typography
        component='h3'
        variant='h5'
        sx={{
          marginTop: { xs: 0.5 },
          marginBottom: { xs: 1, sm: 2 },
          fontWeight: '600',
          fontSize: { xs: 13, sm: 18 },
        }}
      >
        {RegisterPhases[phase].description}
      </Typography>
    </Fragment>
  );
};

export default RegisterHeader;
