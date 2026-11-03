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
    <main className="pt-24 pb-20 sm:pt-36 sm:pb-28 bg-[#F8F8F9] min-h-[80vh] flex items-center justify-center">
      <Container>
        <Reveal variant="fade-up">
          <div className="max-w-lg mx-auto text-center flex flex-col items-center bg-white p-8 sm:p-12 rounded-[16px] border border-[#EEEEF0] shadow-soft-sm">
            {/* Branded Graphic */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFF4EB] text-[#F58220] flex items-center justify-center mb-5 border border-[#F58220]/20">
              <SearchX className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <span className="text-[11px] font-bold uppercase tracking-widest text-[#F58220] bg-[#FFF4EB] px-3 py-1 rounded-full mb-3 border border-[#F58220]/20">
              Error 404
            </span>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#09132F] tracking-tight">
              Page Not Found
            </h1>

            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-[#777777] leading-relaxed max-w-sm">
              The page you are looking for does not exist, has been moved, or the URL might have a typo.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Button
                to="/"
                size="md"
                variant="primary"
                leftIcon={<Home className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Back to Home
              </Button>
              <Button
                to="/products"
                size="md"
                variant="outline"
                className="w-full sm:w-auto border-[#EEEEF0] text-[#09132F] hover:bg-[#F8F8F9]"
              >
                Browse Products
              </Button>
            </div>

            <div className="mt-6 sm:mt-8 pt-5 border-t border-[#EEEEF0] w-full text-xs text-[#777777]">
              Need direct assistance?{' '}
              <Link to="/contact" className="text-[#F58220] font-bold hover:underline">
                Contact our team
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </main>
  );
};
