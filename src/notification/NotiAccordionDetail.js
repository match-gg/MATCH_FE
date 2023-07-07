import React from 'react';
import { Link } from 'react-router-dom';

// mui
import { MenuItem, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const UserNoti = (props) => {
  const { nickname, content } = props;
  return (
    <MenuItem
      sx={{
        display: 'block',
      }}
    >
      <Typography sx={{ fontWeight: '520', fontSize: '16px' }}>
        {nickname}
      </Typography>
      <Typography
        sx={{
          fontSize: '14px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        {content}
      </Typography>
    </MenuItem>
  );
};

const SystemNoti = (props) => {
  const { content } = props;
  return (
    <MenuItem
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }}
    >
      <InfoOutlinedIcon
        sx={{
          marginRight: '4px',
          color: 'gray',
        }}
        fontSize='small'
      />
      <Typography
        noWrap={true}
        sx={{ fontWeight: '520', fontSize: '12px' }}
        color='gray'
      >
        {content}
      </Typography>
    </MenuItem>
  );
};

const NotiAccordionDetail = (props) => {
  const { message, boardId } = props;
  return (
    <>
      <Link
        to={`${boardId}`}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        {message.type === 'system' ? (
          <SystemNoti content={message.content} />
        ) : (
          <UserNoti
            nickname={message.user.nickname}
            content={message.content}
          />
        )}
      </Link>
    </>
  );
};

export default NotiAccordionDetail;
