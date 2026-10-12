import React from 'react';
import { notFound } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';
import { mockPolicyPages } from '@/data/policyData';
import { LocationBreadcrumb } from '@/components/LocationBreadcrumb';

const allowedPolicySlugs = [
    'about',
    'methodology',
    'editorial-policy',
    'corrections',
    'terms',
    'privacy',
];

export default async function GenericPolicyPage({
    params,
}: {
    params: Promise<{ policy: string }>;
}) {
    const { policy: policySlug } = await params;

    if (!allowedPolicySlugs.includes(policySlug)) {
        notFound();
    }

    const policy = mockPolicyPages[policySlug];

    if (!policy) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <LocationBreadcrumb items={[{ label: policy.title }]} />

            <div className="bg-neutral-100 rounded-xl p-8 border border-neutral-200 space-y-3">
                <div className="inline-flex items-center gap-1.5 bg-neutral-0 text-neutral-800 text-xs font-semibold px-3 py-1 rounded-sm border border-neutral-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary-600" />
                    <span>Platform Governance Document</span>
                </div>

                <h1 className="font-heading font-bold text-3xl sm:text-4xl text-neutral-900">
                    {policy.title}
                </h1>

                <p className="text-sm text-neutral-600">{policy.subtitle}</p>

                <div className="text-xs text-neutral-500 font-medium pt-1">
                    Last updated: {policy.lastUpdated}
                </div>
            </div>

            <div className="bg-neutral-0 p-8 rounded-xl border border-neutral-200 shadow-sm space-y-8">
                {policy.sections.map((sec, idx) => (
                    <div key={idx} className="space-y-2">
                        <h2 className="font-heading font-bold text-xl text-neutral-900 border-b border-neutral-100 pb-2">
                            {sec.heading}
                        </h2>
                        <p className="text-sm text-neutral-700 leading-relaxed font-sans">
                            {sec.body}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

