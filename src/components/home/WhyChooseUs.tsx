import React from 'react';
import { Layers, ShieldCheck, BadgePercent, Building2 } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Reveal } from '../common/Reveal';

const REASONS = [
  {
    icon: Layers,
    title: '5000+ Products',
    label: 'Cookware, plastics, electrical & utilities under one roof',
    description: 'Over 5,000 products spanning cookware, plastics, cleaning, electronics, and daily utility essentials under one roof.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Quality',
    label: 'Direct manufacturer relationships ensure steady supply',
    description: 'Direct relationships with quality manufacturers ensure steady inventory availability and dependable fulfillment.',
  },
  {
    icon: BadgePercent,
    title: 'Wholesale Savings',
    label: 'Transparent volume-tiered pricing for shops and buyers',
    description: 'Transparent pricing with volume discounts structured to help retail shops and commercial buyers maximize value.',
  },
  {
    icon: Building2,
    title: 'Local Storefront',
    label: 'Palpasa Road, Hetauda-2 for physical pickup & inspection',
    description: 'Visit our store in Hetauda-2, Palpasa Road for direct product inspection, hands-on assistance, and local pickup.',
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-10 sm:py-20 lg:py-24 bg-white border-b border-brandBorder/60">
      <Container>
        <Reveal variant="fade-up">
          <SectionHeading
            eyebrow="OUR ADVANTAGE"
            title="Why Choose New Pashupati Suppliers"
            description="We combine extensive inventory variety with honest pricing and dependable local supply coordination."
          />
        </Reveal>

        {/* Mobile: Open, rhythm-changing Feature List with subtle borders (NO identical box cards!) */}
        <div className="lg:hidden space-y-2.5">
          {REASONS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3.5 p-3 rounded-xl bg-brandBg/60 border border-brandBorder/60"
              >
                <div className="w-10 h-10 rounded-lg bg-white text-brandRed flex items-center justify-center shrink-0 border border-brandBorder shadow-xs">
                  <Icon className="w-5 h-5 text-brandRed" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-navy">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-brandText-muted mt-0.5 leading-snug line-clamp-1">
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: 4-Column Advantage Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
          {REASONS.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={index}
                variant="fade-up"
                delay={index * 60}
              >
                <div className="bg-brandBg p-7 rounded-xl border border-brandBorder shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-start h-full">
                  <div className="w-11 h-11 rounded-lg bg-brandRed/10 text-brandRed flex items-center justify-center mb-4 border border-brandRed/20">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-navy">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-brandText-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
