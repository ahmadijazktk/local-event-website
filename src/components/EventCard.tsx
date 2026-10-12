import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Ticket, Building2, Globe, Video } from 'lucide-react';
import { EventOccurrence } from '@/types/directory';
import { VerificationBadge } from './VerificationBadge';
import { StatusBanner } from './StatusBanner';

interface EventCardProps {
    event: EventOccurrence;
    variant?: 'grid' | 'horizontal';
    className?: string;
}

export const EventCard: React.FC<EventCardProps> = ({
    event,
    variant = 'grid',
    className = '',
}) => {
    const isHorizontal = variant === 'horizontal';

    // Format price string
    const formatPrice = () => {
        if (event.priceType === 'free') return 'Free';
        if (event.priceType === 'donation') return 'Donation';
        if (event.priceType === 'invitation_only') return 'Invitation Only';
        if (event.minPrice !== undefined && event.maxPrice !== undefined) {
            if (event.minPrice === event.maxPrice) {
                return `${event.currencyCode || '$'}${event.minPrice}`;
            }
            return `${event.currencyCode || '$'}${event.minPrice} - ${event.currencyCode || '$'}${event.maxPrice}`;
        }
        return 'Paid';
    };

    // Format Date string
    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <article
            className={`group relative bg-neutral-0 rounded-lg border border-neutral-200 shadow-none hover:shadow-md hover:border-neutral-300 transition-all duration-200 flex ${isHorizontal ? 'flex-col sm:flex-row' : 'flex-col'
                } ${className}`}
        >
            {/* Image Container */}
            <div
                className={`relative overflow-hidden bg-neutral-100 shrink-0 ${isHorizontal ? 'sm:w-64 h-48 sm:h-auto rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none' : 'w-full aspect-[16/9] rounded-t-lg'
                    }`}
            >
                <img
                    src={event.primaryImage}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                {/* Category Pill Top Left */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="bg-neutral-900/80 backdrop-blur-md text-neutral-0 text-[11px] font-medium px-2.5 py-1 rounded-sm border border-neutral-0/20">
                        {event.primaryCategory.name}
                    </span>
                    {event.isFeatured && (
                        <span className="bg-primary-600 text-neutral-0 text-[11px] font-semibold px-2 py-0.5 rounded-sm shadow-sm">
                            Featured
                        </span>
                    )}
                </div>

                {/* Attendance Mode Pill Top Right */}
                <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 bg-neutral-0/90 backdrop-blur-md text-neutral-800 text-[11px] font-medium px-2 py-0.5 rounded-sm shadow-sm">
                        {event.attendanceMode === 'online' ? (
                            <>
                                <Video className="w-3 h-3 text-primary-600" /> Online
                            </>
                        ) : event.attendanceMode === 'hybrid' ? (
                            <>
                                <Globe className="w-3 h-3 text-primary-600" /> Hybrid
                            </>
                        ) : (
                            <>
                                <Building2 className="w-3 h-3 text-neutral-600" /> In Person
                            </>
                        )}
                    </span>
                </div>
            </div>

            {/* Body Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                    {/* Status banner if non-scheduled */}
                    {event.status !== 'scheduled' && <StatusBanner status={event.status} previousStartDate={event.previousStartDate} />}

                    {/* Date & Time */}
                    <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
                        <Calendar className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                        <span>
                            {formatDate(event.startLocalDate)} {event.startLocalTime && `• ${event.startLocalTime}`}
                        </span>
                        <span className="text-[10px] text-neutral-400 uppercase bg-neutral-100 px-1.5 py-0.5 rounded-sm">
                            {event.timezone.split('/')[1] || event.timezone}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading font-semibold text-neutral-900 text-base group-hover:text-primary-600 transition-colors line-clamp-2">
                        <Link href={`/event/${event.slug}`} className="focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 rounded-sm">
                            <span className="absolute inset-0" aria-hidden="true" />
                            {event.title}
                        </Link>
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                        {event.summary}
                    </p>
                </div>

                {/* Location & Organizer Footer */}
                <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs text-neutral-600">
                        <div className="flex items-center gap-1.5 truncate">
                            <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            <span className="truncate">
                                {event.attendanceMode === 'online' ? 'Online Event' : `${event.cityName || 'City TBD'}, ${event.adminAreaName || ''}`}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 font-semibold text-neutral-900 text-xs shrink-0 bg-neutral-100 px-2 py-0.5 rounded-sm">
                            <Ticket className="w-3 h-3 text-primary-600" />
                            <span>{formatPrice()}</span>
                        </div>
                    </div>

                    {/* Organizer & Verification */}
                    <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-neutral-500 font-normal truncate">
                            By <span className="font-medium text-neutral-800">{event.organizer.displayName}</span>
                        </span>
                        <VerificationBadge status={event.verificationStatus} showText={false} />
                    </div>
                </div>
            </div>
        </article>
    );
};
