import { Box, Button, Typography, TextField } from '@mui/material';

const GameInfo = ({ id, game, gameKor, onChangeHandler, isChanged, updateHandler }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingLeft: 1,
      }}
    >
      <Typography sx={{ px: 1, fontSize: 16, fontWeight: 600, width: 160 }}>{gameKor}</Typography>
      <TextField
        id={id}
        size='small'
        value={game}
        sx={{ marginLeft: 2, width: '50%', pl: 2 }}
        onChange={onChangeHandler}
        InputProps={
          isChanged && {
            endAdornment: (
              <Button id={id} onClick={updateHandler} sx={{ width: '30%' }}>
                변경하기
              </Button>
            ),
          }
        }
      />
    </Box>
  );
};

export default GameInfo;
