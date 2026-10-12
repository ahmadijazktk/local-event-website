import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Building2, ExternalLink, Calendar, MapPin, ShieldCheck, Mail, Phone } from 'lucide-react';
import { mockOrganizers } from '@/data/organizerData';
import { mockEvents } from '@/data/eventData';
import { LocationBreadcrumb } from '@/components/LocationBreadcrumb';
import { VerificationBadge } from '@/components/VerificationBadge';
import { EventCard } from '@/components/EventCard';

export default async function OrganizerProfilePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const organizer = mockOrganizers.find((o) => o.slug === slug);

    if (!organizer) {
        notFound();
    }

    const organizerEvents = mockEvents.filter(
        (e) => e.organizer.id === organizer.id || e.organizer.slug === organizer.slug
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            <LocationBreadcrumb items={[{ label: 'Organizers', href: '/events' }, { label: organizer.displayName }]} />

            <div className="bg-neutral-100 rounded-xl p-8 border border-neutral-200 flex flex-col md:flex-row items-start gap-6">
                <img
                    src={organizer.logo}
                    alt={organizer.displayName}
                    className="w-24 h-24 rounded-full object-cover border-2 border-neutral-0 shadow-md shrink-0"
                />

                <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="font-heading font-bold text-3xl text-neutral-900">
                            {organizer.displayName}
                        </h1>
                        <VerificationBadge status={organizer.verificationStatus} />
                    </div>

                    <p className="text-sm text-neutral-700 max-w-3xl leading-relaxed">
                        {organizer.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600 pt-2 border-t border-neutral-200/80">
                        {organizer.headquartersAddress && (
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                                <span>HQ: {organizer.headquartersAddress}</span>
                            </span>
                        )}
                        {organizer.websiteUrl && (
                            <a
                                href={organizer.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 font-medium text-primary-600 hover:underline"
                            >
                                <span>Website</span>
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        )}
                    </div>
                </div>

                <div className="shrink-0">
                    <Link
                        href={`/claim/organizer/${organizer.id}`}
                        className="inline-flex items-center gap-1.5 bg-neutral-0 hover:bg-neutral-50 text-neutral-900 text-xs font-semibold px-4 py-2.5 rounded-md border border-neutral-300 shadow-sm transition-colors"
                    >
                        <ShieldCheck className="w-4 h-4 text-primary-600" />
                        <span>Claim Organizer Profile</span>
                    </Link>
                </div>
            </div>

            <section className="space-y-6">
                <h2 className="font-heading font-bold text-2xl text-neutral-900">
                    Events Hosted by {organizer.displayName} ({organizerEvents.length})
                </h2>

                {organizerEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {organizerEvents.map((event) => (
                            <EventCard key={event.id} event={event} variant="grid" />
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center bg-neutral-50 rounded-lg border border-neutral-200 text-xs text-neutral-500">
                        No public active events currently listed under this organizer.
                    </div>
                )}
            </section>
        </div>
    );
}
