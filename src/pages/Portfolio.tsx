import React, { useState, useEffect, useMemo } from 'react';
import { Container } from '../components/common/Container';
import { PageHero } from '../components/common/PageHero';
import { GalleryFilter } from '../components/portfolio/GalleryFilter';
import { GalleryGrid } from '../components/portfolio/GalleryGrid';
import { Lightbox } from '../components/portfolio/Lightbox';
import { Reveal } from '../components/common/Reveal';
import { GALLERY_ITEMS } from '../data/gallery';
import { BUSINESS } from '../config/business';
import { setPageTitle } from '../utils/helpers';

export const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setPageTitle('Store & Product Gallery | New Pashupati Suppliers');
  }, []);

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: GALLERY_ITEMS.length,
      store: 0,
      products: 0,
      wholesale: 0,
    };

    GALLERY_ITEMS.forEach((item) => {
      if (counts[item.category] !== undefined) {
        counts[item.category]++;
      }
    });

    return counts;
  }, []);

  const handleOpenLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setActiveLightboxIndex(null);
  };

  return (
    <main>
      <Reveal variant="fade-in">
        <PageHero
          eyebrow="STORE &amp; INVENTORY GALLERY"
          title="Our Store &amp; Product Range"
          description={`Take a visual tour inside New Pashupati Suppliers in ${BUSINESS.location}. Explore our well-stocked aisles, cookware displays, and wholesale packaging facilities.`}
        />
      </Reveal>

      <section className="py-6 sm:py-16 lg:py-20 bg-brandBg min-h-[500px]">
        <Container>
          <Reveal variant="fade-up" delay={50}>
            <GalleryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              counts={categoryCounts}
            />
          </Reveal>

          <GalleryGrid
            items={filteredItems}
            onItemClick={handleOpenLightbox}
          />
        </Container>
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        items={filteredItems}
        currentIndex={activeLightboxIndex}
        onClose={handleCloseLightbox}
        onNavigate={setActiveLightboxIndex}
      />
    </main>
  );
};
