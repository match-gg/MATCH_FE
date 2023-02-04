import { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { CssBaseline } from '@mui/material';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Fragment>
        <BrowserRouter>
            <CssBaseline />
            <App />
        </BrowserRouter>
    </Fragment>
);
