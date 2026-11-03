import React from 'react';
import { Phone, MessageSquare, Send, Home, Grid } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SITE } from '../../config/site';

export const MobileContactBar: React.FC = () => {
  const location = useLocation();
  const whatsappHref = `https://wa.me/${SITE.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello New Pashupati Suppliers, I would like to inquire about products and pricing.'
  )}`;
  const phoneHref = `tel:${SITE.contact.phone}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-[#EEEEF0] px-3 py-1.5 shadow-soft-lg pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-5 gap-1 text-[11px] font-medium items-center text-center">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1 rounded-lg transition-colors ${
            location.pathname === '/' ? 'text-[#F58220]' : 'text-[#777777] hover:text-[#171717]'
          }`}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span>Home</span>
        </Link>

        <Link
          to="/products"
          className={`flex flex-col items-center justify-center py-1 rounded-lg transition-colors ${
            location.pathname === '/products' ? 'text-[#F58220]' : 'text-[#777777] hover:text-[#171717]'
          }`}
        >
          <Grid className="w-4 h-4 mb-0.5" />
          <span>Catalog</span>
        </Link>

        <a
          href={phoneHref}
          className="flex flex-col items-center justify-center py-1 text-[#09132F] rounded-lg transition-colors"
        >
          <Phone className="w-4 h-4 mb-0.5 text-[#09132F]" />
          <span>Call</span>
        </a>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 text-[#13984B] rounded-lg transition-colors"
        >
          <MessageSquare className="w-4 h-4 mb-0.5" />
          <span>WhatsApp</span>
        </a>

        <Link
          to="/contact?type=wholesale"
          className="flex flex-col items-center justify-center py-1 px-1 bg-[#F58220] hover:bg-[#E97516] text-white rounded-full font-semibold shadow-xs"
        >
          <Send className="w-3.5 h-3.5 mb-0.5" />
          <span className="text-[10px]">Quote</span>
        </Link>
      </div>
    </div>
  );
};
