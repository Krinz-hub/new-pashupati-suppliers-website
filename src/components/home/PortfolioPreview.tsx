import React from 'react';
import { ArrowRight, Images } from 'lucide-react';
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
    <section className="py-10 sm:py-20 lg:py-24 bg-brandBg border-b border-brandBorder/60">
      <Container>
        <Reveal variant="fade-up">
          <SectionHeading
            eyebrow="STORE &amp; INVENTORY TOUR"
            title="Inside Our Store &amp; Warehouse"
            description="A visual glimpse into our physical storefront, stocked aisles, and inventory staging in Hetauda, Nepal."
          />
        </Reveal>

        {/* Mobile: Horizontal Swipe Gallery (Differentiated from the 2-column product grid!) */}
        <div className="lg:hidden flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-3 -mx-4 px-4 pb-2 pt-1">
          {previewItems.map((item) => (
            <div
              key={item.id}
              className="w-[78vw] shrink-0 snap-center rounded-xl overflow-hidden bg-slate-900 border border-brandBorder shadow-sm relative group"
            >
              <Link to="/portfolio" className="block relative aspect-[4/3] w-full overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.alt}
                  category={item.category}
                  title={item.title}
                  aspectRatio="portrait"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-brandOrange block mb-0.5">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold truncate">
                    {item.title}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile swipe hint indicator */}
        <div className="lg:hidden flex items-center justify-center gap-1.5 mt-2.5 text-[11px] text-brandText-muted">
          <Images className="w-3.5 h-3.5 text-brandRed" />
          <span>Swipe to explore store gallery</span>
        </div>

        {/* Desktop: 4-Column Photo Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {previewItems.map((item, index) => (
            <Reveal
              key={item.id}
              variant="fade-up"
              delay={index * 50}
            >
              <Link
                to="/portfolio"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
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

        <div className="mt-5 sm:mt-10 text-center">
          <Reveal variant="fade-up" delay={150}>
            <Button
              to="/portfolio"
              size="md"
              variant="outline"
              className="w-full sm:w-auto text-xs sm:text-sm py-2.5 sm:py-3"
              rightIcon={<ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            >
              View Full Gallery &amp; Photos
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
