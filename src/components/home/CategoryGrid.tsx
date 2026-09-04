import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Reveal } from '../common/Reveal';
import { useCategories } from '../../hooks/useCategories';
import { CATEGORIES as DEFAULT_CATEGORIES } from '../../data/categories';

export const CategoryGrid: React.FC = () => {
  const { categories: dynamicCategories } = useCategories();
  const allCategories = dynamicCategories.length > 0 ? dynamicCategories : DEFAULT_CATEGORIES;
  const featuredCategories = allCategories.slice(0, 6);

  return (
    <section className="py-10 sm:py-20 lg:py-24 bg-white border-b border-brandBorder/60">
      <Container>
        <Reveal variant="fade-up">
          <SectionHeading
            eyebrow="OUR COLLECTIONS"
            title="Explore by Product Category"
            description="Discover wholesale and retail supplies categorized for homes, commercial kitchens, retailers, and institutions."
          />
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {featuredCategories.map((category, index) => (
            <Reveal
              key={category.id}
              variant="fade-up"
              delay={index * 50}
            >
              <Link
                to={`/products?category=${category.slug}`}
                className="group flex flex-col bg-brandBg rounded-xl border border-brandBorder overflow-hidden transition-all duration-300 hover:shadow-md hover:border-brandBorder-strong hover:-translate-y-1 h-full"
              >
                {/* Category Image */}
                <div className="relative aspect-[4/3] sm:h-52 w-full overflow-hidden bg-slate-100">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    category={category.slug}
                    title={category.name}
                    aspectRatio="video"
                    containerClassName="w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  {category.productCount !== null && category.productCount !== undefined && (
                    <span className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-navy/85 backdrop-blur-sm text-white text-[10px] sm:text-xs font-semibold">
                      {category.productCount}+ <span className="hidden sm:inline">Items</span>
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-3 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs sm:text-xl font-bold text-navy group-hover:text-brandRed transition-colors truncate sm:whitespace-normal">
                      {category.name}
                    </h3>
                    <p className="hidden sm:block mt-2 text-xs sm:text-sm text-brandText-muted leading-relaxed line-clamp-2">
                      {category.description}
                    </p>
                  </div>

                  <div className="mt-2 sm:mt-4 pt-2 sm:pt-3.5 border-t border-brandBorder/60 flex items-center justify-between text-[11px] sm:text-sm font-bold text-navy group-hover:text-brandRed transition-colors">
                    <span className="hidden sm:inline">View Category</span>
                    <span className="sm:hidden text-brandRed font-semibold">Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
