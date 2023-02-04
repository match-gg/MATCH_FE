import { Box, Container, Grid, Typography } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const ShowAlarmService = () => {
  return (
    <Box
      sx={{
        margin: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: '#e8e8e8',
        paddingBottom: '30px',
      }}
    >
      <Container
        sx={{
          height: '50vh',
          padding: 0,
          margin: 0,
          marginTop: '50px',
          width: '100%',
        }}
      >
        <Grid
          container
          sx={{
            height: '100%',
            margin: 0,
            padding: 0,
          }}
        >
          <Grid
            item
            xs={7}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              component='img'
              src='/'
              alt='나중에 여기에 알림 기능 스샷해서 넣을거임'
              sx={{
                height: '80%',
                width: '80%',
                border: '1px solid black',
                borderRadius: '30px',
              }}
            ></Box>
          </Grid>
          <Grid item xs={5}>
            <Typography
              variant='h3'
              sx={{
                textAlign: 'end',
                fontWeight: '600',
                marginTop: '3rem',
                marginRight: '5rem',
              }}
            >
              <NotificationsActiveIcon
                fontSize='inherit'
                color='warning'
                sx={{
                  paddingTop: '10px',
                }}
              />
              알림
            </Typography>
            <Typography
              variant='h6'
              sx={{
                textAlign: 'end',
                marginTop: '3rem',
                marginRight: '5rem',
              }}
            >
              파티원이 모두 모일때까지
              <br /> 지루하게 기다리지 마세요
              <br />
              <br />
              함께할 파티원이 들어오면
              <br />
              저희가 알림을 보내드릴게요
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ShowAlarmService;
