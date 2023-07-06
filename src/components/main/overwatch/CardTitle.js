import { Fragment } from 'react';

import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { positionInfo, tierInfo, typeInfo } from './Card.d';

const FlexRow = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
}));

const CardTitle = (props) => {
  const { content, tier, position, type } = props;

  return (
    <Fragment>
      <FlexRow
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <FlexRow
          sx={{
            height: 48,
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}>
          <Box
            component='img'
            src={positionInfo.find(elem => elem.id === position).image}
            loading='lazy'
            alt={position}
            sx={{
              height: 40,
              width: 40,
              mr: 1,
              mixBlendMode: 'exclusion'
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Box sx={{ display: 'flex' }}>
              <Typography
                color={tierInfo.find(elem => elem.id === tier).color}
                sx={{
                  fontSize: 12,
                  fontWeight: 700
                }}>
                #{tierInfo.find(elem => elem.id === tier).kor}
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  pl: 1
                }}>
                #{typeInfo.find(elem => elem.id === type).kor}
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
                WebkitLineClamp: 1
              }}>
              {' ' + content}
            </Typography>
          </Box>
        </FlexRow>
      </FlexRow>
    </Fragment>
  );
};

export default CardTitle;
