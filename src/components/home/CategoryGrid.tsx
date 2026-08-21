import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Reveal } from '../common/Reveal';
import { CATEGORIES } from '../../data/categories';

export const CategoryGrid: React.FC = () => {
  const featuredCategories = CATEGORIES.slice(0, 6);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-brandBorder/60">
      <Container>
        <Reveal variant="fade-up">
          <SectionHeading
            eyebrow="OUR COLLECTIONS"
            title="Explore by Product Category"
            description="Discover wholesale and retail supplies categorized for homes, commercial kitchens, retailers, and institutions."
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredCategories.map((category, index) => (
            <Reveal
              key={category.id}
              variant="fade-up"
              delay={index * 60}
            >
              <Link
                to={`/products?category=${category.slug}`}
                className="group flex flex-col bg-brandBg rounded-xl border border-brandBorder overflow-hidden transition-all duration-300 hover:shadow-md hover:border-brandBorder-strong hover:-translate-y-1 h-full"
              >
                {/* Category Image */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    category={category.slug}
                    title={category.name}
                    aspectRatio="video"
                    containerClassName="w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  {category.productCount && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-navy/80 backdrop-blur-sm text-white text-xs font-semibold">
                      {category.productCount}+ Items
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-navy group-hover:text-brandRed transition-colors">
                      {category.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-brandText-muted leading-relaxed line-clamp-2">
                      {category.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-brandBorder/60 flex items-center justify-between text-xs sm:text-sm font-bold text-navy group-hover:text-brandRed transition-colors">
                    <span>View Category</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
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
