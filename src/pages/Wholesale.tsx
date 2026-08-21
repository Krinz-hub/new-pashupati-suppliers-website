import React, { useEffect } from 'react';
import { Container } from '../components/common/Container';
import { PageHero } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { Reveal } from '../components/common/Reveal';
import {
  WHOLESALE_AUDIENCES,
  WHOLESALE_BENEFITS,
  HOW_IT_WORKS_STEPS,
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
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Button
              to="/contact?type=wholesale"
              size="md"
              variant="primary"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Request a Wholesale Quote
            </Button>
            <Button
              href={BUSINESS.whatsappLink}
              size="md"
              variant="outline"
              className="border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
              leftIcon={<MessageSquare className="w-4 h-4" />}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </Button>
            <Button
              href={BUSINESS.phoneLink}
              size="md"
              variant="outline"
              leftIcon={<Phone className="w-4 h-4" />}
            >
              Call {BUSINESS.phone}
            </Button>
          </div>
        </PageHero>
      </Reveal>

      {/* 3 Core Wholesale Benefits */}
      <section className="py-16 sm:py-20 bg-white border-b border-brandBorder/60">
        <Container>
          <Reveal variant="fade-up">
            <SectionHeading
              eyebrow="WHOLESALE ADVANTAGE"
              title="Why Source Bulk Supplies With Us"
              description="We simplify procurement with reliable inventory availability, transparent quotes, and flexible fulfillment."
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {WHOLESALE_BENEFITS.slice(0, 3).map((item, index) => (
              <Reveal key={index} variant="fade-up" delay={index * 80}>
                <div className="bg-brandBg p-6 sm:p-7 rounded-xl border border-brandBorder h-full flex flex-col items-start">
                  <div className="w-10 h-10 rounded-lg bg-brandRed/10 text-brandRed flex items-center justify-center mb-4 border border-brandRed/20">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-brandText-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Simple 3-Step Inquiry Process */}
      <section className="py-16 sm:py-20 bg-brandBg border-b border-brandBorder/60">
        <Container>
          <Reveal variant="fade-up">
            <SectionHeading
              eyebrow="HOW IT WORKS"
              title="Simple 3-Step Procurement Flow"
              description="Get your wholesale orders fulfilled quickly and reliably."
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {HOW_IT_WORKS_STEPS.slice(0, 3).map((stepItem, index) => (
              <Reveal key={stepItem.step} variant="fade-up" delay={index * 80}>
                <div className="bg-white p-6 rounded-xl border border-brandBorder shadow-sm relative h-full flex flex-col items-start">
                  <span className="w-8 h-8 rounded-lg bg-brandRed text-white flex items-center justify-center font-bold text-sm mb-4">
                    {stepItem.step}
                  </span>
                  <h3 className="text-base font-bold text-navy">
                    {stepItem.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-brandText-muted leading-relaxed">
                    {stepItem.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Who We Serve Section */}
      <section className="py-16 sm:py-20 bg-white border-b border-brandBorder/60">
        <Container>
          <Reveal variant="fade-up">
            <SectionHeading
              eyebrow="TARGET CLIENTS"
              title="Who We Supply"
              description="Tailored procurement solutions matching diverse commercial and community needs."
            />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {WHOLESALE_AUDIENCES.map((item, index) => {
              const Icon = audienceIconMap[item.iconName] || Store;

              return (
                <Reveal
                  key={item.id}
                  variant="fade-up"
                  delay={index * 60}
                >
                  <div className="bg-brandBg p-6 rounded-xl border border-brandBorder hover:border-brandBorder-strong transition-all duration-200 shadow-sm h-full">
                    <div className="w-10 h-10 rounded-lg bg-white text-brandRed flex items-center justify-center mb-3.5 border border-brandBorder">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-brandText-muted leading-relaxed">
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
      <section className="py-16 sm:py-20 bg-navy-dark text-white text-center">
        <Container>
          <Reveal variant="fade-up">
            <div className="max-w-2xl mx-auto flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-brandOrange mb-3">
                READY TO ORDER?
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Get a Fast Wholesale Estimate
              </h2>
              <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed">
                Send us your SKU requirements or category quantities. We will respond promptly with pricing and availability.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
                <Button
                  to="/contact?type=wholesale"
                  size="md"
                  variant="primary"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Submit Wholesale Inquiry
                </Button>
                <Button
                  href={BUSINESS.phoneLink}
                  size="md"
                  variant="outline"
                  className="border-gray-400 text-white hover:bg-white hover:text-navy"
                  leftIcon={<Phone className="w-4 h-4" />}
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
