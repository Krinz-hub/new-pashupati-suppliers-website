import React from 'react';
import { GalleryItem } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Reveal } from '../common/Reveal';
import { Eye, ImageOff } from 'lucide-react';

interface GalleryGridProps {
  items: GalleryItem[];
  onItemClick: (index: number) => void;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  items,
  onItemClick,
}) => {
  if (items.length === 0) {
    return (
      <Reveal variant="fade-up">
        <div className="bg-white rounded-xl border border-brandBorder p-8 sm:p-10 text-center flex flex-col items-center justify-center max-w-md mx-auto shadow-sm my-6 sm:my-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brandBg flex items-center justify-center text-brandRed mb-3">
            <ImageOff className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-navy">No photos found</h3>
          <p className="text-xs text-brandText-muted mt-1">
            No gallery images available for this category.
          </p>
        </div>
      </Reveal>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-6">
      {items.map((item, index) => (
        <Reveal
          key={item.id}
          variant="fade-up"
          delay={(index % 8) * 40}
        >
          <div
            onClick={() => onItemClick(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onItemClick(index);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`View ${item.title}`}
            className="group relative rounded-xl overflow-hidden bg-white border border-brandBorder shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-brandRed outline-none h-full"
          >
            {/* Image container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <ImageWithFallback
                src={item.image}
                alt={item.alt}
                category={item.category}
                title={item.title}
                aspectRatio="portrait"
                containerClassName="w-full h-full group-hover:scale-105 transition-transform duration-500"
              />

              {/* Hover overlay with eye icon */}
              <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 text-navy flex items-center justify-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-sm">
                  <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brandRed" />
                </div>
              </div>

              {/* Category tag */}
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 rounded-md bg-navy/85 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider">
                {item.category}
              </div>
            </div>

            {/* Card footer */}
            <div className="p-2.5 sm:p-4 bg-white">
              <h3 className="text-xs sm:text-sm font-bold text-navy truncate group-hover:text-brandRed transition-colors">
                {item.title}
              </h3>
              <p className="hidden sm:block text-xs text-brandText-muted line-clamp-1 mt-0.5">
                {item.alt}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
};
