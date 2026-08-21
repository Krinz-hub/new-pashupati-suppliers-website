import React from 'react';
import { Phone, ArrowRight, MessageSquare, Clock } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Reveal } from '../common/Reveal';
import { BUSINESS } from '../../config/business';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-brandBg border-b border-brandBorder/60">
      <Container>
        <Reveal variant="fade-up">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <span className="text-xs font-bold tracking-widest uppercase text-brandRed mb-3">
              GET IN TOUCH
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight leading-tight text-balance">
              Need Reliable Household or Bulk Supplies?
            </h2>

            <p className="mt-3.5 text-sm sm:text-base text-brandText-muted leading-relaxed text-balance max-w-xl">
              Contact our team today to verify product availability, request a wholesale price quote, or arrange store pickup in Hetauda.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 w-full sm:w-auto">
              <Button
                href={BUSINESS.phoneLink}
                size="md"
                variant="primary"
                leftIcon={<Phone className="w-4 h-4" />}
              >
                Call: {BUSINESS.phone}
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
                to="/contact"
                size="md"
                variant="outline"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Send Inquiry
              </Button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-brandText-muted">
              <Clock className="w-3.5 h-3.5 text-brandRed" />
              <span>Store Hours: Mon–Sat {BUSINESS.hours.weekdays} • {BUSINESS.location}</span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
