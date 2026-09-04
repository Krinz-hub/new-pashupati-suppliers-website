import React from 'react';
import { ArrowRight, Truck, CheckCircle2 } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Reveal } from '../common/Reveal';

export const WholesaleCTA: React.FC = () => {
  return (
    <section className="py-10 sm:py-20 bg-navy-dark text-white border-b border-navy-light/60 overflow-hidden relative">
      {/* Subtle decorative glow/accent */}
      <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-brandRed/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-brandOrange/10 blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <Reveal variant="fade-right" delay={40}>
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold tracking-wider sm:tracking-widest uppercase text-brandOrange mb-2 sm:mb-3">
                <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                WHOLESALE &amp; BULK SUPPLY
              </span>

              <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight text-balance">
                Looking for Wholesale Supply in Bulk?
              </h2>

              <p className="mt-2 sm:mt-3.5 text-xs sm:text-base text-gray-300 leading-relaxed max-w-xl">
                Competitive tiered volume rates and reliable dispatch across Nepal for retail shops, hotels, and institutions.
              </p>

              {/* Minimal bullet badges */}
              <div className="mt-3.5 sm:mt-6 flex flex-wrap gap-2 sm:gap-6 text-xs text-gray-300 font-medium">
                <div className="flex items-center gap-1.5 bg-navy-light/50 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brandOrange shrink-0" />
                  <span>Tiered bulk rates</span>
                </div>
                <div className="flex items-center gap-1.5 bg-navy-light/50 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brandOrange shrink-0" />
                  <span>Custom orders</span>
                </div>
                <div className="flex items-center gap-1.5 bg-navy-light/50 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brandOrange shrink-0" />
                  <span>Regional delivery</span>
                </div>
              </div>

              <div className="mt-4 sm:mt-8 flex flex-row items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
                <Button
                  to="/contact?type=wholesale"
                  size="md"
                  variant="primary"
                  className="flex-1 sm:flex-initial text-xs sm:text-sm py-2.5 sm:py-3"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                >
                  Request Quote
                </Button>

                <Button
                  to="/wholesale"
                  size="md"
                  variant="outline"
                  className="flex-1 sm:flex-initial text-xs sm:text-sm py-2.5 sm:py-3 border-gray-400 text-white hover:bg-white hover:text-navy"
                >
                  Learn More
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Right Column: 3-Step Mini Flow */}
          <div className="lg:col-span-5">
            <Reveal variant="fade-left" delay={100}>
              <div className="bg-navy-light/40 p-3.5 sm:p-7 rounded-xl border border-navy-light/60">
                <h3 className="text-xs sm:text-base font-bold text-white mb-2.5 sm:mb-4">
                  Simple 3-Step Wholesale Process
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-1 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-300">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-3 p-2 sm:p-0 rounded-lg bg-navy/60 sm:bg-transparent border border-navy-light/30 sm:border-0">
                    <span className="w-6 h-6 rounded-full bg-brandRed text-white flex items-center justify-center font-bold text-xs shrink-0">
                      1
                    </span>
                    <div>
                      <p className="font-semibold text-white text-[11px] sm:text-sm">Specify Items</p>
                      <p className="text-gray-400 text-[10px] sm:text-xs mt-0.5 hidden sm:block">Send your requirements.</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-3 p-2 sm:p-0 rounded-lg bg-navy/60 sm:bg-transparent border border-navy-light/30 sm:border-0">
                    <span className="w-6 h-6 rounded-full bg-brandRed text-white flex items-center justify-center font-bold text-xs shrink-0">
                      2
                    </span>
                    <div>
                      <p className="font-semibold text-white text-[11px] sm:text-sm">Get Quote</p>
                      <p className="text-gray-400 text-[10px] sm:text-xs mt-0.5 hidden sm:block">Clear unit prices.</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-3 p-2 sm:p-0 rounded-lg bg-navy/60 sm:bg-transparent border border-navy-light/30 sm:border-0">
                    <span className="w-6 h-6 rounded-full bg-brandRed text-white flex items-center justify-center font-bold text-xs shrink-0">
                      3
                    </span>
                    <div>
                      <p className="font-semibold text-white text-[11px] sm:text-sm">Fast Dispatch</p>
                      <p className="text-gray-400 text-[10px] sm:text-xs mt-0.5 hidden sm:block">Pickup or regional delivery.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};
