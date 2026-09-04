import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Search, Package } from 'lucide-react';
import { Container } from '../components/common/Container';
import { ProductCard } from '../components/products/ProductCard';
import { fetchProducts, fetchCategories, ProductItem, CategoryItem } from '../services/api';

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
      const found = catList.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
      setCategory(found || { id: slug, name: slug.toUpperCase(), slug, description: 'Product category', image: '/assets/banner.png' });
    });

    fetchProducts({ category: slug }).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, [slug]);

  const filteredProducts = products.filter((p) =>
    searchQuery ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  return (
    <main className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <Container>
        <div className="mb-6">
          <Link to="/categories" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brandRed transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Categories</span>
          </Link>
        </div>

        {category && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 mb-10 shadow-sm border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="inline-block px-3 py-1 bg-brandRed/10 text-brandRed text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                CATEGORY CATALOG
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3">{category.name}</h1>
              <p className="text-slate-600 text-base leading-relaxed mb-6">{category.description}</p>
              <div className="flex items-center gap-4 text-sm font-semibold text-slate-500">
                <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                  <Package className="w-4 h-4 text-brandRed" />
                  {products.length} Products Available
                </span>
              </div>
            </div>

            <div className="w-full md:w-72 aspect-[4/3] rounded-2xl overflow-hidden shadow-inner bg-slate-100 shrink-0">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/banner.png';
                }}
              />
            </div>
          </div>
        )}

        {/* Search filter within Category */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={`Search in ${category?.name || 'category'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brandRed/20 focus:border-brandRed transition-all"
            />
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-72 bg-slate-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id || product.id || product.slug} product={{ ...product, id: product.id || product.slug || product._id || 'prod' }} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <h3 className="text-lg font-bold text-navy mb-2">No matching products found</h3>
            <p className="text-slate-500 text-sm mb-4">Try clearing search term or check all available categories.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-brandRed text-white rounded-lg text-sm font-semibold hover:bg-brandRed/90 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </Container>
    </main>
  );
};
