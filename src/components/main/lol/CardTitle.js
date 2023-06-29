import { Fragment } from 'react';

import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { positionList, tierList, typeList } from './CardTitle.d';

const FlexRow = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
}));

const CardTitle = (props) => {
  const { type, position, tier, content } = props;

  return (
    <Fragment>
      <FlexRow
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <FlexRow
          sx={{
            height: 48,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Box
            component='img'
            src={positionList.find((elem) => elem.id === position).image}
            loading='lazy'
            alt={position}
            sx={{
              height: 40,
              width: 40,
              mr: 1,
              mixBlendMode: 'exclusion',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  pr: 0.5,
                }}
              >
                #{typeList.find((elem) => elem.id === type).kor}
              </Typography>
              <Typography
                color={tierList.find((elem) => elem.id === tier).color}
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                #{tierList.find((elem) => elem.id === tier).kor}
              </Typography>
            </Box>
            <Typography
              align='left'
              sx={{
                fontSize: 14,
                fontWeight: 600,
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 1,
              }}
            >
              {' ' + content}
            </Typography>
          </Box>
        </FlexRow>
      </FlexRow>
    </Fragment>
  );
};

export default CardTitle;
