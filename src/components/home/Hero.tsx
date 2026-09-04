import React from 'react';
import { ArrowRight, ShieldCheck, PackageCheck, Store } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Reveal } from '../common/Reveal';
import { BUSINESS } from '../../config/business';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-0 sm:min-h-[620px] lg:min-h-[680px] flex items-center pt-24 pb-8 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden border-b border-brandBorder/60 bg-white">
      {/* Background Banner Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-no-repeat bg-right sm:bg-center-right lg:bg-[center_right_10%] xl:bg-right"
        style={{
          backgroundImage: "url('/assets/banner.png')",
        }}
        aria-hidden="true"
      />

      {/* Light Gradient Overlay for crisp mobile and desktop typography */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none bg-gradient-to-b from-white/95 via-white/92 to-white/75 lg:hidden"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.94) 40%, rgba(255,255,255,0.72) 58%, rgba(255,255,255,0.18) 78%, rgba(255,255,255,0.02) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Hero Content Container */}
      <Container className="relative z-10 w-full">
        <div className="max-w-xl sm:max-w-2xl lg:max-w-[620px] xl:max-w-[660px] flex flex-col items-start text-left">
          <Reveal variant="fade-up" delay={40}>
            <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-brandRed mb-2 sm:mb-4 bg-brandRed/10 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-md">
              WHOLESALE &amp; RETAIL SUPPLIER • {BUSINESS.location.toUpperCase()}
            </span>
          </Reveal>

          <Reveal variant="fade-up" delay={100}>
            {/* Main Heading (Max 3 lines on mobile) */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[54px] font-extrabold text-navy tracking-tight leading-[1.18] sm:leading-[1.12] text-balance">
              Everything Your Business and Home Needs
            </h1>
          </Reveal>

          <Reveal variant="fade-up" delay={160}>
            {/* Supporting Copy (Single short sentence) */}
            <p className="mt-2.5 sm:mt-5 text-xs sm:text-lg md:text-xl text-brandText leading-relaxed text-balance max-w-xl">
              Reliable everyday essentials, kitchenware, plastics, and wholesale supplies across Nepal.
            </p>
          </Reveal>

          <Reveal variant="fade-up" delay={220}>
            {/* CTA Buttons */}
            <div className="mt-4 sm:mt-8 flex flex-row items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
              <Button
                to="/products"
                size="md"
                variant="primary"
                className="flex-1 sm:flex-initial text-xs sm:text-base py-2.5 sm:py-3.5"
                rightIcon={<ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              >
                Explore Products
              </Button>

              <Button
                to="/contact"
                size="md"
                variant="outline"
                className="flex-1 sm:flex-initial text-xs sm:text-base py-2.5 sm:py-3.5 bg-white/90 backdrop-blur-sm hover:bg-navy hover:text-white"
              >
                Contact Us
              </Button>
            </div>
          </Reveal>

          <Reveal variant="fade-up" delay={280}>
            {/* Minimal Trust Indicator Chips */}
            <div className="mt-5 sm:mt-9 pt-3.5 sm:pt-6 border-t border-brandBorder/70 flex items-center gap-2 sm:gap-6 text-[11px] sm:text-sm font-semibold text-navy w-full">
              <div className="flex items-center gap-1.5 bg-slate-100/80 sm:bg-transparent px-2 py-1 sm:p-0 rounded-md border border-slate-200/60 sm:border-0">
                <PackageCheck className="w-3.5 h-3.5 text-brandRed shrink-0" />
                <span>Bulk</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100/80 sm:bg-transparent px-2 py-1 sm:p-0 rounded-md border border-slate-200/60 sm:border-0">
                <ShieldCheck className="w-3.5 h-3.5 text-brandRed shrink-0" />
                <span>Trusted</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100/80 sm:bg-transparent px-2 py-1 sm:p-0 rounded-md border border-slate-200/60 sm:border-0">
                <Store className="w-3.5 h-3.5 text-brandRed shrink-0" />
                <span>Local</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
