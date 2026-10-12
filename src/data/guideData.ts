import { Guide } from '@/types/directory';

export const mockGuides: Guide[] = [
    {
        id: 'gd-sd-tech-guide',
        slug: 'san-diego-tech-convention-guide-2027',
        title: 'Navigating Tech Conventions in San Diego: Venues, Transit & Local Knowledge',
        summary: 'An essential guide for conference attendees visiting the San Diego Convention Center, Gaslamp Quarter, and Marina District.',
        content: `San Diego has emerged as one of the premier destination cities for major international technology, design, and scientific conventions. 

### Convention Center & Transit
The San Diego Convention Center is located directly on Harbor Drive, just minutes from San Diego International Airport (SAN). The San Diego Trolley (Green Line) stops directly across from the main concourse at Gaslamp Quarter Station.

### Best Neighborhoods for Networking
- **Gaslamp Quarter:** Famous for dining, historic architecture, and evening tech mixers.
- **Little Italy:** Top choice for culinary dinners and team gatherings, accessible via trolley or a 15-minute walk.
- **East Village:** Trendy craft coffee shops, co-working lounges, and startup hubs.

### Local Attendee Tips
1. **Weather:** San Diego stays coastal mild year-round, but ocean breezes on Harbor Drive require a light jacket after sunset.
2. **Badge Security:** Always remove your conference badge when walking outside downtown venues.
3. **Accessibility:** All MTS Trolleys and Convention Center halls provide full ADA step-free access.`,
        author: 'Localevent Directory Editorial Team',
        publishedAt: '2026-09-01',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab390?auto=format&fit=crop&w=1200&q=80',
        topic: 'City Guide',
        relatedCitySlug: 'san-diego',
    },

    {
        id: 'gd-verified-organizer-best-practices',
        slug: 'how-to-verify-event-provenance-and-avoid-duplicates',
        title: 'Directory Quality Blueprint: Verified Event Provenance & Data Integrity',
        summary: 'How Localeventdirectory moderates submissions, handles date shifts, and prevents doorway page clutter.',
        content: `Data trust is the core differentiator of Localeventdirectory. Unlike high-friction listings that republish unverified internet noise, our platform enforces strict structural quality rules before indexing any public page.

### The Immutable Entity Contract
- Every real-world event edition has a persistent identity.
- Dates retain local timezone meaning via IANA timezone strings.
- Location paths follow strict parent hierarchy rules (/events/[country]/[adminArea]/[city]).

### Verification Levels
1. **Staff Verified:** Audited by internal directory curators.
2. **Organizer Verified:** Claimed by authorized organizer representatives with domain proof.
3. **Source Verified:** Imported under legal permission contracts from official venue feeds.`,
        author: 'Product & SEO Standards Council',
        publishedAt: '2026-08-15',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
        topic: 'Platform Methodology',
    },
];
