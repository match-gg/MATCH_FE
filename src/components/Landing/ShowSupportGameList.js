import { Container, Typography, Box } from '@mui/material';
import GameIcon from '../Register/GameIcon';
import pubgIcon from '../Register/logo_images/Pubg_Logo.png';
import maplestoryIcon from '../Register/logo_images/maplestory_logo.png';
import lolIcon from '../Register/logo_images/LoL_Icon_Flat_BLACK.png';
import lostarkIcon from '../Register/logo_images/lost_Ark_Logo.png';
import overwatchIcon from '../Register/logo_images/overwatch_logo.png';
import { forwardRef } from 'react';

const ShowSupportGameList = forwardRef((props, ref) => {
    const supportedGameList = [
        [pubgIcon, 'pubg_icon'],
        [maplestoryIcon, 'maplestory_icon'],
        [lolIcon, 'lol_icon'],
        [lostarkIcon, 'lostark_icon'],
        [overwatchIcon, 'overwatch_icon'],
    ];

    return (
        <Container
            ref={ref}
            sx={{
                paddingTop: '5.0rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}
        >
            <Typography
                textAlign='center'
                variant='h1'
                sx={{
                    color: 'black',
                    fontWeight: '600',
                }}
            >
                지원 게임 목록
            </Typography>
            <Box
                sx={{
                    marginTop: 8,
                    padding: 5,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                {supportedGameList.map((val, idx) => {
                    return (
                        <GameIcon
                            key={idx}
                            gameIcon={val[0]}
                            altMessage={val[1]}
                            w={150}
                            h={150}
                            p={2}
                        />
                    );
                })}
            </Box>
        </Container>
    );
});

export default ShowSupportGameList;
