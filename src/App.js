import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage';
import SettingPage from './pages/SettingPage';
import FindPasswordPage from './pages/FindPasswordPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/todomain" element={<MainPage />} />
        <Route path="/todosetting" element={<SettingPage />} />
        <Route path="/forgot-password" element={<FindPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
