import React from 'react';
import { Link } from 'react-router-dom';
import { LogoVariant } from '../../types';
import { cn } from '../../utils/helpers';

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  linkToHome?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'default',
  className,
  linkToHome = true,
}) => {
  const isLight = variant === 'light';
  const isCompact = variant === 'compact';

  const logoContent = (
    <div className={cn('flex items-center gap-3 select-none group', className)}>
      {/* Visual Logo Mark */}
      <div
        className={cn(
          'relative flex items-center justify-center font-extrabold rounded-xl transition-transform duration-200 group-hover:scale-105 shadow-soft-sm',
          isCompact ? 'w-9 h-9 text-base' : 'w-11 h-11 text-lg',
          isLight
            ? 'bg-navy-light text-white border border-white/20'
            : 'bg-navy text-white'
        )}
      >
        <span>N</span>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-brandRed rounded-full border-2 border-white" />
      </div>

      {/* Brand Text */}
      {!isCompact && (
        <div className="flex flex-col leading-none">
          <span
            className={cn(
              'font-extrabold tracking-tight',
              'text-base sm:text-lg',
              isLight ? 'text-white' : 'text-navy'
            )}
          >
            NEW PASHUPATI
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="font-bold text-xs tracking-widest text-brandRed">
              SUPPLIERS
            </span>
            <span
              className={cn(
                'text-[9px] font-medium tracking-wide uppercase',
                isLight ? 'text-gray-300' : 'text-brandText-muted'
              )}
            >
              • Nepal
            </span>
          </div>
        </div>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link
        to="/"
        className="inline-flex items-center focus-visible:ring-2 focus-visible:ring-brandRed rounded-lg outline-none"
        aria-label="New Pashupati Suppliers Home"
      >
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};
