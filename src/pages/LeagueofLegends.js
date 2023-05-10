import { Fragment } from 'react';

import MainHeader from '../components/main/MainHeader';
import MainFooter from '../components/main/MainFooter';
import MainBodyWrapper from '../components/main/MainBodyWrapper';
import Body from '../components/main/lol/Body';

const LeagueofLegends = () => {
  return (
    <Fragment>
      <MainHeader game={'lol'} />
      <MainBodyWrapper game={'lol'}>
        <Body/>
      </MainBodyWrapper>
      <MainFooter />
    </Fragment>
  );
};

export default LeagueofLegends;
