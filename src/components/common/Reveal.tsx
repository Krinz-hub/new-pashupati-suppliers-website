import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { cn } from '../../utils/helpers';

interface RevealProps {
  children: React.ReactNode;
  variant?: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right';
  delay?: number; // ms
  duration?: number; // ms
  className?: string;
  as?: React.ElementType;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 500,
  className,
  as: Component = 'div',
}) => {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>();

  const getTransformClasses = () => {
    switch (variant) {
      case 'fade-up':
        return isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6';
      case 'fade-left':
        return isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 -translate-x-6';
      case 'fade-right':
        return isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-6';
      case 'fade-in':
      default:
        return isVisible ? 'opacity-100' : 'opacity-0';
    }
  };

  return (
    <Component
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={cn(
        'transition-all will-change-[opacity,transform]',
        getTransformClasses(),
        className
      )}
    >
      {children}
    </Component>
  );
};
