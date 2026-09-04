import React from 'react';
import { Phone, ArrowRight, MessageSquare, Clock } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Reveal } from '../common/Reveal';
import { BUSINESS } from '../../config/business';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-10 sm:py-20 bg-brandBg border-b border-brandBorder/60">
      <Container>
        <Reveal variant="fade-up">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <span className="text-[11px] sm:text-xs font-bold tracking-wider sm:tracking-widest uppercase text-brandRed mb-2 sm:mb-3">
              GET IN TOUCH
            </span>

            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight leading-tight text-balance">
              Need Reliable Household or Bulk Supplies?
            </h2>

            <p className="mt-2 sm:mt-3.5 text-xs sm:text-base text-brandText-muted leading-relaxed text-balance max-w-xl">
              <span className="sm:hidden">
                Contact our team to verify product availability, request wholesale quotes, or arrange pickup in Hetauda.
              </span>
              <span className="hidden sm:inline">
                Contact our team today to verify product availability, request a wholesale price quote, or arrange store pickup in Hetauda.
              </span>
            </p>

            <div className="mt-5 sm:mt-8 grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
              <Button
                href={BUSINESS.phoneLink}
                size="md"
                variant="primary"
                className="text-xs sm:text-sm py-2.5 sm:py-3"
                leftIcon={<Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              >
                Call: {BUSINESS.phone}
              </Button>

              <Button
                href={BUSINESS.whatsappLink}
                size="md"
                variant="outline"
                className="border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white text-xs sm:text-sm py-2.5 sm:py-3"
                leftIcon={<MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </Button>

              <Button
                to="/contact"
                size="md"
                variant="outline"
                className="col-span-2 sm:col-span-1 text-xs sm:text-sm py-2.5 sm:py-3"
                rightIcon={<ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              >
                Send Inquiry
              </Button>
            </div>

            <div className="mt-4 sm:mt-6 flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-brandText-muted">
              <Clock className="w-3.5 h-3.5 text-brandRed shrink-0" />
              <span>Mon–Sat {BUSINESS.hours.weekdays} • {BUSINESS.location}</span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
