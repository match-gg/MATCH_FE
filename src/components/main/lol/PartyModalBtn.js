import { Button, Typography } from '@mui/material';

import { Fragment, useState } from 'react';

import PartyInfo from './PartyInfo';
import ViewDetail from './ViewDetail';

const PartyModalBtn = props => {
  //Modal 관련 state와 함수
  const [open, setOpen] = useState(false);
  const openModalHandler = () => setOpen(true);
  const closeModalHandler = () => {
    setOpen(false);
    setViewDetail(false);
  };

  // 파티원 정보 상세보기 Modal 관련 state와 함수
  const [viewDetail, setViewDetail] = useState(false);
  const showViewDetailHandler = b => {
    setViewDetail(b)
  }

  return (
    <Fragment>
      <Button variant='contained' sx={{ borderRadius: '8px' }} onClick={openModalHandler}>
        <Typography>더보기</Typography>
      </Button>
      {!viewDetail && <PartyInfo open={open} onCloseModal={closeModalHandler} onViewDetail={showViewDetailHandler} />}
      {viewDetail && <ViewDetail open={open} onCloseModal={closeModalHandler} onCloseViewDetail={showViewDetailHandler} />}
    </Fragment>
  );
}

export default PartyModalBtn;