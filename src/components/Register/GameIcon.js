import { Box } from '@mui/material';

const GameIcon = (props) => {
  const { gameIcon, altMessage } = props;

  return (
    <Box
      component='div'
      sx={{
        width: '10vh',
        height: '10vh',
        marginX: '2vh',
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
