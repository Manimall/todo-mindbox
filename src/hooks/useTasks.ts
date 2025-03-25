import { useState } from 'react';
import { Task } from '../types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [idCounter, setIdCounter] = useState(1);

  const addTask = (text: string) => {
    if (!text.trim()) return;
    const newId = `task-${idCounter}`;
    setTasks(prev => [
      ...prev,
      {
        id: newId,
        text,
        completed: false
      }
    ]);
    setIdCounter(idCounter + 1);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return { tasks, addTask, toggleTask, deleteTask };
};
