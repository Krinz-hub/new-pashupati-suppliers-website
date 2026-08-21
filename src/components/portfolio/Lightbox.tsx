import React, { useEffect, useCallback } from 'react';
import { GalleryItem } from '../../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < items.length;
  const currentItem = isOpen ? items[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    onNavigate(newIndex);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    onNavigate(newIndex);
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation & lock scroll
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
    >
      {/* Dark overlay backdrop */}
      <div
        className="fixed inset-0 bg-navy-dark/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 max-w-5xl w-full max-h-[90vh] flex flex-col bg-navy-dark border border-navy-light rounded-2xl overflow-hidden shadow-soft-xl animate-modal-enter">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-navy-light/80 text-white">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full bg-brandRed text-[11px] font-bold uppercase tracking-wider">
              {currentItem.category}
            </span>
            <span className="text-xs text-gray-300 font-medium">
              Photo {currentIndex + 1} of {items.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-navy-light transition-colors focus-visible:ring-2 focus-visible:ring-brandRed"
            aria-label="Close image lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Center Image Area */}
        <div className="relative flex-1 min-h-[300px] max-h-[65vh] flex items-center justify-center bg-black/40 p-4 sm:p-6 overflow-hidden">
          <ImageWithFallback
            src={currentItem.image}
            alt={currentItem.alt}
            category={currentItem.category}
            title={currentItem.title}
            aspectRatio="auto"
            containerClassName="w-full h-full max-h-[60vh] flex items-center justify-center bg-transparent"
            className="max-h-[60vh] w-auto max-w-full object-contain rounded-lg"
          />

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-navy/80 hover:bg-brandRed text-white flex items-center justify-center transition-all shadow-soft-lg border border-navy-light/80 focus-visible:ring-2 focus-visible:ring-brandRed"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-navy/80 hover:bg-brandRed text-white flex items-center justify-center transition-all shadow-soft-lg border border-navy-light/80 focus-visible:ring-2 focus-visible:ring-brandRed"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Details Bar */}
        <div className="px-6 py-4 bg-navy text-white border-t border-navy-light/80">
          <h3 className="text-base sm:text-lg font-bold text-white">
            {currentItem.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            {currentItem.alt}
          </p>
        </div>
      </div>
    </div>
  );
};
