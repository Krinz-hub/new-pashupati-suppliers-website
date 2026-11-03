import React, { useEffect } from 'react';
import { Container } from '../components/common/Container';
import { PageHero } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { WholesaleCTA } from '../components/home/WholesaleCTA';
import { Reveal } from '../components/common/Reveal';
import {
  WHOLESALE_BENEFITS,
  HOW_IT_WORKS_STEPS,
  WHOLESALE_AUDIENCES,
} from '../data/benefits';
import { setPageTitle } from '../utils/helpers';
import {
  Store,
  Building,
  Briefcase,
  GraduationCap,
  TrendingUp,
  PackageCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageSquare,
  LucideIcon,
} from 'lucide-react';
import { BUSINESS } from '../config/business';

const audienceIconMap: Record<string, LucideIcon> = {
  Store,
  Building,
  Briefcase,
  GraduationCap,
  TrendingUp,
  PackageCheck,
};

export const Wholesale: React.FC = () => {
  useEffect(() => {
    setPageTitle('Wholesale Supply & Bulk Ordering | New Pashupati Suppliers');
  }, []);

  return (
    <main className="bg-white">
      {/* Hero */}
      <Reveal variant="fade-in">
        <PageHero
          eyebrow="BULK &amp; BUSINESS PROCUREMENT"
          title="Wholesale Supply for Your Business"
          description="Direct sourcing for retailers, local shops, commercial enterprises, and institutions. Dependable supply, tiered volume discounts, and transparent coordination across Nepal."
        >
          <div className="flex flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
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
              href={BUSINESS.whatsappLink}
              size="md"
              variant="outline"
              className="flex-1 sm:flex-initial text-xs sm:text-sm py-2.5 sm:py-3 border-[#13984B] text-[#13984B] hover:bg-[#13984B] hover:text-white"
              leftIcon={<MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </Button>
            <Button
              href={BUSINESS.phoneLink}
              size="md"
              variant="outline"
              className="hidden sm:inline-flex border-[#EEEEF0] text-[#09132F] hover:bg-[#F8F8F9]"
              leftIcon={<Phone className="w-4 h-4 text-[#F58220]" />}
            >
              Call {BUSINESS.phone}
            </Button>
          </div>
        </PageHero>
      </Reveal>

      {/* 3 Core Wholesale Benefits */}
      <section className="py-10 sm:py-16 bg-white border-b border-[#EEEEF0]">
        <Container>
          <Reveal variant="fade-up">
            <SectionHeading
              eyebrow="WHOLESALE ADVANTAGE"
              title="Why Source Bulk Supplies With Us"
              description="We simplify procurement with reliable inventory availability, transparent quotes, and flexible fulfillment."
            />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-8">
            {WHOLESALE_BENEFITS.slice(0, 3).map((item, index) => (
              <Reveal key={index} variant="fade-up" delay={index * 60}>
                <div className="bg-[#F8F8F9] p-4 sm:p-7 rounded-[16px] border border-[#EEEEF0] h-full flex flex-col items-start">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-[10px] bg-[#FFF4EB] text-[#F58220] flex items-center justify-center mb-2.5 sm:mb-4 border border-[#F58220]/20">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold text-[#09132F]">
                    {item.title}
                  </h3>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-[#777777] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Simple 3-Step Inquiry Process */}
      <section className="py-10 sm:py-16 bg-[#F8F8F9] border-b border-[#EEEEF0]">
        <Container>
          <Reveal variant="fade-up">
            <SectionHeading
              eyebrow="HOW IT WORKS"
              title="Simple 3-Step Procurement Flow"
              description="Get your wholesale orders fulfilled quickly and reliably."
            />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 max-w-4xl mx-auto">
            {HOW_IT_WORKS_STEPS.slice(0, 3).map((stepItem, index) => (
              <Reveal key={stepItem.step} variant="fade-up" delay={index * 60}>
                <div className="bg-white p-4 sm:p-6 rounded-[16px] border border-[#EEEEF0] shadow-soft-xs relative h-full flex sm:flex-col items-start gap-3 sm:gap-0">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-[8px] bg-[#F58220] text-white flex items-center justify-center font-bold text-xs sm:text-sm sm:mb-4 shrink-0 shadow-2xs">
                    {stepItem.step}
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#09132F]">
                      {stepItem.title}
                    </h3>
                    <p className="mt-0.5 sm:mt-2 text-xs sm:text-sm text-[#777777] leading-relaxed">
                      {stepItem.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Who We Serve Section */}
      <section className="py-10 sm:py-16 bg-white border-b border-[#EEEEF0]">
        <Container>
          <Reveal variant="fade-up">
            <SectionHeading
              eyebrow="TARGET CLIENTS"
              title="Who We Supply"
              description="Tailored procurement solutions matching diverse commercial and community needs."
            />
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {WHOLESALE_AUDIENCES.map((item, index) => {
              const Icon = audienceIconMap[item.iconName] || Store;

              return (
                <Reveal
                  key={item.id}
                  variant="fade-up"
                  delay={index * 40}
                >
                  <div className="bg-[#F8F8F9] p-3.5 sm:p-6 rounded-[16px] border border-[#EEEEF0] hover:border-[#DCDCDE] hover:bg-white transition-all duration-200 shadow-2xs h-full flex flex-col items-start">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-[10px] bg-white text-[#F58220] flex items-center justify-center mb-2.5 sm:mb-3.5 border border-[#EEEEF0] shadow-2xs">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="text-xs sm:text-base font-bold text-[#09132F] leading-snug">
                      {item.title}
                    </h3>
                    <p className="hidden sm:block mt-1.5 text-xs sm:text-sm text-[#777777] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Unified Wholesale Bottom CTA */}
      <WholesaleCTA
        eyebrow="READY TO ORDER?"
        title="Get a Fast Wholesale Estimate"
        description="Send us your SKU requirements or category quantities. We will respond promptly with pricing and availability."
        bullets={['Volume-tiered rates', 'Priority packaging', 'Door-to-door dispatch coordination']}
        primaryBtnText="Submit Inquiry"
        primaryBtnLink="/contact?type=wholesale"
        secondaryBtnText="Browse Catalog"
        secondaryBtnLink="/products"
      />
    </main>
  );
};
