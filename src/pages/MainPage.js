import React, { useState, useEffect, useRef } from 'react';
import '../styles/MainPage.css';
import { FaCheckSquare, FaSquare, FaClock, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function TodoPageMain() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const today = getCurrentDate();
    
    if (savedTasks) {
      let loadedTasks = JSON.parse(savedTasks);

      if (isFirstLoad.current) {
        loadedTasks = loadedTasks.map(task => {
          if (task.lastDate === today && task.complete) {
            return { ...task, complete: false };
          }
          return task;
        });
        isFirstLoad.currnet = false;
        setTasks(loadedTasks);
        localStorage.setItem('tasks', JSON.stringify(loadedTasks));
      } else {
        setTasks(loadedTasks);
      }
    }
  }, []);

  const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split('T')[0];
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, complete: !task.complete };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const delayCycle = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        const frequency = parseInt(task.frequency, 10) || 1;
        const newLastDate = addDays(task.lastDate, frequency);
        const newNextDate = addDays(newLastDate, frequency);
        return { ...task, lastDate: newLastDate, nextDate: newNextDate };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const delayDay = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        const newLastDate = addDays(task.lastDate, 1);
        const frequency = parseInt(task.frequency, 10) || 1;
        const newNextDate = addDays(newLastDate, frequency);
        return { ...task, lastDate: newLastDate, nextDate: newNextDate };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const goToSettings = () => {
    navigate('/todosetting');
  };

  const handleLogout = () => {
    // 로그아웃 로직
    navigate('/login');
  }

  const renderTaskRow = (task) => (
    <tr key={task.id}>
      <td>
        <button className={`status-main ${task.complete ? 'complete' : 'incomplete'}`} onClick={() => toggleComplete(task.id)}>
          <span className="status-icon">
            {task.complete ? <FaCheckSquare /> : <FaSquare />}
          </span>
          {task.complete ? "완료" : "미완료"}
        </button>
      </td>
      <td>{`[${task.category}] ${task.name}`}</td>
      <td>{task.notes}</td>
      <td><button className="delayCycle-button" onClick={() => delayCycle(task.id)}><FaClock className='delaybutton-icon' />Delay 1 Cycle</button></td>
      <td><button className="delayDay-button" onClick={() => delayDay(task.id)}><FaClock className='delaybutton-icon' />Delay 1 Day</button></td>
    </tr>
  );

  const today = getCurrentDate();

  return (
    <div className="todo-main-container">
      <h1 className="todo-main-title">집안일</h1>

      <div className='header-right'>
        <button className='logout-button' onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="section">
        <h2 className="section-title">
          <span role="img" aria-label="fire">🔥</span> 오늘 할 일
          <button className='go-to-setting-button' onClick={goToSettings}>
            <FaCog />
          </button>
        </h2>
        <table className="todo-main-table">
          <thead>
            <tr>
              <th>Complete</th>
              <th>Housework</th>
              <th>Notes</th>
              <th>Delay 1 Cycle</th>
              <th>Delay 1 Day</th>
            </tr>
          </thead>
          <tbody>
            {tasks.filter(task => task.lastDate === today && !task.complete).map(renderTaskRow)}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2 className="section-title"><span role="img" aria-label="checkmark">✅</span> 오늘 한 일</h2>
        <table className="todo-main-table">
          <thead>
            <tr>
              <th>Complete</th>
              <th>HouseWork</th>
              <th>Notes</th>
              <th>Delay 1 Cycle</th>
              <th>Delay 1 Day</th>
            </tr>
          </thead>
          <tbody>
            {tasks.filter(task => task.lastDate === today && task.complete).map(renderTaskRow)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TodoPageMain;
