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
        'relative w-full overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 border border-brandBorder/60 select-none p-4',
        aspectClasses[aspectRatio],
        className
      )}
    >
      {/* Subtle background geometric pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#0B1F3A_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-soft-sm border border-brandBorder flex items-center justify-center text-navy mb-2.5 transition-transform duration-200">
          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-brandRed" strokeWidth={1.75} />
        </div>

        {title && (
          <span className="text-xs sm:text-sm font-bold text-navy/80 line-clamp-1 max-w-[200px]">
            {title}
          </span>
        )}

        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-brandText-muted/80 mt-1">
          {category ? `${category} Supply` : 'Pashupati Quality'}
        </span>
      </div>

      {/* Small subtle brand mark watermark */}
      <div className="absolute bottom-2 right-2.5 text-[9px] font-bold text-navy/20 uppercase tracking-widest pointer-events-none">
        NPS
      </div>
    </div>
  );
};
