import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Building2, ArrowRight } from 'lucide-react';
import { mockCountries, mockAdminAreas, mockCities } from '@/data/locationData';
import { LocationBreadcrumb } from '@/components/LocationBreadcrumb';

export default async function AdminAreaLocationHubPage({
    params,
}: {
    params: Promise<{ country: string; adminArea: string }>;
}) {
    const { country: countrySlug, adminArea: adminAreaSlug } = await params;
    const country = mockCountries.find((c) => c.slug === countrySlug);
    const area = mockAdminAreas.find(
        (a) => a.countrySlug === countrySlug && a.slug === adminAreaSlug
    );

    if (!country || !area) {
        notFound();
    }

    const cities = mockCities.filter(
        (c) => c.countrySlug === country.slug && c.adminAreaSlug === area.slug
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            <LocationBreadcrumb
                items={[
                    { label: 'Location Hubs', href: '/locations' },
                    { label: country.name, href: `/locations/${country.slug}` },
                    { label: area.name },
                ]}
            />

            <div className="bg-neutral-100 rounded-xl p-8 border border-neutral-200 space-y-3">
                <h1 className="font-heading font-bold text-3xl sm:text-4xl text-neutral-900">
                    Location Directory: {area.name}, {country.name}
                </h1>
                <p className="text-sm text-neutral-600 max-w-2xl">
                    Browse indexed cities within the {area.typeLabel.toLowerCase()} of {area.name}.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cities.map((city) => (
                    <Link
                        key={city.id}
                        href={`/locations/${country.slug}/${area.slug}/${city.slug}`}
                        className="group p-6 bg-neutral-0 rounded-lg border border-neutral-200 hover:border-primary-600 hover:shadow-md transition-all flex items-center justify-between"
                    >
                        <div>
                            <h3 className="font-heading font-semibold text-neutral-900 text-lg group-hover:text-primary-600 transition-colors">
                                {city.name}
                            </h3>
                            <p className="text-xs text-neutral-500 mt-1">
                                {city.eventCount} active events
                            </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-transform" />
                    </Link>
                ))}
            </div>
        </div>
    );
}
