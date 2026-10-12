import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Building2, MapPin, Users, Globe, ExternalLink, Calendar } from 'lucide-react';
import { mockVenues } from '@/data/venueData';
import { mockEvents } from '@/data/eventData';
import { mockCountries, mockAdminAreas, mockCities } from '@/data/locationData';
import { LocationBreadcrumb } from '@/components/LocationBreadcrumb';
import { MapPlaceholder } from '@/components/MapPlaceholder';
import { EventCard } from '@/components/EventCard';

export default async function VenueProfilePage({
    params,
}: {
    params: Promise<{ country: string; adminArea: string; city: string; slug: string }>;
}) {
    const { country: countrySlug, adminArea: adminAreaSlug, city: citySlug, slug: venueSlug } = await params;
    const country = mockCountries.find((c) => c.slug === countrySlug);
    const area = mockAdminAreas.find((a) => a.slug === adminAreaSlug);
    const city = mockCities.find((c) => c.slug === citySlug);
    const venue = mockVenues.find((v) => v.slug === venueSlug);

    if (!venue) {
        notFound();
    }

    const venueEvents = mockEvents.filter((e) => e.venue?.id === venue.id || e.venue?.slug === venue.slug);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            <LocationBreadcrumb
                items={[
                    ...(country ? [{ label: country.name, href: `/events/${country.slug}` }] : []),
                    ...(country && area ? [{ label: area.name, href: `/events/${country.slug}/${area.slug}` }] : []),
                    ...(country && area && city ? [{ label: city.name, href: `/events/${country.slug}/${area.slug}/${city.slug}` }] : []),
                    { label: venue.name },
                ]}
            />

            <div className="bg-neutral-100 rounded-xl p-8 border border-neutral-200 space-y-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-1.5 bg-neutral-0 text-neutral-800 text-xs font-semibold px-3 py-1 rounded-sm border border-neutral-200">
                            <Building2 className="w-3.5 h-3.5 text-primary-600" />
                            <span>{venue.venueType}</span>
                        </div>

                        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-neutral-900">
                            {venue.name}
                        </h1>

                        <p className="text-sm text-neutral-600 max-w-2xl">
                            {venue.addressLine1}, {venue.cityName}, {venue.adminAreaName}, {venue.countryName}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600 pt-2">
                            {venue.capacity && (
                                <span className="flex items-center gap-1">
                                    <Users className="w-3.5 h-3.5 text-neutral-400" />
                                    <span>Max Capacity: {venue.capacity.toLocaleString()} attendees</span>
                                </span>
                            )}
                            {venue.websiteUrl && (
                                <a
                                    href={venue.websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 font-medium text-primary-600 hover:underline"
                                >
                                    <span>Official Venue Site</span>
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <MapPlaceholder
                    title={venue.name}
                    address={venue.addressLine1}
                    city={venue.cityName}
                    adminArea={venue.adminAreaName}
                    country={venue.countryName}
                    lat={venue.latitude}
                    lng={venue.longitude}
                />
            </div>

            <section className="space-y-6">
                <h2 className="font-heading font-bold text-2xl text-neutral-900">
                    Upcoming Events at {venue.name} ({venueEvents.length})
                </h2>

                {venueEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {venueEvents.map((event) => (
                            <EventCard key={event.id} event={event} variant="grid" />
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center bg-neutral-50 rounded-lg border border-neutral-200 text-xs text-neutral-500">
                        No public active events currently scheduled at this venue.
                    </div>
                )}
            </section>
        </div>
    );
}
