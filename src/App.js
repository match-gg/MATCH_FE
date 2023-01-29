import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';

import LandingPage from './pages/Landing/LandingPage';
import LoginPage from './pages/Login/LoginPage';

export default function App() {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </Fragment>
  );
}
