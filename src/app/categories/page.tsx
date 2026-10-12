import React from 'react';
import { Tag, Sparkles } from 'lucide-react';
import { mockCategories } from '@/data/categoryData';
import { LocationBreadcrumb } from '@/components/LocationBreadcrumb';
import { CategoryGrid } from '@/components/CategoryGrid';

export default function CategoryHubPage() {
    const businessCategories = mockCategories.filter((c) => c.rootTopic === 'business');
    const consumerCategories = mockCategories.filter((c) => c.rootTopic === 'consumer');

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
            <LocationBreadcrumb items={[{ label: 'Category Taxonomy' }]} />

            <div className="bg-neutral-100 rounded-xl p-8 border border-neutral-200 space-y-3">
                <div className="inline-flex items-center gap-1.5 bg-neutral-0 text-neutral-800 text-xs font-semibold px-3 py-1 rounded-sm border border-neutral-200">
                    <Tag className="w-3.5 h-3.5 text-primary-600" />
                    <span>Structured Topic Taxonomy</span>
                </div>

                <h1 className="font-heading font-bold text-3xl sm:text-4xl text-neutral-900">
                    Event & Business Topic Categories
                </h1>

                <p className="text-sm text-neutral-600 max-w-3xl leading-relaxed">
                    Explore events organized by business sectors and consumer interests. Every category features verified event listings and canonical city landing pages.
                </p>
            </div>

            <section className="space-y-6">
                <h2 className="font-heading font-bold text-2xl text-neutral-900">
                    Business & Professional Topics
                </h2>
                <CategoryGrid categories={businessCategories} />
            </section>

            <section className="space-y-6">
                <h2 className="font-heading font-bold text-2xl text-neutral-900">
                    Consumer & Community Topics
                </h2>
                <CategoryGrid categories={consumerCategories} />
            </section>
        </div>
    );
}
