import {
  Typography,
  Box,
  Button,
  OutlinedInput,
  CircularProgress,
} from '@mui/material';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useState } from 'react';
import { api } from '../../../api/api';

// 방장이 아닌 사용자의 경우
const RecruitmentForMember = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 80,
        width: 520,
        backgroundColor: '#F3F3F3',
        color: '#5C5C5C',
        border: '1px solid #CCCCCC',
        borderRadius: 2,
        p: 2,
        mb: 1,
      }}
    >
      <ErrorOutlineIcon />
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 600,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          pl: 1,
        }}
      >
        모집 중
      </Typography>
    </Box>
  );
};

//방장의 경우
const RecruitmentForAuthor = (props) => {
  // CardDetailModal을 새로고침 하는 함수와 해당 파티의 게임종류, boardId
  const { fetchBoardDetail, game, id } = props;
  //추가하기 버튼과 닉네임 입력창을 전환할 state
  const [isEntering, setIsEntering] = useState(false);

  // 추가할 사용자의 nickname, 핸들러 함수
  const [name, setName] = useState('');
  const handleName = (e) => {
    setName(e.target.value);
  };

  //닉네임 인증 요청시 인증중(loading) 상태를 관리하는 state
  const [isLoading, setIsLoading] = useState(false);

  // 추가할 멤버의 닉네임 입력 후 추가하기 버튼 클릭시 호출할 함수
  const addPartyMember = async () => {
    setIsLoading(true);

    await api
      // 라이엇 계정 존재 여부 전송
      .get(`/api/lol/user/exist/${name.trim()}`)
      .then(async (response) => {
        if (response.status === 200) {
          await api
            // 라이엇 계정 정보 최신화 및 DB 저장
            .get(`/api/${game.toLowerCase()}/user/${name}`)
            .then(async (response) => {
              if (response.status === 200) {
                await api
                  // 채팅방? 파티? 입장 요청
                  .post(`/api/chat/${game.toLowerCase}/${id}/${name}`)
                  .then((response) => {
                    if (response.status === 200) {
                      // 최종 성공
                      setIsLoading(false);
                      setIsEntering(false);
                      setName('');
                      fetchBoardDetail();
                    }
                  });
              }
            });
        }
      })
      .catch((error) => {
        alert(
          '파티원을 추가하는 과정에서 문제가 발생하였습니다. \n 다시 한번 시도해주시기 바랍니다.'
        );
        console.log(error);
        setName('');
        setIsLoading(false);
      });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 80,
        maxHeight: 80,
        width: 520,
        backgroundColor: '#F3F3F3',
        color: '#5C5C5C',
        border: '1px solid #CCCCCC',
        borderRadius: 2,
        p: 2,
        mb: 1,
      }}
    >
      {isEntering ? (
        <OutlinedInput
          placeholder='소환사 명을 입력하세요'
          autoFocus
          sx={{
            width: '100%',
            height: '100%',
          }}
          value={name}
          onChange={handleName}
          disabled={isLoading ? true : false}
          endAdornment={
            isLoading ? (
              <CircularProgress size={24} />
            ) : (
              <Button size='small' onClick={addPartyMember}>
                추가하기
              </Button>
            )
          }
        />
      ) : (
        <Button
          sx={{
            width: '100%',
            height: '100%',
          }}
          onClick={() => setIsEntering(true)}
        >
          파티원 추가하기
        </Button>
      )}
    </Box>
  );
};

const Recruitment = (props) => {
  //방장인지 여부
  const { isAuthor, fetchBoardDetail, game, id } = props;
  return !isAuthor ? (
    <RecruitmentForAuthor
      fetchBoardDetail={fetchBoardDetail}
      game={game}
      id={id}
    />
  ) : (
    <RecruitmentForMember />
  );
};

export default Recruitment;
