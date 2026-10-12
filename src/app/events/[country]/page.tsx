import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Building2, ArrowRight, ShieldCheck, Layers } from 'lucide-react';
import { mockCountries, mockAdminAreas, mockCities } from '@/data/locationData';
import { mockEvents } from '@/data/eventData';
import { LocationBreadcrumb } from '@/components/LocationBreadcrumb';
import { EventCard } from '@/components/EventCard';

export default async function CountryEventsPage({
    params,
}: {
    params: Promise<{ country: string }>;
}) {
    const { country: countrySlug } = await params;
    const country = mockCountries.find((c) => c.slug === countrySlug);

    if (!country) {
        notFound();
    }

    // Find admin areas & cities for this country
    const adminAreas = mockAdminAreas.filter((a) => a.countrySlug === country.slug);
    const cities = mockCities.filter((c) => c.countrySlug === country.slug);
    const countryEvents = mockEvents.filter((e) => e.countrySlug === country.slug);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
            {/* Breadcrumb & Header */}
            <div className="space-y-4">
                <LocationBreadcrumb items={[{ label: country.name }]} />

                <div className="bg-neutral-100 rounded-lg p-8 border border-neutral-200 space-y-4">
                    <div className="inline-flex items-center gap-1.5 bg-neutral-0 text-neutral-800 text-xs font-semibold px-3 py-1 rounded-sm border border-neutral-200">
                        <MapPin className="w-3.5 h-3.5 text-primary-600" />
                        <span>Country Event Hub • {country.iso2}</span>
                    </div>

                    <h1 className="font-heading font-bold text-3xl sm:text-4xl text-neutral-900">
                        Events in {country.name}
                    </h1>

                    <p className="text-sm text-neutral-600 max-w-3xl leading-relaxed">
                        Browse verified upcoming conferences, exhibitions, and industry events hosted across the administrative divisions and primary cities of {country.name}.
                    </p>

                    <div className="pt-2 flex items-center gap-4 text-xs text-neutral-500 font-medium">
                        <span>{countryEvents.length} Verified Events</span>
                        <span>•</span>
                        <span>{adminAreas.length} Administrative Divisions</span>
                        <span>•</span>
                        <span>{cities.length} Key Cities</span>
                    </div>
                </div>
            </div>

            {/* Administrative Areas Grid */}
            <section className="space-y-4">
                <h2 className="font-heading font-bold text-2xl text-neutral-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-primary-600" />
                    <span>Administrative Divisions in {country.name}</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {adminAreas.map((area) => (
                        <Link
                            key={area.id}
                            href={`/events/${country.slug}/${area.slug}`}
                            className="group p-5 bg-neutral-0 rounded-lg border border-neutral-200 hover:border-primary-600 hover:shadow-md transition-all space-y-2"
                        >
                            <div className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
                                {area.typeLabel}
                            </div>
                            <h3 className="font-heading font-semibold text-neutral-900 text-base group-hover:text-primary-600 transition-colors">
                                {area.name}
                            </h3>
                            <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100">
                                <span>{area.eventCount} upcoming events</span>
                                <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Primary Cities */}
            <section className="space-y-4">
                <h2 className="font-heading font-bold text-2xl text-neutral-900 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary-600" />
                    <span>Leading Cities in {country.name}</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {cities.map((city) => (
                        <Link
                            key={city.id}
                            href={`/events/${country.slug}/${city.adminAreaSlug}/${city.slug}`}
                            className="group relative h-48 rounded-lg overflow-hidden border border-neutral-200 shadow-sm"
                        >
                            <img
                                src={city.image}
                                alt={city.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent" />
                            <div className="absolute bottom-0 inset-x-0 p-4 text-neutral-0 flex items-end justify-between">
                                <div>
                                    <h4 className="font-heading font-bold text-lg text-neutral-0 group-hover:text-primary-200 transition-colors">
                                        {city.name}
                                    </h4>
                                    <p className="text-xs text-neutral-300">{city.adminAreaName}</p>
                                </div>
                                <span className="text-xs font-semibold text-primary-400">
                                    {city.eventCount} events →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Upcoming Country Events */}
            <section className="space-y-6">
                <h2 className="font-heading font-bold text-2xl text-neutral-900">
                    Upcoming Events in {country.name}
                </h2>
                {countryEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {countryEvents.map((event) => (
                            <EventCard key={event.id} event={event} variant="grid" />
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center bg-neutral-50 rounded-lg border border-neutral-200 text-xs text-neutral-500">
                        No active public events currently indexed for this country.
                    </div>
                )}
            </section>
        </div>
    );
}
