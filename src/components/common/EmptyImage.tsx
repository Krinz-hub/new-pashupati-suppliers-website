import React from 'react';
import {
  UtensilsCrossed,
  Home,
  Box,
  Zap,
  Sparkles,
  Archive,
  Layers,
  Store,
  Package,
  LucideIcon,
  Truck,
} from 'lucide-react';
import { cn } from '../../utils/helpers';

interface EmptyImageProps {
  category?: string;
  title?: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide' | 'auto';
}

const categoryIconMap: Record<string, LucideIcon> = {
  kitchen: UtensilsCrossed,
  household: Home,
  plastic: Box,
  electrical: Zap,
  cleaning: Sparkles,
  storage: Archive,
  general: Layers,
  store: Store,
  products: Package,
  wholesale: Truck,
};

export const EmptyImage: React.FC<EmptyImageProps> = ({
  category,
  title,
  className,
  aspectRatio = 'auto',
}) => {
  const IconComponent = (category && categoryIconMap[category.toLowerCase()]) || Package;

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
        'relative w-full overflow-hidden flex flex-col items-center justify-center bg-white border border-[#EEEEF0] select-none p-4',
        aspectClasses[aspectRatio],
        className
      )}
    >
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-full bg-[#F8F8F9] border border-[#EEEEF0] flex items-center justify-center text-[#777777] mb-2 shadow-2xs">
          <IconComponent className="w-7 h-7 text-[#F58220]" strokeWidth={1.5} />
        </div>

        {title && (
          <span className="text-xs font-semibold text-[#171717] line-clamp-1 max-w-[180px]">
            {title}
          </span>
        )}

        <span className="text-[10px] font-medium uppercase tracking-wider text-[#777777] mt-0.5">
          {category ? `${category} Product` : 'Product Image'}
        </span>
      </div>
    </div>
  );
};
