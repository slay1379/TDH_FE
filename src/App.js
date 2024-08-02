import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return(
    <Router>
      <div className='app'>
        <div className='main-content'>
          <Routes>
            <Route path='/login' element={<LoginPage onLogin={handleLogin} />}/>
            <Route path='/todos' element={isAuthenticated ? <TodoPage /> : <Navigate to='/login'/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;