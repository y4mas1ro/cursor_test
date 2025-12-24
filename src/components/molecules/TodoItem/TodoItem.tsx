import type { FC } from 'react';
import { Todo } from '@/types/todo';
import { Checkbox } from '@/components/atoms/Checkbox/Checkbox';
import { Button } from '@/components/atoms/Button/Button';
import { Text } from '@/components/atoms/Text/Text';
import './TodoItem.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoItem: FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
}) => {
  return (
    <li className={`todo-item ${todo.completed ? 'todo-item--completed' : ''}`}>
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <Text
        variant={todo.completed ? 'muted' : 'default'}
        className={`todo-item__text ${todo.completed ? 'todo-item__text--completed' : ''}`}
      >
        {todo.text}
      </Text>
      <Button
        variant="danger"
        onClick={() => onDelete(todo.id)}
        className="todo-item__delete"
      >
        削除
      </Button>
    </li>
  );
};

