import React from 'react';
import { ArrowRight, Truck, CheckCircle2 } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Reveal } from '../common/Reveal';
import { cn } from '../../utils/helpers';

export interface WholesaleCTAProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  bullets?: string[];
  primaryBtnText?: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
  statNumber?: string;
  statLabel?: string;
  className?: string;
}

export const WholesaleCTA: React.FC<WholesaleCTAProps> = ({
  eyebrow = 'WHOLESALE & BULK SUPPLY DESK',
  title = 'Looking for Bulk Wholesale Orders?',
  description = 'Get volume-tiered pricing, priority fulfillment, and coordinated regional dispatch across Nepal for retail shops, hotels, and institutions.',
  bullets = ['Tiered volume rates', 'Direct store pickup in Hetauda', 'Fast dispatch across Nepal'],
  primaryBtnText = 'Request Wholesale Quote',
  primaryBtnLink = '/contact?type=wholesale',
  secondaryBtnText = 'Learn About Wholesale',
  secondaryBtnLink = '/wholesale',
  statNumber = '5,000+',
  statLabel = 'Active Products in Stock',
  className,
}) => {
  return (
    <section className={cn('py-8 sm:py-12 bg-white', className)}>
      <Container>
        <div className="relative rounded-[16px] bg-[#09132F] text-white p-6 sm:p-10 lg:p-12 overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#F58220]/15 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#13984B]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            <div className="lg:col-span-8 flex flex-col items-start text-left">
              <Reveal variant="fade-right" delay={20}>
                {eyebrow && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#F58220] mb-2 sm:mb-3">
                    <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {eyebrow}
                  </span>
                )}

                <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight text-balance">
                  {title}
                </h2>

                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl">
                  {description}
                </p>

                {/* Bullet badges */}
                {bullets && bullets.length > 0 && (
                  <div className="mt-3.5 sm:mt-5 flex flex-wrap gap-2.5 sm:gap-4 text-xs text-gray-300 font-medium">
                    {bullets.map((bullet, i) => (
                      <div key={i} className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F58220] shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-5 sm:mt-7 flex flex-wrap items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
                  {primaryBtnText && primaryBtnLink && (
                    <Button
                      to={primaryBtnLink}
                      size="md"
                      variant="primary"
                      className="flex-1 sm:flex-initial text-xs sm:text-sm"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      {primaryBtnText}
                    </Button>
                  )}

                  {secondaryBtnText && secondaryBtnLink && (
                    <Button
                      to={secondaryBtnLink}
                      size="md"
                      variant="outline"
                      className="flex-1 sm:flex-initial text-xs sm:text-sm bg-white/10 text-white border-white/20 hover:bg-white hover:text-[#09132F]"
                    >
                      {secondaryBtnText}
                    </Button>
                  )}
                </div>
              </Reveal>
            </div>

            {statNumber && (
              <div className="lg:col-span-4 hidden lg:flex justify-end">
                <div className="w-44 h-44 rounded-full bg-white/5 border border-white/10 flex items-center justify-center p-6 text-center">
                  <div>
                    <span className="text-3xl font-black text-[#F58220] block">{statNumber}</span>
                    <span className="text-xs text-gray-300 mt-1 block font-medium">{statLabel}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
