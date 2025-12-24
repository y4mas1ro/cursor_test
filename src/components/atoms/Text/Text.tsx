import React from 'react';
import './Text.css';

interface TextProps {
  children: React.ReactNode;
  variant?: 'default' | 'muted' | 'heading';
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const baseClass = `text text--${variant}`;
  
  if (variant === 'heading') {
    return <h1 className={`${baseClass} ${className}`}>{children}</h1>;
  }
  
  return <span className={`${baseClass} ${className}`}>{children}</span>;
};

