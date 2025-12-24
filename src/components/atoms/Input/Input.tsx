import type { FC, InputHTMLAttributes } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: FC<InputProps> = ({
  className = '',
  ...props
}) => {
  return (
    <input
      className={`input ${className}`}
      {...props}
    />
  );
};

