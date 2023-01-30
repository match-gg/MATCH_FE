import { Routes, Route, Navigate } from 'react-router-dom';

import RegisterTerm from '../components/Register/RegisterTerms';
import RegisterGames from '../components/Register/RegisterGames';
import RegisterFavGame from '../components/Register/RegisterFavGame';
import RegisterNotification from '../components/Register/RegisterNotification';
import RegisterSuccess from '../components/Register/RegisterSuccess';

const RegisterPage = () => {
  return (
    <Routes>
      <Route path='*' element={<Navigate to='terms' />} />
      <Route path='terms' element={<RegisterTerm />} />
      <Route path='games' element={<RegisterGames />} />
      <Route path='favGame' element={<RegisterFavGame />} />
      <Route path='notification' element={<RegisterNotification />} />
      <Route path='success' element={<RegisterSuccess />} />
    </Routes>
  );
};

export default RegisterPage;
