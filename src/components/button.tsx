/**
 * Componente Button
 * 
 * Um botão estilizado com diferentes variantes.
 */

import { ButtonHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

export function Button({ 
  children, 
  className, 
  variant = 'primary', 
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg font-medium transition-colors',
        {
          'bg-blue-600 hover:bg-blue-700 text-white': variant === 'primary',
          'bg-gray-600 hover:bg-gray-700 text-white': variant === 'secondary',
          'bg-red-600 hover:bg-red-700 text-white': variant === 'danger',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}