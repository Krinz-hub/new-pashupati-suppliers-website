import React from 'react';
import { Layers, ShieldCheck, BadgePercent, Building2 } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Reveal } from '../common/Reveal';

const REASONS = [
  {
    icon: Layers,
    title: 'Wide Product Range',
    description: 'Over 5,000 products spanning cookware, plastics, cleaning, electronics, and daily utility essentials under one roof.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable Supply Chain',
    description: 'Direct relationships with quality manufacturers ensure steady inventory availability and dependable fulfillment.',
  },
  {
    icon: BadgePercent,
    title: 'Fair Wholesale Rates',
    description: 'Transparent pricing with volume discounts structured to help retail shops and commercial buyers maximize value.',
  },
  {
    icon: Building2,
    title: 'Local Storefront & Service',
    description: 'Visit our store in Hetauda-2, Palpasa Road for direct product inspection, hands-on assistance, and local pickup.',
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-brandBg border-b border-brandBorder/60">
      <Container>
        <Reveal variant="fade-up">
          <SectionHeading
            eyebrow="OUR ADVANTAGE"
            title="Why Choose New Pashupati Suppliers"
            description="We combine extensive inventory variety with honest pricing and dependable local supply coordination."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {REASONS.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal
                key={index}
                variant="fade-up"
                delay={index * 70}
              >
                <div className="bg-white p-6 sm:p-7 rounded-xl border border-brandBorder shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-start h-full">
                  <div className="w-11 h-11 rounded-lg bg-brandRed/10 text-brandRed flex items-center justify-center mb-4 border border-brandRed/20">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-navy">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-brandText-muted leading-relaxed">
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
