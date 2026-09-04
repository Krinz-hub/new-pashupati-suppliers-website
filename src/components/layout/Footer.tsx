import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Share2,
  ShieldCheck,
} from 'lucide-react';
import { Container } from '../common/Container';
import { Logo } from '../common/Logo';
import { BUSINESS } from '../../config/business';
import { CATEGORIES as DEFAULT_CATEGORIES } from '../../data/categories';
import { useCategories } from '../../hooks/useCategories';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { categories: dynamicCategories } = useCategories();
  const categoriesList = dynamicCategories.length > 0 ? dynamicCategories : DEFAULT_CATEGORIES;

  return (
    <footer className="bg-navy-dark text-white pt-10 sm:pt-16 pb-8 sm:pb-12 border-t border-navy-light/60">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-8 sm:pb-12 border-b border-navy-light/60">
          {/* Area 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-3 sm:space-y-4">
            <Logo variant="light" />
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-sm">
              Your trusted wholesale and retail supplier in {BUSINESS.location}. Offering a wide variety of household, kitchen, plastic, cleaning, and electrical essentials.
            </p>

            <div className="pt-1 sm:pt-2 flex items-center gap-2.5 sm:gap-3">
              <a
                href={BUSINESS.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Chat"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-navy-light/80 hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-colors text-gray-300 border border-navy-light"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS.social.facebook}
                aria-label="Facebook Page"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-navy-light/80 hover:bg-brandRed hover:text-white flex items-center justify-center transition-colors text-gray-300 border border-navy-light"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Area 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-2.5 sm:space-y-3">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              Navigation
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-1.5 sm:gap-2 text-xs sm:text-sm">
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
                <Link to="/blogs" className="text-gray-300 hover:text-white transition-colors">
                  Blog &amp; Guides
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-white transition-colors">
                  Categories
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
          <div className="hidden sm:block lg:col-span-3 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Categories
            </h3>
            <ul className="space-y-2 text-sm">
              {categoriesList.slice(0, 6).map((cat) => (
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
          <div className="lg:col-span-3 space-y-2.5 sm:space-y-3">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              Store &amp; Inquiries
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              <li className="flex items-start gap-2 sm:gap-2.5">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brandRed shrink-0 mt-0.5" />
                <span>{BUSINESS.address}</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-2.5">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brandRed shrink-0 mt-0.5" />
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
              <li className="flex items-start gap-2 sm:gap-2.5">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brandRed shrink-0 mt-0.5" />
                <a href={BUSINESS.emailLink} className="hover:text-white transition-colors truncate">
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-2.5">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brandRed shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Mon – Sat: {BUSINESS.hours.weekdays}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[11px] sm:text-xs text-gray-400">
          <p>© {currentYear} {BUSINESS.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link to="/wholesale" className="hover:text-white transition-colors">
              Wholesale
            </Link>
            <Link to="/blogs" className="hover:text-white transition-colors">
              Blog
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 text-gray-500 hover:text-brandGold transition-colors"
              title="Admin CMS Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
