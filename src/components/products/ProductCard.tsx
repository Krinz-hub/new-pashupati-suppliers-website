import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { ProductInquiryButton } from './ProductInquiryButton';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <article className="group bg-white rounded-xl border border-brandBorder shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1 h-full">
      {/* Image container */}
      <Link to={`/products/${product.slug || product.id}`} className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 border-b border-brandBorder/60 block">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          category={product.category}
          title={product.name}
          aspectRatio="portrait"
          containerClassName="w-full h-full group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category Tag */}
        <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-navy/85 backdrop-blur-sm text-white text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider">
          {product.category}
        </span>
      </Link>

      {/* Content */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <Link to={`/products/${product.slug || product.id}`}>
            <h3 className="text-xs sm:text-base font-bold text-navy group-hover:text-brandRed transition-colors leading-snug line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <p className="hidden sm:block mt-1.5 text-xs sm:text-sm text-brandText-muted leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Action area */}
        <div className="mt-2.5 sm:mt-5 pt-2 sm:pt-3.5 border-t border-brandBorder/60">
          <ProductInquiryButton
            productName={product.name}
            size="sm"
          />
        </div>
      </div>
    </article>
  );
};
