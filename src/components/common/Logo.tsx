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
    <div className={cn('flex items-center gap-2.5 select-none group', className)}>
      {/* Visual Logo Mark */}
      <div
        className={cn(
          'relative flex items-center justify-center font-black rounded-xl transition-transform duration-200 group-hover:scale-105 shrink-0',
          isCompact ? 'w-8 h-8 text-sm' : 'w-10 h-10 text-base',
          isLight
            ? 'bg-white/10 text-white border border-white/20'
            : 'bg-[#09132F] text-white shadow-soft-xs'
        )}
      >
        <span>N</span>
        <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#F58220] rounded-full border-2 border-white" />
      </div>

      {/* Brand Text */}
      {!isCompact && (
        <div className="flex flex-col leading-none">
          <span
            className={cn(
              'font-extrabold tracking-tight',
              'text-[15px] sm:text-base',
              isLight ? 'text-white' : 'text-[#09132F]'
            )}
          >
            NEW PASHUPATI
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="font-bold text-[10px] sm:text-[11px] tracking-wider text-[#F58220]">
              SUPPLIERS
            </span>
            <span
              className={cn(
                'text-[8px] sm:text-[9px] font-semibold tracking-wider uppercase',
                isLight ? 'text-gray-300' : 'text-[#777777]'
              )}
            >
              • Marketplace
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
        className="inline-flex items-center focus-visible:ring-2 focus-visible:ring-[#F58220] rounded-lg outline-none"
        aria-label="New Pashupati Suppliers Home"
      >
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};
