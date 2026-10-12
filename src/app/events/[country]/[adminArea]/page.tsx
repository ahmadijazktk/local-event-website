import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Building2, ArrowRight } from 'lucide-react';
import { mockCountries, mockAdminAreas, mockCities } from '@/data/locationData';
import { mockEvents } from '@/data/eventData';
import { LocationBreadcrumb } from '@/components/LocationBreadcrumb';
import { EventCard } from '@/components/EventCard';

export default async function AdminAreaEventsPage({
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
    const areaEvents = mockEvents.filter(
        (e) => e.countrySlug === country.slug && e.adminAreaSlug === area.slug
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
            {/* Breadcrumb & Header */}
            <div className="space-y-4">
                <LocationBreadcrumb
                    items={[
                        { label: country.name, href: `/events/${country.slug}` },
                        { label: area.name },
                    ]}
                />

                <div className="bg-neutral-100 rounded-lg p-8 border border-neutral-200 space-y-4">
                    <div className="inline-flex items-center gap-1.5 bg-neutral-0 text-neutral-800 text-xs font-semibold px-3 py-1 rounded-sm border border-neutral-200">
                        <MapPin className="w-3.5 h-3.5 text-primary-600" />
                        <span>{area.typeLabel} Level Hub • {country.name}</span>
                    </div>

                    <h1 className="font-heading font-bold text-3xl sm:text-4xl text-neutral-900">
                        Events in {area.name}, {country.name}
                    </h1>

                    <p className="text-sm text-neutral-600 max-w-3xl leading-relaxed">
                        Discover verified events across key cities, convention hubs, and business centers within the {area.typeLabel.toLowerCase()} of {area.name}.
                    </p>
                </div>
            </div>

            {/* Cities Grid */}
            <section className="space-y-4">
                <h2 className="font-heading font-bold text-2xl text-neutral-900 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary-600" />
                    <span>Cities in {area.name}</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {cities.map((city) => (
                        <Link
                            key={city.id}
                            href={`/events/${country.slug}/${area.slug}/${city.slug}`}
                            className="group p-5 bg-neutral-0 rounded-lg border border-neutral-200 hover:border-primary-600 hover:shadow-md transition-all flex items-center justify-between"
                        >
                            <div className="space-y-1">
                                <h3 className="font-heading font-semibold text-neutral-900 text-base group-hover:text-primary-600 transition-colors">
                                    {city.name}
                                </h3>
                                <p className="text-xs text-neutral-500">
                                    {city.eventCount} upcoming events
                                </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    ))}
                </div>
            </section>

            {/* Area Events List */}
            <section className="space-y-6">
                <h2 className="font-heading font-bold text-2xl text-neutral-900">
                    Upcoming Events in {area.name}
                </h2>
                {areaEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {areaEvents.map((event) => (
                            <EventCard key={event.id} event={event} variant="grid" />
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center bg-neutral-50 rounded-lg border border-neutral-200 text-xs text-neutral-500">
                        No active public events currently indexed in {area.name}.
                    </div>
                )}
            </section>
        </div>
    );
}
