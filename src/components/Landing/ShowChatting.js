import { Container, Grid, Box, Typography } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';

const ShowChatting = () => {
    return (
        <Container
            sx={{
                height: '50vh',
                padding: 0,
                margin: 0,
                marginTop: '50px',
            }}
        >
            <Grid
                container
                sx={{
                    height: '100%',
                    margin: 0,
                    padding: 0,
                }}
            >
                <Grid item xs={5}>
                    <Typography
                        variant='h3'
                        sx={{
                            textAlign: 'start',
                            fontWeight: '600',
                            marginTop: '3rem',
                            marginLeft: '5rem',
                        }}
                    >
                        <MessageIcon
                            fontSize='inherit'
                            color='warning'
                            sx={{
                                paddingTop: '10px',
                            }}
                        />
                        채팅
                    </Typography>
                    <Typography
                        variant='h6'
                        sx={{
                            textAlign: 'start',
                            marginTop: '3rem',
                            marginLeft: '5rem',
                        }}
                    >
                        파티에 참가하여 <br />
                        파티원들과 대화를 나눠보세요
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={7}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box
                        component='img'
                        src='/'
                        alt='나중에 여기에 채팅 화면 스샷해서 넣을거임'
                        sx={{
                            height: '80%',
                            width: '80%',
                            border: '1px solid black',
                            borderRadius: '30px',
                        }}
                    ></Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ShowChatting;
