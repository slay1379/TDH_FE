import React, { useState } from 'react';
import './TodoPageSetting.css';
import { FaCheckSquare, FaSquare, FaPlus } from 'react-icons/fa';

const categories = ["거실","발코니","욕실","기타"];

function TodoPageSetting({ tasks, setTasks }){
    const [newTask, setNewTask] = useState({ name: "", category: "", frequency: ""});
    const [showNewTaskForm, setShowNewTaskForm] = useState(false);

    const toggleComplete = (index) => {
        const updatedTasks = tasks.map((task,i) =>
            i === index ? { ...task, complete: !task.complete } : task
        );
        setTasks(updatedTasks);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask((prev) => ({ ...prev, [name]: value }));
    };

    const addNewTask = () => {
        setTasks([...tasks, {...newTask, complete: false, notes: "", lastDate: "", nextDate: ""}]);
        setNewTask({name: "", category: "", frequency: ""});
        setShowNewTaskForm(false);
    };

    const cancelNewTask = () => {
        setNewTask({ name: "", category: "", frequency: "" });
        setShowNewTaskForm(false);
    };

    return(
        <div className='todo-setting-container'>
            <h1 className='todo-setting-title'>모든 일</h1>
            <button className='new-task-button' onClick={() => setShowNewTaskForm(!showNewTaskForm)}>
                <FaPlus /> New
            </button>
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
                                    {categories.map((cat,idx) => (
                                        <option key={idx} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <input type="number" name="frequency" value={newTask.frequency} onChange={handleInputChange} placeholder='Frequency' />
                            </td>
                            <td cloSpan="3">
                                <button onClick={addNewTask}>Add Task</button>
                                <button onClick={cancelNewTask} style={{marginleft: '10px', backgroundColor: 'red', color: 'white'}}>Cancel</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default TodoPageSetting;