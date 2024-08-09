import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SettingPage.css';
import { FaCheckSquare, FaSquare, FaPlus, FaSearch, FaTrash, FaEdit, FaSave } from 'react-icons/fa';

const categories = ["거실", "발코니", "욕실", "기타"];

function SettingPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: "", category: "", frequency: "", notes: "" });
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [editTask, setEditTask] = useState({ name: "", category: "", frequency: "", notes: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split('T')[0];
  }

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map(task => {
        if (task.id === id){
            return { ...task, complete: !task.complete };
        }
        return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prev) => {
        const updatedTask = {...prev, [name]: value};
        const lastDate = updatedTask.lastDate;
        let nextDate = '';
        if (lastDate && !isNaN(Date.parse(lastDate))){
            nextDate = addDays(lastDate, parseInt(updatedTask.frequency,10));
        }
        return{
            ...updatedTask,
            nextDate
        };
    });
  };

  const addNewTask = () => {
    const currentDate = getCurrentDate();
    const nextDate = addDays(currentDate, parseInt(newTask.frequency, 10));
    const newId = Date.now().toString();
    setTasks([...tasks, {...newTask, id: newId, complete: false, lastDate: currentDate, nextDate}]);
    setNewTask({name: "", category: "", frequency: "", notes: ""});
    setShowNewTaskForm(false);
  };

  const cancelNewTask = () => {
    setNewTask({ name: "", category: "", frequency: "", notes: "" });
    setShowNewTaskForm(false);
  };

  const handleConfirm = () => {
    navigate('/todomain');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const startEditingTask = (index) => {
    setEditTaskIndex(index);
    setEditTask({
        ...tasks[index],
        nextDate: addDays(tasks[index].lastDate, parseInt(tasks[index].frequency, 10))
    });
  };

  const saveTask = () => {
    const updatedTasks = tasks.map((task, i) => 
      i === editTaskIndex ? editTask : task
    );
    setTasks(updatedTasks);
    setEditTaskIndex(null);
    setEditTask({ name: "", category: "", frequency: "", notes: "" ,lastDate: ""});
  };

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className='setting-search-container'>
        <FaSearch className='setting-search-icon'/>
        <input 
          type='text' 
          className='setting-search-input' 
          placeholder='Search...'
          value={searchTerm}
          onChange={handleSearch}
        />
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
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task, index) => (
            <tr key={task.id}>
              <td data-label="Complete">
                <button className={`status-setting ${task.complete ? 'complete' : 'incomplete'}`} onClick={() => toggleComplete(task.id)}>
                  <span className='status-icon'>
                    {task.complete ? <FaCheckSquare /> : <FaSquare />}
                  </span>
                  {task.complete ? "완료" : "미완료"}
                </button>
              </td>
              {editTaskIndex === index ? (
                <>
                  <td data-label="Name">
                    <input type="text" name="name" value={editTask.name} onChange={handleEditInputChange} />
                  </td>
                  <td data-label="Category">
                    <select name="category" value={editTask.category} onChange={handleEditInputChange}>
                      {categories.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </td>
                  <td data-label="Frequency">
                    <input type="number" name="frequency" value={editTask.frequency} onChange={handleEditInputChange} />
                  </td>
                  <td data-label="Notes">
                    <input type="text" name="notes" value={editTask.notes} onChange={handleEditInputChange} />
                  </td>
                  <td data-label="Last Date">
                    <input type='date' name='lastDate' value={editTask.lastDate} onChange={handleEditInputChange}/>
                  </td>
                  <td data-label="Next Date">{editTask.nextDate}</td>
                  <td data-label="수정">
                    <button className='save-task-button' onClick={saveTask}>
                      <FaSave />
                    </button>
                  </td>
                  <td data-label="삭제">
                    <button className='delete-task-button' onClick={() => deleteTask(index)}>
                      <FaTrash />
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td data-label="Name">{task.name}</td>
                  <td data-label="Category" className={`category ${task.category}`}>{task.category}</td>
                  <td data-label="Frequency">{task.frequency}</td>
                  <td data-label="Notes">{task.notes}</td>
                  <td data-label="Last Date">{task.lastDate}</td>
                  <td data-label="Next Date">{task.nextDate}</td>
                  <td data-label="수정">
                    <button className='edit-task-button' onClick={() => startEditingTask(index)}>
                      <FaEdit />
                    </button>
                  </td>
                  <td data-label="삭제">
                    <button className='delete-task-button' onClick={() => deleteTask(index)}>
                      <FaTrash />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
          {showNewTaskForm && (
            <tr>
              <td></td>
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
              <td>
                <input type='text' name='notes' value={newTask.notes} onChange={handleInputChange} placeholder='Notes'/>
              </td>
              <td colSpan="2">
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