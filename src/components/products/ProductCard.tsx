import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Heart, MessageSquare } from 'lucide-react';
import { isProductInWishlist, toggleWishlistProduct } from '../../utils/helpers';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const productId = product.id || product.slug || '';
  const [isSaved, setIsSaved] = useState(() => isProductInWishlist(productId));
  const productLink = `/products/${product.slug || product.id}`;
  const priceDisplay = product.price 
    ? `रू ${product.price}` 
    : 'Wholesale Quote';

  useEffect(() => {
    const handleUpdate = () => setIsSaved(isProductInWishlist(productId));
    window.addEventListener('wishlist-updated', handleUpdate);
    return () => window.removeEventListener('wishlist-updated', handleUpdate);
  }, [productId]);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nowSaved = toggleWishlistProduct(productId);
    setIsSaved(nowSaved);
  };

  return (
    <article className="group bg-white rounded-[16px] border border-[#EEEEF0] hover:border-[#DCDCDE] shadow-xs hover:shadow-soft-md transition-all duration-[180ms] ease-out flex flex-col justify-between overflow-hidden hover:-translate-y-1 h-full">
      {/* Product Image Area: Pure Seamless White Background (#FFFFFF) */}
      <div className="relative aspect-square w-full overflow-hidden bg-white">
        <Link to={productLink} className="block w-full h-full p-2.5 sm:p-3">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            category={product.category}
            title={product.name}
            aspectRatio="square"
            fit="contain"
            containerClassName="w-full h-full bg-white flex items-center justify-center"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-[200ms] ease-out"
          />
        </Link>

        {/* Category Pill Tag */}
        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-[#09132F] text-[10px] sm:text-[11px] font-semibold border border-[#EEEEF0] shadow-xs capitalize">
          {product.category}
        </span>

        {/* Quick Wishlist / Save Action */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 backdrop-blur-xs border border-[#EEEEF0] text-[#777777] hover:text-[#F58220] flex items-center justify-center transition-colors shadow-xs"
          aria-label={isSaved ? 'Remove from saved' : 'Save product'}
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
              isSaved ? 'fill-[#F58220] text-[#F58220]' : ''
            }`}
          />
        </button>

        {/* Pack Size / Unit Indicator */}
        {product.unit && (
          <span className="absolute bottom-2 left-2.5 text-[10px] text-[#777777] bg-white/80 px-1.5 py-0.5 rounded font-medium">
            Unit: {product.unit}
          </span>
        )}
      </div>

      {/* Content Area */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between border-t border-[#EEEEF0]/80">
        <div>
          <Link to={productLink} className="block group-hover:text-[#F58220] transition-colors">
            <h3 className="text-xs sm:text-[14px] font-semibold text-[#171717] leading-snug line-clamp-2 min-h-[2.4rem] sm:min-h-[2.6rem]">
              {product.name}
            </h3>
          </Link>

          <p className="mt-1 text-[11px] sm:text-xs text-[#777777] line-clamp-1 leading-normal">
            {product.shortDescription || product.subcategory || product.description}
          </p>
        </div>

        {/* Price & Quick Action */}
        <div className="mt-3 pt-2.5 border-t border-[#EEEEF0] flex items-center justify-between gap-2">
          {/* Highlighted Price in Vibrant Orange */}
          <div className="flex flex-col">
            <span className="text-[10px] text-[#777777] uppercase tracking-wider font-medium leading-none mb-0.5">
              Price
            </span>
            <span className="text-xs sm:text-[14px] font-bold text-[#F58220] leading-tight">
              {priceDisplay}
            </span>
          </div>

          {/* Quick Inquiry / Quote Action */}
          <Link
            to={`/contact?product=${encodeURIComponent(product.name)}`}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full bg-[#F8F8F9] hover:bg-[#F58220] text-[#171717] hover:text-white border border-[#EEEEF0] hover:border-transparent text-[11px] sm:text-xs font-semibold transition-all duration-[180ms] ease-out shrink-0"
            title="Inquire about this product"
          >
            <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Inquire</span>
          </Link>
        </div>
      </div>
    </article>
  );
};
