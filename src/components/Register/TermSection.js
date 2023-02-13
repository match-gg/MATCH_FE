import { Box, Typography } from '@mui/material';
import { Fragment } from 'react';

const TermSection = (props) => {
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
          marginBottom: '50px',
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
        {/* 페이지별 작성할 사안 */}
        {props.contents}
      </Box>
    </Fragment>
  );
};

export default TermSection;
