import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ref, child, get, getDatabase, update } from 'firebase/database';

import { api } from '../../../../api/api';

import { Typography, Box, ImageList, IconButton } from '@mui/material';

import { Close } from '@mui/icons-material';

const PartyMember = (props) => {
  //토큰 for kick member
  const { accessToken } = useSelector((state) => state.token);
  const refreshToken = localStorage.getItem('matchGG_refreshToken');

  const { name, type, isAuthor, game, id, chatRoomId, fetchBoardDetail } = props;

  const [userData, setUserData] = useState({
    type: 'NORMAL_DUO',
    name: 'Dsquad2',
    ratingPoint: 4232,
    kill_summary: 120,
    death_summary: 35,
    avgDmgDealt: 258.45,
    totalPlayed: 130,
    totalWin: 5,
    totalTop10: 10
  });

  // useEffect(() => {
  //   const fetchSummonerData = async () => {
  //     await api
  //       .get(`/api/lol/summoner/${name}/${type === 'FREE_RANK' ? 'free_rank' : 'duo_rank'}`)
  //       // 자유랭크의 경우에만 자유랭크 조회, 그 외에 모두 솔로랭크를 기준으로 조회
  //       .then((res) => {
  //         setUserData(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  //   fetchSummonerData();
  // }, []);

  // const kickMember = async () => {
  //   await api
  //     .delete(`/api/chat/${game}/${id}/${name}/ban`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         'Refresh-Token': refreshToken,
  //       },
  //     })
  //     .then(async (response) => {
  //       if (response.status === 200) {
  //         const chatRoomRef = ref(getDatabase(), 'chatRooms');
  //         await get(child(chatRoomRef, chatRoomId))
  //           .then(async (datasnapshot) => {
  //             const prevMemberList = [...datasnapshot.val().memberList];
  //             const target = prevMemberList.find(
  //               (member) => member.nickname === userData.name
  //             );
  //             const prevBannedList = datasnapshot.val().bannedList
  //               ? [...datasnapshot.val().bannedList]
  //               : [];
  //             const newMemberList = prevMemberList.filter(
  //               (member) => member.nickname !== userData.name
  //             );
  //             const newBannedList = [...prevBannedList, target];
  //             await update(ref(getDatabase(), `chatRooms/${chatRoomId}`), {
  //               memberList: newMemberList,
  //               bannedList: newBannedList,
  //             })
  //               // CardDetailModal에서 새로 멤버 받아오기 (삭제된 유저가 있으니 새로고침)
  //               .then(() => fetchBoardDetail());
  //           })
  //           .catch((error) => console.log(error));
  //       }
  //     });
  // };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 520,
        minHeight: 80,
        border: '1px solid #CCCCCC',
        borderRadius: 2,
        p: 1,
        mb: 1
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 132
        }}>
        <Typography
          sx={{
            color: 'grey',
            fontSize: 12,
            fontWeight: 700,
            textOverflow: 'ellipsis'
          }}>
          닉네임
        </Typography>
        <Typography
          component='span'
          sx={{ fontSize: 16, fontWeight: 700 }}>
          {userData.name}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 90
        }}>
        <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>RP</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}>
          <Box
            component='img'
            src={'https://opgg-pubg-static.akamaized.net/images/tier/competitive/Gold-3.png'}
            loading='lazy'
            alt={userData.mostLane}
            sx={{
              height: 20,
              width: 20,
              mr: 1
            }}
          />
          {/* 랭크 이미지는 이미지 CDN 작업 이후에 추가할 예정 */}
          <Typography component='span' sx={{ fontSize: 16, fontWeight: 700 }}>
            {userData.ratingPoint}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 60
        }}>
        <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>K/D</Typography>
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 700,
            color:
              userData.kill_summary / userData.death_summary > 4
                ? 'red'
                : userData.kill_summary / userData.death_summary > 2.5
                ? 'orange'
                : 'black'
          }}>
          {(userData.kill_summary / userData.death_summary).toFixed(2)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 100
        }}>
        <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>경기 당 데미지</Typography>
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 700,
            color: userData.avgDmgDealt > 400 ? 'red' : userData.avgDmgDealt > 250 ? 'orange' : 'black'
          }}>
          {userData.avgDmgDealt.toFixed(2)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 60
        }}>
        <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>Top 1%</Typography>
        <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
          {((userData.totalWin / userData.totalPlayed) * 100).toFixed(1)}%
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 60
        }}>
        <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>Top 10%</Typography>
        <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
          {((userData.totalTop10 / userData.totalPlayed) * 100).toFixed(1)}%
        </Typography>
      </Box>
      {/* {isAuthor && (
        <Box>
          <IconButton onClick={kickMember}>
            <Close color='warning' />
          </IconButton>
        </Box>
      )} */}
    </Box>
  );
};

export default PartyMember;
