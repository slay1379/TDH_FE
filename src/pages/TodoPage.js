import React from 'react';
import './TodoPage.css';
import { FaCheckSquare, FaSquare } from 'react-icons/fa'; // 체크박스 아이콘 사용

const tasks = [
    { complete: true, name: "아일랜드 위 전기주전자, 커피머신 닦기", category: "거실", frequency: 7, notes: "", lastDate: "", nextDate: "" },
    { complete: true, name: "소파 찍찍이", category: "거실", frequency: 7, notes: "", lastDate: "", nextDate: "" },
    // 추가적인 task 데이터
];

function TodoPage() {
    return (
        <div className="todo-container">
            <h1 className="todo-title">모든 일</h1>
            <table className="todo-table">
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
                            <td className={`status ${task.complete ? 'complete' : 'incomplete'}`}>
                                <span className="status-icon">
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
                </tbody>
            </table>
        </div>
    );
}

export default TodoPage;
