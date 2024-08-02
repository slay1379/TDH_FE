import React from 'react';
import TodoList from '../components/TodoList';

function TodoPage() {
  return (
    <div className="todo-page">
      <h1>To do 집안일</h1>
      <TodoList />
    </div>
  );
}

export default TodoPage;
