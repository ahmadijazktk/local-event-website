'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bookmark, Calendar, Trash2, MapPin } from 'lucide-react';
import { mockEvents } from '@/data/eventData';
import { LocationBreadcrumb } from '@/components/LocationBreadcrumb';
import { EventCard } from '@/components/EventCard';

export default function AccountSavedEventsPage() {
    const [savedList, setSavedList] = useState(mockEvents.slice(0, 2));

    const handleRemove = (id: string) => {
        setSavedList(savedList.filter((e) => e.id !== id));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <LocationBreadcrumb items={[{ label: 'Saved Events & Preferences' }]} />

            <div className="bg-neutral-100 rounded-xl p-8 border border-neutral-200 space-y-3">
                <div className="inline-flex items-center gap-1.5 bg-neutral-0 text-neutral-800 text-xs font-semibold px-3 py-1 rounded-sm border border-neutral-200">
                    <Bookmark className="w-3.5 h-3.5 text-primary-600" />
                    <span>Local Storage Calendar</span>
                </div>

                <h1 className="font-heading font-bold text-3xl sm:text-4xl text-neutral-900">
                    Saved Events & Calendar Preferences
                </h1>

                <p className="text-sm text-neutral-600 max-w-2xl">
                    Manage your saved bookmarked events and default location preferences.
                </p>
            </div>

            {savedList.length > 0 ? (
                <div className="space-y-6">
                    <h2 className="font-heading font-bold text-xl text-neutral-900">
                        Bookmarked Events ({savedList.length})
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedList.map((event) => (
                            <div key={event.id} className="relative group">
                                <EventCard event={event} variant="grid" />
                                <button
                                    onClick={() => handleRemove(event.id)}
                                    className="absolute top-3 right-3 bg-neutral-900/80 hover:bg-danger-600 text-neutral-0 p-1.5 rounded-sm z-20 transition-colors"
                                    title="Remove saved event"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="p-12 text-center bg-neutral-50 rounded-lg border border-neutral-200 text-xs text-neutral-500">
                    You currently have no saved events. Browse events and click "Save Event" to build your personal itinerary.
                </div>
            )}
        </div>
    );
}
