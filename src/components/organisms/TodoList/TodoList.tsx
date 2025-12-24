import React from 'react';
import { Todo } from '@/types/todo';
import { TodoItem } from '@/components/molecules/TodoItem/TodoItem';
import { Text } from '@/components/atoms/Text/Text';
import './TodoList.css';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
}) => {
  if (todos.length === 0) {
    return (
      <div className="todo-list-empty">
        <Text variant="muted">
          タスクがありません。新しいタスクを追加してください。
        </Text>
      </div>
    );
  }

  return (
    <div className="todo-list-container">
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};

