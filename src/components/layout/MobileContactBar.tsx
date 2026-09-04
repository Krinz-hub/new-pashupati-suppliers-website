import React from 'react';
import { Phone, MessageSquare, Send } from 'lucide-react';
import { SITE } from '../../config/site';

export const MobileContactBar: React.FC = () => {
  const whatsappHref = `https://wa.me/${SITE.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello New Pashupati Suppliers, I would like to inquire about products and pricing.'
  )}`;
  const phoneHref = `tel:${SITE.contact.phone}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-lg pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
        <a
          href={phoneHref}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-slate-100 text-slate-900 rounded-lg active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 text-brandRed" />
          <span>Call</span>
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-[#25D366]/10 text-[#128C7E] rounded-lg active:scale-95 transition-transform"
        >
          <MessageSquare className="w-4 h-4 text-[#25D366]" />
          <span>WhatsApp</span>
        </a>
        <a
          href="/contact"
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-brandRed text-white rounded-lg active:scale-95 transition-transform shadow-sm"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Get Quote</span>
        </a>
      </div>
    </div>
  );
};
