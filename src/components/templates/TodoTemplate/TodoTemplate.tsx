import React from 'react';
import { Text } from '@/components/atoms/Text/Text';
import { TodoInput } from '@/components/organisms/TodoInput/TodoInput';
import { TodoList } from '@/components/organisms/TodoList/TodoList';
import { TodoFooter } from '@/components/organisms/TodoFooter/TodoFooter';
import { Todo } from '@/types/todo';
import './TodoTemplate.css';

interface TodoTemplateProps {
  todos: Todo[];
  onAddTodo: (text: string) => void;
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  onClearCompleted: () => void;
}

export const TodoTemplate: React.FC<TodoTemplateProps> = ({
  todos,
  onAddTodo,
  onToggleTodo,
  onDeleteTodo,
  onClearCompleted,
}) => {
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="todo-template">
      <header className="todo-template__header">
        <Text variant="heading">やることリスト</Text>
      </header>
      <TodoInput onAdd={onAddTodo} />
      <TodoList
        todos={todos}
        onToggle={onToggleTodo}
        onDelete={onDeleteTodo}
      />
      <TodoFooter
        totalCount={todos.length}
        completedCount={completedCount}
        onClearCompleted={onClearCompleted}
      />
    </div>
  );
};

