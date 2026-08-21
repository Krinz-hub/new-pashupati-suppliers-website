import React from 'react';
import { cn } from '../../utils/helpers';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  clean?: boolean; // omit padding if needed
}

export const Container: React.FC<ContainerProps> = ({
  as: Component = 'div',
  className,
  children,
  clean = false,
  ...props
}) => {
  return (
    <Component
      className={cn(
        'max-w-container mx-auto w-full',
        !clean && 'px-5 sm:px-8 md:px-10 lg:px-12',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
