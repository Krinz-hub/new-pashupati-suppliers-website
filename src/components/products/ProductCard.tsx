import React from 'react';
import { Product } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { ProductInquiryButton } from './ProductInquiryButton';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <article className="group bg-white rounded-xl border border-brandBorder shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1">
      {/* Image container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 border-b border-brandBorder/60">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          category={product.category}
          title={product.name}
          aspectRatio="portrait"
          containerClassName="w-full h-full group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category Tag */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-navy/80 backdrop-blur-sm text-white text-[11px] font-semibold uppercase tracking-wider">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-navy group-hover:text-brandRed transition-colors leading-snug line-clamp-2">
            {product.name}
          </h3>

          <p className="mt-1.5 text-xs sm:text-sm text-brandText-muted leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Action area */}
        <div className="mt-5 pt-3.5 border-t border-brandBorder/60">
          <ProductInquiryButton
            productName={product.name}
            size="sm"
          />
        </div>
      </div>
    </article>
  );
};
