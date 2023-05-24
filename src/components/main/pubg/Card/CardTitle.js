import { Fragment } from 'react';

import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { platformList, typeList, tierList } from './Card.d';

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
          {/* platform image */}
          <Box
            component='img'
            src={'https://static.vecteezy.com/system/resources/previews/020/975/558/original/steam-logo-steam-icon-transparent-free-png.png'}
            loading='lazy'
            alt={platform + '_image'}
            sx={{
              height: 32,
              width: 32,
              mr: 1,
              mixBlendMode: 'exclusion',
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Box sx={{ display: 'flex' }}>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  pl: 1,
                }}
              >
                #{typeList.find((elem) => elem.value === type).label}
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  pl: 1,
                }}
              >
                #{tierList.find((elem) => elem.value === tier).label}
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
                pl: 1,
              }}
            >
              {content}
            </Typography>
          </Box>
        </FlexRow>
      </FlexRow>
    </Fragment>
  );
};

export default CardTitle;
