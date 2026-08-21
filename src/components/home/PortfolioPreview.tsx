import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Reveal } from '../common/Reveal';
import { GALLERY_ITEMS } from '../../data/gallery';

export const PortfolioPreview: React.FC = () => {
  const previewItems = GALLERY_ITEMS.slice(0, 4);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-brandBorder/60">
      <Container>
        <Reveal variant="fade-up">
          <SectionHeading
            eyebrow="OUR STORE &amp; OPERATIONS"
            title="Inside New Pashupati Suppliers"
            description="A glimpse into our physical storefront, product displays, and inventory staging in Hetauda, Nepal."
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {previewItems.map((item, index) => (
            <Reveal
              key={item.id}
              variant="fade-up"
              delay={index * 60}
            >
              <Link
                to="/about"
                className="group relative rounded-xl overflow-hidden bg-slate-100 border border-brandBorder shadow-sm hover:shadow-md transition-all duration-300 block h-full"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.alt}
                    category={item.category}
                    title={item.title}
                    aspectRatio="portrait"
                    containerClassName="w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brandOrange block mb-0.5">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-bold truncate">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Reveal variant="fade-up" delay={240}>
            <Button
              to="/about"
              size="md"
              variant="outline"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Learn More About Our Store
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
