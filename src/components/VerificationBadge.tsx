import React from 'react';
import { CheckCircle2, ShieldCheck, Award } from 'lucide-react';
import { VerificationStatus } from '@/types/directory';

interface VerificationBadgeProps {
    status: VerificationStatus;
    className?: string;
    showText?: boolean;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
    status,
    className = '',
    showText = true,
}) => {
    if (status === 'unverified') return null;

    let label = 'Verified';
    let Icon = CheckCircle2;

    if (status === 'staff_verified') {
        label = 'Staff Verified';
        Icon = ShieldCheck;
    } else if (status === 'organizer_verified') {
        label = 'Organizer Verified';
        Icon = CheckCircle2;
    } else if (status === 'source_verified') {
        label = 'Source Verified';
        Icon = Award;
    }

    return (
        <span
            className={`inline-flex items-center gap-1 text-xs font-medium text-success-600 bg-success-50 px-2 py-0.5 rounded-sm border border-success-600/20 ${className}`}
            title={`Verification status: ${label}`}
        >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            {showText && <span>{label}</span>}
        </span>
    );
};
