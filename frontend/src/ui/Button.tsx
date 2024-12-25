import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'outline' | 'filled';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'filled',
}) => {
  const baseClasses = 'px-4 py-2 rounded-md transition-all duration-200 font-medium';
  const outlineClasses = 'border border-[#3366FF] text-[#3366FF] hover:bg-[#3366FF] hover:text-white';
  const filledClasses = 'bg-[#3366FF] text-white hover:bg-blue-600';

  const variantClasses = variant === 'outline' ? outlineClasses : filledClasses;

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
};
