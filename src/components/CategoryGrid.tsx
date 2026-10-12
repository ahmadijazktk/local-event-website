import React from 'react';
import Link from 'next/link';
import {
    Cpu,
    Briefcase,
    GraduationCap,
    Activity,
    TrendingUp,
    Megaphone,
    Palette,
    Music,
    Utensils,
    Dumbbell,
    HeartHandshake,
    Microscope,
    HelpCircle,
} from 'lucide-react';
import { Category } from '@/types/directory';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Cpu,
    Briefcase,
    GraduationCap,
    Activity,
    TrendingUp,
    Megaphone,
    Palette,
    Music,
    Utensils,
    Dumbbell,
    HeartHandshake,
    Microscope,
};

interface CategoryGridProps {
    categories: Category[];
    className?: string;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, className = '' }) => {
    return (
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 ${className}`}>
            {categories.map((cat) => {
                const IconComponent = iconMap[cat.iconName] || HelpCircle;
                return (
                    <Link
                        key={cat.id}
                        href={`/events/category/${cat.slug}`}
                        className="group p-4 bg-neutral-0 rounded-lg border border-neutral-200 hover:border-primary-500 hover:shadow-md transition-all duration-200 flex flex-col items-start justify-between space-y-3"
                    >
                        <div className="w-10 h-10 rounded-md bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-neutral-0 transition-colors">
                            <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-heading font-semibold text-neutral-900 text-sm group-hover:text-primary-600 transition-colors leading-tight">
                                {cat.name}
                            </h4>
                            <p className="text-[11px] text-neutral-500 mt-1">
                                {cat.eventCount} verified events
                            </p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};
