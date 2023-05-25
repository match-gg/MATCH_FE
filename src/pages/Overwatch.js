import { Fragment } from "react";
import { Route, Routes, useLocation } from "react-router-dom"

import MainHeader from "../components/main/MainHeader";
import MainFooter from '../components/main/MainFooter';
import MainBodyWrapper from '../components/main/MainBodyWrapper';
import Body from '../components/main/overwatch/Body'

const Overwatch = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <Fragment>
      <Routes location={background || location}>
        <Route
          path='/*'
          element={
            <Fragment>
              <MainHeader game={'overwatch'} />
              <MainBodyWrapper game={'overwatch'}>
                <Body />
              </MainBodyWrapper>
              <MainFooter />
            </Fragment>
          }></Route>
      </Routes>
    </Fragment>
  );
}

export default Overwatch;