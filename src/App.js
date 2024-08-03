import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';
import SignupPage from './pages/SignupPage';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/todos" element={<TodoPage />} />
                    <Route path="/signup" element={<SignupPage/>} />
                    <Route path="/" element={<LoginPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
