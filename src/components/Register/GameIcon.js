import { Box } from '@mui/material';

const GameIcon = (props) => {
  const { gameIcon, altMessage, w, h, p } = props;
  return w && h && p ? (
    <Box
      component='div'
      sx={{
        width: w,
        height: h,
        padding: p,
        marginX: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContents: 'center',
      }}
    >
      <Box
        component='img'
        src={gameIcon}
        alt={altMessage}
        sx={{ width: '100%', padding: 'auto', filter: 'none' }}
      />
    </Box>
  ) : (
    <Box
      component='div'
      sx={{
        width: 100,
        height: 100,
        marginX: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContents: 'center',
      }}
    >
      <Box
        component='img'
        src={gameIcon}
        alt={altMessage}
        sx={{ width: '100%', padding: 'auto', filter: 'none' }}
      />
    </Box>
  );
};

export default GameIcon;
