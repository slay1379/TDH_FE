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

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, complete: !task.complete } : task
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
            {tasks.filter(task => !task.complete).map((task, index) => (
              <tr key={index}>
                <td>
                  <button className={`status-main ${task.complete ? 'complete' : 'incomplete'}`} onClick={() => toggleComplete(index)}>
                    <span className="status-icon">
                      {task.complete ? <FaCheckSquare /> : <FaSquare />}
                    </span>
                    {task.complete ? "완료" : "미완료"}
                  </button>
                </td>
                <td>{task.name}</td> {/* name을 Label로 표시 */}
                <td>{task.category}</td> {/* category를 Notes로 표시 */}
                <td><button className="delayCycle-button"><FaClock className='delaybutton-icon' />{task.delayCycle}</button></td>
                <td><button className="delayDay-button"><FaClock className='delaybutton-icon' />{task.delayDay}</button></td>
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
            {tasks.filter(task => task.complete).map((task, index) => (
              <tr key={index}>
                <td>
                  <button className={`status-main ${task.complete ? 'complete' : 'incomplete'}`} onClick={() => toggleComplete(index)}>
                    <span className="status-icon">
                      {task.complete ? <FaCheckSquare /> : <FaSquare />}
                    </span>
                    {task.complete ? "완료" : "미완료"}
                  </button>
                </td>
                <td>{task.name}</td> {/* name을 Label로 표시 */}
                <td>{task.category}</td> {/* category를 Notes로 표시 */}
                <td><button className="delayCycle-button"><FaClock className='delaybutton-icon' />clcye</button></td>
                <td><button className="delayDay-button"><FaClock className='delaybutton-icon' />{task.delayDay}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TodoPageMain;
