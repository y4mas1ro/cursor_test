import React from 'react';
import './Checkbox.css';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
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

