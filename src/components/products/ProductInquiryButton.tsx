import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '../common/Button';

interface ProductInquiryButtonProps {
  productName: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProductInquiryButton: React.FC<ProductInquiryButtonProps> = ({
  productName,
  className,
  size = 'sm',
}) => {
  const inquiryUrl = `/contact?product=${encodeURIComponent(productName)}`;

  return (
    <Button
      to={inquiryUrl}
      size={size}
      variant="primary"
      fullWidth
      leftIcon={<MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
      className={`text-xs sm:text-sm py-2 sm:py-2.5 ${className || ''}`}
    >
      <span className="sm:hidden">Inquire</span>
      <span className="hidden sm:inline">Inquire About Product</span>
    </Button>
  );
};
