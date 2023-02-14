import { Box, Checkbox, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Fragment } from 'react';

const TermSection = (props) => {
  const { agree, setAgreeTrue, setAgreeFalse } = props;

  return (
    <Fragment>
      <Typography>{props.title}</Typography>
      <Box
        component='div'
        sx={{
          padding: '10px',
          paddingLeft: '20px',
          backgroundColor: '#f7f7f7',
          borderRadius: '5px',
          height: '15vh',
          marginBottom: '0px',
          width: '100%',
          display: 'flex',
          // height: {
          //   xs: 'calc(100% - 350px)',
          //   sm: 'calc(100% - 405px)',
          // },
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'auto',
          gap: 2,
        }}
      >
        {props.contents}
      </Box>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '30px',
        }}
      >
        {'위의 약관을 읽었으며, 이에 동의하시겠습니까?'}
        <Box>
          <Checkbox checked={agree} onClick={setAgreeTrue} />
          {'동의합니다'}
          <Checkbox checked={!agree} onClick={setAgreeFalse} />
          {'동의하지 않습니다.'}
        </Box>
      </Container>
    </Fragment>
  );
};

export default TermSection;
