export interface PolicyPageContent {
    slug: string;
    title: string;
    subtitle: string;
    lastUpdated: string;
    sections: {
        heading: string;
        body: string;
    }[];
}

export const mockPolicyPages: Record<string, PolicyPageContent> = {
    about: {
        slug: 'about',
        title: 'About Localeventdirectory',
        subtitle: 'A clean, calm, global event discovery marketplace engineered for data trust and clarity.',
        lastUpdated: 'September 21, 2026',
        sections: [
            {
                heading: 'Our Purpose',
                body: 'Localeventdirectory was built to address a major flaw in global directory websites: cluttered layouts, fake auto-generated pages, expired events, and unverified data. We combine clean editorial aesthetics with a strict backend data contract to provide real value to event discoverers, organizers, and local business communities.',
            },
            {
                heading: 'Core Architecture',
                body: 'Our platform enforces a strict geographic hierarchy (Country -> Administrative Area -> City). Location landing pages are indexed only when verified inventory and unique local guidance exist, preventing doorway page risk and crawl clutter.',
            },
            {
                heading: 'Independent & Transparent',
                body: 'We disclose sponsored placements clearly. Organic search results are ranked solely by date accuracy, location relevance, venue verification, and organizer completeness.',
            },
        ],
    },
    methodology: {
        slug: 'methodology',
        title: 'Indexing & Quality Methodology',
        subtitle: 'How we calculate completeness, verify provenance, and control page indexability.',
        lastUpdated: 'September 21, 2026',
        sections: [
            {
                heading: 'Index Eligibility Matrix',
                body: 'A city or category landing page becomes indexable only after reaching configurable quality thresholds (e.g., minimum 8 upcoming verified events across 2 distinct organizers for city pages). Ineligible pages remain private or return HTTP 404/noindex status.',
            },
            {
                heading: 'Data Provenance & Audit Logs',
                body: 'Every event record preserves its source URL, submitter ID, import job reference, first-seen timestamp, last-verified timestamp, and complete revision history.',
            },
        ],
    },
    'editorial-policy': {
        slug: 'editorial-policy',
        title: 'Editorial & Moderation Policy',
        subtitle: 'Standards for content verification, image rights, and taxonomy controls.',
        lastUpdated: 'September 21, 2026',
        sections: [
            {
                heading: 'Content Verification',
                body: 'All organizer self-submissions and partner feed imports undergo automated pre-validation and human moderator review before public publication.',
            },
            {
                heading: 'Image & Intellectual Property Rights',
                body: 'Submitters must confirm copyright ownership or explicit license for all promotional imagery. Copyright holders may submit removal requests through our instant corrections portal.',
            },
        ],
    },
    corrections: {
        slug: 'corrections',
        title: 'Corrections & Error Reporting',
        subtitle: 'Public correction paths for attendees, venues, and organizers.',
        lastUpdated: 'September 21, 2026',
        sections: [
            {
                heading: 'Community Error Reporting',
                body: 'Every published event, venue, and organizer profile features a direct "Report Correction" action. Correction requests are prioritized by moderator queues based on event proximity.',
            },
            {
                heading: 'No Fee for Accuracy',
                body: 'Factual corrections and emergency status changes (postponements, cancellations, venue moves) are free and never locked behind paid subscriptions.',
            },
        ],
    },
    terms: {
        slug: 'terms',
        title: 'Terms of Service',
        subtitle: 'Legal framework for platform usage, event submission, and registration links.',
        lastUpdated: 'September 21, 2026',
        sections: [
            {
                heading: 'Outbound Registration Links',
                body: 'Localeventdirectory operates as an event discovery platform and does not handle native ticket checkout or payments in this release. All ticket purchases occur on third-party official provider websites.',
            },
            {
                heading: 'User Submissions',
                body: 'By submitting an event, venue, or business profile, contributors grant Localeventdirectory a non-exclusive license to format, index, and display the content publicly.',
            },
        ],
    },
    privacy: {
        slug: 'privacy',
        title: 'Privacy Policy',
        subtitle: 'How we collect, store, and protect user data and preferences.',
        lastUpdated: 'September 21, 2026',
        sections: [
            {
                heading: 'Data Collection & Minimal Retention',
                body: 'We collect minimal data necessary for saved events, email alerts, and submitter verification. We do not sell user data to external data brokers.',
            },
            {
                heading: 'Cookie & Preference Management',
                body: 'We use necessary cookies for session security and functional preferences. Analytics cookies require user consent.',
            },
        ],
    },
};
