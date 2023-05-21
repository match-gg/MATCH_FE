import { Fragment, useState } from 'react';
import ChatList from './ChatList';
import ChatBtn from './ChatBtn';
import { useSelector } from 'react-redux';

const ChatToggleBtn = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const { isLogin } = useSelector((state) => state.user);

  return (
    <Fragment>
      {isLogin && open && <ChatList open={open} handleOpen={handleOpen} />}
      {isLogin && !open && <ChatBtn open={open} handleOpen={handleOpen} />}
    </Fragment>
  );
};

export default ChatToggleBtn;
