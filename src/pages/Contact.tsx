import React, { useEffect } from 'react';
import { Container } from '../components/common/Container';
import { PageHero } from '../components/common/PageHero';
import { ContactInfo } from '../components/contact/ContactInfo';
import { ContactForm } from '../components/contact/ContactForm';
import { Reveal } from '../components/common/Reveal';
import { BUSINESS } from '../config/business';
import { setPageTitle } from '../utils/helpers';
import { Phone, MessageSquare, Mail, MapPin } from 'lucide-react';

export const Contact: React.FC = () => {
  useEffect(() => {
    setPageTitle('Contact Us | New Pashupati Suppliers');
  }, []);

  return (
    <main>
      <Reveal variant="fade-in">
        <PageHero
          eyebrow="GET IN TOUCH"
          title="Contact New Pashupati Suppliers"
          description={`Reach our customer and wholesale desk in ${BUSINESS.location}. We are ready to assist with product inquiries, wholesale orders, and store visits.`}
        />
      </Reveal>

      {/* Mobile Quick Action Buttons Bar */}
      <section className="sm:hidden bg-white border-b border-brandBorder py-3">
        <Container>
          <div className="grid grid-cols-4 gap-2 text-center">
            <a
              href={BUSINESS.phoneLink}
              className="flex flex-col items-center justify-center p-2 rounded-xl bg-brandBg border border-brandBorder active:scale-95 transition-transform"
            >
              <div className="w-8 h-8 rounded-full bg-brandRed/10 text-brandRed flex items-center justify-center mb-1">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-navy">Call</span>
            </a>

            <a
              href={BUSINESS.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-2 rounded-xl bg-brandBg border border-brandBorder active:scale-95 transition-transform"
            >
              <div className="w-8 h-8 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mb-1">
                <MessageSquare className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-navy">WhatsApp</span>
            </a>

            <a
              href={BUSINESS.emailLink}
              className="flex flex-col items-center justify-center p-2 rounded-xl bg-brandBg border border-brandBorder active:scale-95 transition-transform"
            >
              <div className="w-8 h-8 rounded-full bg-navy/10 text-navy flex items-center justify-center mb-1">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-navy">Email</span>
            </a>

            <a
              href="https://maps.google.com/?q=New+Pashupati+Suppliers+Hetauda"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-2 rounded-xl bg-brandBg border border-brandBorder active:scale-95 transition-transform"
            >
              <div className="w-8 h-8 rounded-full bg-brandRed/10 text-brandRed flex items-center justify-center mb-1">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-navy">Directions</span>
            </a>
          </div>
        </Container>
      </section>

      {/* Main Contact Section */}
      <section className="py-8 sm:py-20 bg-brandBg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <Reveal variant="fade-right" delay={100}>
                <ContactInfo />
              </Reveal>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <Reveal variant="fade-left" delay={150}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Responsive Google Maps Section */}
      <section className="py-8 sm:py-20 bg-white border-t border-brandBorder/80">
        <Container>
          <Reveal variant="fade-up">
            <div className="max-w-3xl mx-auto mb-5 sm:mb-8 text-center flex flex-col items-center">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-brandRed mb-1 sm:mb-2 inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                STORE LOCATION
              </span>

              <h2 className="text-xl sm:text-3xl font-extrabold text-navy tracking-tight">
                Visit Our Store in Hetauda
              </h2>

              <p className="mt-1 sm:mt-2 text-xs sm:text-base text-brandText-muted">
                {BUSINESS.name} • {BUSINESS.address}
              </p>
            </div>

            {/* Google Maps Responsive Frame Container */}
            <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden border border-brandBorder shadow-sm bg-slate-100">
              <iframe
                title="New Pashupati Suppliers Store Location in Hetauda, Nepal"
                src={BUSINESS.mapsEmbedUrl}
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-64 sm:h-96 md:h-[450px] block"
              />
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
};
