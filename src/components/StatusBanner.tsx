import React from 'react';
import { AlertTriangle, Clock, XCircle, Calendar } from 'lucide-react';
import { EventStatus } from '@/types/directory';

interface StatusBannerProps {
    status: EventStatus;
    previousStartDate?: string;
    className?: string;
}

export const StatusBanner: React.FC<StatusBannerProps> = ({
    status,
    previousStartDate,
    className = '',
}) => {
    if (status === 'scheduled' || status === 'completed') return null;

    if (status === 'rescheduled') {
        return (
            <div className={`flex items-start gap-2.5 bg-warning-50 text-warning-700 p-3 rounded-md border border-warning-600/30 text-xs font-medium ${className}`}>
                <Calendar className="w-4 h-4 shrink-0 text-warning-600 mt-0.5" />
                <div>
                    <strong className="font-semibold text-warning-800">Event Rescheduled:</strong> New dates published below.
                    {previousStartDate && <span className="block text-warning-700/90 mt-0.5">Original date was {previousStartDate}.</span>}
                </div>
            </div>
        );
    }

    if (status === 'postponed') {
        return (
            <div className={`flex items-start gap-2.5 bg-warning-50 text-warning-700 p-3 rounded-md border border-warning-600/30 text-xs font-medium ${className}`}>
                <Clock className="w-4 h-4 shrink-0 text-warning-600 mt-0.5" />
                <div>
                    <strong className="font-semibold text-warning-800">Event Postponed:</strong> Future dates to be announced by organizer.
                </div>
            </div>
        );
    }

    if (status === 'cancelled') {
        return (
            <div className={`flex items-start gap-2.5 bg-danger-50 text-danger-700 p-3 rounded-md border border-danger-600/30 text-xs font-medium ${className}`}>
                <XCircle className="w-4 h-4 shrink-0 text-danger-600 mt-0.5" />
                <div>
                    <strong className="font-semibold text-danger-800">Event Cancelled:</strong> This occurrence will not take place. Ticket registration is closed.
                </div>
            </div>
        );
    }

    return null;
};
