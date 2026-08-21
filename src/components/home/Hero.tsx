import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Store } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Reveal } from '../common/Reveal';
import { BUSINESS } from '../../config/business';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden border-b border-brandBorder/60 bg-white">
      {/* Background Banner Image covering the entire hero */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-no-repeat bg-right sm:bg-center-right lg:bg-[center_right_10%] xl:bg-right"
        style={{
          backgroundImage: "url('/assets/banner.png')",
        }}
        aria-hidden="true"
      />

      {/* Light Gradient Overlay for clean readability on the left while revealing products on the right */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none bg-gradient-to-b from-white/95 via-white/90 to-white/60 lg:hidden"
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
          <Reveal variant="fade-up" delay={50}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-brandRed mb-4">
              WHOLESALE &amp; RETAIL SUPPLIER • {BUSINESS.location.toUpperCase()}
            </span>
          </Reveal>

          <Reveal variant="fade-up" delay={120}>
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[54px] font-extrabold text-navy tracking-tight leading-[1.12] text-balance">
              Everything Your Business and Home Needs
            </h1>
          </Reveal>

          <Reveal variant="fade-up" delay={200}>
            {/* Supporting Copy */}
            <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-brandText leading-relaxed text-balance max-w-xl">
              We supply quality household, kitchen, plastic, electrical, cleaning, and storage essentials for everyday homes, retail shops, and bulk buyers across Nepal.
            </p>
          </Reveal>

          <Reveal variant="fade-up" delay={300}>
            {/* CTA Buttons */}
            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <Button
                to="/products"
                size="lg"
                variant="primary"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Products
              </Button>

              <Button
                to="/contact"
                size="lg"
                variant="outline"
                className="bg-white/90 backdrop-blur-sm hover:bg-navy hover:text-white"
              >
                Contact Us
              </Button>
            </div>
          </Reveal>

          <Reveal variant="fade-up" delay={380}>
            {/* Value Points */}
            <div className="mt-8 sm:mt-11 pt-6 sm:pt-7 border-t border-brandBorder/80 flex flex-wrap items-center gap-5 sm:gap-8 text-xs sm:text-sm font-semibold text-navy">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brandRed shrink-0" />
                <span>Bulk &amp; Retail Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brandRed shrink-0" />
                <span>Verified Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-brandRed shrink-0" />
                <span>Physical Storefront</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
