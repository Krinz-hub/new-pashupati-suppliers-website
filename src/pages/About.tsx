import React, { useEffect, useState } from 'react';
import { Container } from '../components/common/Container';
import { PageHero } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { Button } from '../components/common/Button';
import { Reveal } from '../components/common/Reveal';
import { BUSINESS } from '../config/business';
import { CORE_VALUES } from '../data/benefits';
import { GALLERY_ITEMS } from '../data/gallery';
import { setPageTitle } from '../utils/helpers';
import {
  ShieldCheck,
  Award,
  Users,
  Building2,
  Clock,
  Target,
  Compass,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  LucideIcon,
} from 'lucide-react';

const valueIconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Award,
  Users,
  Building2,
  Clock,
};

export const About: React.FC = () => {
  const [showFullStory, setShowFullStory] = useState(false);

  useEffect(() => {
    setPageTitle('About Us | New Pashupati Suppliers');
  }, []);

  return (
    <main>
      {/* Page Hero */}
      <Reveal variant="fade-in">
        <PageHero
          eyebrow="ABOUT OUR ENTERPRISE"
          title="Your Trusted Daily Goods Supplier"
          description="Serving families, local businesses, and institutions with honest pricing, extensive product choice, and dependable supply coordination in Hetauda, Nepal."
        />
      </Reveal>

      {/* Main Company Story Section */}
      <section className="py-10 sm:py-20 bg-white border-b border-brandBorder/60">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Storefront Visual Staging (5 cols) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <Reveal variant="fade-right" delay={50}>
                <div className="relative rounded-xl overflow-hidden shadow-sm border border-brandBorder bg-slate-100">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <ImageWithFallback
                      src="/assets/gallery/store-facade.jpg"
                      alt="New Pashupati Suppliers Storefront"
                      category="store"
                      title="New Pashupati Suppliers Storefront"
                      aspectRatio="portrait"
                      containerClassName="w-full h-full"
                    />
                  </div>
                  <div className="p-3 sm:p-4 bg-navy text-white text-center">
                    <p className="text-xs sm:text-sm font-semibold">
                      Palpasa Road, Hetauda-2, Makawanpur, Nepal
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Story Content & Key Statistics (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left order-1 lg:order-2">
              <Reveal variant="fade-left" delay={100}>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-brandRed mb-1.5 sm:mb-2.5">
                  OUR BACKGROUND
                </span>

                <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight leading-tight text-balance">
                  Over a Decade of Dedicated Service in Hetauda
                </h2>

                {/* Mobile Concise Intro */}
                <p className="mt-2.5 sm:mt-4 text-xs sm:text-base text-brandText-muted leading-relaxed">
                  Established with a vision to streamline household and commercial procurement, New Pashupati Suppliers has grown into a trusted destination for daily utility products across Makawanpur.
                </p>

                {/* Desktop Story / Mobile Expandable */}
                <div className={`${showFullStory ? 'block' : 'hidden sm:block'} mt-3 space-y-3 text-xs sm:text-base text-brandText-muted leading-relaxed`}>
                  <p>
                    From humble beginnings, our store has expanded to house more than 5,000 active inventory items — ranging from heavy-gauge kitchen cookware and durable plastic containers to commercial cleaning agents and standard electrical accessories.
                  </p>
                  <p>
                    We operate with transparency, competitive volume pricing, and dependable supply coordination to empower both everyday retail shoppers and wholesale business partners.
                  </p>
                </div>

                {/* Mobile Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowFullStory(!showFullStory)}
                  className="sm:hidden mt-2 inline-flex items-center gap-1 text-xs font-bold text-brandRed hover:underline"
                >
                  <span>{showFullStory ? 'Show Less' : 'Read Full Background'}</span>
                  {showFullStory ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </Reveal>

              {/* Statistics Grid */}
              <div className="mt-4 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 w-full">
                <Reveal variant="fade-up" delay={180} className="w-full">
                  <div className="bg-brandBg p-3 sm:p-4 rounded-xl border border-brandBorder text-center">
                    <span className="text-xl sm:text-3xl font-extrabold text-navy block">
                      {BUSINESS.stats.products}
                    </span>
                    <span className="text-[11px] sm:text-xs font-medium text-brandText-muted mt-0.5 sm:mt-1 block">
                      Products
                    </span>
                  </div>
                </Reveal>

                <Reveal variant="fade-up" delay={240} className="w-full">
                  <div className="bg-brandBg p-3 sm:p-4 rounded-xl border border-brandBorder text-center">
                    <span className="text-xl sm:text-3xl font-extrabold text-brandRed block">
                      {BUSINESS.stats.customers}
                    </span>
                    <span className="text-[11px] sm:text-xs font-medium text-brandText-muted mt-0.5 sm:mt-1 block">
                      Clients
                    </span>
                  </div>
                </Reveal>

                <Reveal variant="fade-up" delay={300} className="w-full">
                  <div className="bg-brandBg p-3 sm:p-4 rounded-xl border border-brandBorder text-center">
                    <span className="text-xl sm:text-3xl font-extrabold text-navy block">
                      {BUSINESS.stats.experienceYears}
                    </span>
                    <span className="text-[11px] sm:text-xs font-medium text-brandText-muted mt-0.5 sm:mt-1 block">
                      Years Active
                    </span>
                  </div>
                </Reveal>

                <Reveal variant="fade-up" delay={360} className="w-full">
                  <div className="bg-brandBg p-3 sm:p-4 rounded-xl border border-brandBorder text-center">
                    <span className="text-xl sm:text-3xl font-extrabold text-brandRed block">
                      {BUSINESS.stats.partners}
                    </span>
                    <span className="text-[11px] sm:text-xs font-medium text-brandText-muted mt-0.5 sm:mt-1 block">
                      Partners
                    </span>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-10 sm:py-20 bg-brandBg border-b border-brandBorder/60">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-4xl mx-auto">
            {/* Mission */}
            <Reveal variant="fade-up" delay={100} className="h-full">
              <div className="bg-white p-5 sm:p-8 rounded-xl border border-brandBorder shadow-sm flex flex-col items-start h-full">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-brandRed/10 text-brandRed flex items-center justify-center mb-3 sm:mb-4 border border-brandRed/20">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brandRed">
                  OUR MISSION
                </span>
                <h3 className="text-base sm:text-xl font-bold text-navy mt-1">
                  Dependable Supply Access
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-brandText-muted leading-relaxed">
                  To provide consistent access to quality everyday essentials through wide product variety, fair pricing, and dependable trade relationships.
                </p>
              </div>
            </Reveal>

            {/* Vision */}
            <Reveal variant="fade-up" delay={180} className="h-full">
              <div className="bg-white p-5 sm:p-8 rounded-xl border border-brandBorder shadow-sm flex flex-col items-start h-full">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-navy/10 text-navy flex items-center justify-center mb-3 sm:mb-4 border border-navy/20">
                  <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-navy">
                  OUR VISION
                </span>
                <h3 className="text-base sm:text-xl font-bold text-navy mt-1">
                  Leading Regional Supplier
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-brandText-muted leading-relaxed">
                  To be the preferred supply partner across Makawanpur and surrounding regions for both retail shoppers and wholesale commercial clients.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Core Values Section */}
      <section className="py-10 sm:py-20 lg:py-24 bg-white border-b border-brandBorder/60">
        <Container>
          <Reveal variant="fade-up">
            <SectionHeading
              eyebrow="OUR VALUES"
              title="Principles That Guide Our Service"
              description="Our commitment to honesty, quality inventory, and customer-first trade."
            />
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {CORE_VALUES.map((val, index) => {
              const Icon = valueIconMap[val.iconName] || ShieldCheck;

              return (
                <Reveal
                  key={val.id}
                  variant="fade-up"
                  delay={index * 40}
                >
                  <div className="bg-brandBg p-3.5 sm:p-6 rounded-xl border border-brandBorder hover:border-brandBorder-strong transition-all duration-200 shadow-sm h-full flex flex-col items-start">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white text-brandRed flex items-center justify-center mb-2.5 sm:mb-3.5 border border-brandBorder">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="text-xs sm:text-base font-bold text-navy leading-snug">
                      {val.title}
                    </h3>
                    <p className="hidden sm:block mt-1.5 text-xs sm:text-sm text-brandText-muted leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Visual Store Tour Gallery */}
      <section className="py-10 sm:py-20 bg-brandBg border-b border-brandBorder/60">
        <Container>
          <Reveal variant="fade-up">
            <SectionHeading
              eyebrow="STORE TOUR"
              title="Inside Our Facility &amp; Displays"
              description="Take a visual tour through our aisles, product displays, and storage center."
            />
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
            {GALLERY_ITEMS.slice(0, 6).map((item, index) => (
              <Reveal key={item.id} variant="fade-up" delay={index * 40}>
                <div className="rounded-xl overflow-hidden bg-white border border-brandBorder shadow-sm">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.alt}
                      category={item.category}
                      title={item.title}
                      aspectRatio="portrait"
                      containerClassName="w-full h-full"
                    />
                  </div>
                  <div className="p-2.5 sm:p-4">
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-brandRed block mb-0.5 sm:mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-navy truncate">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* About Bottom CTA */}
      <section className="py-10 sm:py-20 bg-navy-dark text-white text-center">
        <Container>
          <Reveal variant="fade-up">
            <div className="max-w-2xl mx-auto flex flex-col items-center">
              <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                Have a Product or Wholesale Inquiry?
              </h2>
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-base text-gray-300 leading-relaxed">
                Contact our team for price estimates, stock availability, or to arrange store pickup in Hetauda.
              </p>
              <div className="mt-5 sm:mt-7 flex flex-row items-center justify-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
                <Button
                  to="/contact"
                  size="md"
                  variant="primary"
                  className="flex-1 sm:flex-initial text-xs sm:text-sm py-2.5 sm:py-3"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                >
                  Contact Us
                </Button>
                <Button
                  to="/products"
                  size="md"
                  variant="outline"
                  className="flex-1 sm:flex-initial text-xs sm:text-sm py-2.5 sm:py-3 border-gray-400 text-white hover:bg-white hover:text-navy"
                >
                  Browse Products
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
};
