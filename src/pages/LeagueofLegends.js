import { Fragment, useState } from 'react';
import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom';

import MainHeader from '../components/main/MainHeader';
import MainFooter from '../components/main/MainFooter';
import MainBodyWrapper from '../components/main/MainBodyWrapper';
import Body from '../components/main/lol/Body';
import CardDeatilModal from '../components/main/lol/CardDeatilModal';
import CreateCardModal from '../components/main/lol/CreateCardModal';

const LeagueofLegends = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <Fragment>
      <Routes location={background || location}>
        <Route
          path='/*'
          element={
            <Fragment>
              <MainHeader game={'lol'} />
              <MainBodyWrapper game={'lol'}>
                <Body />
                <Outlet />
              </MainBodyWrapper>
              <MainFooter />
            </Fragment>
          }
        >
          <Route path='new' element={<CreateCardModal />} />
          <Route path='edit' element={<CreateCardModal />} />
          <Route path={`:id`} element={<CardDeatilModal />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route path='new' element={<CreateCardModal />} />
          <Route path='edit' element={<CreateCardModal />} />
          <Route path={`:id`} element={<CardDeatilModal />} />
        </Routes>
      )}
    </Fragment>
  );
};

export default LeagueofLegends;
