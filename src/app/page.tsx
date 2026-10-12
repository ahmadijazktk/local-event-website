import Link from 'next/link';
import {
    Globe,
    Sparkles,
    ArrowRight,
    ShieldCheck,
    MapPin,
    Calendar,
    PlusCircle,
    Building2,
    SlidersHorizontal,
    Search,
} from 'lucide-react';
import { mockEvents } from '@/data/eventData';
import { mockCities } from '@/data/locationData';
import { mockCategories } from '@/data/categoryData';
import { EventCard } from '@/components/EventCard';
import { CategoryGrid } from '@/components/CategoryGrid';
import { SearchBar } from '@/components/SearchBar';

export default function HomePage() {
    const featuredEvents = mockEvents.filter((e) => e.isFeatured);
    const popularCities = mockCities.slice(0, 6);

    return (
        <div className="space-y-16 pb-20">
            {/* Hero Section */}
            <section className="relative bg-neutral-900 text-neutral-0 overflow-hidden pt-16 pb-24 border-b border-neutral-800">
                {/* Subtle background glow */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-600/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 text-center max-w-4xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-neutral-800/80 border border-neutral-700/80 text-neutral-300 text-xs px-3.5 py-1.5 rounded-full shadow-sm">
                        <ShieldCheck className="w-4 h-4 text-success-600" />
                        <span className="font-medium">Verified Event Provenance • No Clutter or Expired Noise</span>
                    </div>

                    {/* Heading */}
                    <div className="space-y-4">
                        <h1 className="font-heading font-bold text-4xl sm:text-5xl text-neutral-0 tracking-tight leading-[1.15]">
                            Discover Verified Global Events & Local Industry Gathering
                        </h1>
                        <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-sans leading-relaxed">
                            Explore thousands of curated conferences, tech expos, cultural festivals, and professional meetups with transparent venue facts and verified dates.
                        </p>
                    </div>

                    {/* Hero Search Bar */}
                    <div className="pt-2 max-w-2xl mx-auto">
                        <SearchBar size="lg" placeholder="Search events by keyword, topic, or city (e.g. San Diego, AI Summit)..." />
                        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-neutral-400">
                            <span className="font-medium">Trending searches:</span>
                            <Link href="/events/united-states/california/san-diego" className="hover:text-primary-400 underline decoration-neutral-600">
                                San Diego
                            </Link>
                            <span>•</span>
                            <Link href="/events/category/technology" className="hover:text-primary-400 underline decoration-neutral-600">
                                Artificial Intelligence
                            </Link>
                            <span>•</span>
                            <Link href="/events/pakistan/punjab/lahore" className="hover:text-primary-400 underline decoration-neutral-600">
                                Lahore
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Cities Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <div className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>Staged Geographic Index</span>
                        </div>
                        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-neutral-900">
                            Browse Events by Premier Destinations
                        </h2>
                    </div>
                    <Link
                        href="/locations"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                    >
                        <span>View all location hubs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {popularCities.map((city) => (
                        <Link
                            key={city.id}
                            href={`/events/${city.countrySlug}/${city.adminAreaSlug}/${city.slug}`}
                            className="group relative h-64 rounded-lg overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <img
                                src={city.image}
                                alt={city.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/30 to-transparent" />
                            <div className="absolute bottom-0 inset-x-0 p-5 space-y-1 text-neutral-0">
                                <div className="text-[11px] font-medium text-neutral-300 uppercase tracking-wider">
                                    {city.adminAreaName}, {city.countryName}
                                </div>
                                <h3 className="font-heading font-bold text-xl text-neutral-0 group-hover:text-primary-200 transition-colors">
                                    {city.name}
                                </h3>
                                <div className="flex items-center justify-between text-xs text-neutral-300 pt-2 border-t border-neutral-700/60">
                                    <span>{city.eventCount} upcoming events</span>
                                    <span className="font-semibold text-primary-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                                        Explore city <ArrowRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Upcoming Events Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <div className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Verified Calendar</span>
                        </div>
                        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-neutral-900">
                            Upcoming Global & Regional Highlights
                        </h2>
                    </div>
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                    >
                        <span>View all global events</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredEvents.map((event) => (
                        <EventCard key={event.id} event={event} variant="grid" />
                    ))}
                </div>
            </section>

            {/* Browse Topics & Categories */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <div className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Structured Taxonomy</span>
                        </div>
                        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-neutral-900">
                            Explore by Industry & Interest Topic
                        </h2>
                    </div>
                    <Link
                        href="/categories"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                    >
                        <span>View all categories</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                <CategoryGrid categories={mockCategories} />
            </section>

            {/* Data Trust & Anti-Doorway Principles Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-neutral-100 rounded-lg p-8 sm:p-12 border border-neutral-200 space-y-8">
                    <div className="max-w-3xl space-y-3">
                        <h3 className="font-heading font-bold text-2xl text-neutral-900">
                            Why Organizers and Discoverers Choose Localeventdirectory
                        </h3>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                            We operate under a clear data contract: every stored event has verifiable provenance, dates preserve their exact local timezone meaning, and empty placeholder pages are strictly prohibited from indexing.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-neutral-0 p-6 rounded-md border border-neutral-200 space-y-2">
                            <div className="w-9 h-9 rounded-md bg-success-50 text-success-600 flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <h4 className="font-heading font-semibold text-neutral-900 text-base">Verified Provenance</h4>
                            <p className="text-xs text-neutral-600 leading-relaxed">
                                Every listing links back to official sources, verified organizers, or licensed feeds with transparent audit trails.
                            </p>
                        </div>

                        <div className="bg-neutral-0 p-6 rounded-md border border-neutral-200 space-y-2">
                            <div className="w-9 h-9 rounded-md bg-primary-50 text-primary-600 flex items-center justify-center">
                                <Globe className="w-5 h-5" />
                            </div>
                            <h4 className="font-heading font-semibold text-neutral-900 text-base">Explicit Location Hierarchy</h4>
                            <p className="text-xs text-neutral-600 leading-relaxed">
                                Mandatory Country → Administrative Area → City hierarchy prevents city name collisions and guarantees clean canonical URLs.
                            </p>
                        </div>

                        <div className="bg-neutral-0 p-6 rounded-md border border-neutral-200 space-y-2">
                            <div className="w-9 h-9 rounded-md bg-warning-50 text-warning-600 flex items-center justify-center">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <h4 className="font-heading font-semibold text-neutral-900 text-base">Rescheduled & Status Tracking</h4>
                            <p className="text-xs text-neutral-600 leading-relaxed">
                                Postponements and cancellations preserve history, notify discoverers, and prevent outdated calendar confusion.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Add an Event CTA Band */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-primary-600 text-neutral-0 rounded-xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-md">
                    <div className="space-y-3 text-center md:text-left max-w-xl">
                        <h3 className="font-heading font-bold text-2xl sm:text-3xl text-neutral-0">
                            Promote Your Event to a Global Audience
                        </h3>
                        <p className="text-sm text-neutral-100 font-sans leading-relaxed">
                            Are you an organizer hosting a conference, workshop, expo, or meetup? Submit your event for free moderation and placement in our verified directory index.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                        <Link
                            href="/submit-event"
                            className="inline-flex items-center gap-2 bg-neutral-0 hover:bg-neutral-100 text-neutral-900 font-semibold text-sm px-6 py-3 rounded-md shadow-sm transition-colors"
                        >
                            <PlusCircle className="w-4 h-4 text-primary-600" />
                            <span>Submit Event Now</span>
                        </Link>
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-100 hover:text-neutral-0 px-4 py-3 underline decoration-neutral-300"
                        >
                            Learn about moderation standards
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
