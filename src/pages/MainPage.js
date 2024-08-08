import React, { useState, useEffect } from 'react';
import '../styles/MainPage.css';
import { FaCheckSquare, FaSquare, FaClock, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function TodoPageMain() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, complete: !task.complete } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const goToSettings = () => {
    navigate('/todosetting');
  };

  return (
    <div className="todo-main-container">
      <h1 className="todo-main-title">집안일</h1>

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
              <th>Label</th>
              <th>Notes</th>
              <th>Delay 1 Cycle</th>
              <th>Delay 1 Day</th>
            </tr>
          </thead>
          <tbody>
            {tasks.filter(task => !task.complete).map((task) => (
              <tr key={task.id}>
                <td>
                  <button className={`status-main ${task.complete ? 'complete' : 'incomplete'}`} onClick={() => toggleComplete(task.id)}>
                    <span className="status-icon">
                      {task.complete ? <FaCheckSquare /> : <FaSquare />}
                    </span>
                    {task.complete ? "완료" : "미완료"}
                  </button>
                </td>
                <td>{task.name}</td>
                <td>{task.category}</td>
                <td><button className="delayCycle-button"><FaClock className='delaybutton-icon' />Delay 1 Cycle{task.delayCycle}</button></td>
                <td><button className="delayDay-button"><FaClock className='delaybutton-icon' />Delay 1 Day{task.delayDay}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2 className="section-title"><span role="img" aria-label="checkmark">✅</span> 오늘 한 일</h2>
        <table className="todo-main-table">
          <thead>
            <tr>
              <th>Complete</th>
              <th>Label</th>
              <th>Notes</th>
              <th>Delay 1 Cycle</th>
              <th>Delay 1 Day</th>
            </tr>
          </thead>
          <tbody>
            {tasks.filter(task => task.complete).map((task) => (
              <tr key={task.id}>
                <td>
                  <button className={`status-main ${task.complete ? 'complete' : 'incomplete'}`} onClick={() => toggleComplete(task.id)}>
                    <span className="status-icon">
                      {task.complete ? <FaCheckSquare /> : <FaSquare />}
                    </span>
                    {task.complete ? "완료" : "미완료"}
                  </button>
                </td>
                <td>{task.name}</td>
                <td>{task.category}</td>
                <td><button className="delayCycle-button"><FaClock className='delaybutton-icon' />Delay 1 Cycle{task.delayCycle}</button></td>
                <td><button className="delayDay-button"><FaClock className='delaybutton-icon' />Delay 1 Day{task.delayDay}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TodoPageMain;
