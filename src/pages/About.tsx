import React, { useEffect } from 'react';
import { Container } from '../components/common/Container';
import { PageHero } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { Reveal } from '../components/common/Reveal';
import { BUSINESS } from '../config/business';
import { CORE_VALUES } from '../data/benefits';
import { GALLERY_ITEMS } from '../data/gallery';
import { setPageTitle } from '../utils/helpers';
import {
  Target,
  Compass,
  ArrowRight,
  ShieldCheck,
  Handshake,
  Clock,
  Users,
  Scale,
  Sparkles,
  LucideIcon,
  Award,
} from 'lucide-react';

const valueIconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Handshake,
  Clock,
  Users,
  Scale,
  Sparkles,
};

export const About: React.FC = () => {
  useEffect(() => {
    setPageTitle('About Us | New Pashupati Suppliers');
  }, []);

  return (
    <main>
      {/* Hero */}
      <Reveal variant="fade-in">
        <PageHero
          eyebrow="ABOUT OUR BUSINESS"
          title="Your Trusted Partner for Everyday Supplies"
          description={`A dedicated wholesale and retail supplier in ${BUSINESS.location} providing dependable household, kitchenware, plastic goods, electrical items, and bulk utility essentials.`}
        />
      </Reveal>

      {/* Our Journey / Store Video Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-brandBorder/60">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Store Video */}
            <div className="lg:col-span-5 relative">
              <Reveal variant="fade-right" delay={100}>
                <div className="relative bg-white p-2.5 rounded-2xl shadow-sm border border-brandBorder overflow-hidden">
                  <div className="rounded-xl overflow-hidden min-h-[360px] sm:min-h-[420px] bg-slate-100 relative">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full min-h-[360px] sm:min-h-[420px] object-cover rounded-xl block"
                      poster="/assets/placeholders/store_front.webp"
                    >
                      <source src="/assets/placeholders/store_front.webm" type="video/webm" />
                      <source src="/assets/store_front.webm" type="video/webm" />
                      <img
                        src="/assets/placeholders/store_front.webp"
                        alt="New Pashupati Suppliers Store Front"
                        className="w-full h-full min-h-[360px] sm:min-h-[420px] object-cover rounded-xl block"
                      />
                    </video>
                  </div>

                  <div className="absolute top-5 left-5 bg-navy text-white px-4 py-3 rounded-xl shadow-md border border-navy-light max-w-[170px]">
                    <div className="flex items-center gap-1.5 text-brandOrange mb-0.5">
                      <Award className="w-4 h-4" />
                      <span className="text-lg font-extrabold">{BUSINESS.stats.experienceYears}</span>
                    </div>
                    <p className="text-xs font-medium text-gray-200 leading-tight">
                      Years of Trust &amp; Service
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Story Content (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <Reveal variant="fade-left" delay={120}>
                <span className="text-xs font-bold uppercase tracking-widest text-brandRed mb-3">
                  OUR STORY
                </span>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight leading-tight">
                  Built on Dependability, Variety, and Fair Pricing
                </h2>

                <div className="mt-4 space-y-3.5 text-sm sm:text-base text-brandText-muted leading-relaxed">
                  <p>
                    New Pashupati Suppliers was established in Hetauda with a clear mission: to provide local households, retail businesses, and institutions with direct, reliable access to everyday essentials.
                  </p>
                  <p>
                    From heavy-duty plastic storage and durable kitchen cookware to sanitation equipment and electrical hardware, our shelves are organized to help you find what you need quickly and at fair wholesale rates.
                  </p>
                </div>
              </Reveal>

              {/* Stats Counters */}
              <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full">
                <Reveal variant="fade-up" delay={180} className="w-full">
                  <div className="bg-brandBg p-4 rounded-xl border border-brandBorder text-center">
                    <span className="text-2xl sm:text-3xl font-extrabold text-navy block">
                      {BUSINESS.stats.products}
                    </span>
                    <span className="text-xs font-medium text-brandText-muted mt-1 block">
                      Products
                    </span>
                  </div>
                </Reveal>

                <Reveal variant="fade-up" delay={240} className="w-full">
                  <div className="bg-brandBg p-4 rounded-xl border border-brandBorder text-center">
                    <span className="text-2xl sm:text-3xl font-extrabold text-brandRed block">
                      {BUSINESS.stats.customers}
                    </span>
                    <span className="text-xs font-medium text-brandText-muted mt-1 block">
                      Happy Clients
                    </span>
                  </div>
                </Reveal>

                <Reveal variant="fade-up" delay={300} className="w-full">
                  <div className="bg-brandBg p-4 rounded-xl border border-brandBorder text-center">
                    <span className="text-2xl sm:text-3xl font-extrabold text-navy block">
                      {BUSINESS.stats.experienceYears}
                    </span>
                    <span className="text-xs font-medium text-brandText-muted mt-1 block">
                      Years Active
                    </span>
                  </div>
                </Reveal>

                <Reveal variant="fade-up" delay={360} className="w-full">
                  <div className="bg-brandBg p-4 rounded-xl border border-brandBorder text-center">
                    <span className="text-2xl sm:text-3xl font-extrabold text-brandRed block">
                      {BUSINESS.stats.partners}
                    </span>
                    <span className="text-xs font-medium text-brandText-muted mt-1 block">
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
      <section className="py-16 sm:py-20 bg-brandBg border-b border-brandBorder/60">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {/* Mission */}
            <Reveal variant="fade-up" delay={100} className="h-full">
              <div className="bg-white p-7 sm:p-8 rounded-xl border border-brandBorder shadow-sm flex flex-col items-start h-full">
                <div className="w-11 h-11 rounded-lg bg-brandRed/10 text-brandRed flex items-center justify-center mb-4 border border-brandRed/20">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-brandRed">
                  OUR MISSION
                </span>
                <h3 className="text-xl font-bold text-navy mt-1">
                  Dependable Supply Access
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-brandText-muted leading-relaxed">
                  To provide consistent access to quality everyday essentials through wide product variety, fair pricing, and dependable trade relationships.
                </p>
              </div>
            </Reveal>

            {/* Vision */}
            <Reveal variant="fade-up" delay={180} className="h-full">
              <div className="bg-white p-7 sm:p-8 rounded-xl border border-brandBorder shadow-sm flex flex-col items-start h-full">
                <div className="w-11 h-11 rounded-lg bg-navy/10 text-navy flex items-center justify-center mb-4 border border-navy/20">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-navy">
                  OUR VISION
                </span>
                <h3 className="text-xl font-bold text-navy mt-1">
                  Leading Regional Supplier
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-brandText-muted leading-relaxed">
                  To be the preferred supply partner across Makawanpur and surrounding regions for both retail shoppers and wholesale commercial clients.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Core Values Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-brandBorder/60">
        <Container>
          <Reveal variant="fade-up">
            <SectionHeading
              eyebrow="OUR VALUES"
              title="Principles That Guide Our Service"
              description="Our commitment to honesty, quality inventory, and customer-first trade."
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {CORE_VALUES.map((val, index) => {
              const Icon = valueIconMap[val.iconName] || ShieldCheck;

              return (
                <Reveal
                  key={val.id}
                  variant="fade-up"
                  delay={index * 60}
                >
                  <div className="bg-brandBg p-6 rounded-xl border border-brandBorder hover:border-brandBorder-strong transition-all duration-200 shadow-sm h-full">
                    <div className="w-10 h-10 rounded-lg bg-white text-brandRed flex items-center justify-center mb-3.5 border border-brandBorder">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-navy">
                      {val.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-brandText-muted leading-relaxed">
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
      <section className="py-16 sm:py-20 bg-brandBg border-b border-brandBorder/60">
        <Container>
          <Reveal variant="fade-up">
            <SectionHeading
              eyebrow="STORE TOUR"
              title="Inside Our Facility &amp; Displays"
              description="Take a visual tour through our aisles, product displays, and storage center."
            />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {GALLERY_ITEMS.slice(0, 6).map((item, index) => (
              <Reveal key={item.id} variant="fade-up" delay={index * 60}>
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
                  <div className="p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brandRed block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-bold text-navy">
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
      <section className="py-16 sm:py-20 bg-navy-dark text-white text-center">
        <Container>
          <Reveal variant="fade-up">
            <div className="max-w-2xl mx-auto flex flex-col items-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Have a Product or Wholesale Inquiry?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed">
                Contact our team for price estimates, stock availability, or to arrange store pickup in Hetauda.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
                <Button
                  to="/contact"
                  size="md"
                  variant="primary"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Contact Us
                </Button>
                <Button
                  to="/products"
                  size="md"
                  variant="outline"
                  className="border-gray-400 text-white hover:bg-white hover:text-navy"
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
