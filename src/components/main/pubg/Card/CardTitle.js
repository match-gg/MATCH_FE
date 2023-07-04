import { Fragment } from 'react';

import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { platformList, typeList, tierList } from './Card.d';
import { platformInfo } from './CardTitle.d';

const FlexRow = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
}));

const CardTitle = (props) => {
  const { platform, type, tier, content } = props;

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
            src={platformInfo[platform]}
            loading='lazy'
            alt={platform + '_image'}
            sx={{
              height: 32,
              width: 32,
              mr: 1,
              borderRadius: '50%'
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Box sx={{ display: 'flex' }}>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  pl: 1
                }}>
                #{typeList.find(elem => elem.value === type).label}
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  pl: 0.5
                }}>
                #{tierList.find(elem => elem.value === tier).label}
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
                pl: 1
              }}>
              {content}
            </Typography>
          </Box>
        </FlexRow>
      </FlexRow>
    </Fragment>
  );
};

export default CardTitle;
