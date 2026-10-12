import React from 'react';
import { notFound } from 'next/navigation';
import { Tag, MapPin } from 'lucide-react';
import { mockCountries, mockAdminAreas, mockCities } from '@/data/locationData';
import { mockCategories } from '@/data/categoryData';
import { mockEvents } from '@/data/eventData';
import { LocationBreadcrumb } from '@/components/LocationBreadcrumb';
import { EventCard } from '@/components/EventCard';

export default async function CityCategoryEventsPage({
    params,
}: {
    params: Promise<{ country: string; adminArea: string; city: string; category: string }>;
}) {
    const { country: countrySlug, adminArea: adminAreaSlug, city: citySlug, category: categorySlug } = await params;
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
    const category = mockCategories.find((cat) => cat.slug === categorySlug);

    if (!country || !area || !city || !category) {
        notFound();
    }

    const matchingEvents = mockEvents.filter(
        (e) =>
            e.countrySlug === countrySlug &&
            e.adminAreaSlug === adminAreaSlug &&
            e.citySlug === citySlug &&
            e.primaryCategory.slug === categorySlug
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="space-y-4">
                <LocationBreadcrumb
                    items={[
                        { label: country.name, href: `/events/${country.slug}` },
                        { label: area.name, href: `/events/${country.slug}/${area.slug}` },
                        { label: city.name, href: `/events/${country.slug}/${area.slug}/${city.slug}` },
                        { label: category.name },
                    ]}
                />

                <div className="bg-neutral-100 rounded-lg p-8 border border-neutral-200 space-y-3">
                    <div className="inline-flex items-center gap-1.5 bg-neutral-0 text-neutral-800 text-xs font-semibold px-3 py-1 rounded-sm border border-neutral-200">
                        <Tag className="w-3.5 h-3.5 text-primary-600" />
                        <span>High-Intent City Category Landing Page</span>
                    </div>

                    <h1 className="font-heading font-bold text-3xl sm:text-4xl text-neutral-900">
                        {category.name} Events in {city.name}, {area.name}
                    </h1>

                    <p className="text-sm text-neutral-600 max-w-3xl leading-relaxed">
                        Curated list of verified {category.name.toLowerCase()} conferences, workshops, expos, and industry gatherings hosted in {city.name}.
                    </p>

                    <div className="text-xs text-neutral-500 font-medium pt-1">
                        {matchingEvents.length} Active Events Found
                    </div>
                </div>
            </div>

            <section className="space-y-6">
                {matchingEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {matchingEvents.map((event) => (
                            <EventCard key={event.id} event={event} variant="grid" />
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center bg-neutral-50 rounded-lg border border-neutral-200 space-y-3">
                        <p className="text-xs text-neutral-600">
                            No upcoming {category.name.toLowerCase()} events currently scheduled in {city.name}.
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}
