import { AppBar, Box, Toolbar, Button } from '@mui/material';

const Sidebar = props => {
  const menu1Selected = () => props.onChangeMenu('my_info');
  const menu2Selected = () => props.onChangeMenu('follow_list');
  const menu3Selected = () => props.onChangeMenu('personal_info');
  const menu4Selected = () => props.onChangeMenu('withdraw');

  const { menu } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        width: '20%',
        height: 'calc(100vh - 150px)'
      }}>
      <AppBar
        component='nav'
        position='relative'
        sx={{
          backgroundColor: 'white',
          color: '#000000',
          justifyContent: 'start',
          overflow: 'none',
          boxShadow: '2px 0 #A1A1A1',
          height: '100%'
        }}>
        <Toolbar sx={{ justifyContent: 'center', borderRadius: 0 }}>
          <Button
            onClick={menu1Selected}
            sx={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
              borderRadius: 0,
              borderBottom: menu === 'my_info' ? 'solid' : 'none'
            }}>
            내 정보
          </Button>
        </Toolbar>
        <Toolbar sx={{ justifyContent: 'center', borderRadius: 0 }}>
          <Button
            onClick={menu2Selected}
            sx={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
              borderRadius: 0,
              borderBottom: menu === 'follow_list' ? 'solid' : 'none'
            }}>
            팔로우 목록
          </Button>
        </Toolbar>
        <Toolbar sx={{ justifyContent: 'center', borderRadius: 0 }}>
          <Button
            onClick={menu3Selected}
            sx={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
              borderRadius: 0,
              borderBottom: menu === 'personal_info' ? 'solid' : 'none'
            }}>
            개인정보 관리
          </Button>
        </Toolbar>
        <Toolbar sx={{ justifyContent: 'center', borderRadius: 0 }}>
          <Button
            onClick={menu4Selected}
            sx={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
              borderRadius: 0,
              borderBottom: menu === 'withdraw' ? 'solid' : 'none'
            }}>
            탈퇴하기
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Sidebar;
