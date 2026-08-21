import React, { useEffect } from 'react';
import { Hero } from '../components/home/Hero';
import { ValueStrip } from '../components/home/ValueStrip';
import { AboutPreview } from '../components/home/AboutPreview';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { WholesaleCTA } from '../components/home/WholesaleCTA';
import { PortfolioPreview } from '../components/home/PortfolioPreview';
import { FinalCTA } from '../components/home/FinalCTA';
import { setPageTitle } from '../utils/helpers';

export const Home: React.FC = () => {
  useEffect(() => {
    setPageTitle('New Pashupati Suppliers | Household & Wholesale Supplies');
  }, []);

  return (
    <main>
      <Hero />
      <ValueStrip />
      <AboutPreview />
      <CategoryGrid />
      <WhyChooseUs />
      <WholesaleCTA />
      <PortfolioPreview />
      <FinalCTA />
    </main>
  );
};
