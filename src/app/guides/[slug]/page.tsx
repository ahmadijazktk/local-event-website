import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookOpen, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { mockGuides } from '@/data/guideData';
import { LocationBreadcrumb } from '@/components/LocationBreadcrumb';

export default async function GuideDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const guide = mockGuides.find((g) => g.slug === slug);

    if (!guide) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <LocationBreadcrumb
                items={[{ label: 'Guides', href: '/guides' }, { label: guide.title }]}
            />

            <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-800 text-xs font-semibold px-3 py-1 rounded-sm border border-neutral-200">
                    <BookOpen className="w-3.5 h-3.5 text-primary-600" />
                    <span>Editorial City Guide</span>
                </div>

                <h1 className="font-heading font-bold text-3xl sm:text-4xl text-neutral-900 leading-tight">
                    {guide.title}
                </h1>

                <div className="flex items-center gap-3 text-xs text-neutral-500">
                    <span>By {guide.author}</span>
                    <span>•</span>
                    <span>Published {new Date(guide.publishedAt).toLocaleDateString()}</span>
                    {guide.cityName && (
                        <>
                            <span>•</span>
                            <span>Location: {guide.cityName}</span>
                        </>
                    )}
                </div>
            </div>

            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                <img src={guide.image} alt={guide.title} className="w-full h-full object-cover" />
            </div>

            <div className="prose prose-neutral max-w-none text-sm text-neutral-700 leading-relaxed font-sans whitespace-pre-line space-y-4">
                {guide.content}
            </div>
        </div>
    );
}
