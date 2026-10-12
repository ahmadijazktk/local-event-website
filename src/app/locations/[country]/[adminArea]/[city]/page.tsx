import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Calendar, ArrowRight, Building2 } from 'lucide-react';
import { mockCountries, mockAdminAreas, mockCities } from '@/data/locationData';
import { LocationBreadcrumb } from '@/components/LocationBreadcrumb';

export default async function CityLocationHubPage({
    params,
}: {
    params: Promise<{ country: string; adminArea: string; city: string }>;
}) {
    const { country: countrySlug, adminArea: adminAreaSlug, city: citySlug } = await params;
    const country = mockCountries.find((c) => c.slug === countrySlug);
    const area = mockAdminAreas.find(
        (a) => a.countrySlug === countrySlug && a.slug === adminAreaSlug
    );
    const city = mockCities.find(
        (c) =>
            c.countrySlug === countrySlug &&
            c.adminAreaSlug === adminAreaSlug &&
            c.slug === citySlug
    );

    if (!country || !area || !city) {
        notFound();
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            <LocationBreadcrumb
                items={[
                    { label: 'Location Hubs', href: '/locations' },
                    { label: country.name, href: `/locations/${country.slug}` },
                    { label: area.name, href: `/locations/${country.slug}/${area.slug}` },
                    { label: city.name },
                ]}
            />

            <div className="bg-neutral-100 rounded-xl p-8 border border-neutral-200 space-y-4">
                <h1 className="font-heading font-bold text-3xl sm:text-4xl text-neutral-900">
                    City Hub: {city.name}, {area.name}
                </h1>
                <p className="text-sm text-neutral-600 max-w-2xl">
                    Verified location node representing {city.name}, {country.name}.
                </p>

                <div className="pt-2 flex items-center gap-4">
                    <Link
                        href={`/events/${country.slug}/${area.slug}/${city.slug}`}
                        className="inline-flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-neutral-0 text-xs font-semibold px-4 py-2.5 rounded-md shadow-sm transition-colors"
                    >
                        <Calendar className="w-4 h-4" />
                        <span>Browse {city.name} Events</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                        href={`/businesses/${country.slug}/${area.slug}/${city.slug}`}
                        className="inline-flex items-center gap-1.5 bg-neutral-0 hover:bg-neutral-50 text-neutral-900 text-xs font-semibold px-4 py-2.5 rounded-md border border-neutral-300 transition-colors"
                    >
                        <Building2 className="w-4 h-4 text-primary-600" />
                        <span>Browse Local Businesses (Phase 1B)</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
