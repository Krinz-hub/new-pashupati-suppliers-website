import React from 'react';
import { ArrowRight, Package, Users, Award, Handshake } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Reveal } from '../common/Reveal';
import { BUSINESS } from '../../config/business';

export const AboutPreview: React.FC = () => {
  return (
    <section className="py-10 sm:py-20 lg:py-24 bg-brandBg border-b border-brandBorder/60">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left Column: Visual Media (5 cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <Reveal variant="fade-right" delay={80}>
              <div className="relative rounded-xl overflow-hidden shadow-sm border border-brandBorder bg-slate-900 group">
                <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/assets/gallery/store-facade.jpg"
                  >
                    <source src="/assets/store-tour.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Subtle Experience Badge */}
                <div className="absolute top-2.5 left-2.5 sm:top-5 sm:left-5 bg-navy/90 backdrop-blur-sm text-white px-2.5 py-1.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl shadow-md border border-navy-light max-w-[130px] sm:max-w-[170px]">
                  <div className="flex items-center gap-1 sm:gap-1.5 text-brandOrange mb-0.5">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-lg font-extrabold">{BUSINESS.stats.experienceYears}</span>
                  </div>
                  <p className="text-[9px] sm:text-xs font-medium text-gray-200 leading-tight">
                    Years of Trust
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Company Story & Typography-Led Stats (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left order-1 lg:order-2">
            <Reveal variant="fade-left" delay={100}>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-brandRed mb-1 sm:mb-2.5">
                ABOUT US
              </span>

              <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight leading-tight text-balance">
                Your Trusted Supply Partner
              </h2>

              <p className="mt-2 sm:mt-3.5 text-xs sm:text-base text-brandText-muted leading-relaxed max-w-xl">
                Reliable everyday essentials for homes, retailers, and commercial businesses across Nepal.
              </p>
            </Reveal>

            {/* Typography-Led Stats Composition (Minimal 2x2 grid with subtle separators - NO bulky box cards!) */}
            <div className="mt-4 sm:mt-6 w-full rounded-xl bg-white border border-brandBorder/80 p-3 sm:p-5 shadow-sm">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-brandBorder/60">
                {/* Stat 1 */}
                <div className="p-2 sm:p-3 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-md bg-brandRed/10 text-brandRed flex items-center justify-center shrink-0">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-base sm:text-2xl font-extrabold text-navy block leading-none">
                      {BUSINESS.stats.products}
                    </span>
                    <span className="text-[10px] sm:text-xs text-brandText-muted font-medium mt-0.5 block">
                      Products
                    </span>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="p-2 sm:p-3 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-md bg-brandOrange/10 text-brandOrange flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-base sm:text-2xl font-extrabold text-navy block leading-none">
                      {BUSINESS.stats.customers}
                    </span>
                    <span className="text-[10px] sm:text-xs text-brandText-muted font-medium mt-0.5 block">
                      Clients
                    </span>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="p-2 sm:p-3 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-md bg-brandRed/10 text-brandRed flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-base sm:text-2xl font-extrabold text-navy block leading-none">
                      {BUSINESS.stats.experienceYears}
                    </span>
                    <span className="text-[10px] sm:text-xs text-brandText-muted font-medium mt-0.5 block">
                      Years
                    </span>
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="p-2 sm:p-3 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-md bg-navy/10 text-navy flex items-center justify-center shrink-0">
                    <Handshake className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-base sm:text-2xl font-extrabold text-navy block leading-none">
                      {BUSINESS.stats.partners}
                    </span>
                    <span className="text-[10px] sm:text-xs text-brandText-muted font-medium mt-0.5 block">
                      Partners
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 w-full sm:w-auto">
              <Reveal variant="fade-up" delay={200}>
                <Button
                  to="/about"
                  size="md"
                  variant="secondary"
                  className="w-full sm:w-auto text-xs sm:text-sm py-2 sm:py-2.5"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                >
                  Our Full Story &amp; Facility
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
