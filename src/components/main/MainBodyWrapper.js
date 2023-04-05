import { Box } from '@mui/material';
import { styled } from '@mui/material';

const BodyWrapper = styled(Box)(({ theme }) => ({
  pt: 15,
  height: '100%',
  minHeight: 'calc(100vh - 278px)',
  backgroundColor: '#f3f3f3',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const MainBodyWrapper = ({ children }) => {
  return <BodyWrapper>{children}</BodyWrapper>;
};

export default MainBodyWrapper;
