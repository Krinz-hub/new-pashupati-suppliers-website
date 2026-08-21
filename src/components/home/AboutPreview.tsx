import React from 'react';
import { ArrowRight, Award } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Reveal } from '../common/Reveal';
import { BUSINESS } from '../../config/business';

export const AboutPreview: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-brandBg border-b border-brandBorder/60 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Store Video Visual (5 cols) */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <Reveal variant="fade-right" delay={100}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative bg-white p-2.5 rounded-2xl shadow-sm border border-brandBorder overflow-hidden">
                  <div className="rounded-xl overflow-hidden min-h-[360px] sm:min-h-[420px] bg-slate-100 relative">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full min-h-[360px] sm:min-h-[420px] object-cover rounded-xl block"
                      poster="/assets/placeholders/store_front.webp"
                    >
                      <source src="/assets/placeholders/store_front.webm" type="video/webm" />
                      <source src="/assets/store_front.webm" type="video/webm" />
                      <img
                        src="/assets/placeholders/store_front.webp"
                        alt="Inside New Pashupati Suppliers store"
                        className="w-full h-full min-h-[360px] sm:min-h-[420px] object-cover rounded-xl block"
                      />
                    </video>
                  </div>

                  {/* Experience Badge */}
                  <div className="absolute top-5 left-5 bg-navy text-white px-4 py-3 rounded-xl shadow-md border border-navy-light max-w-[170px]">
                    <div className="flex items-center gap-1.5 text-brandOrange mb-0.5">
                      <Award className="w-4 h-4" />
                      <span className="text-lg font-extrabold">{BUSINESS.stats.experienceYears}</span>
                    </div>
                    <p className="text-xs font-medium text-gray-200 leading-tight">
                      Years of Trust &amp; Service
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Company Story & Stats (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left order-1 lg:order-2">
            <Reveal variant="fade-left" delay={120}>
              <span className="text-xs font-bold uppercase tracking-widest text-brandRed mb-3">
                ABOUT OUR BUSINESS
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight leading-tight text-balance">
                Your Trusted Supply Partner in Hetauda
              </h2>

              <p className="mt-4 text-sm sm:text-base text-brandText-muted leading-relaxed">
                New Pashupati Suppliers provides dependable access to household essentials, kitchenware, plastics, cleaning tools, and electrical supplies. Serving families, retailers, and commercial buyers with honest trade and consistent inventory.
              </p>
            </Reveal>

            {/* Statistics Counters */}
            <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full">
              <Reveal variant="fade-up" delay={180} className="w-full">
                <div className="bg-white p-4 rounded-xl border border-brandBorder shadow-sm text-center">
                  <span className="text-2xl sm:text-3xl font-extrabold text-navy block">
                    {BUSINESS.stats.products}
                  </span>
                  <span className="text-xs font-medium text-brandText-muted mt-1 block">
                    Products
                  </span>
                </div>
              </Reveal>

              <Reveal variant="fade-up" delay={240} className="w-full">
                <div className="bg-white p-4 rounded-xl border border-brandBorder shadow-sm text-center">
                  <span className="text-2xl sm:text-3xl font-extrabold text-brandRed block">
                    {BUSINESS.stats.customers}
                  </span>
                  <span className="text-xs font-medium text-brandText-muted mt-1 block">
                    Happy Clients
                  </span>
                </div>
              </Reveal>

              <Reveal variant="fade-up" delay={300} className="w-full">
                <div className="bg-white p-4 rounded-xl border border-brandBorder shadow-sm text-center">
                  <span className="text-2xl sm:text-3xl font-extrabold text-navy block">
                    {BUSINESS.stats.experienceYears}
                  </span>
                  <span className="text-xs font-medium text-brandText-muted mt-1 block">
                    Years Active
                  </span>
                </div>
              </Reveal>

              <Reveal variant="fade-up" delay={360} className="w-full">
                <div className="bg-white p-4 rounded-xl border border-brandBorder shadow-sm text-center">
                  <span className="text-2xl sm:text-3xl font-extrabold text-brandRed block">
                    {BUSINESS.stats.partners}
                  </span>
                  <span className="text-xs font-medium text-brandText-muted mt-1 block">
                    Partners
                  </span>
                </div>
              </Reveal>
            </div>

            <div className="mt-8">
              <Reveal variant="fade-up" delay={420}>
                <Button
                  to="/about"
                  size="md"
                  variant="secondary"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
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
