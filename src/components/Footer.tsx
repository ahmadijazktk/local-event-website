import React from 'react';
import Link from 'next/link';
import { Globe2, ShieldCheck, CheckCircle, Heart, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-neutral-900 text-neutral-400 font-sans pt-16 pb-12 border-t border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Col 1: Brand & Statement */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-md bg-primary-600 flex items-center justify-center text-neutral-0">
                                <Globe2 className="w-5 h-5" />
                            </div>
                            <span className="font-heading font-bold text-lg text-neutral-0 tracking-tight">
                                Localevent<span className="text-primary-500">directory</span>
                            </span>
                        </Link>
                        <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
                            Global event discovery platform built on strict quality standards, explicit location hierarchies, verified entity provenance, and clean editorial presentation.
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-success-600 bg-neutral-800/80 px-3 py-1.5 rounded-sm border border-neutral-700/50 w-fit">
                            <ShieldCheck className="w-4 h-4 shrink-0 text-success-600" />
                            <span>Index Quality Threshold Active • No Doorway Pages</span>
                        </div>
                    </div>

                    {/* Col 2: Event Discovery */}
                    <div className="space-y-3">
                        <h4 className="font-heading font-semibold text-neutral-0 text-xs uppercase tracking-wider">Event Discovery</h4>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <Link href="/events" className="hover:text-neutral-0 transition-colors">
                                    All Global Events
                                </Link>
                            </li>
                            <li>
                                <Link href="/events/united-states/california/san-diego" className="hover:text-neutral-0 transition-colors">
                                    San Diego Events
                                </Link>
                            </li>
                            <li>
                                <Link href="/events/united-states/california/san-francisco" className="hover:text-neutral-0 transition-colors">
                                    San Francisco Events
                                </Link>
                            </li>
                            <li>
                                <Link href="/events/pakistan/punjab/lahore" className="hover:text-neutral-0 transition-colors">
                                    Lahore Events
                                </Link>
                            </li>
                            <li>
                                <Link href="/events/united-arab-emirates/dubai/dubai" className="hover:text-neutral-0 transition-colors">
                                    Dubai Events
                                </Link>
                            </li>
                            <li>
                                <Link href="/events/category/technology" className="hover:text-neutral-0 transition-colors">
                                    Technology & AI
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Col 3: Directory Hubs */}
                    <div className="space-y-3">
                        <h4 className="font-heading font-semibold text-neutral-0 text-xs uppercase tracking-wider">Directory Hubs</h4>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <Link href="/locations" className="hover:text-neutral-0 transition-colors">
                                    Location Hierarchy
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories" className="hover:text-neutral-0 transition-colors">
                                    Topic Taxonomy
                                </Link>
                            </li>
                            <li>
                                <Link href="/guides" className="hover:text-neutral-0 transition-colors">
                                    City & Event Guides
                                </Link>
                            </li>
                            <li>
                                <Link href="/businesses" className="hover:text-neutral-0 transition-colors flex items-center gap-1">
                                    <span>Local Businesses</span>
                                    <span className="text-[9px] bg-primary-600 text-neutral-0 px-1.5 py-0.2 rounded-full">Phase 1B</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/submit-event" className="hover:text-neutral-0 transition-colors">
                                    Submit an Event
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Col 4: Governance & Trust */}
                    <div className="space-y-3">
                        <h4 className="font-heading font-semibold text-neutral-0 text-xs uppercase tracking-wider">Trust & Policies</h4>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <Link href="/about" className="hover:text-neutral-0 transition-colors">
                                    About Platform
                                </Link>
                            </li>
                            <li>
                                <Link href="/methodology" className="hover:text-neutral-0 transition-colors">
                                    Indexing Methodology
                                </Link>
                            </li>
                            <li>
                                <Link href="/editorial-policy" className="hover:text-neutral-0 transition-colors">
                                    Editorial Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/corrections" className="hover:text-neutral-0 transition-colors">
                                    Report Error / Correction
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-neutral-0 transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-neutral-0 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
                    <p>© {new Date().getFullYear()} Localeventdirectory. All rights reserved. Version 2.0.</p>
                    <div className="flex items-center space-x-4">
                        <span className="flex items-center gap-1 text-[11px]">
                            <CheckCircle className="w-3.5 h-3.5 text-success-600" /> System Status: Operational
                        </span>
                        <span>•</span>
                        <span className="text-[11px]">Next.js App Router Architecture</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
