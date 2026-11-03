import React from 'react';
import { cn } from '../../utils/helpers';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
  className?: string;
  titleTag?: 'h1' | 'h2' | 'h3';
  children?: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'center',
  theme = 'light',
  className,
  titleTag: TitleTag = 'h2',
  children,
}) => {
  const isDark = theme === 'dark';

  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  return (
    <div className={cn('flex flex-col max-w-3xl mb-5 sm:mb-8', alignStyles[align], className)}>
      {eyebrow && (
        <span
          className={cn(
            'text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-1.5 block',
            isDark ? 'text-[#F58220]' : 'text-[#F58220]'
          )}
        >
          {eyebrow}
        </span>
      )}
      
      <TitleTag
        className={cn(
          'font-extrabold tracking-tight text-balance leading-tight',
          TitleTag === 'h1'
            ? 'text-2xl sm:text-4xl lg:text-5xl'
            : 'text-xl sm:text-2xl lg:text-3xl',
          isDark ? 'text-white' : 'text-[#09132F]'
        )}
      >
        {title}
      </TitleTag>

      {description && (
        <p
          className={cn(
            'mt-2 text-xs sm:text-sm leading-relaxed text-balance',
            isDark ? 'text-gray-300' : 'text-[#777777]'
          )}
        >
          {description}
        </p>
      )}

      {children && <div className="mt-3.5 sm:mt-5">{children}</div>}
    </div>
  );
};
