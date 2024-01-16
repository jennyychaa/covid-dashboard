import React from 'react';
import ReactDOM from 'react-dom/client';

import './assets/css/reset.css';
import StatesDataProvider from './contexts/StatesDataProvider';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StatesDataProvider>
      <App />
    </StatesDataProvider>
  </React.StrictMode>
);
