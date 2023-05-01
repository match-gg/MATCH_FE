import { Fragment } from 'react';

import MainHeader from '../components/main/MainHeader';
import MainFooter from '../components/main/MainFooter';
import MainBodyWrapper from '../components/main/MainBodyWrapper';
import ValorantBody from '../components/main/valorant/ValorantBody'

const Valorant = () => {
  return (
    <Fragment>
      <MainHeader game={'valorant'} />
      <MainBodyWrapper game={'valorant'} >
        <ValorantBody />
      </MainBodyWrapper>
      <MainFooter />
    </Fragment>
  );
};

export default Valorant;
