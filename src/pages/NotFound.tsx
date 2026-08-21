import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { Reveal } from '../components/common/Reveal';
import { Home, SearchX } from 'lucide-react';
import { setPageTitle } from '../utils/helpers';

export const NotFound: React.FC = () => {
  useEffect(() => {
    setPageTitle('Page Not Found | New Pashupati Suppliers');
  }, []);

  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32 bg-brandBg min-h-[80vh] flex items-center justify-center">
      <Container>
        <Reveal variant="fade-up">
          <div className="max-w-lg mx-auto text-center flex flex-col items-center bg-white p-8 sm:p-12 rounded-card border border-brandBorder shadow-soft-lg">
            {/* Branded Graphic */}
            <div className="w-20 h-20 rounded-2xl bg-brandRed/10 text-brandRed flex items-center justify-center mb-6 border border-brandRed/20">
              <SearchX className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-brandRed bg-brandRed/10 px-3 py-1 rounded-full mb-3">
              Error 404
            </span>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              Page Not Found
            </h1>

            <p className="mt-3.5 text-sm sm:text-base text-brandText-muted leading-relaxed">
              The page you are looking for does not exist, has been moved, or the URL might have a typo.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
              <Button
                to="/"
                size="md"
                variant="primary"
                leftIcon={<Home className="w-4 h-4" />}
              >
                Back to Home
              </Button>
              <Button
                to="/products"
                size="md"
                variant="outline"
              >
                Browse Products
              </Button>
            </div>

            <div className="mt-8 pt-6 border-t border-brandBorder w-full text-xs text-brandText-muted">
              Need direct assistance?{' '}
              <Link to="/contact" className="text-brandRed font-bold hover:underline">
                Contact our team
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </main>
  );
};
