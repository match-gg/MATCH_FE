import { AppBar, Box, Toolbar, Button, Typography } from '@mui/material';

const Sidebar = (props) => {
  const menu1Selected = () => props.onChangeMenu('my_info');
  const menu2Selected = () => props.onChangeMenu('games_info');
  const menu3Selected = () => props.onChangeMenu('follow_list');
  const menu4Selected = () => props.onChangeMenu('withdraw');

  const { menu, userInfo } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        width: '25%',
        height: 640,
        flexDirection: 'column',
        backgroundColor: '#e8e8e8',
        boxShadow: '-4px 0px 8px -8px grey',
        borderTopLeftRadius: '8px',
        borderBottomLeftRadius: '8px',
      }}
    >
      <Box
        sx={{
          height: '40%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component='img'
          src={userInfo.imageUrl || 'https://d18ghgbbpc0qi2.cloudfront.net/lol/champions/garen.jpg'}
          sx={{ width: '50%', aspectRatio: '1 / 1', borderRadius: '50%', mt: 2 }}
        />
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: '600',
            mt: 1,
          }}
        >
          {userInfo.nickname || '카카오닉네임' }
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'end' }}>
          {/* <Typography
            sx={{
              fontSize: 16,
              fontWeight: 500,
              color: userInfo.likeCount / userInfo.matchCount >= 0.5 ? 'blue' : 'red',
            }}
          >
            {((userInfo.likeCount / userInfo.matchCount) * 100).toFixed(2)}%
          </Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 500, ml: 0.5 }}>의 긍정적 피드백</Typography> */}
        </Box>
      </Box>

      <AppBar
        component='nav'
        position='relative'
        sx={{
          backgroundColor: 'inherit',
          boxShadow: 'none',
          mt: 2,
        }}
      >
        <Toolbar
          sx={{
            borderRadius: 0,
            backgroundColor: menu === 'my_info' ? 'white' : 'inherit',
            zIndex: menu === 'my_info' ? 2 : 0,
            width: '100%',
          }}
        >
          <Button
            onClick={menu1Selected}
            sx={{
              color: 'black',
              fontSize: 16,
              fontWeight: '600',
              ml: 2,
            }}
          >
            나의 정보
          </Button>
        </Toolbar>
        <Toolbar
          sx={{
            borderRadius: 0,
            backgroundColor: menu === 'games_info' ? 'white' : 'inherit',
            zIndex: menu === 'games_info' ? 2 : 0,
            width: '100%',
          }}
        >
          <Button
            onClick={menu2Selected}
            sx={{
              color: 'black',
              fontSize: 16,
              fontWeight: '600',
              ml: 2,
            }}
          >
            게임 연결
          </Button>
        </Toolbar>
        <Toolbar
          sx={{
            borderRadius: 0,
            backgroundColor: menu === 'follow_list' ? 'white' : 'inherit',
            zIndex: menu === 'follow_list' ? 2 : 0,
            width: '100%',
          }}
        >
          <Button
            onClick={menu3Selected}
            sx={{
              color: 'black',
              fontSize: 16,
              fontWeight: '600',
              ml: 2,
            }}
          >
            팔로우 목록
          </Button>
        </Toolbar>
        <Toolbar
          sx={{
            borderRadius: 0,
            backgroundColor: menu === 'withdraw' ? 'white' : 'inherit',
            zIndex: menu === 'withdraw' ? 2 : 0,
            width: '100%',
          }}
        >
          <Button
            onClick={menu4Selected}
            sx={{
              color: 'black',
              fontSize: 16,
              fontWeight: '600',
              ml: 2,
            }}
          >
            탈퇴하기
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Sidebar;
