
import React, { useState, useMemo } from 'react';
import { CheckCircleIcon, TrashIcon } from '../assets/icons';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const FilterButton: React.FC<{active: boolean, onClick:() => void, children: React.ReactNode}> = ({active, onClick, children}) => (
    <button onClick={onClick} className={`px-3 py-1 text-sm rounded-md ${active ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>
        {children}
    </button>
);

const ToDo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() === '') return;
    const newTodo: Todo = {
      id: Date.now(),
      text: inputText.trim(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputText('');
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
      setTodos(todos.filter(todo => !todo.completed));
  }
  
  const filteredTodos = useMemo(() => {
      return todos.filter(todo => {
          if (filter === 'active') return !todo.completed;
          if (filter === 'completed') return todo.completed;
          return true;
      });
  }, [todos, filter]);

  const hasCompleted = useMemo(() => todos.some(t => t.completed), [todos]);

  return (
    <div className="h-full w-full flex flex-col bg-[#202020] text-white">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h1 className="text-xl font-semibold">My To-Do List</h1>
        <div className="flex items-center gap-2">
            <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>All</FilterButton>
            <FilterButton active={filter === 'active'} onClick={() => setFilter('active')}>Active</FilterButton>
            <FilterButton active={filter === 'completed'} onClick={() => setFilter('completed')}>Completed</FilterButton>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        {filteredTodos.length === 0 ? (
          <p className="text-gray-500 text-center p-8">
              {filter === 'all' && "Your list is empty. Add a task below!"}
              {filter === 'active' && "No active tasks."}
              {filter === 'completed' && "No completed tasks."}
          </p>
        ) : (
          <ul className="p-4">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className="flex items-center justify-between p-3 mb-2 bg-[#2b2b2b] rounded-lg group"
              >
                <div className="flex items-center gap-3">
                  <button onClick={() => toggleTodo(todo.id)}>
                    {todo.completed ? (
                      <CheckCircleIcon className="w-6 h-6 text-green-500" />
                    ) : (
                      <div className="w-6 h-6 border-2 border-gray-500 rounded-full hover:border-blue-400 transition-colors"></div>
                    )}
                  </button>
                  <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {hasCompleted && (
          <div className="p-2 border-t border-gray-700 text-center">
              <button onClick={clearCompleted} className="text-sm text-blue-400 hover:underline">Clear completed tasks</button>
          </div>
      )}
      <form onSubmit={handleAddTodo} className="p-4 border-t border-gray-700 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Add a new task..."
          className="w-full bg-gray-700 text-white p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          Add
        </button>
      </form>
    </div>
  );
};

export default ToDo;