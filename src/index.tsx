import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import App from './App';
import { Toaster } from 'sonner';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);