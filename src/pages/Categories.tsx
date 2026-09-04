import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Package } from 'lucide-react';
import { Container } from '../components/common/Container';
import { fetchCategories, CategoryItem } from '../services/api';

export const Categories: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories().then((res) => {
      setCategories(res);
      setLoading(false);
    });
  }, []);

  return (
    <main className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <Container>
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold tracking-widest text-brandRed uppercase mb-2 block">
            OUR PRODUCT CATEGORIES
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy tracking-tight mb-4">
            Comprehensive Supply Lines
          </h1>
          <p className="text-base sm:text-lg text-slate-600">
            From household essentials to industrial plastic containers and kitchenware, explore our broad inventory in Hetauda.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-slate-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id || cat.slug}
                to={`/categories/${cat.slug}`}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col justify-between"
              >
                <div className="aspect-[16/9] overflow-hidden bg-slate-100 relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/assets/banner.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-navy flex items-center gap-1 shadow-sm">
                    <Package className="w-3.5 h-3.5 text-brandRed" />
                    <span>{cat.productCount || '40+'} Items</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-navy mb-2 group-hover:text-brandRed transition-colors">
                      {cat.name}
                    </h2>
                    <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                      {cat.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-bold text-brandRed pt-4 border-t border-slate-100">
                    <span>Explore Products</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
};
