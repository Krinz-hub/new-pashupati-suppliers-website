import React, { useEffect } from 'react';
import { Container } from '../components/common/Container';
import { PageHero } from '../components/common/PageHero';
import { ContactInfo } from '../components/contact/ContactInfo';
import { ContactForm } from '../components/contact/ContactForm';
import { Reveal } from '../components/common/Reveal';
import { BUSINESS } from '../config/business';
import { setPageTitle } from '../utils/helpers';
import { MapPin } from 'lucide-react';

export const Contact: React.FC = () => {
  useEffect(() => {
    setPageTitle('Contact Us | New Pashupati Suppliers');
  }, []);

  return (
    <main>
      {/* Page Hero */}
      <Reveal variant="fade-in">
        <PageHero
          eyebrow="GET IN TOUCH WITH OUR TEAM"
          title={`Contact ${BUSINESS.name}`}
          description={`Whether you have an inquiry about specific household products, want a bulk wholesale quote, or wish to visit our store in ${BUSINESS.generalLocation || BUSINESS.location}, we're here to assist you.`}
        />
      </Reveal>

      {/* Main Contact Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-brandBg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Contact Information (5 cols) */}
            <div className="lg:col-span-5">
              <Reveal variant="fade-right" delay={100}>
                <ContactInfo />
              </Reveal>
            </div>

            {/* Right Column: Interactive Form (7 cols) */}
            <div className="lg:col-span-7">
              <Reveal variant="fade-left" delay={150}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Responsive Google Maps Section */}
      <section className="py-16 sm:py-20 bg-white border-t border-brandBorder/80">
        <Container>
          <Reveal variant="fade-up">
            <div className="max-w-3xl mx-auto mb-8 text-center flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-brandRed mb-2 inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                STORE LOCATION
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
                Visit Our Store in Hetauda
              </h2>

              <p className="mt-2 text-sm sm:text-base text-brandText-muted">
                {BUSINESS.name} • {BUSINESS.address}
              </p>
            </div>

            {/* Google Maps Responsive Frame Container */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-brandBorder shadow-sm bg-slate-100">
              <iframe
                title="New Pashupati Suppliers Store Location in Hetauda, Nepal"
                src={BUSINESS.mapsEmbedUrl}
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-80 sm:h-96 md:h-[450px] block"
              />
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
};
