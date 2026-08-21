import React, { useState } from 'react';
import { EmptyImage } from './EmptyImage';
import { cn } from '../../utils/helpers';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  category?: string;
  title?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide' | 'auto';
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  category,
  title,
  aspectRatio = 'auto',
  containerClassName,
  className,
  loading = 'lazy',
  ...props
}) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // If no source is given, render empty fallback immediately
  if (!src || hasError) {
    return (
      <EmptyImage
        category={category}
        title={title || alt}
        aspectRatio={aspectRatio}
        className={containerClassName}
      />
    );
  }

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-[16/10]',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[21/9]',
    auto: 'h-full min-h-[160px]',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-slate-100',
        aspectClasses[aspectRatio],
        containerClassName
      )}
    >
      {/* Background placeholder while image is downloading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center">
          <span className="sr-only">Loading image...</span>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        {...props}
      />
    </div>
  );
};
