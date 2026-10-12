import React from 'react';
import Link from 'next/link';
import { Briefcase, MapPin, Building2, Phone, Globe, ExternalLink, ShieldCheck } from 'lucide-react';
import { mockBusinesses } from '@/data/businessData';
import { LocationBreadcrumb } from '@/components/LocationBreadcrumb';
import { VerificationBadge } from '@/components/VerificationBadge';

export default function BusinessesRootPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            <LocationBreadcrumb items={[{ label: 'Local Businesses (Phase 1B)' }]} />

            <div className="bg-neutral-100 rounded-xl p-8 border border-neutral-200 space-y-3">
                <div className="inline-flex items-center gap-1.5 bg-primary-600 text-neutral-0 text-xs font-semibold px-3 py-1 rounded-sm">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Phase 1B Local Business Module</span>
                </div>

                <h1 className="font-heading font-bold text-3xl sm:text-4xl text-neutral-900">
                    Local Business Directory Index
                </h1>

                <p className="text-sm text-neutral-600 max-w-3xl leading-relaxed">
                    Explore verified venues, catering services, hotel conference partners, and local event suppliers across indexed cities.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockBusinesses.map((bz) => (
                    <div
                        key={bz.id}
                        className="p-6 bg-neutral-0 rounded-xl border border-neutral-200 shadow-sm hover:border-primary-500 transition-all space-y-4 flex flex-col justify-between"
                    >
                        <div className="space-y-3">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                                        {bz.categoryName || bz.primaryCategory}
                                    </span>
                                    <h3 className="font-heading font-bold text-xl text-neutral-900">
                                        <Link
                                            href={`/business/${bz.countrySlug}/${bz.adminAreaSlug}/${bz.citySlug}/${bz.slug}`}
                                            className="hover:text-primary-600 transition-colors"
                                        >
                                            {bz.locationName}
                                        </Link>
                                    </h3>
                                </div>
                                <VerificationBadge status={bz.verificationStatus} />
                            </div>

                            <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2">
                                {bz.description}
                            </p>
                        </div>

                        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                                <span>{bz.addressLine1}, {bz.cityName}</span>
                            </span>
                            <Link
                                href={`/business/${bz.countrySlug}/${bz.adminAreaSlug}/${bz.citySlug}/${bz.slug}`}
                                className="font-semibold text-primary-600 hover:text-primary-700 underline"
                            >
                                View Listing →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
