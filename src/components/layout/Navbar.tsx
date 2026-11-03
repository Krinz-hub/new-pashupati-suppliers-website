import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, Search, Heart, ShoppingBag, User, X, Phone } from 'lucide-react';
import { Container } from '../common/Container';
import { Logo } from '../common/Logo';
import { MobileMenu } from './MobileMenu';
import { cn, getWishlist } from '../../utils/helpers';
import { BUSINESS } from '../../config/business';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'All Products', path: '/products' },
  { name: 'Categories', path: '/categories' },
  { name: 'Wholesale & Bulk', path: '/wholesale' },
  { name: 'Blog', path: '/blogs' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [savedCount, setSavedCount] = useState<number>(() => getWishlist().length);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const handleUpdate = () => setSavedCount(getWishlist().length);
    window.addEventListener('wishlist-updated', handleUpdate);
    return () => window.removeEventListener('wishlist-updated', handleUpdate);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileSearchOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-[#EEEEF0] transition-all">
        {/* Top Header Row */}
        <Container>
          <div className="flex items-center justify-between gap-3 sm:gap-6 py-2.5 sm:py-3.5">
            {/* Mobile: Left Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 rounded-full text-[#171717] hover:bg-[#F8F8F9] transition-colors focus-visible:ring-2 focus-visible:ring-[#F58220]"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5 text-[#09132F]" />
              </button>
            </div>

            {/* Brand Logo: Left on Desktop, Centered on Mobile */}
            <div className="shrink-0 flex items-center justify-center flex-1 md:flex-initial text-center md:text-left">
              <Logo />
            </div>

            {/* Desktop: Central Wide Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-4">
              <form onSubmit={handleSearchSubmit} className="relative w-full flex items-center">
                <div className="relative w-full">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777] pointer-events-none" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 5,000+ products, categories, utensils, plastics..."
                    className="w-full pl-10 pr-24 py-2 text-[13px] bg-[#F8F8F9] border border-[#EEEEF0] rounded-full text-[#171717] placeholder:text-[#777777] focus:outline-none focus:border-[#F58220] focus:ring-1 focus:ring-[#F58220] focus:bg-white transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-4 bg-[#F58220] hover:bg-[#E97516] text-white text-[12px] font-semibold rounded-full transition-colors flex items-center gap-1.5 shadow-xs"
                    aria-label="Search"
                  >
                    <span>Search</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Desktop Right Side: Wishlist, Shopping Cart, User Profile, Single Phone Action */}
            <div className="hidden md:flex items-center gap-1 sm:gap-2">
              {/* Wishlist */}
              <Link
                to="/products?saved=true"
                className="flex items-center gap-1.5 p-2 rounded-full text-[#171717] hover:text-[#F58220] hover:bg-[#F8F8F9] transition-colors"
                title="Browse Catalog & Wishlist"
                aria-label="Wishlist"
              >
                <div className="relative">
                  <Heart className={`w-5 h-5 ${savedCount > 0 ? 'text-[#F58220] fill-[#F58220]/20' : ''}`} />
                  {savedCount > 0 && (
                    <span className="absolute -top-1 -right-1.5 min-w-[16px] h-4 px-1 bg-[#F58220] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                      {savedCount}
                    </span>
                  )}
                </div>
                <span className="text-[13px] font-medium hidden lg:inline">Saved</span>
              </Link>

              {/* Shopping Cart / Inquiry Bag */}
              <Link
                to="/contact?type=quote"
                className="flex items-center gap-1.5 p-2 rounded-full text-[#171717] hover:text-[#F58220] hover:bg-[#F8F8F9] transition-colors"
                title="Wholesale Inquiry Cart"
                aria-label="Shopping Cart & Inquiry"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#F58220] rounded-full" />
                </div>
                <span className="text-[13px] font-medium hidden lg:inline">Quote Cart</span>
              </Link>

              {/* User Profile / Admin or Contact */}
              <Link
                to="/contact"
                className="flex items-center gap-1.5 p-2 rounded-full text-[#171717] hover:text-[#F58220] hover:bg-[#F8F8F9] transition-colors"
                title="Support & Customer Desk"
                aria-label="Customer Profile"
              >
                <User className="w-5 h-5" />
                <span className="text-[13px] font-medium hidden lg:inline">Support</span>
              </Link>

              <div className="h-5 w-[1px] bg-[#EEEEF0] mx-1 hidden lg:block" />

              {/* Single Hotline Action in Header */}
              <a
                href={BUSINESS.phoneLink}
                className="hidden lg:flex items-center gap-1.5 text-[12px] font-medium text-[#777777] hover:text-[#F58220] transition-colors pl-1"
              >
                <Phone className="w-3.5 h-3.5 text-[#F58220]" />
                <span className="font-semibold text-[#09132F]">{BUSINESS.phone}</span>
              </a>
            </div>

            {/* Mobile Right Side: Search Toggle Icon */}
            <div className="flex items-center gap-1 md:hidden">
              <button
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="p-2 rounded-full text-[#09132F] hover:bg-[#F8F8F9] transition-colors focus-visible:ring-2 focus-visible:ring-[#F58220]"
                aria-label="Search products"
              >
                {mobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>
              <Link
                to="/contact?type=quote"
                className="p-2 -mr-1 rounded-full text-[#09132F] hover:bg-[#F8F8F9] transition-colors relative"
                aria-label="Quote Inquiry"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#F58220] rounded-full" />
              </Link>
            </div>
          </div>
        </Container>

        {/* Mobile Search Bar Expansion */}
        {mobileSearchOpen && (
          <div className="md:hidden px-4 pb-3 pt-1 border-t border-[#EEEEF0] bg-[#F8F8F9] animate-modal-enter">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
              <input
                type="search"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, kitchenware, plastics..."
                className="w-full pl-9 pr-20 py-2 text-xs bg-white border border-[#EEEEF0] rounded-full text-[#171717] focus:outline-none focus:border-[#F58220]"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-[#F58220] text-white text-[11px] font-semibold rounded-full"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Desktop Secondary Horizontal Navigation Strip */}
        <div className="hidden md:block border-t border-[#EEEEF0] bg-white">
          <Container>
            <div className="flex items-center justify-between py-1.5 text-[13px]">
              {/* Main Navigation links aligned to the LEFT */}
              <nav className="flex items-center gap-1">
                {NAV_LINKS.map((link) => {
                  const isActive =
                    link.path === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(link.path);

                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={cn(
                        'px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-colors',
                        isActive
                          ? 'text-[#F58220] font-bold bg-[#FFF4EB]'
                          : 'text-[#171717] hover:text-[#F58220] hover:bg-[#F8F8F9]'
                      )}
                    >
                      {link.name}
                    </NavLink>
                  );
                })}
              </nav>

              {/* Right side tag without duplicate phone number */}
              <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-[#777777]">
                <span>Daily Essentials &amp; Wholesale Supply Desk</span>
              </div>
            </div>
          </Container>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={NAV_LINKS}
      />
    </>
  );
};
