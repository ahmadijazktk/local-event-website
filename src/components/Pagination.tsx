import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    className = '',
}) => {
    if (totalPages <= 1) return null;

    return (
        <nav aria-label="Pagination" className={`flex items-center justify-between border-t border-neutral-200 pt-6 ${className}`}>
            <div className="text-xs text-neutral-600">
                Page <span className="font-semibold text-neutral-900">{currentPage}</span> of{' '}
                <span className="font-semibold text-neutral-900">{totalPages}</span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-neutral-200 bg-neutral-0 text-xs font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                </button>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-neutral-200 bg-neutral-0 text-xs font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </nav>
    );
};
