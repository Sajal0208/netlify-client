import React from 'react'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage';
import SigninPage from './features/auth/SigninPage';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/Layout/Layout';
import RequireAuth from './features/auth/RequireAuth';
import DashboardPage from './pages/DashboardPage';
import SignupPage from './features/auth/SignupPage';
import Logout from './features/auth/Logout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path='/signup' element={<SignupPage />} />
        {/* Private Routes */}
        <Route element={<RequireAuth />}>
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
