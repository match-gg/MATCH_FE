import { Fragment } from 'react';

import MainHeader from '../components/main/MainHeader';
import MainFooter from '../components/main/MainFooter';
import MainBodyWrapper from '../components/main/MainBodyWrapper';
import LolBody from '../components/main/lol/LolBody';

const LeagueofLegends = () => {
  return (
    <Fragment>
      <MainHeader game={'lol'} />
      <MainBodyWrapper game={'lol'}>
        <LolBody/>
      </MainBodyWrapper>
      <MainFooter />
    </Fragment>
  );
};

export default LeagueofLegends;
