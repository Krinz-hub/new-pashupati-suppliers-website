import React from 'react';
import { Container } from './Container';
import { cn } from '../../utils/helpers';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  align?: 'left' | 'center';
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
  return (
    <section
      className={cn(
        'relative pt-28 pb-14 sm:pt-32 sm:pb-16 md:pt-36 md:pb-20 bg-gradient-to-b from-slate-100/70 via-brandBg to-brandBg border-b border-brandBorder/60 overflow-hidden',
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
            <span className="text-xs font-bold uppercase tracking-widest text-brandRed mb-3 block">
              {eyebrow}
            </span>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy tracking-tight leading-[1.15] text-balance">
            {title}
          </h1>

          <p className="mt-3.5 sm:mt-4 text-sm sm:text-base md:text-lg text-brandText-muted leading-relaxed text-balance max-w-2xl">
            {description}
          </p>

          {children && <div className="mt-7">{children}</div>}
        </div>
      </Container>
    </section>
  );
};
