import { useState } from 'react';
import type { Todo } from './types';
import TodoTable from './TodoTable';

function TodoList() {
  const [todo, setTodo] = useState<Todo>({description: '', date: '', priority: 'low'});
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const addTodo = () => {
    if (!todo.description || !todo.date) {
      alert('Please fill in all fields');
      return;
    }

    setTodos([todo, ...todos]);
    setTodo({description: '', date: '', priority: 'low'});
  };

  return(
    <>
      <h3>My Todos</h3>  
      <input 
        placeholder="Description" 
        onChange={event => setTodo({...todo, description: event.target.value})} 
        value={todo.description} 
      />
      <input 
        placeholder="Date"
        onChange={event => setTodo({...todo, date: event.target.value})} 
        value={todo.date} 
      />
      <select
        title="Priority"
        onChange={event => setTodo({...todo, priority: event.target.value as 'low' | 'medium' | 'high'})} 
        value={todo.priority} 
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button onClick={addTodo}>Add</button>  
      <TodoTable todos={todos} /> 
     </>
  );

}

export default TodoList;