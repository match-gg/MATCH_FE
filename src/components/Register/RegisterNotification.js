import React, { Fragment, useEffect, useState } from 'react';

import { Box, Typography, Button, TextField } from '@mui/material';

const RegisterNotification = (props) => {
  const { setPhoneNumber } = props;

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const [requestCode, setRequestCode] = useState(false);
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const [requestSuccess, setRequestSuccess] = useState(false);

  const handleRequestCode = () => {
    setRequestCode(true);
    setMinutes(3);
    setSeconds(0);
  };

  const handleRequestSuccess = () => {
    setRequestSuccess(true);
  };

  useEffect(() => {
    if (requestCode) {
      const countdown = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(countdown);
            setRequestCode(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [requestCode, minutes, seconds]);

  return (
    <Fragment>
      <Box
        component='div'
        sx={{
          width: '80%',
          height: '65vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        <Box
          component='form'
          sx={{
            width: '90%',
            height: '5vh',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TextField
            id='outlined-basic'
            label={'전화번호를 입력하세요.'}
            variant='outlined'
            sx={{
              width: '70%',
              margin: 0,
              padding: 0,
              paddingRight: '5%',
            }}
            onChange={handlePhoneNumber}
          />
          <Button
            onClick={handleRequestCode}
            variant='outlined'
            sx={{
              width: '25%',
              height: '55px',
              fontSize: '1.2rem',
              padding: 0,
              margin: 0,
              boxSizing: 'content-box',
            }}
          >
            인증번호 받기
          </Button>
        </Box>
        <Box
          component='form'
          sx={{
            width: '90%',
            height: '56px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              width: '20%',
              marginRight: '5%',
              textAlign: 'center',
              fontSize: '1rem',
              color: minutes === 0 && seconds === 0 ? 'red' : 'black',
            }}
          >
            남은시간 : {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
          </Typography>

          <TextField
            id='outlined-basic'
            label={'인증번호 입력'}
            variant='outlined'
            sx={{
              width: '45%',
              paddingRight: '5%',
            }}
          />
          <Button
            variant='outlined'
            sx={{
              width: '25%',
              height: '55px',
              fontSize: '1.2rem',
              padding: 0,
            }}
          >
            인증하기
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
};

export default RegisterNotification;
