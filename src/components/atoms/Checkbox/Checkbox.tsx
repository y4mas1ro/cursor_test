import type { FC, InputHTMLAttributes, ChangeEvent } from 'react';
import './Checkbox.css';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: FC<CheckboxProps> = ({
  className = '',
  ...props
}) => {
  return (
    <input
      type="checkbox"
      className={`checkbox ${className}`}
      {...props}
    />
  );
};

