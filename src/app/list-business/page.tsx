'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Briefcase, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { LocationBreadcrumb } from '@/components/LocationBreadcrumb';

export default function ListBusinessPage() {
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <LocationBreadcrumb items={[{ label: 'List a Local Business' }]} />

            <div className="bg-neutral-100 rounded-xl p-8 border border-neutral-200 space-y-3">
                <div className="inline-flex items-center gap-1.5 bg-primary-600 text-neutral-0 text-xs font-semibold px-3 py-1 rounded-sm">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Phase 1B Module Preview</span>
                </div>

                <h1 className="font-heading font-bold text-3xl sm:text-4xl text-neutral-900">
                    List a Local Business
                </h1>

                <p className="text-sm text-neutral-600 leading-relaxed">
                    Prepare your venue, local restaurant, catering service, or conference partner business for placement in our shared geographic directory.
                </p>
            </div>

            {submitted ? (
                <div className="p-8 bg-success-50 border border-success-200 rounded-xl text-center space-y-4">
                    <CheckCircle2 className="w-10 h-10 text-success-600 mx-auto" />
                    <h2 className="font-heading font-bold text-xl text-neutral-900">
                        Business Application Received
                    </h2>
                    <p className="text-xs text-neutral-600 max-w-md mx-auto">
                        Your business <strong className="font-semibold text-neutral-900">"{name}"</strong> has been logged for Phase 1B location density verification.
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="bg-neutral-0 p-8 rounded-xl border border-neutral-200 space-y-4 shadow-sm">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-800">Business Name *</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. San Diego Bay Catering Co."
                            className="w-full bg-neutral-50 border border-neutral-200 text-xs rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary-600"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-neutral-800">Business Type *</label>
                            <select className="w-full bg-neutral-50 border border-neutral-200 text-xs rounded-md p-3">
                                <option>Event Venue & Banquet Hall</option>
                                <option>Catering & Food Service</option>
                                <option>Audio/Visual & Event Tech</option>
                                <option>Hotel & Accommodation</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-neutral-800">City Location *</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. San Diego, CA"
                                className="w-full bg-neutral-50 border border-neutral-200 text-xs rounded-md p-3"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary-600 hover:bg-primary-700 text-neutral-0 text-xs font-bold py-3 rounded-md transition-colors"
                    >
                        Submit Business for Phase 1B Verification
                    </button>
                </form>
            )}
        </div>
    );
}
