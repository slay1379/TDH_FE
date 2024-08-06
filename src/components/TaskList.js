import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, toggleComplete, delayCycle, delayDay }){
    return(
        <table className='todo-main-table'>
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
                {tasks.map((task, index) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        toggleComplete={() => toggleComplete(index)}
                        delayCycle={delayCycle}
                        delayDay={delayDay}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default TaskList;