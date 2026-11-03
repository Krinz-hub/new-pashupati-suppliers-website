import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { PageHero } from '../components/common/PageHero';
import { CategoryFilter } from '../components/products/CategoryFilter';
import { ProductGrid } from '../components/products/ProductGrid';
import { Reveal } from '../components/common/Reveal';
import { useProducts } from '../hooks/useProducts';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';
import { setPageTitle, filterProducts, isProductInWishlist } from '../utils/helpers';

export const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const queryParam = searchParams.get('search') || '';
  const savedParam = searchParams.get('saved') === 'true';

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [searchQuery, setSearchQuery] = useState<string>(queryParam);

  // Fetch dynamic products from CMS with published filter
  const { products: dynamicProducts, loading } = useProducts({ status: 'published' });

  // Use dynamic products once loaded from CMS; fallback to default only during first initial render
  const productList = !loading || dynamicProducts.length > 0 ? dynamicProducts : DEFAULT_PRODUCTS;

  useEffect(() => {
    setPageTitle(savedParam ? 'Saved Products | New Pashupati Suppliers' : 'Product Catalog | New Pashupati Suppliers');
  }, [savedParam]);

  // Synchronize state with URL query parameters
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    if (queryParam !== undefined) {
      setSearchQuery(queryParam);
    }
  }, [queryParam]);

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      searchParams.delete('search');
    } else {
      searchParams.set('search', query);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    searchParams.delete('category');
    searchParams.delete('search');
    searchParams.delete('saved');
    setSearchParams(searchParams, { replace: true });
  };

  // Filter products by category, search query, and saved status
  const filteredProducts = useMemo(() => {
    let list = productList;
    if (savedParam) {
      list = list.filter((p) => isProductInWishlist(p.id || p.slug || ''));
    }
    return filterProducts(list, { category: selectedCategory, query: searchQuery });
  }, [productList, selectedCategory, searchQuery, savedParam]);

  return (
    <main className="bg-white min-h-screen">
      {/* Unified Split Page Header */}
      <PageHero
        align="split"
        eyebrow="MARKETPLACE CATALOG"
        title="All Products & Supplies"
        description="Browse everyday utility items, cookware, plastics, cleaning essentials, and electrical supplies."
      />

      {/* Main Catalog Section */}
      <section className="py-6 sm:py-8 bg-white min-h-[500px]">
        <Container>
          <Reveal variant="fade-up" delay={20}>
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              totalProductsCount={filteredProducts.length}
            />
          </Reveal>

          <ProductGrid
            products={filteredProducts}
            loading={loading}
            onResetFilters={handleResetFilters}
          />
        </Container>
      </section>
    </main>
  );
};
