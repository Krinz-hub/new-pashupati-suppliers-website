import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import { BUSINESS } from '../../config/business';
import { Button } from '../common/Button';

export const ContactInfo: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-brandRed mb-3 block">
          REACH OUT DIRECTLY
        </span>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight leading-tight">
          How Can We Help You?
        </h2>

        <p className="mt-3 text-sm sm:text-base text-brandText-muted leading-relaxed">
          Contact us for product availability, bulk wholesale pricing, or to arrange direct store pickup in Hetauda.
        </p>
      </div>

      {/* Grouped Contact Details */}
      <div className="bg-white p-6 sm:p-7 rounded-xl border border-brandBorder shadow-sm space-y-5">
        {/* Phone */}
        <div className="flex items-start gap-3.5 pb-4 border-b border-brandBorder/60">
          <div className="w-10 h-10 rounded-lg bg-brandRed/10 text-brandRed flex items-center justify-center shrink-0 border border-brandRed/20">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-brandText-muted block">Direct Phone</span>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-0.5">
              <a
                href={BUSINESS.phoneLink}
                className="text-sm sm:text-base font-bold text-navy hover:text-brandRed transition-colors"
              >
                {BUSINESS.phone}
              </a>
              {BUSINESS.phoneSecondary && (
                <>
                  <span className="text-gray-400">/</span>
                  <a
                    href={BUSINESS.phoneSecondaryLink || BUSINESS.phoneLink}
                    className="text-sm sm:text-base font-bold text-navy hover:text-brandRed transition-colors"
                  >
                    {BUSINESS.phoneSecondary}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="flex items-start gap-3.5 pb-4 border-b border-brandBorder/60">
          <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0 border border-[#25D366]/20">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-brandText-muted block">WhatsApp Chat</span>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-0.5">
              <a
                href={BUSINESS.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base font-bold text-navy hover:text-[#25D366] transition-colors"
              >
                {BUSINESS.whatsapp}
              </a>
              {BUSINESS.whatsappSecondary && (
                <>
                  <span className="text-gray-400">/</span>
                  <a
                    href={BUSINESS.whatsappSecondaryLink || BUSINESS.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base font-bold text-navy hover:text-[#25D366] transition-colors"
                  >
                    {BUSINESS.whatsappSecondary}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-3.5 pb-4 border-b border-brandBorder/60">
          <div className="w-10 h-10 rounded-lg bg-navy/10 text-navy flex items-center justify-center shrink-0 border border-navy/20">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-brandText-muted block">Official Email</span>
            <a
              href={BUSINESS.emailLink}
              className="text-sm sm:text-base font-bold text-navy hover:text-brandRed transition-colors block mt-0.5 break-all"
            >
              {BUSINESS.email}
            </a>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-3.5 pb-4 border-b border-brandBorder/60">
          <div className="w-10 h-10 rounded-lg bg-brandRed/10 text-brandRed flex items-center justify-center shrink-0 border border-brandRed/20">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-brandText-muted block">Store Location</span>
            <p className="text-sm sm:text-base font-bold text-navy mt-0.5">
              {BUSINESS.address}
            </p>
          </div>
        </div>

        {/* Business Hours */}
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-navy/10 text-navy flex items-center justify-center shrink-0 border border-navy/20">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-brandText-muted block">Opening Hours</span>
            <p className="text-sm font-bold text-navy mt-0.5">
              Mon – Sat: {BUSINESS.hours.weekdays}
            </p>
            <p className="text-xs text-brandText-muted">Sunday: {BUSINESS.hours.sunday}</p>
          </div>
        </div>
      </div>

      {/* Quick Direct Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <Button
          href={BUSINESS.whatsappLink}
          variant="primary"
          size="md"
          className="bg-[#25D366] hover:bg-[#1EBE5D] text-white border-transparent"
          leftIcon={<MessageSquare className="w-4 h-4" />}
          target="_blank"
          rel="noopener noreferrer"
        >
          Chat on WhatsApp
        </Button>

        <Button
          href={BUSINESS.phoneLink}
          variant="secondary"
          size="md"
          leftIcon={<Phone className="w-4 h-4" />}
        >
          Call {BUSINESS.phone}
        </Button>
      </div>
    </div>
  );
};
