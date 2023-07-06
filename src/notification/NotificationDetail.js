// import {
//   AccordionDetails,
//   MenuItem,
//   Typography,
//   ListItemText,
// } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { notificationActions } from '../store/notification-slice';

// const NotificationDetail = (props) => {
//   const { chatRoomId } = props;
//   const lastIndex = window.localStorage.getItem(chatRoomId);

//   const { messagesForNoti } = useSelector((state) => state.notification);

//   const [messages, setMessages] = useState([]);

//   const dispatch = useDispatch();

//   const removeMessages = () => {
//     dispatch(notificationActions.REMOVE_MESSAGES(chatRoomId));
//     window.localStorage.setItem(chatRoomId, messages.length);
//   };

//   useEffect(() => {
//     setMessages(messagesForNoti[chatRoomId]);
//   }, [messagesForNoti]);

//   return (
//     <AccordionDetails>
//       {messages &&
//         messages.map((message, idx) => {
//           if (idx >= lastIndex) {
//             return (
//               <MenuItem key={idx}>
//                 <Typography
//                   sx={{
//                     overflow: 'hidden',
//                     whiteSpace: 'nowrap',
//                     textOverflow: 'ellipsis',
//                   }}
//                 >
//                   {message}
//                 </Typography>
//               </MenuItem>
//             );
//           } else {
//             return null;
//           }
//         })}
//       <MenuItem>
//         <ListItemText sx={{ textAlign: 'center' }}>
//           <Typography
//             sx={{ fontWeight: 'bold', color: 'orangered' }}
//             onClick={removeMessages}
//           >
//             지우기
//           </Typography>
//         </ListItemText>
//       </MenuItem>
//     </AccordionDetails>
//   );
// };

// export default NotificationDetail;
