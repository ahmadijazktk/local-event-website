import React from 'react';

interface SkeletonLoaderProps {
    count?: number;
    variant?: 'grid' | 'list';
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 3, variant = 'grid' }) => {
    return (
        <div className={`grid gap-6 ${variant === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="bg-neutral-0 rounded-lg border border-neutral-200 p-4 space-y-4 animate-pulse"
                >
                    <div className="w-full aspect-[16/9] bg-neutral-200 rounded-md" />
                    <div className="space-y-2">
                        <div className="h-3 bg-neutral-200 rounded w-1/3" />
                        <div className="h-5 bg-neutral-200 rounded w-4/5" />
                        <div className="h-3 bg-neutral-200 rounded w-full" />
                    </div>
                    <div className="pt-3 border-t border-neutral-100 flex justify-between items-center">
                        <div className="h-4 bg-neutral-200 rounded w-1/4" />
                        <div className="h-4 bg-neutral-200 rounded w-1/4" />
                    </div>
                </div>
            ))}
        </div>
    );
};
