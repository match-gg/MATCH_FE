import { Fragment, useState } from 'react';
import ChatList from './ChatList';
import ChatBtn from './ChatBtn';

const ChatToggleBtn = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Fragment>
      {open && <ChatList open={open} handleOpen={handleOpen} />}
      {!open && <ChatBtn open={open} handleOpen={handleOpen} />}
    </Fragment>
  );
};

export default ChatToggleBtn;
