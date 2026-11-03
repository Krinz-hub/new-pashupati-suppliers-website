import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Package } from 'lucide-react';
import { Container } from '../components/common/Container';
import { PageHero } from '../components/common/PageHero';
import { fetchCategories, CategoryItem } from '../services/api';
import { CATEGORIES as DEFAULT_CATEGORIES } from '../data/categories';
import { Reveal } from '../components/common/Reveal';

export const Categories: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories().then((res) => {
      setCategories(res.length > 0 ? res : DEFAULT_CATEGORIES);
      setLoading(false);
    });
  }, []);

  return (
    <main className="bg-white min-h-screen">
      {/* Unified Split Page Header */}
      <PageHero
        align="split"
        eyebrow="MARKETPLACE DEPARTMENTS"
        title="All Product Categories"
        description="From commercial kitchen supplies to heavy molded plastics and everyday home utilities in Hetauda, Nepal."
      />

      {/* Grid of Categories */}
      <section className="py-6 sm:py-10 bg-white">
        <Container>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-56 bg-[#F8F8F9] animate-pulse rounded-[16px]" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
              {categories.map((cat, index) => (
                <Reveal key={cat.id || cat.slug} variant="fade-up" delay={index * 30}>
                  <Link
                    to={`/products?category=${cat.slug}`}
                    className="group bg-[#F8F8F9] hover:bg-white rounded-[16px] overflow-hidden border border-[#EEEEF0] hover:border-[#DCDCDE] hover:shadow-soft-md transition-all duration-[180ms] flex flex-col justify-between p-4 sm:p-5 h-full"
                  >
                    <div>
                      {/* Category Thumbnail */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border border-[#EEEEF0] mx-auto mb-3.5 flex items-center justify-center p-2.5 overflow-hidden group-hover:scale-105 group-hover:border-[#F58220] transition-all shadow-2xs">
                        {cat.image ? (
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-full object-cover rounded-full"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = '/assets/banner.png';
                            }}
                          />
                        ) : (
                          <Package className="w-7 h-7 text-[#F58220]" />
                        )}
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-[#09132F] group-hover:text-[#F58220] transition-colors text-center mb-1">
                        {cat.name}
                      </h3>

                      <p className="text-[11px] sm:text-xs text-[#777777] text-center line-clamp-2 leading-relaxed mb-3">
                        {cat.description}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-[#EEEEF0] flex items-center justify-between text-xs font-semibold text-[#09132F] group-hover:text-[#F58220]">
                      <span className="text-[11px] text-[#777777] font-medium">
                        {cat.productCount ? `${cat.productCount}+ items` : 'In Stock'}
                      </span>
                      <span className="inline-flex items-center gap-0.5">
                        <span>Browse</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  );
};
