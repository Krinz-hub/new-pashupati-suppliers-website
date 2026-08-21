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
    <div className={cn('flex flex-col max-w-3xl mb-10 sm:mb-12', alignStyles[align], className)}>
      {eyebrow && (
        <span
          className={cn(
            'text-xs font-bold uppercase tracking-widest mb-2.5 block',
            isDark ? 'text-brandOrange' : 'text-brandRed'
          )}
        >
          {eyebrow}
        </span>
      )}
      
      <TitleTag
        className={cn(
          'font-extrabold tracking-tight text-balance leading-tight',
          TitleTag === 'h1'
            ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
            : 'text-2xl sm:text-3xl lg:text-4xl',
          isDark ? 'text-white' : 'text-navy'
        )}
      >
        {title}
      </TitleTag>

      {description && (
        <p
          className={cn(
            'mt-3 text-sm sm:text-base leading-relaxed text-balance',
            isDark ? 'text-gray-300' : 'text-brandText-muted'
          )}
        >
          {description}
        </p>
      )}

      {children && <div className="mt-6">{children}</div>}
    </div>
  );
};
