import React from 'react';
import Link from 'next/link';
import { Globe, MapPin, Building2, ArrowRight } from 'lucide-react';
import { mockCountries, mockAdminAreas, mockCities } from '@/data/locationData';
import { LocationBreadcrumb } from '@/components/LocationBreadcrumb';

export default function LocationHubRootPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            <LocationBreadcrumb items={[{ label: 'Location Hubs' }]} />

            <div className="bg-neutral-100 rounded-xl p-8 border border-neutral-200 space-y-3">
                <div className="inline-flex items-center gap-1.5 bg-neutral-0 text-neutral-800 text-xs font-semibold px-3 py-1 rounded-sm border border-neutral-200">
                    <Globe className="w-3.5 h-3.5 text-primary-600" />
                    <span>Canonical Location Hierarchy Index</span>
                </div>

                <h1 className="font-heading font-bold text-3xl sm:text-4xl text-neutral-900">
                    Global Location Directory
                </h1>

                <p className="text-sm text-neutral-600 max-w-3xl leading-relaxed">
                    Navigate our mandatory Country → Administrative Area → City hierarchy. Pages are published and indexed only when local event volume meets quality density thresholds.
                </p>
            </div>

            {/* Countries Grid */}
            <div className="space-y-6">
                {mockCountries.map((country) => {
                    const areas = mockAdminAreas.filter((a) => a.countrySlug === country.slug);
                    const cities = mockCities.filter((c) => c.countrySlug === country.slug);

                    return (
                        <div
                            key={country.id}
                            className="p-6 bg-neutral-0 rounded-lg border border-neutral-200 space-y-4 shadow-sm"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
                                <div>
                                    <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                                        Country • {country.iso2}
                                    </span>
                                    <h2 className="font-heading font-bold text-2xl text-neutral-900">
                                        <Link
                                            href={`/locations/${country.slug}`}
                                            className="hover:text-primary-600 transition-colors"
                                        >
                                            {country.name}
                                        </Link>
                                    </h2>
                                </div>
                                <Link
                                    href={`/events/${country.slug}`}
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-700 bg-primary-50 px-3.5 py-2 rounded-md transition-colors w-fit"
                                >
                                    <span>Explore {country.name} Events</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {areas.map((area) => {
                                    const areaCities = cities.filter((c) => c.adminAreaSlug === area.slug);
                                    return (
                                        <div
                                            key={area.id}
                                            className="p-4 bg-neutral-50 rounded-md border border-neutral-200 space-y-2"
                                        >
                                            <div className="flex items-center justify-between">
                                                <Link
                                                    href={`/locations/${country.slug}/${area.slug}`}
                                                    className="font-heading font-semibold text-neutral-900 text-sm hover:text-primary-600 transition-colors"
                                                >
                                                    {area.name}
                                                </Link>
                                                <span className="text-[10px] text-neutral-500 bg-neutral-200 px-1.5 py-0.2 rounded-sm">
                                                    {area.typeLabel}
                                                </span>
                                            </div>

                                            <div className="space-y-1">
                                                {areaCities.map((city) => (
                                                    <Link
                                                        key={city.id}
                                                        href={`/locations/${country.slug}/${area.slug}/${city.slug}`}
                                                        className="flex items-center justify-between text-xs text-neutral-600 hover:text-primary-600 py-1 border-t border-neutral-200/50"
                                                    >
                                                        <span>{city.name}</span>
                                                        <span className="text-[11px] text-neutral-400">
                                                            {city.eventCount} events
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
