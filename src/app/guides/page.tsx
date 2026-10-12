import React from 'react';
import Link from 'next/link';
import { BookOpen, MapPin, ArrowRight } from 'lucide-react';
import { mockGuides } from '@/data/guideData';
import { LocationBreadcrumb } from '@/components/LocationBreadcrumb';

export default function GuidesHubPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            <LocationBreadcrumb items={[{ label: 'City & Event Guides' }]} />

            <div className="bg-neutral-100 rounded-xl p-8 border border-neutral-200 space-y-3">
                <div className="inline-flex items-center gap-1.5 bg-neutral-0 text-neutral-800 text-xs font-semibold px-3 py-1 rounded-sm border border-neutral-200">
                    <BookOpen className="w-3.5 h-3.5 text-primary-600" />
                    <span>Editorial Guide Index</span>
                </div>

                <h1 className="font-heading font-bold text-3xl sm:text-4xl text-neutral-900">
                    Editorial Guides & City Intelligence
                </h1>

                <p className="text-sm text-neutral-600 max-w-3xl leading-relaxed">
                    High-trust editorial deep-dives into major event hubs, annual tech conferences, and local business ecosystems curated by our platform editors.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {mockGuides.map((guide) => (
                    <article
                        key={guide.id}
                        className="group bg-neutral-0 rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    >
                        <div className="relative aspect-[16/9] bg-neutral-100 overflow-hidden">
                            <img
                                src={guide.image}
                                alt={guide.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs text-neutral-500">
                                    <span className="font-semibold text-primary-600 uppercase tracking-wider">
                                        {guide.cityName || guide.topic}
                                    </span>
                                    <span>Published {new Date(guide.publishedAt).toLocaleDateString()}</span>
                                </div>

                                <h2 className="font-heading font-bold text-xl text-neutral-900 group-hover:text-primary-600 transition-colors">
                                    <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
                                </h2>

                                <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                                    {guide.summary}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-primary-600">
                                <span>Read Editorial Guide</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
