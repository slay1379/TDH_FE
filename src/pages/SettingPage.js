import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SettingPage.css';
import { FaCheckSquare, FaSquare, FaPlus, FaSearch, FaSort, FaTrash } from 'react-icons/fa';

const categories = ["거실", "발코니", "욕실", "기타"];

function SettingPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: "", category: "", frequency: "", notes: "" });
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
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
    const currentDate = new Date().toISOString().split('T')[0];
    setTasks([...tasks, { ...newTask, complete: false, lastDate: currentDate, nextDate: currentDate }]);
    setNewTask({ name: "", category: "", frequency: "", notes: "" });
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
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedTasks = React.useMemo(() => {
    let sortableTasks = [...filteredTasks];
    if (sortConfig.key !== null) {
      sortableTasks.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableTasks;
  }, [filteredTasks, sortConfig]);

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
            <th onClick={() => requestSort('name')}>Name <FaSort /></th>
            <th onClick={() => requestSort('category')}>Category <FaSort /></th>
            <th onClick={() => requestSort('frequency')}>Frequency <FaSort /></th>
            <th>Notes</th>
            <th onClick={() => requestSort('lastDate')}>Last Date <FaSort /></th>
            <th onClick={() => requestSort('nextDate')}>Next Date <FaSort /></th>
            <th>Delete</th> {/* Delete 칸 추가 */}
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task, index) => (
            <tr key={index}>
              <td data-label="Complete">
                <button className={`status-setting ${task.complete ? 'complete' : 'incomplete'}`} onClick={() => toggleComplete(index)}>
                  <span className='status-icon'>
                    {task.complete ? <FaCheckSquare /> : <FaSquare />}
                  </span>
                  {task.complete ? "완료" : "미완료"}
                </button>
              </td>
              <td data-label="Name">{task.name}</td>
              <td data-label="Category" className={`category ${task.category}`}>{task.category}</td>
              <td data-label="Frequency">{task.frequency}</td>
              <td data-label="Notes">{task.notes}</td>
              <td data-label="Last Date">{task.lastDate}</td>
              <td data-label="Next Date">{task.nextDate}</td>
              <td data-label="Delete">
                <button className='delete-task-button' onClick={() => deleteTask(index)}>
                  <FaTrash />
                </button>
              </td> {/* 삭제 버튼 추가 */}
            </tr>
          ))}
          {showNewTaskForm && (
            <tr>
              <td className='status-setting incomplete'></td>
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
