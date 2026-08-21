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
  size = 'md',
}) => {
  const inquiryUrl = `/contact?product=${encodeURIComponent(productName)}`;

  return (
    <Button
      to={inquiryUrl}
      size={size}
      variant="primary"
      fullWidth
      leftIcon={<MessageSquare className="w-4 h-4" />}
      className={className}
    >
      Inquire About This Product
    </Button>
  );
};
