import { Typography } from '@mui/material';

import Countdown from 'react-countdown';

const expiredTime = {
  FIFTEEN_M: 15 * 60 * 1000,
  THIRTY_M: 30 * 60 * 1000,
  ONE_H: 1 * 60 * 60 * 1000,
  TWO_H: 2 * 60 * 60 * 1000,
  THREE_H: 3 * 60 * 60 * 1000,
  SIX_H: 6 * 60 * 60 * 1000,
  TWELVE_H: 12 * 60 * 60 * 1000,
  TWENTY_FOUR_H: 24 * 60 * 60 * 1000,
};

const RemainingTime = (props) => {
  const {created = '2000-12-31 23:59:59', expire = 'FIFTEEN_M'} = props;

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
    return (
      <Typography sx={{ color: '#5383e8', fontSize: 14, fontWeight: 700 }}>
        {completed
          ? '만료됨'
          : hours !== 0
          ? `${hours}시간 남음`
          : minutes !== 0
          ? `${minutes}분 남음`
          : `${seconds}초 남음`}
      </Typography>
    );
  };

  return <Countdown date={Date.now() + remainingTime} renderer={renderer} />;
}

export default RemainingTime;