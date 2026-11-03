import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from '../products/ProductCard';
import { Container } from '../common/Container';
import { Reveal } from '../common/Reveal';
import { filterProducts } from '../../utils/helpers';

interface FilterOption {
  label: string;
  categorySlug: string;
}

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  seeAllLink?: string;
  seeAllText?: string;
  products: Product[];
  filterOptions?: FilterOption[];
  limit?: number;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  subtitle,
  seeAllLink,
  seeAllText = 'See All',
  products,
  filterOptions,
  limit = 8,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProducts = filterProducts(products, { category: activeCategory });
  const displayedProducts = filteredProducts.slice(0, limit);

  return (
    <section className="py-6 sm:py-8 bg-white border-t border-[#EEEEF0]">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
          <div className="flex flex-col">
            <h2 className="text-lg sm:text-2xl font-bold text-[#09132F] tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-[13px] text-[#777777] mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            {/* Optional Segmented Filter Pills */}
            {filterOptions && filterOptions.length > 0 && (
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {filterOptions.map((opt) => {
                  const isSelected = activeCategory === opt.categorySlug;
                  return (
                    <button
                      key={opt.categorySlug}
                      onClick={() => setActiveCategory(opt.categorySlug)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-[180ms] ${
                        isSelected
                          ? 'bg-[#F58220] text-white shadow-xs'
                          : 'bg-[#F8F8F9] text-[#777777] hover:text-[#171717] hover:bg-[#EEEEF0]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* "See All" Action */}
            {seeAllLink && (
              <Link
                to={seeAllLink}
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#F58220] hover:text-[#E97516] transition-colors shrink-0 group ml-auto sm:ml-0"
              >
                <span>{seeAllText}</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            )}
          </div>
        </div>

        {/* 4 Cards Per Row on Desktop, 2 on Mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-4">
          {displayedProducts.map((product, index) => (
            <Reveal
              key={product.id || index}
              variant="fade-up"
              delay={(index % 4) * 40}
            >
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

