import React from 'react';
import { Package, Truck, Tag, Store } from 'lucide-react';
import { Container } from '../common/Container';
import { Reveal } from '../common/Reveal';

const VALUE_ITEMS = [
  {
    icon: Package,
    number: '5000+',
    title: 'Products',
    desktopTitle: 'Wide Product Range',
    desktopDesc: '5000+ household, cookware, plastic & electrical items.',
  },
  {
    icon: Truck,
    number: 'Fast',
    title: 'Supply',
    desktopTitle: 'Reliable Supply Chain',
    desktopDesc: 'Dependable sourcing and prompt regional dispatch.',
  },
  {
    icon: Tag,
    number: 'Direct',
    title: 'Wholesale Rates',
    desktopTitle: 'Fair Wholesale Rates',
    desktopDesc: 'Tiered volume pricing tailored for shops & buyers.',
  },
  {
    icon: Store,
    number: 'Local',
    title: 'Physical Store',
    desktopTitle: 'Local Storefront',
    desktopDesc: 'Palpasa Road, Hetauda-2 for pickup and inspection.',
  },
];

export const ValueStrip: React.FC = () => {
  return (
    <section className="py-4 sm:py-7 lg:py-8 bg-white border-b border-brandBorder shadow-sm">
      <Container>
        {/* Mobile: Flat, minimal 2x2 visual strip with subtle dividing lines (No heavy box cards!) */}
        <div className="grid grid-cols-2 lg:hidden divide-x divide-y divide-brandBorder/60 border border-brandBorder/60 rounded-xl overflow-hidden bg-slate-50/50">
          {VALUE_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2.5 p-3"
              >
                <div className="w-8 h-8 rounded-lg bg-brandRed/10 text-brandRed flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-extrabold text-navy block leading-none truncate">
                    {item.number} {item.title}
                  </span>
                  <span className="text-[10px] text-brandText-muted block mt-0.5 capitalize">
                    {index === 0 ? 'In Stock' : index === 1 ? 'Prompt Dispatch' : index === 2 ? 'Tiered Savings' : 'Hetauda-2'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: 4-Column Layout */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
          {VALUE_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={index}
                variant="fade-up"
                delay={index * 50}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-brandRed/10 text-brandRed flex items-center justify-center shrink-0 border border-brandRed/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy">
                      {item.desktopTitle}
                    </h3>
                    <p className="text-xs text-brandText-muted mt-0.5 leading-relaxed">
                      {item.desktopDesc}
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
