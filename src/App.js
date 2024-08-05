import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TodoPageMain from './pages/TodoPageMain';
import SignupPage from './pages/SignupPage';
import TodoPageSetting from './pages/TodoPageSetting';

const initialTasks = [
    {complete: true, name: "아일랜드 위 전기주전자, 커피머신 닦기", category: "거실", frequency: 7, notes: "", lastDate: "", nextDate: ""},
    {complete: true, name: "식물 물주기", category: "발코니", frequency: 7, notes: "", lastDate: "", nextDate: ""}
];


function App() {
    const [tasks, setTasks] = useState(initialTasks);

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/todosetting" element={<TodoPageSetting tasks={tasks} setTasks={setTasks} />} />
                    <Route path="/todomain" element={<TodoPageMain tasks={tasks} />} />
                    <Route path="/signup" element={<SignupPage/>} />
                    <Route path="/" element={<LoginPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
