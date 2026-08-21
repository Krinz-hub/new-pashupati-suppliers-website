import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { PageHero } from '../components/common/PageHero';
import { CategoryFilter } from '../components/products/CategoryFilter';
import { ProductGrid } from '../components/products/ProductGrid';
import { Reveal } from '../components/common/Reveal';
import { PRODUCTS } from '../data/products';
import { setPageTitle } from '../utils/helpers';

export const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setPageTitle('Our Products | New Pashupati Suppliers');
  }, []);

  // Synchronize state with URL query parameters
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    searchParams.delete('category');
    setSearchParams(searchParams, { replace: true });
  };

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        !searchQuery.trim() ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main>
      <Reveal variant="fade-in">
        <PageHero
          eyebrow="PRODUCT SHOWCASE &amp; INVENTORY"
          title="Explore Our Products"
          description="Discover a wide range of everyday utility items, cookware, plastics, cleaning essentials, and electrical supplies available for retail and bulk purchase."
        />
      </Reveal>

      <section className="py-16 sm:py-20 bg-brandBg min-h-[600px]">
        <Container>
          <Reveal variant="fade-up" delay={50}>
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              totalProductsCount={filteredProducts.length}
            />
          </Reveal>

          <ProductGrid
            products={filteredProducts}
            onResetFilters={handleResetFilters}
          />
        </Container>
      </section>
    </main>
  );
};
