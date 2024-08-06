import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SettingPage.css';
import { FaCheckSquare, FaSquare, FaPlus } from 'react-icons/fa';

const categories = ["거실", "발코니", "욕실", "기타"];

function SettingPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: "", category: "", frequency: "" });
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0){
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, complete: !task.complete } : task
    );
    setTasks(updatedTasks);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const addNewTask = () => {
    setTasks([...tasks, { ...newTask, complete: false, notes: "", lastDate: "", nextDate: "" }]);
    setNewTask({ name: "", category: "", frequency: "" });
    setShowNewTaskForm(false);
  };

  const cancelNewTask = () => {
    setNewTask({ name: "", category: "", frequency: "" });
    setShowNewTaskForm(false);
  };

  const handleConfirm = () => {
    navigate('/todomain');
  };

  return (
    <div className='todo-setting-container'>
      <h1 className='todo-setting-title'>모든 일</h1>
      <div className='setting-button-container'>
        <button className='new-task-button' onClick={() => setShowNewTaskForm(!showNewTaskForm)}>
          <FaPlus /> New
        </button>
        <button className='setting-confirm-button' onClick={handleConfirm}>
          확인
        </button>
      </div>
      <table className='todo-setting-table'>
        <thead>
          <tr>
            <th>Complete</th>
            <th>Name</th>
            <th>Category</th>
            <th>Frequency</th>
            <th>Notes</th>
            <th>Last Date</th>
            <th>Next Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td className={`status-setting ${task.complete ? 'complete' : 'incomplete'}`} onClick={() => toggleComplete(index)}>
                <span className='status-icon'>
                  {task.complete ? <FaCheckSquare /> : <FaSquare />}
                </span>
                {task.complete ? "완료" : "미완료"}
              </td>
              <td>{task.name}</td>
              <td className={`category ${task.category}`}>{task.category}</td>
              <td>{task.frequency}</td>
              <td>{task.notes}</td>
              <td>{task.lastDate}</td>
              <td>{task.nextDate}</td>
            </tr>
          ))}
          {showNewTaskForm && (
            <tr>
              <td className='status-setting incomplete'>
                <span className='status-icon'><FaSquare /></span>
                미완료
              </td>
              <td>
                <input type="text" name="name" value={newTask.name} onChange={handleInputChange} placeholder='Task Name' />
              </td>
              <td>
                <select name="category" value={newTask.category} onChange={handleInputChange}>
                  <option value="">Select Category</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </td>
              <td>
                <input type="number" name="frequency" value={newTask.frequency} onChange={handleInputChange} placeholder='Frequency' />
              </td>
              <td colSpan="3">
                <button className='setting-add-task-button' onClick={addNewTask}>Add Task</button>
                <button className='setting-cancel-task-button' onClick={cancelNewTask}>Cancel</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SettingPage;
