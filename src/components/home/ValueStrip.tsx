import React from 'react';
import { PackageCheck, Truck, Tag, Store } from 'lucide-react';
import { Container } from '../common/Container';
import { Reveal } from '../common/Reveal';

const TRUST_POINTS = [
  {
    icon: PackageCheck,
    title: 'Wide Product Range',
    description: '5000+ household, kitchen, plastic & electrical items in stock.',
  },
  {
    icon: Truck,
    title: 'Reliable Sourcing',
    description: 'Dependable supply chain and prompt order coordination.',
  },
  {
    icon: Tag,
    title: 'Fair Wholesale Rates',
    description: 'Competitive pricing tailored for retailers and bulk buyers.',
  },
  {
    icon: Store,
    title: 'Physical Storefront',
    description: 'Visit our store in Hetauda-2, Palpasa Road for direct pickup.',
  },
];

export const ValueStrip: React.FC = () => {
  return (
    <section className="py-8 sm:py-10 bg-white border-b border-brandBorder shadow-sm">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {TRUST_POINTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={index}
                variant="fade-up"
                delay={index * 60}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-brandRed/10 text-brandRed flex items-center justify-center shrink-0 border border-brandRed/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-navy">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-brandText-muted mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
