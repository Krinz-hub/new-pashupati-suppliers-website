import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Package } from 'lucide-react';
import { Container } from '../components/common/Container';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductGrid } from '../components/products/ProductGrid';
import { fetchProducts, fetchCategories, ProductItem, CategoryItem } from '../services/api';
import { CATEGORIES as DEFAULT_CATEGORIES } from '../data/categories';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';
import { filterProducts } from '../utils/helpers';

export const CategoryDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<CategoryItem | null>(null);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    fetchCategories().then((catList) => {
      const allCats = catList.length > 0 ? catList : DEFAULT_CATEGORIES;
      const found = allCats.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
      setCategory(found || { id: slug, name: slug.toUpperCase(), slug, description: 'Product category', image: '/assets/banner.png', productCount: null });
    });

    fetchProducts({ category: slug }).then((res) => {
      if (res.data && res.data.length > 0) {
        setProducts(res.data);
      } else {
        const fallback = DEFAULT_PRODUCTS.filter((p) => p.category.toLowerCase() === slug.toLowerCase());
        setProducts(fallback);
      }
      setLoading(false);
    });
  }, [slug]);

  const filteredProducts = filterProducts(products, { query: searchQuery });

  return (
    <main className="py-6 sm:py-8 bg-white min-h-screen">
      <Container>
        {/* Unified Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Categories', path: '/categories' },
            { label: category?.name || slug || '' },
          ]}
        />

        {category && (
          <div className="bg-[#F8F8F9] rounded-[16px] p-5 sm:p-8 mb-8 border border-[#EEEEF0] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="inline-block px-2.5 py-0.5 bg-white text-[#F58220] text-[11px] font-bold rounded-full mb-2 uppercase tracking-wider border border-[#EEEEF0]">
                DEPARTMENT CATALOG
              </span>
              <h1 className="text-xl sm:text-3xl font-extrabold text-[#09132F] mb-2">{category.name}</h1>
              <p className="text-[#777777] text-xs sm:text-sm leading-relaxed mb-4">{category.description}</p>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#09132F]">
                <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-[#EEEEF0] shadow-2xs">
                  <Package className="w-3.5 h-3.5 text-[#F58220]" />
                  {products.length} Products Available
                </span>
              </div>
            </div>

            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-white border border-[#EEEEF0] shrink-0 p-3 shadow-soft-xs flex items-center justify-center">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/banner.png';
                }}
              />
            </div>
          </div>
        )}

        {/* Search Bar for Category */}
        <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search in ${category?.name || 'category'}...`}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#F8F8F9] border border-[#EEEEF0] rounded-full text-[#171717] focus:outline-none focus:ring-1 focus:ring-[#F58220] focus:border-[#F58220] focus:bg-white transition-all"
            />
          </div>
          <span className="text-xs text-[#777777] font-medium self-end sm:self-center">
            Showing <strong className="text-[#09132F]">{filteredProducts.length}</strong> items
          </span>
        </div>

        {/* Unified Product Cards Grid with skeleton & empty state handling */}
        <ProductGrid
          products={filteredProducts}
          loading={loading}
          emptyTitle="No products found"
          emptyMessage={`No products found in ${category?.name || 'this category'} matching "${searchQuery}".`}
          onResetFilters={searchQuery ? () => setSearchQuery('') : undefined}
        />
      </Container>
    </main>
  );
};
