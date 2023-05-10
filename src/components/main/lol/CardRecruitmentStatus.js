import { Fragment } from 'react';

import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';

import { expiredTime } from './Card.d';

const FlexRow = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
}));

const CardRecruitmentStatus = (props) => {
  const {
    isHovering,
    created,
    expire,
    curMembers = 2,
    totalMembers = 5,
  } = props;

  // date parsing
  const year = created.substring(0, 4);
  const month = created.substring(5, 7);
  const day = created.substring(8, 10);
  const hour = created.substring(11, 13);
  const minute = created.substring(14, 16);
  const second = created.substring(17, 19);

  const createdDate = new Date(year, month - 1, day, hour, minute, second);

  const duration = expiredTime[expire];
  const endTime = duration + createdDate.getTime();

  // 만료 여부
  const isExpired = Date.now() - endTime > 0 ? true : false;

  const remainingTime = !isExpired ? endTime - Date.now() : 0;
  const remainingTimeSec = Math.floor(remainingTime / 1000);
  const remainingTimeMin = Math.floor(remainingTimeSec / 60);
  const remainingTimeHour = Math.floor(remainingTimeMin / 60);
  const remainingTimeDay = Math.floor(remainingTimeHour / 24);

  return (
    <Fragment>
      {isHovering && (
        <Box sx={{ alignItems: 'center' }}>
          <Typography sx={{ color: '#5383e8', fontSize: 14, fontWeight: 700 }}>
            클릭해서 상세보기
          </Typography>
        </Box>
      )}
      {!isHovering && (
        <FlexRow
          sx={{
            height: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
            pl: 6,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              sx={{
                color: 'grey',
                fontSize: 14,
                fontWeight: 700,
                mr: 1.5,
              }}
            >
              모집 현황
            </Typography>
            {new Array(totalMembers).fill(0).map((_item, idx) => {
              return (
                <CheckIcon
                  key={idx}
                  sx={{
                    color: idx < curMembers ? 'white' : '#d9d9d9',
                    fontSize: 12,
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: idx < curMembers ? '#5383e8' : '#d9d9d9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 0.5,
                    padding: '2px',
                  }}
                />
              );
            })}
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography
              sx={{ color: '#5383e8', fontSize: 14, fontWeight: 700 }}
            >
              {isExpired
                ? '만료됨'
                : remainingTimeDay
                ? remainingTimeDay + '일 후 만료'
                : remainingTimeHour
                ? remainingTimeHour + '시간 후 만료'
                : remainingTimeMin
                ? remainingTimeMin + '분 후 만료'
                : '잠시 후 만료'}
            </Typography>
          </Box>
        </FlexRow>
      )}
    </Fragment>
  );
};

export default CardRecruitmentStatus;
