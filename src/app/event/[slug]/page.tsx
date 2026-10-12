import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    Calendar,
    Clock,
    MapPin,
    ExternalLink,
    ShieldCheck,
    Building2,
    Tag,
    Share2,
    AlertCircle,
    Video,
    Ticket,
    ChevronRight,
    Bookmark,
    Layers,
    Info,
} from 'lucide-react';
import { mockEvents } from '@/data/eventData';
import { LocationBreadcrumb } from '@/components/LocationBreadcrumb';
import { VerificationBadge } from '@/components/VerificationBadge';
import { StatusBanner } from '@/components/StatusBanner';
import { MapPlaceholder } from '@/components/MapPlaceholder';
import { EventCard } from '@/components/EventCard';
import { JsonLd } from '@/components/JsonLd';

export default async function EventDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const event = mockEvents.find((e) => e.slug === slug);

    if (!event) {
        notFound();
    }

    const relatedEvents = mockEvents
        .filter((e) => e.id !== event.id && (e.primaryCategory.slug === event.primaryCategory.slug || e.countrySlug === event.countrySlug))
        .slice(0, 3);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const breadcrumbItems = [
        { label: 'Events', href: '/events' },
        ...(event.countryName && event.countrySlug
            ? [{ label: event.countryName, href: `/events/${event.countrySlug}` }]
            : []),
        ...(event.adminAreaName && event.countrySlug && event.adminAreaSlug
            ? [{ label: event.adminAreaName, href: `/events/${event.countrySlug}/${event.adminAreaSlug}` }]
            : []),
        ...(event.cityName && event.countrySlug && event.adminAreaSlug && event.citySlug
            ? [
                {
                    label: event.cityName,
                    href: `/events/${event.countrySlug}/${event.adminAreaSlug}/${event.citySlug}`,
                },
            ]
            : []),
        { label: event.title },
    ];

    return (
        <>
            <JsonLd type="Event" data={event} />
            <JsonLd type="BreadcrumbList" data={breadcrumbItems} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
                {/* Breadcrumb Navigation */}
                <LocationBreadcrumb items={breadcrumbItems} />

                {/* Status notice if rescheduled/postponed/cancelled */}
                {event.status !== 'scheduled' && (
                    <StatusBanner status={event.status} previousStartDate={event.previousStartDate} />
                )}

                {/* Header Hero Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Title & Image Block */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Image Banner */}
                        <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm">
                            <img
                                src={event.primaryImage}
                                alt={event.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 flex items-center gap-2">
                                <span className="bg-neutral-900/85 backdrop-blur-md text-neutral-0 text-xs font-semibold px-3 py-1 rounded-sm border border-neutral-0/20">
                                    {event.primaryCategory.name}
                                </span>
                                <span className="bg-neutral-0/90 backdrop-blur-md text-neutral-900 text-xs font-semibold px-2.5 py-1 rounded-sm shadow-sm">
                                    {event.format}
                                </span>
                            </div>
                        </div>

                        {/* Title & Metadata */}
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                                <VerificationBadge status={event.verificationStatus} />
                                <span>•</span>
                                <span>Last verified: {new Date(event.lastVerifiedAt).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>Source: {event.sourceName}</span>
                            </div>

                            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-neutral-900 leading-tight">
                                {event.title}
                            </h1>

                            {/* Series Banner Link if applicable */}
                            {event.seriesSlug && event.seriesName && (
                                <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 text-xs font-medium px-3.5 py-2 rounded-md border border-primary-200">
                                    <Layers className="w-4 h-4 text-primary-600 shrink-0" />
                                    <span>Part of the annual brand series:</span>
                                    <Link href={`/series/${event.seriesSlug}`} className="font-semibold underline hover:text-primary-800">
                                        {event.seriesName} →
                                    </Link>
                                </div>
                            )}

                            {/* Lead Summary */}
                            <p className="text-base text-neutral-700 font-sans leading-relaxed border-l-2 border-primary-600 pl-4 bg-neutral-50 py-3 pr-3 rounded-r-md">
                                {event.summary}
                            </p>
                        </div>
                    </div>

                    {/* Right Action Facts Card */}
                    <div className="space-y-6">
                        <div className="bg-neutral-0 p-6 rounded-xl border border-neutral-200 shadow-md space-y-6">
                            {/* Registration CTA */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-xs text-neutral-500">
                                    <span>Registration Status</span>
                                    <span className="font-semibold text-success-600 bg-success-50 px-2 py-0.5 rounded-sm">Open</span>
                                </div>

                                <a
                                    href={event.registrationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-neutral-0 font-semibold text-sm py-3.5 px-4 rounded-md shadow-sm transition-colors text-center"
                                >
                                    <Ticket className="w-4 h-4" />
                                    <span>Official Registration Link</span>
                                    <ExternalLink className="w-3.5 h-3.5 text-neutral-200" />
                                </a>

                                <p className="text-[11px] text-neutral-400 text-center">
                                    Outbound registration sends you directly to the verified organizer website.
                                </p>
                            </div>

                            {/* Fact Dictionary Checklist */}
                            <div className="space-y-3 pt-4 border-t border-neutral-100 text-xs">
                                {/* Date */}
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                                    <div>
                                        <span className="font-semibold text-neutral-900 block">Date & Time</span>
                                        <span className="text-neutral-600">
                                            {formatDate(event.startLocalDate)}
                                            {event.startLocalTime && ` • ${event.startLocalTime}`}
                                        </span>
                                        {event.endLocalDate && (
                                            <span className="block text-neutral-500 text-[11px]">
                                                Ends {formatDate(event.endLocalDate)}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Timezone */}
                                <div className="flex items-start gap-3">
                                    <Clock className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                                    <div>
                                        <span className="font-semibold text-neutral-900 block">IANA Timezone</span>
                                        <span className="text-neutral-600">{event.timezone}</span>
                                    </div>
                                </div>

                                {/* Location / Mode */}
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                                    <div>
                                        <span className="font-semibold text-neutral-900 block">Location Mode</span>
                                        <span className="text-neutral-600">
                                            {event.attendanceMode === 'online'
                                                ? 'Online Virtual Platform'
                                                : `${event.venue?.name || 'Venue TBD'}, ${event.cityName}`}
                                        </span>
                                    </div>
                                </div>

                                {/* Pricing */}
                                <div className="flex items-start gap-3">
                                    <Ticket className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                                    <div>
                                        <span className="font-semibold text-neutral-900 block">Price / Fee</span>
                                        <span className="text-neutral-600 font-medium">
                                            {event.priceType === 'free'
                                                ? 'Free Registration'
                                                : `${event.currencyCode || '$'}${event.minPrice} - ${event.currencyCode || '$'}${event.maxPrice}`}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Utility actions */}
                            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
                                <Link
                                    href="/account/saved"
                                    className="inline-flex items-center gap-1 hover:text-primary-600 font-medium transition-colors"
                                >
                                    <Bookmark className="w-4 h-4 text-neutral-400" /> Save Event
                                </Link>
                                <Link
                                    href={`/claim/event/${event.publicId}`}
                                    className="inline-flex items-center gap-1 hover:text-danger-600 font-medium transition-colors"
                                >
                                    <AlertCircle className="w-4 h-4 text-neutral-400" /> Report Correction
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Facts Tabs / Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6 border-t border-neutral-200">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Description Block */}
                        <section className="space-y-3">
                            <h2 className="font-heading font-bold text-xl text-neutral-900">
                                About the Event
                            </h2>
                            <div className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line font-sans space-y-4">
                                {event.description}
                            </div>
                        </section>

                        {/* Schedule Section */}
                        {event.schedule && event.schedule.length > 0 && (
                            <section className="space-y-4">
                                <h2 className="font-heading font-bold text-xl text-neutral-900 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-primary-600" />
                                    <span>Event Schedule & Sessions</span>
                                </h2>
                                <div className="space-y-3">
                                    {event.schedule.map((item) => (
                                        <div
                                            key={item.id}
                                            className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1"
                                        >
                                            <div className="flex items-center justify-between text-xs font-semibold text-primary-600">
                                                <span>{item.time}</span>
                                                {item.speaker && <span className="text-neutral-500 font-normal">{item.speaker}</span>}
                                            </div>
                                            <h4 className="font-heading font-semibold text-neutral-900 text-sm">{item.title}</h4>
                                            {item.description && (
                                                <p className="text-xs text-neutral-600">{item.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Venue Profile Block */}
                        {event.venue && (
                            <section className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-heading font-bold text-xl text-neutral-900 flex items-center gap-2">
                                        <Building2 className="w-5 h-5 text-primary-600" />
                                        <span>Venue Details</span>
                                    </h2>
                                    <Link
                                        href={`/venue/${event.countrySlug}/${event.adminAreaSlug}/${event.citySlug}/${event.venue.slug}`}
                                        className="text-xs font-semibold text-primary-600 hover:text-primary-700 underline"
                                    >
                                        View Venue Profile →
                                    </Link>
                                </div>

                                <div className="p-6 bg-neutral-0 rounded-lg border border-neutral-200 space-y-4 shadow-sm">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="font-heading font-semibold text-neutral-900 text-lg">
                                                {event.venue.name}
                                            </h3>
                                            <p className="text-xs text-neutral-600 mt-0.5">
                                                {event.venue.addressLine1}, {event.venue.cityName}, {event.venue.adminAreaName}
                                            </p>
                                        </div>
                                        <span className="text-xs font-medium bg-neutral-100 px-2.5 py-1 rounded-sm text-neutral-700">
                                            {event.venue.venueType}
                                        </span>
                                    </div>

                                    <MapPlaceholder
                                        title={event.venue.name}
                                        address={event.venue.addressLine1}
                                        city={event.venue.cityName}
                                        adminArea={event.venue.adminAreaName}
                                        country={event.venue.countryName}
                                        lat={event.venue.latitude}
                                        lng={event.venue.longitude}
                                    />

                                    {event.venue.accessibilityFeatures.length > 0 && (
                                        <div className="pt-2">
                                            <span className="text-xs font-semibold text-neutral-900 block mb-1">
                                                Accessibility Features:
                                            </span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {event.venue.accessibilityFeatures.map((feat, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-[11px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-sm"
                                                    >
                                                        {feat}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-6">
                        {/* Organizer Block */}
                        <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200 space-y-4">
                            <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                                Event Organizer
                            </div>

                            <div className="flex items-center gap-3">
                                <img
                                    src={event.organizer.logo}
                                    alt={event.organizer.displayName}
                                    className="w-12 h-12 rounded-full object-cover border border-neutral-200 shrink-0"
                                />
                                <div>
                                    <h3 className="font-heading font-semibold text-neutral-900 text-base">
                                        {event.organizer.displayName}
                                    </h3>
                                    <VerificationBadge status={event.organizer.verificationStatus} />
                                </div>
                            </div>

                            <p className="text-xs text-neutral-600 leading-relaxed">
                                {event.organizer.description}
                            </p>

                            <div className="pt-2 border-t border-neutral-200/80 flex items-center justify-between text-xs">
                                <Link
                                    href={`/organizer/${event.organizer.slug}`}
                                    className="font-semibold text-primary-600 hover:text-primary-700 underline"
                                >
                                    View Organizer Profile
                                </Link>
                                {event.organizer.websiteUrl && (
                                    <a
                                        href={event.organizer.websiteUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-neutral-500 hover:text-neutral-800 flex items-center gap-1"
                                    >
                                        <span>Website</span>
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Claim / Error Reporting Box */}
                        <div className="bg-neutral-0 p-5 rounded-lg border border-neutral-200 space-y-2">
                            <h4 className="font-heading font-semibold text-neutral-900 text-xs uppercase tracking-wider">
                                Organizer Verification
                            </h4>
                            <p className="text-xs text-neutral-600 leading-relaxed">
                                Do you represent {event.organizer.displayName}? Claim ownership to update schedule items, manage official links, and receive attendee leads.
                            </p>
                            <Link
                                href={`/claim/organizer/${event.organizer.id}`}
                                className="inline-block text-xs font-semibold text-primary-600 hover:text-primary-700 underline pt-1"
                            >
                                Claim Organizer Profile →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Related Events Section */}
                {relatedEvents.length > 0 && (
                    <section className="pt-10 border-t border-neutral-200 space-y-6">
                        <h2 className="font-heading font-bold text-2xl text-neutral-900">
                            Related Events You Might Be Interested In
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedEvents.map((rel) => (
                                <EventCard key={rel.id} event={rel} variant="grid" />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}
