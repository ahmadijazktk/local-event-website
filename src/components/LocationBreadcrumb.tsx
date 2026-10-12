import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface LocationBreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export const LocationBreadcrumb: React.FC<LocationBreadcrumbProps> = ({ items, className = '' }) => {
    return (
        <nav aria-label="Breadcrumb" className={`flex items-center space-x-1.5 text-xs text-neutral-500 overflow-x-auto py-1 ${className}`}>
            <Link
                href="/"
                className="flex items-center gap-1 hover:text-primary-600 transition-colors shrink-0"
            >
                <Home className="w-3.5 h-3.5" />
                <span className="sr-only">Home</span>
            </Link>
            {items.map((item, idx) => (
                <React.Fragment key={idx}>
                    <ChevronRight className="w-3 h-3 shrink-0 text-neutral-300" />
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="hover:text-primary-600 font-medium transition-colors whitespace-nowrap shrink-0 text-neutral-600"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="font-semibold text-neutral-900 whitespace-nowrap shrink-0">
                            {item.label}
                        </span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};
