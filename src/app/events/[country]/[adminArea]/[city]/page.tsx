import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Calendar, Tag, BookOpen, Clock, Globe } from 'lucide-react';
import { mockCountries, mockAdminAreas, mockCities } from '@/data/locationData';
import { mockEvents } from '@/data/eventData';
import { mockCategories } from '@/data/categoryData';
import { mockGuides } from '@/data/guideData';
import { LocationBreadcrumb } from '@/components/LocationBreadcrumb';
import { EventCard } from '@/components/EventCard';
import { MapPlaceholder } from '@/components/MapPlaceholder';

export default async function CityEventsPage({
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

    const cityEvents = mockEvents.filter(
        (e) =>
            e.countrySlug === countrySlug &&
            e.adminAreaSlug === adminAreaSlug &&
            e.citySlug === citySlug
    );

    const localGuide = mockGuides.find((g) => g.relatedCitySlug === city.slug);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
            {/* Breadcrumbs */}
            <div className="space-y-4">
                <LocationBreadcrumb
                    items={[
                        { label: country.name, href: `/events/${country.slug}` },
                        { label: area.name, href: `/events/${country.slug}/${area.slug}` },
                        { label: city.name },
                    ]}
                />

                {/* Hero Header */}
                <div className="relative rounded-xl overflow-hidden bg-neutral-900 text-neutral-0 border border-neutral-800 p-8 sm:p-12 space-y-4 shadow-md">
                    <img
                        src={city.image}
                        alt={city.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-25"
                    />
                    <div className="relative z-10 space-y-3 max-w-3xl">
                        <div className="inline-flex items-center gap-1.5 bg-neutral-0/20 backdrop-blur-md text-neutral-0 text-xs font-semibold px-3 py-1 rounded-sm border border-neutral-0/30">
                            <MapPin className="w-3.5 h-3.5 text-primary-400" />
                            <span>Canonical City Hub • {city.timezone}</span>
                        </div>

                        <h1 className="font-heading font-bold text-3xl sm:text-5xl text-neutral-0 tracking-tight">
                            Events in {city.name}, {area.name}
                        </h1>

                        <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-sans">
                            Discover verified conferences, trade shows, seminars, and networking gatherings taking place in {city.name}, {country.name}.
                        </p>

                        <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-neutral-300">
                            <span className="bg-neutral-800/80 px-2.5 py-1 rounded-sm border border-neutral-700">
                                {city.eventCount} Verified Events
                            </span>
                            <span className="bg-neutral-800/80 px-2.5 py-1 rounded-sm border border-neutral-700">
                                {city.businessCount} Verified Local Businesses
                            </span>
                            <span className="bg-neutral-800/80 px-2.5 py-1 rounded-sm border border-neutral-700">
                                Timezone: {city.timezone}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Relative Date Intent Shortcuts */}
            <section className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900">
                    <Clock className="w-4 h-4 text-primary-600" />
                    <span>Browse {city.name} by Relative Date Intent:</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Link
                        href={`/events/${country.slug}/${area.slug}/${city.slug}?date=today`}
                        className="text-xs bg-neutral-0 hover:bg-primary-50 text-neutral-800 hover:text-primary-600 px-3 py-1.5 rounded-md border border-neutral-200 transition-colors font-medium"
                    >
                        Today in {city.name}
                    </Link>
                    <Link
                        href={`/events/${country.slug}/${area.slug}/${city.slug}?date=this-weekend`}
                        className="text-xs bg-neutral-0 hover:bg-primary-50 text-neutral-800 hover:text-primary-600 px-3 py-1.5 rounded-md border border-neutral-200 transition-colors font-medium"
                    >
                        This Weekend
                    </Link>
                    <Link
                        href={`/events/${country.slug}/${area.slug}/${city.slug}?date=this-month`}
                        className="text-xs bg-neutral-0 hover:bg-primary-50 text-neutral-800 hover:text-primary-600 px-3 py-1.5 rounded-md border border-neutral-200 transition-colors font-medium"
                    >
                        This Month
                    </Link>
                </div>
            </section>

            {/* City Topics & Categories */}
            <section className="space-y-4">
                <h2 className="font-heading font-bold text-2xl text-neutral-900 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-primary-600" />
                    <span>Popular Categories in {city.name}</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {mockCategories.slice(0, 6).map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/events/${country.slug}/${area.slug}/${city.slug}/category/${cat.slug}`}
                            className="p-3 bg-neutral-0 rounded-md border border-neutral-200 hover:border-primary-600 hover:bg-primary-50 text-center transition-colors group"
                        >
                            <span className="block text-xs font-semibold text-neutral-900 group-hover:text-primary-600 truncate">
                                {cat.name}
                            </span>
                            <span className="text-[10px] text-neutral-500 mt-0.5 block">
                                In {city.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Events Grid & Map Placeholder Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="font-heading font-bold text-2xl text-neutral-900">
                            Upcoming Events in {city.name}
                        </h2>
                        <span className="text-xs text-neutral-500 font-medium">
                            {cityEvents.length} Events Verified
                        </span>
                    </div>

                    {cityEvents.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {cityEvents.map((event) => (
                                <EventCard key={event.id} event={event} variant="grid" />
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center bg-neutral-50 rounded-lg border border-neutral-200 text-xs text-neutral-500">
                            No upcoming events currently scheduled for {city.name}.
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Map Component */}
                    <div className="space-y-2">
                        <h3 className="font-heading font-semibold text-neutral-900 text-sm">Geographic Coordinates</h3>
                        <MapPlaceholder
                            title={`${city.name} Metro Area`}
                            address={`${city.name} Convention & Business Hub`}
                            city={city.name}
                            adminArea={area.name}
                            country={country.name}
                            lat={city.latitude}
                            lng={city.longitude}
                        />
                    </div>

                    {/* Local Guide Snippet */}
                    {localGuide && (
                        <div className="bg-neutral-50 p-5 rounded-lg border border-neutral-200 space-y-3">
                            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary-600 uppercase tracking-wider">
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>Editorial Guide</span>
                            </div>
                            <h4 className="font-heading font-semibold text-neutral-900 text-sm">
                                {localGuide.title}
                            </h4>
                            <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                                {localGuide.summary}
                            </p>
                            <Link
                                href={`/guides/${localGuide.slug}`}
                                className="inline-block text-xs font-semibold text-primary-600 hover:text-primary-700 underline"
                            >
                                Read full city guide →
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
