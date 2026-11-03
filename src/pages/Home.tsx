import React, { useEffect, useMemo } from 'react';
import { Hero } from '../components/home/Hero';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { ProductSection } from '../components/home/ProductSection';
import { MarketplaceInfo } from '../components/home/MarketplaceInfo';
import { WholesaleCTA } from '../components/home/WholesaleCTA';
import { useProducts } from '../hooks/useProducts';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';
import { setPageTitle } from '../utils/helpers';

export const Home: React.FC = () => {
  const { products: dynamicProducts } = useProducts({ status: 'published' });
  const allProducts = dynamicProducts.length > 0 ? dynamicProducts : DEFAULT_PRODUCTS;

  useEffect(() => {
    setPageTitle('New Pashupati Suppliers | Modern Household & Wholesale Marketplace');
  }, []);

  // Filtered categories for shopping sections
  const electricalProducts = useMemo(() => {
    return allProducts.filter((p) => p.category.toLowerCase() === 'electrical');
  }, [allProducts]);

  const kitchenProducts = useMemo(() => {
    return allProducts.filter((p) => p.category.toLowerCase() === 'kitchen');
  }, [allProducts]);

  const plasticProducts = useMemo(() => {
    return allProducts.filter((p) => p.category.toLowerCase() === 'plastic' || p.category.toLowerCase() === 'storage');
  }, [allProducts]);

  const popularFilterOptions = [
    { label: 'All', categorySlug: 'all' },
    { label: 'Kitchen', categorySlug: 'kitchen' },
    { label: 'Electrical', categorySlug: 'electrical' },
    { label: 'Plastic', categorySlug: 'plastic' },
    { label: 'Storage', categorySlug: 'storage' },
    { label: 'Household', categorySlug: 'household' },
  ];

  return (
    <main className="bg-white">
      {/* 1. Large Rounded Hero Banner */}
      <Hero />

      {/* 2. Horizontally Organized Category Browsing */}
      <CategoryGrid />

      {/* 3. Popular Products Section with Category Filters */}
      <ProductSection
        title="Popular Products"
        subtitle="Everyday bestsellers chosen by households and retailers in Nepal"
        seeAllLink="/products"
        seeAllText="See All Products"
        products={allProducts}
        filterOptions={popularFilterOptions}
        limit={8}
      />

      {/* 4. Electrical & Home Appliances */}
      {electricalProducts.length > 0 && (
        <ProductSection
          title="Electrical & Home Appliances"
          subtitle="Infrared cookers, heaters, kettles, and water dispensers"
          seeAllLink="/products?category=electrical"
          seeAllText="See All Electrical"
          products={electricalProducts}
          limit={4}
        />
      )}

      {/* 5. Kitchenware & Dining */}
      {kitchenProducts.length > 0 && (
        <ProductSection
          title="Kitchenware & Dining"
          subtitle="Pressure cookers, cookware, stainless steel sets, and utensils"
          seeAllLink="/products?category=kitchen"
          seeAllText="See All Kitchenware"
          products={kitchenProducts}
          limit={4}
        />
      )}

      {/* 6. Plastics & Storage Solutions */}
      {plasticProducts.length > 0 && (
        <ProductSection
          title="Plastics & Storage Solutions"
          subtitle="Durable storage crates, heavy-duty buckets, thermos flasks, and organizers"
          seeAllLink="/products?category=plastic"
          seeAllText="See All Plastics"
          products={plasticProducts}
          limit={4}
        />
      )}

      {/* 7. Dedicated 3-Column Marketplace Information Section */}
      <MarketplaceInfo />

      {/* 8. Wholesale Procurement CTA */}
      <WholesaleCTA />
    </main>
  );
};
