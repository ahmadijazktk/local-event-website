'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Globe2,
    Calendar,
    MapPin,
    Tag,
    Building2,
    BookOpen,
    PlusCircle,
    User,
    Menu,
    X,
    Briefcase,
} from 'lucide-react';
import { SearchBar } from './SearchBar';

export const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path || pathname?.startsWith(`${path}/`);

    const navItems = [
        { label: 'Events', href: '/events', icon: Calendar },
        { label: 'Cities', href: '/locations', icon: MapPin },
        { label: 'Categories', href: '/categories', icon: Tag },
        { label: 'Guides', href: '/guides', icon: BookOpen },
        { label: 'Businesses', href: '/businesses', icon: Briefcase, badge: 'Phase 1B' },
    ];

    return (
        <header className="sticky top-0 z-40 bg-neutral-0/95 backdrop-blur-md border-b border-neutral-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-4">
                    {/* Brand Logo */}
                    <div className="flex items-center gap-6 shrink-0">
                        <Link href="/" className="flex items-center gap-2 group focus:outline-none">
                            <div className="w-8 h-8 rounded-md bg-primary-600 flex items-center justify-center text-neutral-0 group-hover:bg-primary-700 transition-colors shadow-sm">
                                <Globe2 className="w-5 h-5" />
                            </div>
                            <span className="font-heading font-bold text-lg text-neutral-900 tracking-tight">
                                Localevent<span className="text-primary-600">directory</span>
                            </span>
                        </Link>

                        {/* Desktop Quick Nav */}
                        <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.href);
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${active
                                                ? 'bg-primary-50 text-primary-600 font-semibold'
                                                : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100'
                                            }`}
                                    >
                                        <Icon className="w-3.5 h-3.5" />
                                        <span>{item.label}</span>
                                        {item.badge && (
                                            <span className="ml-0.5 text-[10px] font-semibold bg-neutral-200 text-neutral-700 px-1.5 py-0.2 rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Search Input on Desktop */}
                    <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm">
                        <SearchBar size="sm" placeholder="Search events or cities..." />
                    </div>

                    {/* Action CTAs */}
                    <div className="flex items-center space-x-3 shrink-0">
                        <Link
                            href="/submit-event"
                            className="inline-flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-neutral-0 text-xs font-medium px-3.5 py-2 rounded-md shadow-none transition-colors"
                        >
                            <PlusCircle className="w-4 h-4" />
                            <span className="hidden sm:inline">Add an Event</span>
                            <span className="sm:hidden">Add</span>
                        </Link>

                        <Link
                            href="/account/saved"
                            className="inline-flex items-center gap-1.5 border border-neutral-200 bg-neutral-0 text-neutral-800 hover:bg-neutral-50 text-xs font-medium px-3 py-2 rounded-md transition-colors"
                            title="User Account"
                        >
                            <User className="w-4 h-4 text-neutral-600" />
                            <span className="hidden sm:inline">Account</span>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 focus:outline-none"
                            aria-label="Toggle navigation menu"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer Navigation */}
            {mobileMenuOpen && (
                <div className="lg:hidden border-t border-neutral-200 bg-neutral-0 px-4 pt-3 pb-6 space-y-4 shadow-lg">
                    <div className="md:hidden">
                        <SearchBar size="sm" placeholder="Search events or cities..." />
                    </div>

                    <div className="space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-between px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-100 rounded-md"
                                >
                                    <span className="flex items-center gap-2">
                                        <Icon className="w-4 h-4 text-neutral-500" />
                                        <span>{item.label}</span>
                                    </span>
                                    {item.badge && (
                                        <span className="text-[10px] bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded-full">
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
                        <Link
                            href="/list-business"
                            onClick={() => setMobileMenuOpen(false)}
                            className="w-full text-center text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 py-2.5 rounded-md"
                        >
                            List a Local Business (Phase 1B)
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};
