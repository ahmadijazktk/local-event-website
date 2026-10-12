import React from 'react';
import { CalendarX, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
    title?: string;
    description?: string;
    onReset?: () => void;
    className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    title = 'No verified events found',
    description = 'Try adjusting your filters, selecting a different location, or searching for broader terms.',
    onReset,
    className = '',
}) => {
    return (
        <div className={`p-12 text-center bg-neutral-50 rounded-lg border border-dashed border-neutral-300 flex flex-col items-center justify-center space-y-4 ${className}`}>
            <div className="w-14 h-14 rounded-full bg-neutral-200/60 flex items-center justify-center text-neutral-500">
                <CalendarX className="w-7 h-7 text-neutral-600" />
            </div>
            <div className="max-w-md space-y-1">
                <h3 className="font-heading font-semibold text-neutral-900 text-lg">{title}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">{description}</p>
            </div>
            {onReset && (
                <button
                    onClick={onReset}
                    className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-neutral-0 text-xs font-medium px-4 py-2 rounded-md transition-colors shadow-sm"
                >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset search filters</span>
                </button>
            )}
        </div>
    );
};
