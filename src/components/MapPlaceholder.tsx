import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

interface MapPlaceholderProps {
    title: string;
    address: string;
    city: string;
    adminArea: string;
    country: string;
    lat: number;
    lng: number;
    className?: string;
}

export const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
    title,
    address,
    city,
    adminArea,
    country,
    lat,
    lng,
    className = '',
}) => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${title}, ${address}, ${city}, ${adminArea}, ${country}`)}`;

    return (
        <div className={`relative overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 ${className}`}>
            {/* Decorative Grid SVG simulating GIS map */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Map Content overlay */}
            <div className="relative z-10 p-6 flex flex-col justify-between min-h-[200px]">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-1.5 bg-neutral-0 text-neutral-900 text-xs font-semibold px-2.5 py-1 rounded-sm shadow-sm border border-neutral-200 mb-2">
                            <MapPin className="w-3.5 h-3.5 text-primary-600" />
                            <span>Verified Location Coordinates</span>
                        </div>
                        <h4 className="font-heading font-semibold text-neutral-900 text-base">{title}</h4>
                        <p className="text-xs text-neutral-600 mt-1 max-w-sm">
                            {address}, {city}, {adminArea}, {country}
                        </p>
                    </div>
                    <a
                        href={mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-600 bg-neutral-0 hover:bg-primary-50 px-3 py-2 rounded-md border border-neutral-200 shadow-sm transition-colors shrink-0"
                    >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Open Maps</span>
                        <ExternalLink className="w-3 h-3 text-neutral-400" />
                    </a>
                </div>

                <div className="mt-6 pt-3 border-t border-neutral-200/80 flex items-center justify-between text-xs text-neutral-500 font-mono">
                    <span>Lat: {lat.toFixed(4)}° N</span>
                    <span>Lng: {lng.toFixed(4)}° W</span>
                    <span className="text-neutral-400 font-sans">PostGIS Verified</span>
                </div>
            </div>
        </div>
    );
};
