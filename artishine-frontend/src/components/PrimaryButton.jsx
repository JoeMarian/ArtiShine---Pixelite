import React from 'react';

const PrimaryButton = ({
  children,
  onClick,
  className = '',
  variant = 'terracotta',
  size = 'md',
  disabled = false,
  icon,
  type = 'button',
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    terracotta: 'btn-terracotta',
    wood: 'btn-wood',
    outline: 'btn-outline-terracotta',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default PrimaryButton;


