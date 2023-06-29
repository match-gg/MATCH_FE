import { useState } from 'react';

// mui
import { Box, Typography, IconButton } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import ReportIcon from '@mui/icons-material/Report';

const ReviewMember = props => {
  // 버튼 클릭을 관리하는 상태
  const [likeBtnState, setLikeBtnState] = useState(false);
  const [dislikeBtnState, setDislikeBtnState] = useState(false);
  const [reportBtnState, setReportBtnState] = useState(false);

  // 좋아요 버튼을 클릭하면 동작하는 함수
  const likeBtnHandler = () => {
    setLikeBtnState(prev => !prev);
    setDislikeBtnState(false);
    setReportBtnState(false);
  }

  // 싫어요 버튼을 클릭하면 동작하는 함수
  const dislikeBtnHandler = () => {
    setDislikeBtnState(prev => !prev);
    setLikeBtnState(false);
    setReportBtnState(false);
  };

  // 신고하기 버튼을 클릭하면 동작하는 함수
  const reportBtnHandler = () => {
    setReportBtnState(prev => !prev);
    setLikeBtnState(false);
    setDislikeBtnState(false);
  }

  // props로 닉네임을 받아와서 저장
  const {name} = props;
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', pt: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 200 }}>
        <Typography component='h2' sx={{ fontSize: 12, fontWeight: 700 }}>
          {name} 님 평가하기
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 200 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pr: 2
          }}>
          <IconButton size='medium' onClick={likeBtnHandler}>
            {likeBtnState === true ? (
              <ThumbUpIcon color='primary' sx={{ width: 24, height: 24 }} />
            ) : (
              <ThumbUpOffAltIcon sx={{ width: 24, height: 24 }} />
            )}
          </IconButton>
          <Typography sx={{ fontSize: 10, fontWeight: 600 }}>좋아요</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pr: 2
          }}>
          <IconButton size='medium' onClick={dislikeBtnHandler}>
            {dislikeBtnState === true ? (
              <ThumbDownIcon color='warning' sx={{ width: 24, height: 24 }} />
            ) : (
              <ThumbDownOffAltIcon sx={{ width: 24, height: 24 }} />
            )}
          </IconButton>
          <Typography sx={{ fontSize: 10, fontWeight: 600 }}>싫어요</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <IconButton size='medium' onClick={reportBtnHandler}>
            {reportBtnState === true ? (
              <ReportIcon color='error' sx={{ width: 24, height: 24 }} />
            ) : (
              <ReportGmailerrorredIcon sx={{ width: 24, height: 24 }} />
            )}
          </IconButton>
          <Typography sx={{ fontSize: 10, fontWeight: 600 }}>신고하기</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ReviewMember;