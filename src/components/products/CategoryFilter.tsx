import React from 'react';
import { CATEGORIES } from '../../data/categories';
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
  const filterOptions = [
    { slug: 'all', name: 'All Products' },
    ...CATEGORIES.map((c) => ({ slug: c.slug, name: c.name })),
  ];

  return (
    <div className="space-y-6 mb-10">
      {/* Top row: Search input & Results Count */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brandText-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products by name or description..."
            className="w-full pl-10 pr-4 py-2.5 rounded-btn bg-white border border-brandBorder text-sm text-navy placeholder:text-brandText-muted focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-transparent transition-all shadow-soft-sm"
          />
        </div>

        {/* Counter Badge */}
        <div className="text-xs sm:text-sm font-semibold text-brandText-muted self-end sm:self-center">
          Showing <span className="text-navy font-bold">{totalProductsCount}</span> products
        </div>
      </div>

      {/* Category Pills List */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-brandBorder focus-visible:outline-none">
        {filterOptions.map((option) => {
          const isSelected = selectedCategory === option.slug;

          return (
            <button
              key={option.slug}
              onClick={() => onSelectCategory(option.slug)}
              className={cn(
                'px-4 py-2 rounded-btn text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer select-none shrink-0 border focus-visible:ring-2 focus-visible:ring-brandRed',
                isSelected
                  ? 'bg-navy text-white border-navy shadow-soft-sm'
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
