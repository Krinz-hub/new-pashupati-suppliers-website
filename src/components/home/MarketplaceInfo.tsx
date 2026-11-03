import React from 'react';
import { Store, PackageCheck, ShieldCheck, ArrowRight } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Reveal } from '../common/Reveal';

export const MarketplaceInfo: React.FC = () => {
  return (
    <section className="py-6 sm:py-10 bg-white">
      <Container>
        {/* Shared light-grey rounded section */}
        <div className="bg-[#F1F0F6] rounded-[14px] p-5 sm:p-8 lg:p-10 border border-[#EEEEF0]">
          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#F58220] mb-1.5 block">
              TRUSTED REGIONAL HUB
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#09132F] tracking-tight">
              A Modern Marketplace for Bulk &amp; Retail Supply
            </h2>
            <p className="text-xs sm:text-sm text-[#777777] mt-1">
              Connecting trusted manufacturers, commercial businesses, and everyday shoppers across Nepal.
            </p>
          </div>

          {/* Three equal columns with white inner surfaces */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Column 1: Marketplace */}
            <Reveal variant="fade-up" delay={50}>
              <div className="bg-white rounded-[16px] p-5 sm:p-6 border border-[#EEEEF0] shadow-soft-xs flex flex-col justify-between h-full hover:shadow-soft-md transition-shadow">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#FFF4EB] text-[#F58220] flex items-center justify-center mb-4 shrink-0">
                    <Store className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#09132F] mb-1.5">
                    Marketplace Selection
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#777777] leading-relaxed mb-4">
                    Over 5,000 household utilities, kitchen essentials, plastics, and appliances under one single procurement roof in Hetauda.
                  </p>
                </div>
                <div>
                  <Button
                    to="/products"
                    size="sm"
                    variant="outline"
                    className="text-xs w-full justify-between"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Explore Products
                  </Button>
                </div>
              </div>
            </Reveal>

            {/* Column 2: Buyers */}
            <Reveal variant="fade-up" delay={100}>
              <div className="bg-white rounded-[16px] p-5 sm:p-6 border border-[#EEEEF0] shadow-soft-xs flex flex-col justify-between h-full hover:shadow-soft-md transition-shadow">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#EBF7EE] text-[#13984B] flex items-center justify-center mb-4 shrink-0">
                    <PackageCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#09132F] mb-1.5">
                    For Retailers &amp; Buyers
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#777777] leading-relaxed mb-4">
                    Tiered volume wholesale pricing, scheduled logistics, and flexible fulfillment tailored for retail shops, hotels, and schools.
                  </p>
                </div>
                <div>
                  <Button
                    to="/wholesale"
                    size="sm"
                    variant="primary"
                    className="text-xs w-full justify-between"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Wholesale Procurement
                  </Button>
                </div>
              </div>
            </Reveal>

            {/* Column 3: Sellers & Verified Quality */}
            <Reveal variant="fade-up" delay={150}>
              <div className="bg-white rounded-[16px] p-5 sm:p-6 border border-[#EEEEF0] shadow-soft-xs flex flex-col justify-between h-full hover:shadow-soft-md transition-shadow">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#F1F0F6] text-[#09132F] flex items-center justify-center mb-4 shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#09132F] mb-1.5">
                    Verified Quality Brands
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#777777] leading-relaxed mb-4">
                    Direct partnerships with certified manufacturers assure genuine merchandise, transparent rates, and reliable inventory.
                  </p>
                </div>
                <div>
                  <Button
                    to="/contact"
                    size="sm"
                    variant="outline"
                    className="text-xs w-full justify-between"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Contact Support
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};

