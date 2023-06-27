// mui
import { Box, Typography, IconButton } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const ReviewMember = props => {
  const {name} = props;
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', pt: 1 }}>
      <Typography component='h2' sx={{ fontSize: 12, fontWeight: 700 }}>
        {name} 님 평가하기
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pl: 2, pr: 1 }}>
        <IconButton size='medium'>
          <ThumbUpOffAltIcon sx={{ width: 24, height: 24 }} />
        </IconButton>
        <Typography sx={{ fontSize: 10, fontWeight: 600 }}>좋아요</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pr: 1 }}>
        <IconButton size='medium'>
          <ThumbDownOffAltIcon sx={{ width: 24, height: 24 }} />
        </IconButton>
        <Typography sx={{ fontSize: 10, fontWeight: 600 }}>싫어요</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <IconButton size='medium'>
          <ReportGmailerrorredIcon sx={{ width: 24, height: 24 }} />
        </IconButton>
        <Typography sx={{ fontSize: 10, fontWeight: 600 }}>신고하기</Typography>
      </Box>
    </Box>
  );
}

export default ReviewMember;