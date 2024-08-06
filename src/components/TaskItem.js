import React from 'react';
import { FaCheckSquare, FaSquare, FaClock } from 'react-icons/fa';

function TaskItem({ task, toggleComplete, delayCycle, delayDay }) {
  return (
    <tr>
      <td>
        <button className={`status-main ${task.complete ? 'complete' : 'incomplete'}`} onClick={toggleComplete}>
          <span className="status-icon">
            {task.complete ? <FaCheckSquare /> : <FaSquare />}
          </span>
          {task.complete ? "완료" : "미완료"}
        </button>
      </td>
      <td>{task.label}</td>
      <td>{task.notes}</td>
      <td><button className="delayCycle-button" onClick={delayCycle}><FaClock className='delaybutton-icon' />{task.delayCycle}</button></td>
      <td><button className="delayDay-button" onClick={delayDay}><FaClock className='delaybutton-icon' />{task.delayDay}</button></td>
    </tr>
  );
}

export default TaskItem;
