import React from 'react';

function TodoList() {
  const todos = [
    { id: 1, status: '완료', task: '주방 대청소', category: '주방', delay: '1주기', period: '1일' },
    { id: 2, status: '완료', task: '분리수거 하기', category: '기타', delay: '1주기', period: '1일' },
    { id: 3, status: '미완료', task: '화장실 대청소', category: '화장실', delay: '1주기', period: '1일' },
  ];

  return (
    <table className="todo-table">
      <thead>
        <tr>
          <th>완료 여부</th>
          <th>할 일</th>
          <th>카테고리</th>
          <th>미루기</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <tr key={todo.id}>
            <td>{todo.status}</td>
            <td>{todo.task}</td>
            <td className={`category ${todo.category}`}>{todo.category}</td>
            <td>{todo.delay}</td>
            <td>{todo.period}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TodoList;
