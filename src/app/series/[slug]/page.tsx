import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Layers, Calendar, ArrowRight, Building2, Globe } from 'lucide-react';
import { mockSeriesList } from '@/data/seriesData';
import { LocationBreadcrumb } from '@/components/LocationBreadcrumb';

export default async function SeriesDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const series = mockSeriesList.find((s) => s.slug === slug);

    if (!series) {
        notFound();
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            <LocationBreadcrumb items={[{ label: 'Events', href: '/events' }, { label: series.canonicalName }]} />

            <div className="bg-neutral-100 rounded-xl p-8 border border-neutral-200 space-y-4">
                <div className="inline-flex items-center gap-1.5 bg-neutral-0 text-neutral-800 text-xs font-semibold px-3 py-1 rounded-sm border border-neutral-200">
                    <Layers className="w-3.5 h-3.5 text-primary-600" />
                    <span>Annual Event Series Brand</span>
                </div>

                <h1 className="font-heading font-bold text-3xl sm:text-4xl text-neutral-900">
                    {series.canonicalName}
                </h1>

                <p className="text-sm text-neutral-700 max-w-3xl leading-relaxed">
                    {series.fullDescription}
                </p>

                <div className="pt-2 flex items-center gap-4 text-xs text-neutral-500 font-medium">
                    <span>Organizer: {series.organizerName}</span>
                    <span>•</span>
                    <span>Category: {series.categoryName}</span>
                </div>
            </div>

            <section className="space-y-6">
                <h2 className="font-heading font-bold text-2xl text-neutral-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary-600" />
                    <span>Occurrences & Annual Editions</span>
                </h2>

                <div className="space-y-4">
                    {series.occurrences.map((occ) => (
                        <div
                            key={occ.id}
                            className="p-6 bg-neutral-0 rounded-lg border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary-500 transition-colors shadow-sm"
                        >
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-sm ${occ.status === 'scheduled'
                                            ? 'bg-success-50 text-success-600'
                                            : 'bg-neutral-100 text-neutral-600'
                                            }`}
                                    >
                                        {occ.status === 'scheduled' ? 'Upcoming Edition' : 'Past Edition'}
                                    </span>
                                    <span className="text-xs text-neutral-500">{occ.dates}</span>
                                </div>
                                <h3 className="font-heading font-semibold text-neutral-900 text-lg">
                                    {occ.title}
                                </h3>
                                <p className="text-xs text-neutral-600">Location: {occ.cityName || 'TBD'}</p>
                            </div>

                            <Link
                                href={`/event/${occ.slug}`}
                                className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-0 text-xs font-semibold px-4 py-2.5 rounded-md transition-colors shrink-0"
                            >
                                <span>View Occurrence Facts</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
