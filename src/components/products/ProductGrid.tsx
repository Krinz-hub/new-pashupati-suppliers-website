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
        <div className="bg-white rounded-card border border-brandBorder p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto shadow-soft-sm my-12">
          <div className="w-16 h-16 rounded-full bg-brandBg flex items-center justify-center text-brandRed mb-4 border border-brandBorder">
            <PackageSearch className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-navy">No products found</h3>
          <p className="text-sm text-brandText-muted mt-2 mb-6">
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
      {products.map((product, index) => (
        <Reveal
          key={product.id}
          variant="fade-up"
          delay={(index % 8) * 60}
        >
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
};
