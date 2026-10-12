'use client';

import React from 'react';
import { Calendar, Tag, Layers, DollarSign, Building2, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { mockCategories } from '@/data/categoryData';

export interface FilterState {
    date: string;
    category: string;
    format: string;
    price: string;
    mode: string;
}

interface FilterBarProps {
    filters: FilterState;
    onFilterChange: (newFilters: FilterState) => void;
    onReset: () => void;
    className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
    filters,
    onFilterChange,
    onReset,
    className = '',
}) => {
    const isFiltered =
        filters.date !== 'all' ||
        filters.category !== 'all' ||
        filters.format !== 'all' ||
        filters.price !== 'all' ||
        filters.mode !== 'all';

    return (
        <div className={`bg-neutral-0 p-4 rounded-lg border border-neutral-200 shadow-sm space-y-4 ${className}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                    <SlidersHorizontal className="w-4 h-4 text-primary-600" />
                    <span>Refine Events</span>
                </div>
                {isFiltered && (
                    <button
                        onClick={onReset}
                        className="inline-flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset filters</span>
                    </button>
                )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {/* Date Filter */}
                <div className="space-y-1">
                    <label className="text-[11px] font-medium text-neutral-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-neutral-400" /> Date Intent
                    </label>
                    <select
                        value={filters.date}
                        onChange={(e) => onFilterChange({ ...filters, date: e.target.value })}
                        className="w-full bg-neutral-50 text-neutral-900 border border-neutral-200 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600"
                    >
                        <option value="all">Any Date</option>
                        <option value="today">Today</option>
                        <option value="this-weekend">This Weekend</option>
                        <option value="this-month">This Month</option>
                        <option value="next-30-days">Next 30 Days</option>
                    </select>
                </div>

                {/* Category Filter */}
                <div className="space-y-1">
                    <label className="text-[11px] font-medium text-neutral-500 flex items-center gap-1">
                        <Tag className="w-3 h-3 text-neutral-400" /> Topic Category
                    </label>
                    <select
                        value={filters.category}
                        onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
                        className="w-full bg-neutral-50 text-neutral-900 border border-neutral-200 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600"
                    >
                        <option value="all">All Topics</option>
                        {mockCategories.map((cat) => (
                            <option key={cat.id} value={cat.slug}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Format Filter */}
                <div className="space-y-1">
                    <label className="text-[11px] font-medium text-neutral-500 flex items-center gap-1">
                        <Layers className="w-3 h-3 text-neutral-400" /> Format
                    </label>
                    <select
                        value={filters.format}
                        onChange={(e) => onFilterChange({ ...filters, format: e.target.value })}
                        className="w-full bg-neutral-50 text-neutral-900 border border-neutral-200 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600"
                    >
                        <option value="all">All Formats</option>
                        <option value="Conference">Conference</option>
                        <option value="Trade Show">Trade Show</option>
                        <option value="Meetup">Meetup</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Seminar">Seminar</option>
                        <option value="Exhibition">Exhibition</option>
                    </select>
                </div>

                {/* Price Filter */}
                <div className="space-y-1">
                    <label className="text-[11px] font-medium text-neutral-500 flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-neutral-400" /> Price
                    </label>
                    <select
                        value={filters.price}
                        onChange={(e) => onFilterChange({ ...filters, price: e.target.value })}
                        className="w-full bg-neutral-50 text-neutral-900 border border-neutral-200 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600"
                    >
                        <option value="all">All Prices</option>
                        <option value="free">Free Events</option>
                        <option value="paid">Paid Events</option>
                    </select>
                </div>

                {/* Attendance Mode */}
                <div className="space-y-1">
                    <label className="text-[11px] font-medium text-neutral-500 flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-neutral-400" /> Mode
                    </label>
                    <select
                        value={filters.mode}
                        onChange={(e) => onFilterChange({ ...filters, mode: e.target.value })}
                        className="w-full bg-neutral-50 text-neutral-900 border border-neutral-200 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600"
                    >
                        <option value="all">All Modes</option>
                        <option value="in_person">In Person</option>
                        <option value="online">Online</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                </div>
            </div>
        </div>
    );
};
