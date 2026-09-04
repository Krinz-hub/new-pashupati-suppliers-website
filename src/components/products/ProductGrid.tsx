import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { PackageSearch } from 'lucide-react';
import { Button } from '../common/Button';
import { Reveal } from '../common/Reveal';

interface ProductGridProps {
  products: Product[];
  onResetFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onResetFilters,
}) => {
  if (products.length === 0) {
    return (
      <Reveal variant="fade-up">
        <div className="bg-white rounded-xl border border-brandBorder p-8 sm:p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto shadow-sm my-6 sm:my-12">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-brandBg flex items-center justify-center text-brandRed mb-3 sm:mb-4 border border-brandBorder">
            <PackageSearch className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <h3 className="text-base sm:text-xl font-bold text-navy">No products found</h3>
          <p className="text-xs sm:text-sm text-brandText-muted mt-1.5 sm:mt-2 mb-4 sm:mb-6">
            We couldn't find any products matching your selected category or search term.
          </p>
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
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
      {products.map((product, index) => (
        <Reveal
          key={product.id}
          variant="fade-up"
          delay={(index % 8) * 40}
        >
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
};
