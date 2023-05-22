import { useEffect, useState } from 'react';

import { api } from '../../../api/api';

import { Typography, Box, ImageList, Button, IconButton } from '@mui/material';

import { lanes, rank_emblems, tierInfo } from './Card.d';
import { Close } from '@mui/icons-material';
import { ref, child, get, getDatabase, update } from 'firebase/database';

const PartyMember = (props) => {
  const { name, type, isAuthor, game, id, chatRoomId, fetchBoardDetail } =
    props;

  const [summonerData, setSummonerData] = useState({});

  useEffect(() => {
    const fetchSummonerData = async () => {
      await api
        .get(
          `/api/lol/summoner/${name}/${
            type === 'FREE_RANK' ? 'free_rank' : 'duo_rank'
          }`
        )
        // 자유랭크의 경우에만 자유랭크 조회, 그 외에 모두 솔로랭크를 기준으로 조회
        .then((res) => {
          setSummonerData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchSummonerData();
  }, []);

  const kickMember = async () => {
    await api
      .delete(`/api/chat/${game}/${id}/${name}`)
      .then(async (response) => {
        if (response.status === 200) {
          const chatRoomRef = ref(getDatabase(), 'chatRooms');
          await get(child(chatRoomRef, chatRoomId))
            .then(async (datasnapshot) => {
              const prevMemberList = [...datasnapshot.val().memberList];
              const target = prevMemberList.find(
                (member) => member.nickname === summonerData.summonerName
              );
              const prevBanedList = datasnapshot.val().banedList
                ? [...datasnapshot.val().banedList]
                : [];
              const newMemberList = prevMemberList.filter(
                (member) => member.nickname !== summonerData.summonerName
              );
              const newBanedList = [...prevBanedList, target];
              await update(ref(getDatabase(), `chatRooms/${chatRoomId}`), {
                memberList: newMemberList,
                banedList: newBanedList,
              })
                // CardDetailModal에서 새로 멤버 받아오기 (삭제된 유저가 있으니 새로고침)
                .then(() => fetchBoardDetail());
            })
            .catch((error) => console.log(error));
        }
      });
  };

  const totalPlayed = summonerData
    ? summonerData.wins + summonerData.losses
    : 999;
  const winRate = summonerData
    ? Math.round((summonerData.wins / totalPlayed) * 100)
    : 999;

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
        mb: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 140,
        }}
      >
        <Typography
          sx={{
            color: 'grey',
            fontSize: 12,
            fontWeight: 700,
            textOverflow: 'ellipsis',
          }}
        >
          닉네임
        </Typography>
        <Typography component='span' sx={{ fontSize: 16, fontWeight: 700 }}>
          {summonerData.summonerName}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box
            component='img'
            src={lanes.find((elem) => elem.id === summonerData.lane).image}
            loading='lazy'
            alt={summonerData.lane}
            sx={{
              height: 20,
              width: 20,
              mr: 1,
              mixBlendMode: 'exclusion',
            }}
          />
          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
            {lanes.find((elem) => elem.id === summonerData.lane).kor}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 160 }}>
        <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>
          티어
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              height: 48,
              width: 48,
              borderRadius: '50%',
              backgroundColor: '#eeeeee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              component='img'
              src={rank_emblems[summonerData.tier]}
              loading='lazy'
              alt={summonerData.tier}
              sx={{
                transform: 'scale(0.11)',
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              ml: 1,
            }}
          >
            <Typography
              sx={{ fontSize: 14, fontWeight: 500 }}
              color={
                tierInfo.find((elem) => elem.id === summonerData.tier).color
              }
            >
              {summonerData.tier.slice(0, 1)}
              {summonerData.rank === 'I'
                ? 1
                : summonerData.rank === 'II'
                ? 2
                : summonerData.rank === 'III'
                ? 3
                : summonerData.rank === 'IV'
                ? 4
                : ''}
              -{summonerData.leaguePoints}LP
            </Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
              {summonerData.wins}승 {summonerData.losses}패
              <Typography
                component='span'
                sx={{ fontSize: 12, fontWeight: 700, ml: 0.5 }}
                color={winRate >= 50 ? '#5383e8' : '#D64E5B'}
              >
                ({winRate}%)
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 160 }}>
        <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>
          모스트 챔피언
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <ImageList sx={{ m: 0, p: 0 }} cols={3} gap={1}>
            {summonerData.mostChampion.map((item, index) => (
              <Box
                key={index}
                component='img'
                src={`https://d18ghgbbpc0qi2.cloudfront.net/lol/champions/${item.toLowerCase()}.jpg?`}
                alt={item.name}
                loading='lazy'
                sx={{
                  width: '40px',
                  height: '48px',
                  borderRadius: 1,
                  objectFit: 'cover',
                  border: '1px solid #dddddd',
                }}
              />
            ))}
          </ImageList>
        </Box>
      </Box>
      {isAuthor && (
        <Box>
          <IconButton onClick={kickMember}>
            <Close color='warning' />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default PartyMember;
