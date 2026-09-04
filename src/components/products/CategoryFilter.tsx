import React from 'react';
import { CATEGORIES as DEFAULT_CATEGORIES } from '../../data/categories';
import { useCategories } from '../../hooks/useCategories';
import { cn } from '../../utils/helpers';
import { Search } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (categorySlug: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalProductsCount: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalProductsCount,
}) => {
  const { categories: dynamicCategories } = useCategories();
  const activeCategories = dynamicCategories.length > 0 ? dynamicCategories : DEFAULT_CATEGORIES;

  const filterOptions = [
    { slug: 'all', name: 'All Products' },
    ...activeCategories.map((c) => ({ slug: c.slug, name: c.name })),
  ];

  return (
    <div className="space-y-3 sm:space-y-5 mb-6 sm:mb-10">
      {/* Top row: Search input & Results Count */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-4">
        {/* Search Bar */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brandText-muted pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products by name or category..."
            className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 rounded-lg bg-white border border-brandBorder text-xs sm:text-sm text-navy placeholder:text-brandText-muted focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-transparent transition-all shadow-sm"
          />
        </div>

        {/* Counter Badge */}
        <div className="text-[11px] sm:text-sm font-semibold text-brandText-muted self-end sm:self-center">
          Showing <span className="text-navy font-bold">{totalProductsCount}</span> items
        </div>
      </div>

      {/* Category Pills List (Horizontal Touch-Scrollable) */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 focus-visible:outline-none -mx-4 px-4 sm:mx-0 sm:px-0">
        {filterOptions.map((option) => {
          const isSelected = selectedCategory === option.slug;

          return (
            <button
              key={option.slug}
              onClick={() => onSelectCategory(option.slug)}
              className={cn(
                'px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold sm:font-bold whitespace-nowrap transition-all duration-200 cursor-pointer select-none shrink-0 border focus-visible:ring-2 focus-visible:ring-brandRed',
                isSelected
                  ? 'bg-navy text-white border-navy shadow-sm'
                  : 'bg-white text-brandText-muted border-brandBorder hover:border-brandBorder-strong hover:text-navy hover:bg-slate-50'
              )}
            >
              {option.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
