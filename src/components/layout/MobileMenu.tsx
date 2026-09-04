import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { X, Phone, Mail, ArrowRight, MessageSquare } from 'lucide-react';
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
        className="fixed inset-0 bg-navy/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="relative z-10 w-full max-w-xs ml-auto h-full bg-white shadow-2xl flex flex-col justify-between overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-brandBorder">
          <Logo variant="compact" />
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-brandText-muted hover:text-navy hover:bg-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-brandRed"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="px-5 py-5 flex-1">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-lg font-medium text-base transition-colors ${
                    isActive
                      ? 'bg-brandRed/10 text-brandRed font-bold'
                      : 'text-brandText hover:bg-slate-50 hover:text-navy'
                  }`
                }
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </NavLink>
            ))}
          </nav>

          <div className="mt-6 pt-5 border-t border-brandBorder">
            <Button
              to="/contact"
              fullWidth
              size="md"
              variant="primary"
              onClick={onClose}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Get In Touch
            </Button>
          </div>

          {/* Quick Business Contact Details */}
          <div className="mt-6 pt-5 border-t border-brandBorder space-y-2.5 text-xs text-brandText-muted">
            <a
              href={BUSINESS.phoneLink}
              className="flex items-center gap-2.5 text-navy hover:text-brandRed transition-colors font-medium py-1"
            >
              <Phone className="w-4 h-4 text-brandRed shrink-0" />
              <span>{BUSINESS.phone}</span>
            </a>
            <a
              href={BUSINESS.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-navy hover:text-[#25D366] transition-colors font-medium py-1"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
              <span>WhatsApp: {BUSINESS.whatsapp}</span>
            </a>
            <a
              href={BUSINESS.emailLink}
              className="flex items-center gap-2.5 text-navy hover:text-brandRed transition-colors font-medium py-1"
            >
              <Mail className="w-4 h-4 text-brandRed shrink-0" />
              <span className="truncate">{BUSINESS.email}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
