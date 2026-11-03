import React from 'react';
import { Container } from './Container';
import { cn } from '../../utils/helpers';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'split';
  className?: string;
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
  children,
}) => {
  if (align === 'split') {
    return (
      <section
        className={cn(
          'relative pt-5 sm:pt-7 pb-4 sm:pb-5 bg-white border-b border-[#EEEEF0] overflow-hidden',
          className
        )}
      >
        <Container className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-6">
            <div className="max-w-xl">
              {eyebrow && (
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#F58220] mb-1.5 block">
                  {eyebrow}
                </span>
              )}
              <h1 className="text-xl sm:text-3xl font-extrabold text-[#09132F] tracking-tight leading-tight">
                {title}
              </h1>
            </div>

            {(description || children) && (
              <div className="flex flex-col sm:items-end sm:text-right gap-2">
                {description && (
                  <p className="text-xs sm:text-sm text-[#777777] max-w-md leading-relaxed">
                    {description}
                  </p>
                )}
                {children && <div className="mt-1">{children}</div>}
              </div>
            )}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      className={cn(
        'relative pt-6 sm:pt-10 pb-6 sm:pb-8 bg-white border-b border-[#EEEEF0] overflow-hidden',
        className
      )}
    >
      <Container className="relative z-10">
        <div
          className={cn(
            'max-w-3xl flex flex-col',
            align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
          )}
        >
          {eyebrow && (
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#F58220] mb-2 block">
              {eyebrow}
            </span>
          )}

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#09132F] tracking-tight leading-[1.15] text-balance">
            {title}
          </h1>

          {description && (
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-base text-[#777777] leading-relaxed text-balance max-w-2xl">
              {description}
            </p>
          )}

          {children && <div className="mt-4 sm:mt-6 w-full sm:w-auto">{children}</div>}
        </div>
      </Container>
    </section>
  );
};
