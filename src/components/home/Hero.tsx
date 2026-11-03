import React from 'react';
import { ArrowRight, ShieldCheck, PackageCheck, Sparkles, Building2 } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Reveal } from '../common/Reveal';
import { BUSINESS } from '../../config/business';

export const Hero: React.FC = () => {
  return (
    <section className="pt-3 sm:pt-6 pb-4 sm:pb-8 bg-white">
      <Container>
        {/* Large Rounded Hero Banner with Image as Background */}
        <div
          className="relative rounded-[16px] overflow-hidden border border-[#EEEEF0] bg-cover bg-center sm:bg-right bg-no-repeat min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] flex items-center"
          style={{ backgroundImage: `url('/assets/banner.png')` }}
        >
          {/* Smooth directional gradient overlay for legibility and seamless image blending */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/40 sm:via-white/80 sm:to-transparent pointer-events-none" />

          {/* Subtle oversized background watermark typography */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 text-[100px] sm:text-[160px] lg:text-[210px] font-black tracking-tighter text-[#09132F]/[0.03] select-none pointer-events-none uppercase leading-none pr-4"
            aria-hidden="true"
          >
            SUPPLY
          </div>

          <div className="relative z-10 w-full p-5 sm:p-8 lg:p-12">
            <div className="max-w-2xl flex flex-col items-start text-left">
              <Reveal variant="fade-up" delay={20}>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs border border-[#EEEEF0] shadow-2xs text-[11px] sm:text-xs font-semibold text-[#09132F] mb-3 sm:mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-[#F58220]" />
                  <span>WHOLESALE &amp; RETAIL SUPPLIER • {BUSINESS.location.split(',')[0].toUpperCase()}</span>
                </div>
              </Reveal>

              <Reveal variant="fade-up" delay={60}>
                <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-black text-[#09132F] tracking-tight leading-[1.12] text-balance">
                  Everything Your Business and Home Needs
                </h1>
              </Reveal>

              <Reveal variant="fade-up" delay={100}>
                <p className="mt-2.5 sm:mt-4 text-xs sm:text-base text-[#777777] leading-relaxed max-w-xl text-balance font-medium">
                  Reliable everyday essentials, kitchenware, plastics, and wholesale supplies sourced directly for retailers, hotels, and households across Nepal.
                </p>
              </Reveal>

              <Reveal variant="fade-up" delay={140}>
                {/* Actions */}
                <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
                  <Button
                    to="/products"
                    size="md"
                    variant="primary"
                    className="flex-1 sm:flex-initial text-xs sm:text-sm shadow-xs hover:shadow"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Browse Catalog
                  </Button>

                  <Button
                    to="/wholesale"
                    size="md"
                    variant="secondary"
                    className="flex-1 sm:flex-initial text-xs sm:text-sm bg-white/90 backdrop-blur-xs hover:bg-white border-[#EEEEF0]"
                  >
                    Wholesale Inquiries
                  </Button>
                </div>
              </Reveal>

              <Reveal variant="fade-up" delay={180}>
                {/* Trust Badges Row */}
                <div className="mt-5 sm:mt-8 pt-3 sm:pt-4 border-t border-[#EEEEF0]/80 flex flex-wrap items-center gap-2.5 sm:gap-4 text-[11px] sm:text-xs font-semibold text-[#09132F] w-full">
                  <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#EEEEF0]/80 shadow-2xs">
                    <PackageCheck className="w-4 h-4 text-[#F58220] shrink-0" />
                    <span>5,000+ Sourced Items</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#EEEEF0]/80 shadow-2xs">
                    <ShieldCheck className="w-4 h-4 text-[#13984B] shrink-0" />
                    <span>Verified Quality</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#EEEEF0]/80 shadow-2xs">
                    <Building2 className="w-4 h-4 text-[#09132F] shrink-0" />
                    <span>Hetauda Storefront</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
