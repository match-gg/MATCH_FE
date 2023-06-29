// mui
import { Box, Typography, IconButton } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const ReviewMember = props => {
  const {name} = props;
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', pt: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 200 }}>
        <Typography component='h2' sx={{ fontSize: 12, fontWeight: 700 }}>
          {name} 님 평가하기
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 200 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pr: 2 }}>
          <IconButton size='medium'>
            <ThumbUpOffAltIcon sx={{ width: 24, height: 24 }} />
          </IconButton>
          <Typography sx={{ fontSize: 10, fontWeight: 600 }}>좋아요</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pr: 2 }}>
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
    </Box>
  );
}

export default ReviewMember;