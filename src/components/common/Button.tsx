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
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-[24px] transition-all duration-[180ms] ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none select-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5 min-h-[36px]',
    md: 'text-sm px-5 py-2.5 gap-2 min-h-[42px]',
    lg: 'text-base px-6 py-3.5 gap-2.5 min-h-[48px]',
  };

  const variantStyles = {
    primary: 'bg-[#F58220] text-white hover:bg-[#E97516] shadow-xs hover:shadow focus-visible:ring-[#F58220]',
    secondary: 'bg-white text-[#171717] border border-[#EEEEF0] hover:bg-[#F8F8F9] hover:border-slate-300 shadow-xs focus-visible:ring-[#09132F]',
    outline: 'bg-transparent text-[#09132F] border border-[#EEEEF0] hover:border-[#09132F] hover:bg-[#F8F8F9] focus-visible:ring-[#09132F]',
    dark: 'bg-[#09132F] text-white hover:bg-[#132147] border border-transparent shadow-xs focus-visible:ring-[#09132F]',
    ghost: 'bg-transparent text-[#171717] hover:bg-[#F8F8F9] focus-visible:ring-[#09132F]',
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
