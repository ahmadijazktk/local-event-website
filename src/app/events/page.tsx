'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, Grid, List, Sparkles, MapPin } from 'lucide-react';
import { mockEvents } from '@/data/eventData';
import { EventCard } from '@/components/EventCard';
import { FilterBar, FilterState } from '@/components/FilterBar';
import { LocationBreadcrumb } from '@/components/LocationBreadcrumb';
import { EmptyState } from '@/components/EmptyState';
import { Pagination } from '@/components/Pagination';

function GlobalEventsContent() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    const initialCategory = searchParams.get('category') || 'all';

    const [query, setQuery] = useState(initialQuery);
    const [viewMode, setViewMode] = useState<'grid' | 'horizontal'>('grid');
    const [currentPage, setCurrentPage] = useState(1);

    const [filters, setFilters] = useState<FilterState>({
        date: 'all',
        category: initialCategory,
        format: 'all',
        price: 'all',
        mode: 'all',
    });

    const handleResetFilters = () => {
        setQuery('');
        setFilters({
            date: 'all',
            category: 'all',
            format: 'all',
            price: 'all',
            mode: 'all',
        });
        setCurrentPage(1);
    };

    // Client-side filtering logic
    const filteredEvents = useMemo(() => {
        return mockEvents.filter((event) => {
            // Query filter
            if (query.trim()) {
                const q = query.toLowerCase();
                const matchesTitle = event.title.toLowerCase().includes(q);
                const matchesSummary = event.summary.toLowerCase().includes(q);
                const matchesCity = event.cityName?.toLowerCase().includes(q);
                const matchesOrg = event.organizer.displayName.toLowerCase().includes(q);
                if (!matchesTitle && !matchesSummary && !matchesCity && !matchesOrg) return false;
            }

            // Category filter
            if (filters.category !== 'all' && event.primaryCategory.slug !== filters.category) {
                return false;
            }

            // Format filter
            if (filters.format !== 'all' && event.format.toLowerCase() !== filters.format.toLowerCase()) {
                return false;
            }

            // Price filter
            if (filters.price === 'free' && event.priceType !== 'free') return false;
            if (filters.price === 'paid' && event.priceType === 'free') return false;

            // Attendance Mode
            if (filters.mode !== 'all' && event.attendanceMode !== filters.mode) {
                return false;
            }

            return true;
        });
    }, [query, filters]);

    // Pagination logic
    const pageSize = 6;
    const totalPages = Math.ceil(filteredEvents.length / pageSize);
    const paginatedEvents = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredEvents.slice(start, start + pageSize);
    }, [filteredEvents, currentPage]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Breadcrumb Header */}
            <div className="space-y-3">
                <LocationBreadcrumb items={[{ label: 'Global Events' }]} />
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 pb-6">
                    <div>
                        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-neutral-900">
                            Global Event Directory
                        </h1>
                        <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
                            Showing verified upcoming conferences, exhibitions, workshops, and business gatherings across all indexed geographic hubs.
                        </p>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-neutral-500 font-medium">View layout:</span>
                        <div className="inline-flex rounded-md border border-neutral-200 bg-neutral-100 p-0.5">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-sm text-xs font-medium transition-colors ${viewMode === 'grid' ? 'bg-neutral-0 text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-900'
                                    }`}
                                title="Grid layout"
                            >
                                <Grid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('horizontal')}
                                className={`p-1.5 rounded-sm text-xs font-medium transition-colors ${viewMode === 'horizontal' ? 'bg-neutral-0 text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-900'
                                    }`}
                                title="List layout"
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Bar */}
            <FilterBar
                filters={filters}
                onFilterChange={(newFilters) => {
                    setFilters(newFilters);
                    setCurrentPage(1);
                }}
                onReset={handleResetFilters}
            />

            {/* Query Notification if search active */}
            {query && (
                <div className="flex items-center justify-between bg-primary-50 text-primary-700 p-3 rounded-md border border-primary-200 text-xs">
                    <span>
                        Filtering results matching keyword "<strong className="font-semibold">{query}</strong>"
                    </span>
                    <button
                        onClick={() => setQuery('')}
                        className="text-primary-700 underline font-medium hover:text-primary-800"
                    >
                        Clear keyword
                    </button>
                </div>
            )}

            {/* Events Grid / List */}
            {filteredEvents.length > 0 ? (
                <div className="space-y-8">
                    <div
                        className={`grid gap-6 ${viewMode === 'grid'
                            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                            : 'grid-cols-1'
                            }`}
                    >
                        {paginatedEvents.map((event) => (
                            <EventCard key={event.id} event={event} variant={viewMode} />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => {
                            setCurrentPage(page);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    />
                </div>
            ) : (
                <EmptyState onReset={handleResetFilters} />
            )}
        </div>
    );
}

export default function GlobalEventsPage() {
    return (
        <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8 text-xs text-neutral-500">Loading events...</div>}>
            <GlobalEventsContent />
        </Suspense>
    );
}
