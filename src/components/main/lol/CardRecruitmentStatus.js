import { Fragment } from 'react';

import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';

import RemainingTime from './RemainingTime';

const FlexRow = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
}));

const CardRecruitmentStatus = (props) => {
  const { isHovering, created, expire, curMembers, totalMembers } = props;

  return (
    <Fragment>
      {isHovering && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
          <RemainingTime created={created} expire={expire} />
        </FlexRow>
      )}
    </Fragment>
  );
};

export default CardRecruitmentStatus;
