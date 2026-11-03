import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../utils/helpers';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  showHome = true,
  className,
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        'flex items-center flex-wrap gap-1.5 text-xs font-medium text-[#777777] mb-5 sm:mb-6',
        className
      )}
    >
      {showHome && (
        <>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-[#777777] hover:text-[#F58220] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-[#CCCCCC] shrink-0" />
        </>
      )}

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            {item.path && !isLast ? (
              <Link
                to={item.path}
                className="text-[#777777] hover:text-[#F58220] transition-colors capitalize truncate max-w-[150px] sm:max-w-none"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  'capitalize truncate max-w-[180px] sm:max-w-sm',
                  isLast ? 'text-[#09132F] font-semibold' : 'text-[#777777]'
                )}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}

            {!isLast && <ChevronRight className="w-3 h-3 text-[#CCCCCC] shrink-0" />}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

