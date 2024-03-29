
import { Fragment } from 'react';
import {Route, Routes, useLocation } from 'react-router-dom';

import MainHeader from '../components/main/MainHeader';
import MainFooter from '../components/main/MainFooter';
import MainBodyWrapper from '../components/main/MainBodyWrapper';
import Body from '../components/main/pubg/Body';
import CardDetailModal from '../components/main/pubg/Card/CardDetailModal';

const BattleGround = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <Fragment>
      <Routes location={background || location}>
        <Route
          path='/*'
          element={
            <Fragment>
              <MainHeader game={'pubg'} />
              <MainBodyWrapper game={'pubg'}>
                <Body />
              </MainBodyWrapper>
              <MainFooter />
            </Fragment>
          }
        >
          <Route path={`:id`} element={<CardDetailModal />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route path={`:id`} element={<CardDetailModal />} />
        </Routes>
      )}
    </Fragment>
  );
};

export default BattleGround;
