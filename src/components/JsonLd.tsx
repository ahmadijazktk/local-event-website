import React from 'react';
import { EventOccurrence, Venue, Organizer, BusinessLocation } from '@/types/directory';

interface JsonLdProps {
    type: 'Event' | 'Place' | 'Organization' | 'LocalBusiness' | 'BreadcrumbList';
    data: any;
}

export const JsonLd: React.FC<JsonLdProps> = ({ type, data }) => {
    let schemaData: any = null;

    if (type === 'Event') {
        const event = data as EventOccurrence;
        schemaData = {
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: event.title,
            description: event.summary,
            startDate: `${event.startLocalDate}T${event.startLocalTime || '09:00:00'}`,
            endDate: event.endLocalDate ? `${event.endLocalDate}T${event.endLocalTime || '17:00:00'}` : undefined,
            eventStatus:
                event.status === 'cancelled'
                    ? 'https://schema.org/EventCancelled'
                    : event.status === 'postponed'
                        ? 'https://schema.org/EventPostponed'
                        : event.status === 'rescheduled'
                            ? 'https://schema.org/EventRescheduled'
                            : 'https://schema.org/EventScheduled',
            eventAttendanceMode:
                event.attendanceMode === 'online'
                    ? 'https://schema.org/OnlineEventAttendanceMode'
                    : event.attendanceMode === 'hybrid'
                        ? 'https://schema.org/MixedEventAttendanceMode'
                        : 'https://schema.org/OfflineEventAttendanceMode',
            location:
                event.venue
                    ? {
                        '@type': 'Place',
                        name: event.venue.name,
                        address: {
                            '@type': 'PostalAddress',
                            streetAddress: event.venue.addressLine1,
                            addressLocality: event.venue.cityName,
                            addressRegion: event.venue.adminAreaName,
                            addressCountry: event.venue.countryName,
                        },
                    }
                    : {
                        '@type': 'VirtualLocation',
                        url: event.publicVirtualUrl || 'https://localeventdirectory.example.org',
                    },
            organizer: {
                '@type': 'Organization',
                name: event.organizer.displayName,
                url: event.organizer.websiteUrl,
            },
            offers: {
                '@type': 'Offer',
                price: event.minPrice ?? 0,
                priceCurrency: event.currencyCode || 'USD',
                url: event.registrationUrl,
                availability: 'https://schema.org/InStock',
            },
            image: [event.primaryImage],
        };
    } else if (type === 'LocalBusiness') {
        const bz = data as BusinessLocation;
        schemaData = {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: bz.locationName,
            description: bz.description,
            telephone: bz.phone,
            url: bz.websiteUrl,
            address: {
                '@type': 'PostalAddress',
                streetAddress: bz.addressLine1,
                addressLocality: bz.cityName,
                addressRegion: bz.adminAreaName,
                addressCountry: bz.countryName,
            },
            image: [bz.primaryImage],
        };
    } else if (type === 'BreadcrumbList') {
        schemaData = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: data.map((item: { label: string; href?: string }, index: number) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.label,
                item: item.href ? `https://localeventdirectory.com${item.href}` : undefined,
            })),
        };
    }

    if (!schemaData) return null;

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
    );
};
