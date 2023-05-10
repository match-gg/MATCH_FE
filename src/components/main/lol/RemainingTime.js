import { Typography } from '@mui/material';

import Countdown from 'react-countdown';

import { expiredTime } from './Card.d';

const RemainingTime = (props) => {
  const {created, expire} = props;

  // date parsing
  const year = created.substring(0, 4);
  const month = created.substring(5, 7);
  const day = created.substring(8, 10);
  const hour = created.substring(11, 13);
  const minute = created.substring(14, 16);
  const second = created.substring(17, 19);
  
  const createdDate = new Date(year, month - 1, day, hour, minute, second);

  // 타이머 관련 변수와 함수
  const remainingTime = createdDate.getTime() + expiredTime[expire] - Date.now(); 
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Typography sx={{ color: '#5383e8', fontSize: 14, fontWeight: 700 }}>만료됨</Typography>;
    } else if (hours !== 0) {
      return <Typography sx={{ color: '#5383e8', fontSize: 14, fontWeight: 700 }}>{hours}시간 남음</Typography>;
    } else if (minutes !== 0) {
      return <Typography sx={{ color: '#5383e8', fontSize: 14, fontWeight: 700 }}>{minutes}분 남음</Typography>;
    } else {
      return <Typography sx={{ color: '#5383e8', fontSize: 14, fontWeight: 700 }}>{seconds}초 남음</Typography>;
    }
  };

  return <Countdown date={Date.now() + remainingTime} renderer={renderer} />;
}

export default RemainingTime;