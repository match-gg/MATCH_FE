import { Fragment } from 'react';

import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { lanes, tierInfo } from './Card.d';

const FlexRow = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
}));

const CardTop = (props) => {
  const { content, tier, position } = props;

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
            src={lanes.find((elem) => elem.id === position).image}
            loading='lazy'
            alt={position}
            sx={{
              height: 40,
              width: 40,
              mr: 1,
              mixBlendMode: 'exclusion',
            }}
          />
          <Typography
            align='left'
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
            }}
          >
            <Typography
              component='span'
              color={tierInfo.find((elem) => elem.id === tier).color}
              sx={{
                display: 'inline-block',
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              [{tierInfo.find((elem) => elem.id === tier).kor}]
            </Typography>
            <Typography
              component='span'
              sx={{
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              {' ' + content}
            </Typography>
          </Typography>
        </FlexRow>
      </FlexRow>
    </Fragment>
  );
};

export default CardTop;
