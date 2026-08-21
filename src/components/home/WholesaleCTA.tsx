import React from 'react';
import { ArrowRight, Truck, CheckCircle2 } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Reveal } from '../common/Reveal';

export const WholesaleCTA: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-navy-dark text-white border-b border-navy-light/60 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            <Reveal variant="fade-right" delay={50}>
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-brandOrange mb-3">
                <Truck className="w-4 h-4" />
                WHOLESALE &amp; BULK SUPPLY
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight text-balance">
                Looking for Wholesale Supply in Bulk?
              </h2>

              <p className="mt-3.5 text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
                Whether you run a local retail shop, hotel, school, or require high-volume household goods, we provide competitive tiered bulk pricing and reliable dispatch across Nepal.
              </p>

              <div className="mt-6 flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-gray-300 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brandOrange shrink-0" />
                  <span>Tiered bulk discounts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brandOrange shrink-0" />
                  <span>Custom mixed orders</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brandOrange shrink-0" />
                  <span>Hetauda store pickup &amp; delivery</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                <Button
                  to="/contact?type=wholesale"
                  size="md"
                  variant="primary"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Request Wholesale Quote
                </Button>

                <Button
                  to="/wholesale"
                  size="md"
                  variant="outline"
                  className="border-gray-400 text-white hover:bg-white hover:text-navy"
                >
                  Learn About Wholesale
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-4">
            <Reveal variant="fade-left" delay={150}>
              <div className="bg-navy-light/40 p-6 sm:p-7 rounded-xl border border-navy-light/60">
                <h3 className="text-base font-bold text-white mb-4">
                  Simple 3-Step Wholesale Process
                </h3>
                <div className="space-y-4 text-xs sm:text-sm text-gray-300">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-brandRed text-white flex items-center justify-center font-bold text-xs shrink-0">
                      1
                    </span>
                    <div>
                      <p className="font-semibold text-white">Tell Us What You Need</p>
                      <p className="text-gray-400 text-xs mt-0.5">Send your product list or category requirements.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-brandRed text-white flex items-center justify-center font-bold text-xs shrink-0">
                      2
                    </span>
                    <div>
                      <p className="font-semibold text-white">Receive Transparent Quote</p>
                      <p className="text-gray-400 text-xs mt-0.5">Get clear unit prices and volume rates.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-brandRed text-white flex items-center justify-center font-bold text-xs shrink-0">
                      3
                    </span>
                    <div>
                      <p className="font-semibold text-white">Confirm &amp; Arrange Supply</p>
                      <p className="text-gray-400 text-xs mt-0.5">Fast store pickup or scheduled regional dispatch.</p>
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
