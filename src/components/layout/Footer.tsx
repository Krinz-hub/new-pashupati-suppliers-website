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
    <footer className="bg-[#09132F] text-white pt-10 sm:pt-14 pb-8 sm:pb-12 border-t border-[#132147]">
      <Container>
        {/* Main Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-8 pb-8 sm:pb-12 border-b border-white/10">
          {/* Column 1: Brand Info & Description (4 cols on desktop, full row on small mobile) */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 space-y-3.5">
            <Logo variant="light" />
            <p className="text-xs sm:text-[13px] text-gray-300 leading-relaxed max-w-sm">
              Your trusted wholesale and retail marketplace partner in {BUSINESS.location}. Providing quality household, kitchen, electrical, plastic, and daily cleaning essentials.
            </p>

            {/* Social & Messaging Channels */}
            <div className="pt-1 flex items-center gap-2">
              <a
                href={BUSINESS.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Chat"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#13984B] hover:text-white flex items-center justify-center transition-colors text-gray-300"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Page"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#F58220] hover:text-white flex items-center justify-center transition-colors text-gray-300"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Shopping & Catalog Links (2 cols) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-3">
            <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white">
              Shopping
            </h3>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-[#F58220] transition-colors">
                  All Catalog
                </Link>
              </li>
              <li>
                <Link to="/wholesale" className="text-gray-300 hover:text-[#F58220] transition-colors">
                  Wholesale Bulk
                </Link>
              </li>
              {categoriesList.slice(0, 4).map((cat) => (
                <li key={cat.id || cat.slug}>
                  <Link
                    to={`/products?category=${cat.slug}`}
                    className="text-gray-300 hover:text-[#F58220] transition-colors capitalize"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Information & Guides (2 cols) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-3">
            <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white">
              Information
            </h3>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              <li>
                <Link to="/blogs" className="text-gray-300 hover:text-[#F58220] transition-colors">
                  Guides &amp; Blog Articles
                </Link>
              </li>
              <li>
                <Link to="/wholesale" className="text-gray-300 hover:text-[#F58220] transition-colors">
                  Wholesale Procurement
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-[#F58220] transition-colors">
                  All Departments
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-[#F58220] transition-colors">
                  Contact &amp; Map
                </Link>
              </li>
              <li>
                <Link to="/contact?type=quote" className="text-gray-300 hover:text-[#F58220] transition-colors">
                  Quote Request
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Store & Inquiries Contact (4 cols on desktop) */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 space-y-3">
            <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white">
              Store &amp; Inquiries
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-gray-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F58220] shrink-0 mt-0.5" />
                <span>{BUSINESS.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#F58220] shrink-0 mt-0.5" />
                <div className="flex flex-wrap items-center gap-x-1.5">
                  <a href={BUSINESS.phoneLink} className="hover:text-white transition-colors font-medium">
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
                <Mail className="w-4 h-4 text-[#F58220] shrink-0 mt-0.5" />
                <a href={BUSINESS.emailLink} className="hover:text-white transition-colors truncate">
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#F58220] shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Open Mon – Sat: {BUSINESS.hours.weekdays}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin CMS Link */}
        <div className="pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>© {currentYear} {BUSINESS.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/blogs" className="hover:text-white transition-colors">
              Blog
            </Link>
            <Link to="/wholesale" className="hover:text-white transition-colors">
              Wholesale
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Support
            </Link>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 text-gray-500 hover:text-[#F58220] transition-colors"
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
