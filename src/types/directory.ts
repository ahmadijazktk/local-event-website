export type VerificationStatus = 'unverified' | 'source_verified' | 'organizer_verified' | 'staff_verified';
export type ClaimStatus = 'unclaimed' | 'claimed' | 'pending';
export type EventStatus = 'scheduled' | 'rescheduled' | 'postponed' | 'cancelled' | 'completed';
export type AttendanceMode = 'in_person' | 'online' | 'hybrid';
export type PriceType = 'free' | 'paid' | 'donation' | 'invitation_only';

export interface Country {
    id: string;
    name: string;
    slug: string;
    iso2: string;
    currencyCode: string;
    eventCount: number;
}

export interface AdminArea {
    id: string;
    countryId: string;
    countrySlug: string;
    countryName: string;
    name: string;
    typeLabel: string; // State, Province, Emirate, Governorate, Region, County
    slug: string;
    eventCount: number;
}

export interface City {
    id: string;
    name: string;
    slug: string;
    adminAreaId: string;
    adminAreaSlug: string;
    adminAreaName: string;
    adminAreaTypeLabel: string;
    countryId: string;
    countrySlug: string;
    countryName: string;
    eventCount: number;
    businessCount: number;
    image: string;
    latitude: number;
    longitude: number;
    timezone: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    iconName: string;
    description: string;
    eventCount: number;
    businessCount: number;
    rootTopic: 'business' | 'consumer';
}

export interface Organizer {
    id: string;
    slug: string;
    displayName: string;
    legalName?: string;
    organizerType: string;
    description: string;
    websiteUrl?: string;
    publicEmail?: string;
    publicPhone?: string;
    logo: string;
    verificationStatus: VerificationStatus;
    claimStatus: ClaimStatus;
    headquartersAddress?: string;
    connectedEventsCount: number;
}

export interface Venue {
    id: string;
    slug: string;
    name: string;
    venueType: string;
    addressLine1: string;
    neighborhood?: string;
    postalCode?: string;
    cityId: string;
    cityName: string;
    citySlug: string;
    adminAreaSlug: string;
    adminAreaName: string;
    countrySlug: string;
    countryName: string;
    latitude: number;
    longitude: number;
    timezone: string;
    facilities: string[];
    accessibilityFeatures: string[];
    websiteUrl?: string;
    capacity?: number;
    primaryImage: string;
    claimStatus: ClaimStatus;
    verificationStatus: VerificationStatus;
    upcomingEventsCount: number;
}

export interface ScheduleItem {
    id: string;
    time: string;
    title: string;
    description?: string;
    speaker?: string;
}

export interface EventOccurrence {
    id: string;
    publicId: string;
    slug: string;
    title: string;
    summary: string;
    description: string;
    startLocalDate: string;
    startLocalTime: string;
    endLocalDate?: string;
    endLocalTime?: string;
    timezone: string;
    allDay: boolean;
    timeTba: boolean;
    status: EventStatus;
    previousStartDate?: string;
    attendanceMode: AttendanceMode;
    venue?: Venue;
    virtualPlatform?: string;
    publicVirtualUrl?: string;
    citySlug?: string;
    cityName?: string;
    adminAreaSlug?: string;
    adminAreaName?: string;
    countrySlug?: string;
    countryName?: string;
    primaryCategory: Category;
    secondaryCategories?: Category[];
    format: string; // Conference, Trade Show, Workshop, Seminar, Webinar, Meetup, Festival, etc.
    audience: string; // Business, Consumer, Professionals, Students
    priceType: PriceType;
    minPrice?: number;
    maxPrice?: number;
    currencyCode?: string;
    organizer: Organizer;
    verificationStatus: VerificationStatus;
    registrationUrl: string;
    primaryImage: string;
    galleryImages?: string[];
    seriesSlug?: string;
    seriesName?: string;
    lastVerifiedAt: string;
    sourceName: string;
    sourceUrl: string;
    isFeatured?: boolean;
    schedule?: ScheduleItem[];
    accessibilityFeatures?: string[];
}

export interface EventSeries {
    id: string;
    slug: string;
    canonicalName: string;
    organizerId: string;
    organizerName: string;
    shortDescription: string;
    fullDescription: string;
    officialUrl: string;
    primaryImage: string;
    categoryName: string;
    occurrences: {
        id: string;
        slug: string;
        title: string;
        dates: string;
        cityName?: string;
        status: EventStatus;
    }[];
}

export interface BusinessLocation {
    id: string;
    brandName?: string;
    locationName: string;
    slug: string;
    primaryCategory: string;
    categoryName?: string;
    citySlug: string;
    cityName: string;
    adminAreaSlug: string;
    adminAreaName: string;
    countrySlug: string;
    countryName: string;
    addressLine1?: string;
    latitude?: number;
    longitude?: number;
    phone: string;
    websiteUrl: string;
    primaryImage: string;
    description: string;
    hours: string;
    claimStatus: ClaimStatus;
    verificationStatus: VerificationStatus;
    customerLocationMode: 'storefront' | 'service_area' | 'appointment_only';
    services: string[];
}

export interface Guide {
    id: string;
    slug: string;
    title: string;
    summary: string;
    content: string;
    author: string;
    publishedAt: string;
    readTime: string;
    image: string;
    topic: string;
    relatedCitySlug?: string;
    cityName?: string;
}
