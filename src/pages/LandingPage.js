import { Fragment } from 'react';

import Footer from '../components/Landing/Footer';
import Navbar from '../components/Landing/Navbar';
import LandingSection from '../components/Landing/LandingSection';

const LandingPage = () => {
  return (
    <Fragment>
      <Navbar />
      <LandingSection />
      <Footer />
    </Fragment>
  );
};

export default LandingPage;
