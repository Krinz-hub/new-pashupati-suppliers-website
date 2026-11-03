import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { PackageSearch } from 'lucide-react';
import { Button } from '../common/Button';
import { Reveal } from '../common/Reveal';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  onResetFilters?: () => void;
  emptyTitle?: string;
  emptyMessage?: string;
  skeletonCount?: number;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  onResetFilters,
  emptyTitle = 'No products found',
  emptyMessage = "We couldn't find any products matching your criteria.",
  skeletonCount = 8,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div
            key={i}
            className="rounded-[16px] border border-[#EEEEF0] bg-white p-3 sm:p-4 flex flex-col justify-between h-[300px] sm:h-[340px] animate-pulse"
          >
            <div className="aspect-square w-full rounded-[12px] bg-[#F8F8F9] mb-3" />
            <div className="space-y-2">
              <div className="h-4 bg-[#F1F0F6] rounded w-3/4" />
              <div className="h-3 bg-[#F1F0F6] rounded w-1/2" />
            </div>
            <div className="pt-3 border-t border-[#EEEEF0] flex items-center justify-between">
              <div className="h-4 bg-[#F1F0F6] rounded w-16" />
              <div className="h-6 bg-[#F1F0F6] rounded-full w-14" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <Reveal variant="fade-up">
        <div className="bg-white rounded-[16px] border border-[#EEEEF0] p-8 sm:p-12 text-center flex flex-col items-center justify-center max-w-md mx-auto shadow-xs my-6 sm:my-10">
          <div className="w-14 h-14 rounded-full bg-[#F8F8F9] flex items-center justify-center text-[#F58220] mb-3.5 border border-[#EEEEF0]">
            <PackageSearch className="w-7 h-7" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#09132F]">{emptyTitle}</h3>
          <p className="text-xs sm:text-[13px] text-[#777777] mt-1.5 mb-5">{emptyMessage}</p>
          {onResetFilters && (
            <Button onClick={onResetFilters} variant="secondary" size="sm">
              Reset Filters
            </Button>
          )}
        </div>
      </Reveal>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
      {products.map((product, index) => (
        <Reveal
          key={product.id || (product as any)._id || product.slug || index}
          variant="fade-up"
          delay={(index % 4) * 30}
        >
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
};
