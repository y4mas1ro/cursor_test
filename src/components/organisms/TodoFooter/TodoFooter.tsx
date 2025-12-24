import React from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { Text } from '@/components/atoms/Text/Text';
import './TodoFooter.css';

interface TodoFooterProps {
  totalCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export const TodoFooter: React.FC<TodoFooterProps> = ({
  totalCount,
  completedCount,
  onClearCompleted,
}) => {
  return (
    <div className="todo-footer">
      <Button variant="secondary" onClick={onClearCompleted}>
        完了済みを削除
      </Button>
      <Text variant="muted">
        タスク: {totalCount} (完了: {completedCount})
      </Text>
    </div>
  );
};

