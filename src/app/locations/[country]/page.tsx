import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, ArrowRight, Layers } from 'lucide-react';
import { mockCountries, mockAdminAreas, mockCities } from '@/data/locationData';
import { LocationBreadcrumb } from '@/components/LocationBreadcrumb';

export default async function CountryLocationHubPage({
    params,
}: {
    params: Promise<{ country: string }>;
}) {
    const { country: countrySlug } = await params;
    const country = mockCountries.find((c) => c.slug === countrySlug);

    if (!country) {
        notFound();
    }

    const adminAreas = mockAdminAreas.filter((a) => a.countrySlug === country.slug);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            <LocationBreadcrumb
                items={[{ label: 'Location Hubs', href: '/locations' }, { label: country.name }]}
            />

            <div className="bg-neutral-100 rounded-xl p-8 border border-neutral-200 space-y-3">
                <h1 className="font-heading font-bold text-3xl sm:text-4xl text-neutral-900">
                    Location Directory: {country.name}
                </h1>
                <p className="text-sm text-neutral-600 max-w-2xl">
                    Browse administrative divisions and cities indexed for {country.name}.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {adminAreas.map((area) => (
                    <Link
                        key={area.id}
                        href={`/locations/${country.slug}/${area.slug}`}
                        className="group p-6 bg-neutral-0 rounded-lg border border-neutral-200 hover:border-primary-600 hover:shadow-md transition-all space-y-3"
                    >
                        <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                            {area.typeLabel}
                        </div>
                        <h3 className="font-heading font-semibold text-neutral-900 text-lg group-hover:text-primary-600 transition-colors">
                            {area.name}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100">
                            <span>View cities in {area.name}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
