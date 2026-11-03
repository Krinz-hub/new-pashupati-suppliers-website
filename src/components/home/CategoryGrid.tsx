import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, UtensilsCrossed, Home, Box, Zap, Sparkles, Archive, Layers, LucideIcon } from 'lucide-react';
import { Container } from '../common/Container';
import { Reveal } from '../common/Reveal';
import { useCategories } from '../../hooks/useCategories';
import { CATEGORIES as DEFAULT_CATEGORIES } from '../../data/categories';

const ICON_MAP: Record<string, LucideIcon> = {
  UtensilsCrossed,
  Home,
  Box,
  Zap,
  Sparkles,
  Archive,
  Layers,
};

export const CategoryGrid: React.FC = () => {
  const { categories: dynamicCategories } = useCategories();
  const allCategories = dynamicCategories.length > 0 ? dynamicCategories : DEFAULT_CATEGORIES;

  return (
    <section className="py-6 sm:py-8 bg-white">
      <Container>
        {/* Section Header: Title aligned left, small orange See All aligned right */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-2xl font-bold text-[#09132F] tracking-tight">
              Featured Categories
            </h2>
            <span className="hidden sm:inline text-xs text-[#777777] font-medium">
              ({allCategories.length} Departments)
            </span>
          </div>

          <Link
            to="/categories"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#F58220] hover:text-[#E97516] transition-colors group"
          >
            <span>See All</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Categories Browsing Grid / Horizontal Touch Scroll on Mobile */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2.5 sm:gap-3.5 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 py-1">
          {allCategories.map((category, index) => {
            const Icon = (category.iconName && ICON_MAP[category.iconName]) || Box;

            return (
              <Reveal key={category.id} variant="fade-up" delay={index * 30}>
                <Link
                  to={`/products?category=${category.slug}`}
                  className="group flex flex-col items-center justify-center p-3 sm:p-4 rounded-[16px] bg-[#F8F8F9] hover:bg-white border border-[#EEEEF0] hover:border-[#DCDCDE] hover:shadow-soft-sm transition-all duration-[180ms] text-center min-w-[100px] sm:min-w-0"
                >
                  {/* Circular Illustration / Thumbnail */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border border-[#EEEEF0] shadow-2xs flex items-center justify-center mb-2.5 overflow-hidden group-hover:border-[#F58220] group-hover:scale-105 transition-all duration-[180ms] shrink-0 p-1.5">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-contain rounded-full"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = 'none';
                          const fallback = (e.currentTarget.parentElement?.querySelector('.cat-icon-fallback') as HTMLElement);
                          if (fallback) fallback.style.display = 'block';
                        }}
                      />
                    ) : null}
                    <Icon className={`w-6 h-6 text-[#F58220] cat-icon-fallback ${category.image ? 'hidden' : 'block'}`} />
                  </div>

                  {/* Category Label */}
                  <span className="text-[12px] sm:text-[13px] font-semibold text-[#171717] group-hover:text-[#F58220] transition-colors leading-tight truncate w-full">
                    {category.name}
                  </span>

                  {/* Item count */}
                  <span className="text-[10px] text-[#777777] mt-0.5 font-medium">
                    {category.productCount ? `${category.productCount}+ items` : 'Browse'}
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
