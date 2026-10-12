import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Briefcase, MapPin, Phone, Globe, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';
import { mockBusinesses } from '@/data/businessData';
import { LocationBreadcrumb } from '@/components/LocationBreadcrumb';
import { VerificationBadge } from '@/components/VerificationBadge';
import { MapPlaceholder } from '@/components/MapPlaceholder';
import { JsonLd } from '@/components/JsonLd';

export default async function BusinessDetailPage({
    params,
}: {
    params: Promise<{ country: string; adminArea: string; city: string; slug: string }>;
}) {
    const { slug } = await params;
    const bz = mockBusinesses.find((b) => b.slug === slug);

    if (!bz) {
        notFound();
    }

    return (
        <>
            <JsonLd type="LocalBusiness" data={bz} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
                <LocationBreadcrumb
                    items={[
                        { label: bz.countryName, href: `/events/${bz.countrySlug}` },
                        { label: bz.adminAreaName, href: `/events/${bz.countrySlug}/${bz.adminAreaSlug}` },
                        { label: bz.cityName, href: `/events/${bz.countrySlug}/${bz.adminAreaSlug}/${bz.citySlug}` },
                        { label: bz.locationName },
                    ]}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="aspect-[16/9] rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                            <img src={bz.primaryImage} alt={bz.locationName} className="w-full h-full object-cover" />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-semibold bg-primary-50 text-primary-600 px-3 py-1 rounded-sm">
                                    {bz.categoryName || bz.primaryCategory}
                                </span>
                                <VerificationBadge status={bz.verificationStatus} />
                            </div>

                            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-neutral-900">
                                {bz.locationName}
                            </h1>

                            <p className="text-sm text-neutral-700 leading-relaxed font-sans">
                                {bz.description}
                            </p>
                        </div>

                        <MapPlaceholder
                            title={bz.locationName}
                            address={bz.addressLine1 || 'City Business Center'}
                            city={bz.cityName}
                            adminArea={bz.adminAreaName}
                            country={bz.countryName}
                            lat={bz.latitude || 32.7157}
                            lng={bz.longitude || -117.1611}
                        />
                    </div>

                    <div className="space-y-6">
                        <div className="bg-neutral-0 p-6 rounded-xl border border-neutral-200 shadow-sm space-y-4 text-xs">
                            <h3 className="font-heading font-semibold text-neutral-900 text-sm border-b border-neutral-100 pb-2">
                                Business Info & Contact
                            </h3>

                            <div className="space-y-2.5 text-neutral-600">
                                <div>
                                    <span className="font-semibold text-neutral-900 block">Address:</span>
                                    <span>{bz.addressLine1}, {bz.cityName}, {bz.adminAreaName}</span>
                                </div>

                                {bz.phone && (
                                    <div>
                                        <span className="font-semibold text-neutral-900 block">Phone:</span>
                                        <span>{bz.phone}</span>
                                    </div>
                                )}

                                {bz.websiteUrl && (
                                    <div>
                                        <span className="font-semibold text-neutral-900 block">Website:</span>
                                        <a href={bz.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline flex items-center gap-1">
                                            <span>{bz.websiteUrl}</span>
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 border-t border-neutral-100">
                                <Link
                                    href={`/claim/business/${bz.id}`}
                                    className="w-full inline-flex items-center justify-center gap-1.5 bg-neutral-900 text-neutral-0 text-xs font-semibold py-2.5 rounded-md hover:bg-neutral-800 transition-colors"
                                >
                                    <ShieldCheck className="w-4 h-4 text-primary-400" />
                                    <span>Claim Business Ownership</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
