import { useState } from 'react';

import { Card as MuiCard, CardContent, Box, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

import CardDetailModal from './prevCardDetailModal';
import CardTitle from './CardTitle';
import CardRecruitmentStatus from './CardRecruitmentStatus';
import CardAuthor from './CardAuthor';

import { tierInfo } from './Card.d';
import { useNavigate } from 'react-router-dom';

const BaseCard = styled(MuiCard)(({ theme }) => ({
  width: 376,
  borderRadius: '8px',
  boxShadow: 'none',
  border: '1px solid #dddddd',
  marginRight: 8,
  marginBottom: 8,
}));

const FlexCol = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const Card = ({ item }) => {
  const navigate = useNavigate();

  const { author, content, expire, created, voice, tier, position, type } = item;

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      onClick={() => {}}
    >
      <BaseCard
        sx={{
          '&:hover': {
            border: `1px solid ${tierInfo.find((elem) => elem.id === tier).color}`,
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
          },
        }}
      >
        <CardContent
          sx={{
            width: '100%',
            height: '100%',
            p: 2,
          }}
        >
          <FlexCol>
            {/* 모집하는 사람 정보 */}
            <CardTitle content={content} tier={tier} position={position} type={type} />
            {/* 모집 현황 */}
            <CardRecruitmentStatus isHovering={isHovering} created={created} expire={expire} />
            <Divider sx={{ my: 1 }} />
            {/* 파티장 정보 */}
            <CardAuthor author={author} voice={voice} position={position} />
          </FlexCol>
        </CardContent>
      </BaseCard>
    </div>
  );
};

export default Card;
