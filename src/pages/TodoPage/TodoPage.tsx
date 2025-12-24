import { useState, useEffect, type FC } from 'react';
import { Todo } from '@/types/todo';
import { TodoTemplate } from '@/components/templates/TodoTemplate/TodoTemplate';
import { todoAPI } from '@/utils/api';

export const TodoPage: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 初期データの読み込み
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await todoAPI.getAll();
        setTodos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load todos');
        console.error('Error loading todos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async (text: string) => {
    try {
      setError(null);
      const newTodo = await todoAPI.create(text);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add todo');
      console.error('Error adding todo:', err);
    }
  };

  const handleToggleTodo = async (id: number) => {
    try {
      setError(null);
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      const updatedTodo = await todoAPI.update(id, {
        completed: !todo.completed,
      });
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === id ? updatedTodo : t))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      setError(null);
      await todoAPI.delete(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
      console.error('Error deleting todo:', err);
    }
  };

  const handleClearCompleted = async () => {
    try {
      setError(null);
      const completedTodos = todos.filter((todo) => todo.completed);
      await Promise.all(completedTodos.map((todo) => todoAPI.delete(todo.id)));
      setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear completed todos');
      console.error('Error clearing completed todos:', err);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#667eea' }}>
        読み込み中...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#ff6b6b' }}>
        エラー: {error}
      </div>
    );
  }

  return (
    <TodoTemplate
      todos={todos}
      onAddTodo={handleAddTodo}
      onToggleTodo={handleToggleTodo}
      onDeleteTodo={handleDeleteTodo}
      onClearCompleted={handleClearCompleted}
    />
  );
};

