'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { LocationBreadcrumb } from '@/components/LocationBreadcrumb';

export default function ClaimOwnershipPage({
    params,
}: {
    params: Promise<{ entity: string; id: string }>;
}) {
    const resolvedParams = React.use(params);
    const [submitted, setSubmitted] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <LocationBreadcrumb items={[{ label: 'Claim Ownership' }]} />

            <div className="bg-neutral-100 rounded-xl p-8 border border-neutral-200 space-y-3">
                <div className="inline-flex items-center gap-1.5 bg-neutral-0 text-neutral-800 text-xs font-semibold px-3 py-1 rounded-sm border border-neutral-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary-600" />
                    <span>Verified Entity Claim Pipeline</span>
                </div>

                <h1 className="font-heading font-bold text-3xl text-neutral-900 capitalize">
                    Claim Ownership of {resolvedParams.entity} #{resolvedParams.id}
                </h1>

                <p className="text-xs text-neutral-600 leading-relaxed">
                    Verify your association with this {resolvedParams.entity} to manage dates, schedule additions, official ticketing links, and receive attendee analytics.
                </p>
            </div>

            {submitted ? (
                <div className="p-8 bg-success-50 border border-success-200 rounded-xl text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-success-600 mx-auto" />
                    <h2 className="font-heading font-bold text-xl text-neutral-900">
                        Verification Request Sent
                    </h2>
                    <p className="text-xs text-neutral-600">
                        Our moderation staff will verify your domain email (<strong className="font-semibold">{email}</strong>) within 24 business hours.
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="bg-neutral-0 p-8 rounded-xl border border-neutral-200 space-y-4 shadow-sm">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-800">Your Full Name *</label>
                        <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Jane Doe"
                            className="w-full bg-neutral-50 border border-neutral-200 text-xs rounded-md p-3"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-800">Work Email (Must match entity domain) *</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="jane@organization.com"
                            className="w-full bg-neutral-50 border border-neutral-200 text-xs rounded-md p-3"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-800">Your Official Role *</label>
                        <input
                            type="text"
                            required
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="e.g. Event Director / Marketing Lead"
                            className="w-full bg-neutral-50 border border-neutral-200 text-xs rounded-md p-3"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary-600 hover:bg-primary-700 text-neutral-0 text-xs font-bold py-3 rounded-md transition-colors"
                    >
                        Submit Claim Application
                    </button>
                </form>
            )}
        </div>
    );
}
