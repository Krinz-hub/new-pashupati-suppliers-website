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
    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
      {/* Top row: Search input & Results Count */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-4">
        {/* Search Bar */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777] pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products by name, brand, or SKU..."
            className="w-full pl-9 sm:pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#F8F8F9] border border-[#EEEEF0] rounded-full text-[#171717] placeholder:text-[#777777] focus:outline-none focus:ring-1 focus:ring-[#F58220] focus:border-[#F58220] focus:bg-white transition-all shadow-2xs"
          />
        </div>

        {/* Counter Badge */}
        <div className="text-[12px] sm:text-xs font-semibold text-[#777777] self-end sm:self-center">
          Showing <span className="text-[#09132F] font-bold">{totalProductsCount}</span> products
        </div>
      </div>

      {/* Category Pills List (Compact Pill-Shaped Selectors) */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
        {filterOptions.map((option) => {
          const isSelected = selectedCategory === option.slug;

          return (
            <button
              key={option.slug}
              onClick={() => onSelectCategory(option.slug)}
              className={cn(
                'px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-[180ms] cursor-pointer select-none shrink-0 border focus-visible:ring-2 focus-visible:ring-[#F58220]',
                isSelected
                  ? 'bg-[#F58220] text-white border-[#F58220] shadow-xs'
                  : 'bg-white text-[#777777] border-[#EEEEF0] hover:border-slate-300 hover:text-[#171717] hover:bg-[#F8F8F9]'
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
