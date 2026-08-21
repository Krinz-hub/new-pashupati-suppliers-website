import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonVariant } from '../../types';
import { cn } from '../../utils/helpers';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  to,
  href,
  target,
  rel,
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none select-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs sm:text-sm px-3.5 py-2 gap-1.5 min-h-[38px]',
    md: 'text-sm sm:text-base px-5 py-2.5 gap-2 min-h-[44px]',
    lg: 'text-base sm:text-lg px-6 py-3.5 gap-2.5 min-h-[48px]',
  };

  const variantStyles = {
    primary: 'bg-brandRed text-white hover:bg-brandRed-hover shadow-sm hover:shadow focus-visible:ring-brandRed',
    secondary: 'bg-navy text-white hover:bg-navy-light shadow-sm hover:shadow focus-visible:ring-navy',
    outline: 'bg-transparent text-navy border border-navy/80 hover:bg-navy hover:text-white focus-visible:ring-navy',
    dark: 'bg-navy-dark text-white hover:bg-navy border border-navy-light shadow-sm focus-visible:ring-white',
    ghost: 'bg-transparent text-navy hover:bg-navy/5 focus-visible:ring-navy',
  };

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    fullWidth ? 'w-full' : '',
    className
  );

  const content = (
    <>
      {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
      {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} aria-disabled={disabled || isLoading}>
        {content}
      </Link>
    );
  }

  if (href) {
    const isExternal = href.startsWith('http');
    return (
      <a
        href={href}
        className={combinedClasses}
        aria-disabled={disabled || isLoading}
        target={target !== undefined ? target : (isExternal ? '_blank' : undefined)}
        rel={rel !== undefined ? rel : (isExternal ? 'noopener noreferrer' : undefined)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </button>
  );
};
