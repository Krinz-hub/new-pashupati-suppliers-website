import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { X, Phone, Mail, ArrowRight, MessageSquare, MapPin } from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { BUSINESS } from '../../config/business';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ name: string; path: string }>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navLinks,
}) => {
  // Prevent background scroll when menu is open & listen to Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex flex-col">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#09132F]/50 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="relative z-10 w-full max-w-[300px] h-full bg-white shadow-xl flex flex-col justify-between overflow-y-auto animate-modal-enter"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#EEEEF0]">
          <Logo variant="compact" />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#777777] hover:text-[#09132F] hover:bg-[#F8F8F9] transition-colors focus-visible:ring-2 focus-visible:ring-[#F58220]"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="px-4 py-4 flex-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#777777] mb-2 px-3">
            Navigation Menu
          </div>
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-[12px] font-medium text-sm transition-colors ${
                    isActive
                      ? 'bg-[#FFF4EB] text-[#F58220] font-bold'
                      : 'text-[#171717] hover:bg-[#F8F8F9]'
                  }`
                }
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </NavLink>
            ))}
          </nav>

          <div className="mt-5 pt-4 border-t border-[#EEEEF0]">
            <Button
              to="/contact?type=wholesale"
              fullWidth
              size="sm"
              variant="primary"
              onClick={onClose}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Request Wholesale Quote
            </Button>
          </div>

          {/* Quick Business Contact Details */}
          <div className="mt-5 pt-4 border-t border-[#EEEEF0] space-y-2 text-xs text-[#777777]">
            <a
              href={BUSINESS.phoneLink}
              className="flex items-center gap-2.5 text-[#171717] hover:text-[#F58220] transition-colors font-medium py-1"
            >
              <Phone className="w-4 h-4 text-[#F58220] shrink-0" />
              <span>{BUSINESS.phone}</span>
            </a>
            <a
              href={BUSINESS.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-[#171717] hover:text-[#13984B] transition-colors font-medium py-1"
            >
              <MessageSquare className="w-4 h-4 text-[#13984B] shrink-0" />
              <span>WhatsApp Inquiries</span>
            </a>
            <a
              href={BUSINESS.emailLink}
              className="flex items-center gap-2.5 text-[#171717] hover:text-[#F58220] transition-colors font-medium py-1"
            >
              <Mail className="w-4 h-4 text-[#F58220] shrink-0" />
              <span className="truncate">{BUSINESS.email}</span>
            </a>
            <div className="flex items-center gap-2.5 text-[#777777] py-1">
              <MapPin className="w-4 h-4 text-[#777777] shrink-0" />
              <span className="text-[11px] leading-tight">Palpasa Road, Hetauda-2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
