import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/helpers';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  className,
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4', className)}>
      <Loader2 className="w-8 h-8 text-brandRed animate-spin mb-3" />
      <p className="text-sm font-medium text-brandText-muted">{message}</p>
    </div>
  );
};
