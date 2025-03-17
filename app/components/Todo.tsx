'use client';

import { useState } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function Todo() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'プロジェクトの計画を立てる', completed: false },
    { id: 2, text: 'デザインを作成する', completed: true },
    { id: 3, text: 'コードを実装する', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    
    const task: Task = {
      id: Date.now(),
      text: newTask,
      completed: false
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleComplete = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="w-full">
      <div className="mb-4 overflow-y-auto max-h-[60vh]">
        <h2 className="text-xl font-bold mb-4">タスク一覧</h2>
        <ul className="space-y-2">
          {tasks.map(task => (
            <li key={task.id} className="flex items-center justify-between p-3 bg-white rounded-lg shadow text-gray-800">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  className="mr-3 h-5 w-5"
                />
                <span className={task.completed ? 'line-through text-gray-300' : ''}>
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="hover:font-bold px-2"
                aria-label="削除"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="sticky bottom-0 bg-gray-50 p-4 rounded-t-lg shadow-md">
        <form onSubmit={addTask} className="flex">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="新しいタスクを入力..."
            className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors"
          >
            +
          </button>
        </form>
      </div>
    </div>
  );
} 