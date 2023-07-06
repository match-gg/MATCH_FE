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
  const {name, onChangeReview} = props;

  // 버튼이 클릭 된 상태인지 true, false로 관리
  const [likeClicked, setLikeClicked] = useState(false)
  const [dislikeClicked, setDislikeClicked] = useState(false)
  const [reportClicked, setReportClicked] = useState(false)

  // 좋아요 버튼을 클릭하면 동작하는 함수
  const likeBtnHandler = () => {
    setLikeClicked(prev => !prev)
    setDislikeClicked(false)
    setReportClicked(false)
    if (likeClicked === false) {
      onChangeReview(name, 'like')
    } else {
      onChangeReview(name, 'none')
    }
  }

  // 싫어요 버튼을 클릭하면 동작하는 함수
  const dislikeBtnHandler = () => {
    setDislikeClicked(prev => !prev)
    setLikeClicked(false)
    setReportClicked(false)
    if (dislikeClicked === false) {
      onChangeReview(name, 'dislike')
    } else {
      onChangeReview(name, 'none')
    }
  };

  // 신고하기 버튼을 클릭하면 동작하는 함수
  const reportBtnHandler = () => {
    setReportClicked(prev => !prev)
    setLikeClicked(false)
    setDislikeClicked(false)
    if (reportClicked === false) {
      onChangeReview(name, 'report')
    } else {
      onChangeReview(name, 'none')
    }
  }

  
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
            {likeClicked === true ? (
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
            {dislikeClicked === true ? (
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
            {reportClicked === true ? (
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