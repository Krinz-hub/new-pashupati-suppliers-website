import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Share2,
} from 'lucide-react';
import { Container } from '../common/Container';
import { Logo } from '../common/Logo';
import { BUSINESS } from '../../config/business';
import { CATEGORIES } from '../../data/categories';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark text-white pt-16 pb-12 border-t border-navy-light/60">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-navy-light/60">
          {/* Area 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="light" />
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              Your trusted wholesale and retail supplier in {BUSINESS.location}. Offering a wide variety of household, kitchen, plastic, cleaning, and electrical essentials.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={BUSINESS.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Chat"
                className="w-9 h-9 rounded-lg bg-navy-light/80 hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-colors text-gray-300 border border-navy-light"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS.social.facebook}
                aria-label="Facebook Page"
                className="w-9 h-9 rounded-lg bg-navy-light/80 hover:bg-brandRed hover:text-white flex items-center justify-center transition-colors text-gray-300 border border-navy-light"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Area 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/wholesale" className="text-gray-300 hover:text-white transition-colors">
                  Wholesale
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Area 3: Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Categories
            </h3>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/products?category=${cat.slug}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Area 4: Store & Inquiries (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Store &amp; Inquiries
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brandRed shrink-0 mt-0.5" />
                <span>{BUSINESS.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-brandRed shrink-0 mt-0.5" />
                <div className="flex flex-wrap items-center gap-x-1.5">
                  <a href={BUSINESS.phoneLink} className="hover:text-white transition-colors">
                    {BUSINESS.phone}
                  </a>
                  {BUSINESS.phoneSecondary && (
                    <>
                      <span className="text-gray-500">/</span>
                      <a href={BUSINESS.phoneSecondaryLink || BUSINESS.phoneLink} className="hover:text-white transition-colors">
                        {BUSINESS.phoneSecondary}
                      </a>
                    </>
                  )}
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-brandRed shrink-0 mt-0.5" />
                <a href={BUSINESS.emailLink} className="hover:text-white transition-colors truncate">
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-brandRed shrink-0 mt-0.5" />
                <span className="text-xs text-gray-400">
                  Mon – Sat: {BUSINESS.hours.weekdays}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {currentYear} {BUSINESS.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <Link to="/wholesale" className="hover:text-white transition-colors">
              Wholesale
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
