import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, ArrowRight } from 'lucide-react';
import { Container } from '../common/Container';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { MobileMenu } from './MobileMenu';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { cn } from '../../utils/helpers';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Categories', path: '/categories' },
  { name: 'Wholesale', path: '/wholesale' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const isScrolled = useScrollPosition(20);
  const location = useLocation();

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-brandBorder py-3 sm:py-3.5'
            : 'bg-white/90 backdrop-blur-sm border-b border-brandBorder/50 py-3.5 sm:py-5'
        )}
      >
        <Container>
          <div className="flex items-center justify-between gap-4 sm:gap-6">
            {/* Logo */}
            <div className="shrink-0">
              <Logo />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
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
                      'relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 rounded-md',
                      isActive
                        ? 'text-navy font-bold'
                        : 'text-brandText-muted hover:text-navy hover:bg-slate-50'
                    )}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-brandRed rounded-full" />
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* Right Side: Single Primary CTA on Desktop */}
            <div className="hidden md:flex items-center">
              <Button
                to="/contact"
                size="sm"
                variant="primary"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Get a Quote
              </Button>
            </div>

            {/* Clean Mobile Menu Button (Logo on Left, Menu Button on Right) */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-lg text-navy hover:bg-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-brandRed"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={NAV_LINKS}
      />
    </>
  );
};
