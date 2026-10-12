'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Calendar, Building2, Tag, ChevronRight, X } from 'lucide-react';
import { mockEvents } from '@/data/eventData';
import { mockCities } from '@/data/locationData';
import { mockCategories } from '@/data/categoryData';

interface SearchBarProps {
    size?: 'sm' | 'md' | 'lg';
    placeholder?: string;
    className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    size = 'md',
    placeholder = 'Search events, topics, cities, or organizers...',
    className = '',
}) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Filter autocomplete candidates
    const matchingCities = query.trim()
        ? mockCities.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.countryName.toLowerCase().includes(query.toLowerCase()))
        : [];

    const matchingCategories = query.trim()
        ? mockCategories.filter((cat) => cat.name.toLowerCase().includes(query.toLowerCase()))
        : [];

    const matchingEvents = query.trim()
        ? mockEvents.filter(
            (e) =>
                e.title.toLowerCase().includes(query.toLowerCase()) ||
                e.summary.toLowerCase().includes(query.toLowerCase()) ||
                e.organizer.displayName.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        setIsOpen(false);
        router.push(`/events?q=${encodeURIComponent(query)}`);
    };

    const isLg = size === 'lg';

    return (
        <div ref={dropdownRef} className={`relative w-full ${className}`}>
            <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
                <div className="absolute left-4 text-neutral-400 pointer-events-none">
                    <Search className={isLg ? 'w-5 h-5' : 'w-4 h-4'} />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder={placeholder}
                    className={`w-full bg-neutral-0 text-neutral-900 placeholder:text-neutral-400 rounded-md border border-neutral-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 font-sans transition-all ${isLg ? 'pl-12 pr-28 py-4 text-base' : 'pl-10 pr-20 py-2.5 text-sm'
                        }`}
                />

                {query && (
                    <button
                        type="button"
                        onClick={() => setQuery('')}
                        className="absolute right-24 text-neutral-400 hover:text-neutral-600 p-1"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}

                <button
                    type="submit"
                    className={`absolute right-1.5 bg-primary-600 hover:bg-primary-700 text-neutral-0 font-medium rounded-md transition-colors ${isLg ? 'px-6 py-2.5 text-sm' : 'px-4 py-1.5 text-xs'
                        }`}
                >
                    Search
                </button>
            </form>

            {/* Autocomplete Dropdown */}
            {isOpen && query.trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-0 rounded-lg border border-neutral-200 shadow-lg z-50 overflow-hidden divide-y divide-neutral-100 max-h-96 overflow-y-auto">
                    {/* Matching Cities */}
                    {matchingCities.length > 0 && (
                        <div className="p-2">
                            <div className="px-3 py-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Cities</div>
                            {matchingCities.map((city) => (
                                <button
                                    key={city.id}
                                    onClick={() => {
                                        setIsOpen(false);
                                        router.push(`/events/${city.countrySlug}/${city.adminAreaSlug}/${city.slug}`);
                                    }}
                                    className="w-full flex items-center justify-between px-3 py-2 text-xs text-neutral-800 hover:bg-primary-50 hover:text-primary-600 rounded-md transition-colors text-left"
                                >
                                    <span className="flex items-center gap-2">
                                        <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                                        <span className="font-medium">{city.name}</span>
                                        <span className="text-neutral-400">({city.adminAreaName}, {city.countryName})</span>
                                    </span>
                                    <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Matching Categories */}
                    {matchingCategories.length > 0 && (
                        <div className="p-2">
                            <div className="px-3 py-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Topics & Categories</div>
                            {matchingCategories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setIsOpen(false);
                                        router.push(`/events/category/${cat.slug}`);
                                    }}
                                    className="w-full flex items-center justify-between px-3 py-2 text-xs text-neutral-800 hover:bg-primary-50 hover:text-primary-600 rounded-md transition-colors text-left"
                                >
                                    <span className="flex items-center gap-2">
                                        <Tag className="w-3.5 h-3.5 text-neutral-400" />
                                        <span className="font-medium">{cat.name}</span>
                                    </span>
                                    <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Matching Events */}
                    {matchingEvents.length > 0 && (
                        <div className="p-2">
                            <div className="px-3 py-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Events</div>
                            {matchingEvents.map((event) => (
                                <button
                                    key={event.id}
                                    onClick={() => {
                                        setIsOpen(false);
                                        router.push(`/event/${event.slug}`);
                                    }}
                                    className="w-full flex items-center justify-between px-3 py-2 text-xs text-neutral-800 hover:bg-primary-50 hover:text-primary-600 rounded-md transition-colors text-left"
                                >
                                    <span className="flex items-center gap-2 truncate">
                                        <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                                        <span className="font-medium truncate">{event.title}</span>
                                        <span className="text-neutral-400 text-[11px] shrink-0">({event.cityName})</span>
                                    </span>
                                    <ChevronRight className="w-3.5 h-3.5 text-neutral-300 shrink-0" />
                                </button>
                            ))}
                        </div>
                    )}

                    {matchingCities.length === 0 && matchingCategories.length === 0 && matchingEvents.length === 0 && (
                        <div className="p-4 text-center text-xs text-neutral-500">
                            No matching suggestions for "{query}". Press <span className="font-semibold text-neutral-800">Search</span> to view global results.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
