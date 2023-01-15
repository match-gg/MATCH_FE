import React from 'react';
import Footer from '../../components/nav/Footer';
import Navbar from '../../components/nav/Navbar';
import LandingSection from './LandingSection';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <LandingSection />
      <Footer />
    </>
  );
};

export default LandingPage;
