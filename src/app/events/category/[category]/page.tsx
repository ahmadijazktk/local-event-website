import React from 'react';
import { notFound } from 'next/navigation';
import { Tag, Sparkles, Layers } from 'lucide-react';
import { mockCategories } from '@/data/categoryData';
import { mockEvents } from '@/data/eventData';
import { LocationBreadcrumb } from '@/components/LocationBreadcrumb';
import { EventCard } from '@/components/EventCard';

export default async function GlobalCategoryEventsPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const { category: categorySlug } = await params;
    const category = mockCategories.find((c) => c.slug === categorySlug);

    if (!category) {
        notFound();
    }

    const categoryEvents = mockEvents.filter(
        (e) => e.primaryCategory.slug === category.slug
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="space-y-4">
                <LocationBreadcrumb items={[{ label: 'Categories', href: '/categories' }, { label: category.name }]} />

                <div className="bg-neutral-100 rounded-lg p-8 border border-neutral-200 space-y-3">
                    <div className="inline-flex items-center gap-1.5 bg-neutral-0 text-neutral-800 text-xs font-semibold px-3 py-1 rounded-sm border border-neutral-200">
                        <Tag className="w-3.5 h-3.5 text-primary-600" />
                        <span>Global Topic Landing Page • {category.rootTopic === 'business' ? 'Business Topic' : 'Consumer Topic'}</span>
                    </div>

                    <h1 className="font-heading font-bold text-3xl sm:text-4xl text-neutral-900">
                        {category.name} Events
                    </h1>

                    <p className="text-sm text-neutral-600 max-w-3xl leading-relaxed">
                        {category.description}
                    </p>

                    <div className="text-xs text-neutral-500 font-medium pt-1">
                        {categoryEvents.length} Active Verified Events Indexed Worldwide
                    </div>
                </div>
            </div>

            <section className="space-y-6">
                <h2 className="font-heading font-bold text-2xl text-neutral-900">
                    Upcoming {category.name} Gatherings
                </h2>

                {categoryEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoryEvents.map((event) => (
                            <EventCard key={event.id} event={event} variant="grid" />
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center bg-neutral-50 rounded-lg border border-neutral-200 text-xs text-neutral-500">
                        No active public events currently indexed for this category.
                    </div>
                )}
            </section>
        </div>
    );
}
