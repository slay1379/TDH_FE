import React, { useState } from 'react';
import './TodoPageMain.css';
import { FaCheckSquare, FaSquare, FaClock, FaCog } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid'; 
import { useNavigate } from 'react-router-dom';

const initialTasks = [
  { id: uuidv4(), complete: false, name: "[고양이] 고양이 똥 치우기", label: "고양이", notes: "", delayCycle: "Delay 1 Cycle", delayDay: "Delay 1 Day" },
  { id: uuidv4(), complete: true, name: "[주방] 설거지", label: "설거지", notes: "", delayCycle: "Delay 1 Cycle", delayDay: "Delay 1 Day" },
  { id: uuidv4(), complete: true, name: "[주방] 상판 닦기", label: "상판 닦기", notes: "", delayCycle: "Delay 1 Cycle", delayDay: "Delay 1 Day" },
  { id: uuidv4(), complete: true, name: "[주방] 주방 아일랜드 위 정리", label: "아일랜드", notes: "", delayCycle: "Delay 1 Cycle", delayDay: "Delay 1 Day" }
];

function TodoPageMain() {
  const [tasks, setTasks] = useState(initialTasks);
  const navigate = useNavigate();

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task,i) =>
      i === index ? { ...task, complete: !task.complete } : task
    );
    setTasks(updatedTasks);
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
                <td>{task.label}</td>
                <td>{task.notes}</td>
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
                <td>{task.label}</td>
                <td>{task.notes}</td>
                <td><button className="delayCycle-button"><FaClock className='delaybutton-icon' />{task.delayCycle}</button></td>
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
