import { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
// import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
    return (
        <Fragment>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                {/* <Route path="/login" element={<LoginPage />} /> */}
                <Route path="/register/*" element={<RegisterPage />} />
                {/* <Route path='/kakao/*' element={<Navigate to='/register' />} /> */}
                {/* src/ 에 OAuth.js 있어야 작동... */}
            </Routes>
        </Fragment>
    );
}
