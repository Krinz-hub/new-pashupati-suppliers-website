import React, { useEffect } from 'react';
import { Container } from '../components/common/Container';
import { PageHero } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
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
    <main>
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
              className="flex-1 sm:flex-initial text-xs sm:text-sm py-2.5 sm:py-3 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
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
              className="hidden sm:inline-flex"
              leftIcon={<Phone className="w-4 h-4" />}
            >
              Call {BUSINESS.phone}
            </Button>
          </div>
        </PageHero>
      </Reveal>

      {/* 3 Core Wholesale Benefits */}
      <section className="py-10 sm:py-20 bg-white border-b border-brandBorder/60">
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
                <div className="bg-brandBg p-4 sm:p-7 rounded-xl border border-brandBorder h-full flex flex-col items-start">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-brandRed/10 text-brandRed flex items-center justify-center mb-2.5 sm:mb-4 border border-brandRed/20">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-brandText-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Simple 3-Step Inquiry Process */}
      <section className="py-10 sm:py-20 bg-brandBg border-b border-brandBorder/60">
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
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-brandBorder shadow-sm relative h-full flex sm:flex-col items-start gap-3 sm:gap-0">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-brandRed text-white flex items-center justify-center font-bold text-xs sm:text-sm sm:mb-4 shrink-0">
                    {stepItem.step}
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-navy">
                      {stepItem.title}
                    </h3>
                    <p className="mt-0.5 sm:mt-2 text-xs sm:text-sm text-brandText-muted leading-relaxed">
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
      <section className="py-10 sm:py-20 bg-white border-b border-brandBorder/60">
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
                  <div className="bg-brandBg p-3.5 sm:p-6 rounded-xl border border-brandBorder hover:border-brandBorder-strong transition-all duration-200 shadow-sm h-full flex flex-col items-start">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white text-brandRed flex items-center justify-center mb-2.5 sm:mb-3.5 border border-brandBorder">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="text-xs sm:text-base font-bold text-navy leading-snug">
                      {item.title}
                    </h3>
                    <p className="hidden sm:block mt-1.5 text-xs sm:text-sm text-brandText-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Wholesale Bottom CTA */}
      <section className="py-10 sm:py-20 bg-navy-dark text-white text-center">
        <Container>
          <Reveal variant="fade-up">
            <div className="max-w-2xl mx-auto flex flex-col items-center">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-brandOrange mb-2 sm:mb-3">
                READY TO ORDER?
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                Get a Fast Wholesale Estimate
              </h2>
              <p className="mt-2 sm:mt-3 text-xs sm:text-base text-gray-300 leading-relaxed">
                Send us your SKU requirements or category quantities. We will respond promptly with pricing and availability.
              </p>
              <div className="mt-5 sm:mt-7 flex flex-row items-center justify-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
                <Button
                  to="/contact?type=wholesale"
                  size="md"
                  variant="primary"
                  className="flex-1 sm:flex-initial text-xs sm:text-sm py-2.5 sm:py-3"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                >
                  Submit Inquiry
                </Button>
                <Button
                  href={BUSINESS.phoneLink}
                  size="md"
                  variant="outline"
                  className="flex-1 sm:flex-initial text-xs sm:text-sm py-2.5 sm:py-3 border-gray-400 text-white hover:bg-white hover:text-navy"
                  leftIcon={<Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                >
                  Call: {BUSINESS.phone}
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
};
