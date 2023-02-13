import { Fragment, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Container, Box, Typography, Button, Checkbox } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';

import Copyright from '../../components/ui/Copyright';
import TermSection from './TermSection';

const RegisterLayout = (props) => {
  const { title, description, prevLink, nextLink, phase } = props;
  const [isAgree, setAgree] = useState(true);
  const activateNextButton = () => {
    setAgree(false);
  };
  const deactivateNextButton = () => {
    setAgree(true);
  };

  return (
    <Container component='main' maxWidth='md'>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
          overflow: 'none',
        }}
      >
        <Typography
          component='h1'
          variant='h3'
          sx={{
            marginTop: 5,
            fontStyle: 'italic',
            fontSize: { xs: 35, sm: 45 },
            fontWeight: '700',
          }}
        >
          Match.GG
        </Typography>
        <Box
          sx={{
            marginTop: { xs: 1, sm: 1 },
            display: 'flex',
            flexDirection: 'row',
            justifyContetns: 'center',
            alignItems: 'center',
            gap: { xs: 1, sm: 2 },
          }}
        >
          {phase && (
            <Fragment>
              {phase === 1 ? (
                <CircleIcon
                  sx={{
                    color: 'grey',
                    fontSize: { xs: 'medium', sm: 'large' },
                  }}
                />
              ) : (
                <CircleOutlinedIcon
                  sx={{
                    color: 'grey',
                    fontSize: { xs: 'medium', sm: 'large' },
                  }}
                />
              )}
              {phase === 2 ? (
                <CircleIcon
                  sx={{
                    color: 'grey',
                    fontSize: { xs: 'medium', sm: 'large' },
                  }}
                />
              ) : (
                <CircleOutlinedIcon
                  sx={{
                    color: 'grey',
                    fontSize: { xs: 'medium', sm: 'large' },
                  }}
                />
              )}
              {phase === 3 ? (
                <CircleIcon
                  sx={{
                    color: 'grey',
                    fontSize: { xs: 'medium', sm: 'large' },
                  }}
                />
              ) : (
                <CircleOutlinedIcon
                  sx={{
                    color: 'grey',
                    fontSize: { xs: 'medium', sm: 'large' },
                  }}
                />
              )}
              {phase === 4 ? (
                <CircleIcon
                  sx={{
                    color: 'grey',
                    fontSize: { xs: 'medium', sm: 'large' },
                  }}
                />
              ) : (
                <CircleOutlinedIcon
                  sx={{
                    color: 'grey',
                    fontSize: { xs: 'medium', sm: 'large' },
                  }}
                />
              )}
            </Fragment>
          )}
        </Box>
        <Typography
          component='h2'
          variant='h4'
          sx={{
            marginTop: 1,
            fontWeight: '600',
            fontSize: { xs: 20, sm: 30 },
          }}
        >
          {title}
        </Typography>
        <Typography
          component='h3'
          variant='h5'
          sx={{
            marginTop: { xs: 0.5 },
            marginBottom: { xs: 1, sm: 2 },
            fontWeight: '600',
            fontSize: { xs: 13, sm: 18 },
          }}
        >
          {description}
        </Typography>
        {phase !== 1 && (
          <Box
            component='div'
            sx={{
              margin: '10px',
              width: '100%',
              display: 'flex',
              height: {
                xs: 'calc(100% - 250px)',
                sm: 'calc(100% - 305px)',
              },
              flexDirection: 'column',
              alignItems: 'center',
              overflow: 'auto',
              gap: 2,
            }}
          >
            {' '}
            {/* 페이지별 작성할 사안 */}
            {props.children}
          </Box>
        )}
        {phase === 1 && (
          <Box>
            <TermSection title={'MATCH.GG 이용 약관'} contents={props.term1} />
            <TermSection
              title={'개인정보 수집 동의 약관'}
              contents={props.term2}
            />
            <Container
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {'위의 약관을 읽었으며, 이에 동의하시겠습니까?'}
              <Box>
                <Checkbox checked={!isAgree} onClick={activateNextButton} />
                {'동의합니다'}
                <Checkbox checked={isAgree} onClick={deactivateNextButton} />
                {'동의하지 않습니다.'}
              </Box>
            </Container>
          </Box>
        )}
        <Box
          component='div'
          sx={{
            position: 'fixed',
            bottom: 0,
            height: { xs: 70, sm: 100 },
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'start',
            justifyContent: 'center',
            backgroundColor: 'white',
            gap: 4,
          }}
        >
          {prevLink && (
            <Button
              component={RouterLink}
              to={prevLink}
              variant='contained'
              sx={{
                marginTop: { xs: 1, sm: 3 },
                width: { xs: 150, sm: 300 },
                height: { xs: 30, sm: 40 },
                fontSize: { xs: 20, sm: 25 },
                fontWeight: '500',
                backgroundColor: '#939393',
                border: '1.5px solid white',
                borderRadius: '1rem',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '2',
                  backgroundColor: '#939393',
                },
              }}
            >
              이전으로
            </Button>
          )}
          {nextLink && (
            <Button
              disabled={phase === 1 && isAgree}
              component={RouterLink}
              to={nextLink}
              variant='contained'
              sx={{
                marginTop: { xs: 1, sm: 3 },
                width: { xs: 150, sm: 300 },
                height: { xs: 30, sm: 40 },
                fontSize: { xs: 20, sm: 25 },
                fontWeight: '500',
                backgroundColor: '#939393',
                border: '1.5px solid white',
                borderRadius: '1rem',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '2',
                  backgroundColor: '#939393',
                },
              }}
            >
              다음으로
            </Button>
          )}
          <Copyright
            sx={{
              position: 'absolute',
              bottom: 0,
              fontSize: { xs: 13, sm: 15 },
              width: 500,
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterLayout;
