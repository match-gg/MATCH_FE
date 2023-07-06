import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ref, child, get, getDatabase, update } from 'firebase/database';

import { api } from '../../../../api/api';

import { Typography, Box, IconButton } from '@mui/material';

import { Close } from '@mui/icons-material';

import { platformList, typeList, tierList, rankInfo } from './PartyMember.d';

const PartyMember = (props) => {
  //토큰 for kick member
  const { accessToken } = useSelector((state) => state.token);
  const refreshToken = localStorage.getItem('matchGG_refreshToken');

  const { name, platform, type, isAuthor, game, id, chatRoomId, fetchBoardDetail } = props;

  const [userData, setUserData] = useState({
    id: 1,
    name: 'Dsquad2',
    platform: 'STEAM',
    type: 'DUO',
    currentRankPoint: 0,
    tier: 'None',
    subTier: 'None',
    kills: 0,
    deaths: 0,
    avgDmg: 0,
    totalPlayed: 0,
    wins: 0,
    top10: 0
  });

  useEffect(() => {
    const fetchSummonerData = async () => {
      await api
        .get(`/api/pubg/player/${name}/${platform}/${type}`)
        // 자유랭크의 경우에만 자유랭크 조회, 그 외에 모두 솔로랭크를 기준으로 조회
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchSummonerData();
  }, []);

  const kickMember = async () => {
    await api
      .delete(`/api/chat/${game}/${id}/${name}/ban`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Refresh-Token': refreshToken,
        },
      })
      .then(async (response) => {
        if (response.status === 200) {
          const chatRoomRef = ref(getDatabase(), 'chatRooms');
          await get(child(chatRoomRef, chatRoomId))
            .then(async (datasnapshot) => {
              const prevMemberList = [...datasnapshot.val().memberList];
              const target = prevMemberList.find(
                (member) => member.nickname === userData.name
              );
              const prevBannedList = datasnapshot.val().bannedList
                ? [...datasnapshot.val().bannedList]
                : [];
              const newMemberList = prevMemberList.filter(
                (member) => member.nickname !== userData.name
              );
              const newBannedList = [...prevBannedList, target];
              await update(ref(getDatabase(), `chatRooms/${chatRoomId}`), {
                memberList: newMemberList,
                bannedList: newBannedList,
              })
                // CardDetailModal에서 새로 멤버 받아오기 (삭제된 유저가 있으니 새로고침)
                .then(() => fetchBoardDetail());
            })
            .catch((error) => console.log(error));
        }
      });
  };

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
          width: 160
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
          flexDirection: 'column'
        }}>
        <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>RP</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}>
          {userData.currentRankPoint !== 0 && (
              <Box
                component='img'
                src={rankInfo[userData.tier.toUpperCase() + userData.subTier]}
                loading='lazy'
                alt={userData.tier}
                sx={{
                  height: 18,
                  width: 18,
                  mr: 0.5
                }}
              />
            )}
            <Typography component='span' sx={{ fontSize: 14, fontWeight: 700 }}>
              {userData.currentRankPoint === 0 ? '정보 없음' : userData.currentRankPoint}
            </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}>
        <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>K/D</Typography>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 700,
            color:
              userData.kills / userData.deaths > 4
                ? 'red'
                : userData.kills / userData.deaths > 2.5
                ? 'orange'
                : 'black'
          }}>
          {(userData.kills / userData.deaths).toFixed(2)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}>
        <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>평균 데미지</Typography>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 700,
            color: userData.avgDmg > 400 ? 'red' : userData.avgDmg > 250 ? 'orange' : 'black'
          }}>
          {userData.avgDmg.toFixed(2)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}>
        <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>Top 1</Typography>
        <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
          {((userData.wins / userData.totalPlayed) * 100).toFixed(1)}%
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}>
        <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>Top 10</Typography>
        <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
          {((userData.top10 / userData.totalPlayed) * 100).toFixed(1)}%
        </Typography>
      </Box>
      {isAuthor && (
        <Box>
          <IconButton size='small' onClick={kickMember}>
            <Close color='warning' sx={{width: 20, height: 20}} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default PartyMember;
