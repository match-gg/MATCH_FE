import { Container, Grid, Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ShowFindingParty = () => {
  return (
    <Container
      sx={{
        height: '50vh',
        padding: 0,
        margin: 0,
        marginTop: '50px',
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
            alt='나중에 여기에 파티찾기 화면의 카드들 스샷해서 넣을거임'
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
            <SearchIcon
              fontSize='inherit'
              color='warning'
              sx={{
                paddingTop: '10px',
              }}
            />
            파티 찾기
          </Typography>
          <Typography
            variant='h6'
            sx={{
              textAlign: 'end',
              marginTop: '3rem',
              marginRight: '5rem',
            }}
          >
            카드형 UI를 통해
            <br />
            파티들을 한눈에 확인해보세요
            <br />
            <br />
            또한, 당신이 팔로우중인 유저들의 파티는
            <br />
            상단에서 확인할 수 있습니다
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShowFindingParty;
