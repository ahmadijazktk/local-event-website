import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Briefcase, MapPin } from 'lucide-react';
import { mockBusinesses } from '@/data/businessData';
import { mockCountries, mockAdminAreas, mockCities } from '@/data/locationData';
import { LocationBreadcrumb } from '@/components/LocationBreadcrumb';
import { VerificationBadge } from '@/components/VerificationBadge';

export default async function CityBusinessesPage({
    params,
}: {
    params: Promise<{ country: string; adminArea: string; city: string }>;
}) {
    const { country: countrySlug, adminArea: adminAreaSlug, city: citySlug } = await params;
    const country = mockCountries.find((c) => c.slug === countrySlug);
    const area = mockAdminAreas.find((a) => a.slug === adminAreaSlug);
    const city = mockCities.find((c) => c.slug === citySlug);

    if (!country || !area || !city) {
        notFound();
    }

    const cityBusinesses = mockBusinesses.filter(
        (b) =>
            b.countrySlug === countrySlug &&
            b.adminAreaSlug === adminAreaSlug &&
            b.citySlug === citySlug
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            <LocationBreadcrumb
                items={[
                    { label: country.name, href: `/events/${country.slug}` },
                    { label: area.name, href: `/events/${country.slug}/${area.slug}` },
                    { label: city.name, href: `/events/${country.slug}/${area.slug}/${city.slug}` },
                    { label: 'Local Businesses' },
                ]}
            />

            <div className="bg-neutral-100 rounded-xl p-8 border border-neutral-200 space-y-3">
                <div className="inline-flex items-center gap-1.5 bg-primary-600 text-neutral-0 text-xs font-semibold px-3 py-1 rounded-sm">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Phase 1B Local Business Module</span>
                </div>

                <h1 className="font-heading font-bold text-3xl sm:text-4xl text-neutral-900">
                    Local Businesses in {city.name}, {area.name}
                </h1>

                <p className="text-sm text-neutral-600 max-w-2xl">
                    Verified venues, event suppliers, hotels, and services located in {city.name}.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cityBusinesses.map((bz) => (
                    <div
                        key={bz.id}
                        className="p-6 bg-neutral-0 rounded-xl border border-neutral-200 shadow-sm space-y-4"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                                    {bz.categoryName || bz.primaryCategory}
                                </span>
                                <h3 className="font-heading font-bold text-xl text-neutral-900">
                                    <Link
                                        href={`/business/${bz.countrySlug}/${bz.adminAreaSlug}/${bz.citySlug}/${bz.slug}`}
                                        className="hover:text-primary-600 transition-colors"
                                    >
                                        {bz.locationName}
                                    </Link>
                                </h3>
                            </div>
                            <VerificationBadge status={bz.verificationStatus} />
                        </div>

                        <p className="text-xs text-neutral-600">{bz.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
