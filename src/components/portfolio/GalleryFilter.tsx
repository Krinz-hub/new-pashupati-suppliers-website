import React from 'react';
import { cn } from '../../utils/helpers';

interface GalleryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  counts: Record<string, number>;
}

export const GalleryFilter: React.FC<GalleryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  counts,
}) => {
  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'store', label: 'Store & Aisles' },
    { id: 'products', label: 'Products & Displays' },
    { id: 'wholesale', label: 'Wholesale & Dispatch' },
  ];

  return (
    <div className="flex items-center sm:justify-center gap-1.5 sm:gap-3 mb-6 sm:mb-10 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        const count = counts[cat.id] ?? 0;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={cn(
              'px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold sm:font-bold whitespace-nowrap transition-all duration-200 cursor-pointer select-none shrink-0 border focus-visible:ring-2 focus-visible:ring-brandRed flex items-center gap-1.5 sm:gap-2',
              isSelected
                ? 'bg-navy text-white border-navy shadow-sm'
                : 'bg-white text-brandText-muted border-brandBorder hover:border-brandBorder-strong hover:text-navy hover:bg-slate-50'
            )}
          >
            <span>{cat.label}</span>
            <span
              className={cn(
                'text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded-full font-semibold',
                isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-brandText-muted'
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
