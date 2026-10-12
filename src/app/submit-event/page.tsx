'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PlusCircle, CheckCircle2, ChevronRight, ChevronLeft, ShieldCheck, MapPin, Calendar, Ticket, AlertCircle } from 'lucide-react';
import { LocationBreadcrumb } from '@/components/LocationBreadcrumb';

export default function SubmitEventPage() {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        category: 'technology',
        format: 'Conference',
        summary: '',
        description: '',
        startLocalDate: '',
        startLocalTime: '09:00',
        endLocalDate: '',
        timezone: 'America/Los_Angeles',
        attendanceMode: 'offline',
        country: 'united-states',
        adminArea: 'california',
        city: 'san-diego',
        venueName: '',
        addressLine1: '',
        registrationUrl: '',
        priceType: 'free',
        minPrice: '',
        maxPrice: '',
        organizerName: '',
        organizerEmail: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <LocationBreadcrumb items={[{ label: 'Submit an Event' }]} />

            <div className="bg-neutral-100 rounded-xl p-8 border border-neutral-200 space-y-3">
                <div className="inline-flex items-center gap-1.5 bg-neutral-0 text-neutral-800 text-xs font-semibold px-3 py-1 rounded-sm border border-neutral-200">
                    <PlusCircle className="w-3.5 h-3.5 text-primary-600" />
                    <span>Free Event Submission & Moderation Pipeline</span>
                </div>

                <h1 className="font-heading font-bold text-3xl sm:text-4xl text-neutral-900">
                    Submit Event for Index Moderation
                </h1>

                <p className="text-sm text-neutral-600 max-w-2xl leading-relaxed">
                    Submit your upcoming conference, exhibition, workshop, or community gathering. All submissions undergo verified source checks prior to index publishing.
                </p>
            </div>

            {submitted ? (
                <div className="p-10 bg-success-50 border border-success-200 rounded-xl text-center space-y-4 max-w-lg mx-auto">
                    <div className="w-16 h-16 rounded-full bg-success-100 text-success-600 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h2 className="font-heading font-bold text-2xl text-neutral-900">
                        Event Submitted for Moderation
                    </h2>
                    <p className="text-xs text-neutral-700 leading-relaxed">
                        Thank you! Your event <strong className="font-semibold text-neutral-900">"{formData.title || 'Untitled Event'}"</strong> has been placed in the moderation review queue.
                    </p>
                    <div className="pt-2">
                        <Link
                            href="/events"
                            className="inline-flex items-center gap-2 bg-primary-600 text-neutral-0 text-xs font-semibold px-4 py-2.5 rounded-md hover:bg-primary-700 transition-colors"
                        >
                            Return to Global Events
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="bg-neutral-0 rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                    {/* Step Progress Bar */}
                    <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs font-semibold">
                            <span
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-primary-600 text-neutral-0' : 'bg-neutral-200 text-neutral-600'
                                    }`}
                            >
                                1
                            </span>
                            <span className={step === 1 ? 'text-neutral-900' : 'text-neutral-500'}>
                                Basic Info
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
                            <span
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-primary-600 text-neutral-0' : 'bg-neutral-200 text-neutral-600'
                                    }`}
                            >
                                2
                            </span>
                            <span className={step === 2 ? 'text-neutral-900' : 'text-neutral-500'}>
                                Dates & Location
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
                            <span
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-primary-600 text-neutral-0' : 'bg-neutral-200 text-neutral-600'
                                    }`}
                            >
                                3
                            </span>
                            <span className={step === 3 ? 'text-neutral-900' : 'text-neutral-500'}>
                                Tickets & Review
                            </span>
                        </div>
                        <span className="text-xs text-neutral-500 font-medium">Step {step} of 3</span>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                        {/* Step 1: Basic Details */}
                        {step === 1 && (
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-neutral-800">Event Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g. San Diego AI & Cloud Computing Summit 2026"
                                        className="w-full bg-neutral-50 border border-neutral-200 text-xs rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary-600"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-neutral-800">Primary Topic Category *</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full bg-neutral-50 border border-neutral-200 text-xs rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary-600"
                                        >
                                            <option value="technology">Technology & Artificial Intelligence</option>
                                            <option value="business-networking">Business & Networking</option>
                                            <option value="education-academics">Education & Academics</option>
                                            <option value="arts-culture">Arts & Culture</option>
                                            <option value="health-wellness">Health & Wellness</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-neutral-800">Format *</label>
                                        <select
                                            name="format"
                                            value={formData.format}
                                            onChange={handleChange}
                                            className="w-full bg-neutral-50 border border-neutral-200 text-xs rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary-600"
                                        >
                                            <option value="Conference">Conference</option>
                                            <option value="Trade Show">Trade Show</option>
                                            <option value="Workshop">Workshop</option>
                                            <option value="Meetup">Meetup</option>
                                            <option value="Exhibition">Exhibition</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-neutral-800">Lead Summary (Max 2 sentences) *</label>
                                    <textarea
                                        name="summary"
                                        rows={2}
                                        required
                                        value={formData.summary}
                                        onChange={handleChange}
                                        placeholder="Brief objective summary for discovery cards and social previews."
                                        className="w-full bg-neutral-50 border border-neutral-200 text-xs rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary-600"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-neutral-800">Full Description</label>
                                    <textarea
                                        name="description"
                                        rows={4}
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Provide full session highlights, keynote details, and attendee expectations."
                                        className="w-full bg-neutral-50 border border-neutral-200 text-xs rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary-600"
                                    />
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="bg-primary-600 hover:bg-primary-700 text-neutral-0 text-xs font-semibold px-6 py-2.5 rounded-md transition-colors inline-flex items-center gap-1"
                                    >
                                        <span>Next: Dates & Location</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Dates & Location */}
                        {step === 2 && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-neutral-800">Start LocalDate *</label>
                                        <input
                                            type="date"
                                            name="startLocalDate"
                                            required
                                            value={formData.startLocalDate}
                                            onChange={handleChange}
                                            className="w-full bg-neutral-50 border border-neutral-200 text-xs rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary-600"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-neutral-800">Start Time</label>
                                        <input
                                            type="time"
                                            name="startLocalTime"
                                            value={formData.startLocalTime}
                                            onChange={handleChange}
                                            className="w-full bg-neutral-50 border border-neutral-200 text-xs rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary-600"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-neutral-800">Attendance Mode *</label>
                                    <select
                                        name="attendanceMode"
                                        value={formData.attendanceMode}
                                        onChange={handleChange}
                                        className="w-full bg-neutral-50 border border-neutral-200 text-xs rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary-600"
                                    >
                                        <option value="offline">In-Person (Physical Venue)</option>
                                        <option value="online">Online / Virtual Stream</option>
                                        <option value="hybrid">Hybrid (Both)</option>
                                    </select>
                                </div>

                                {formData.attendanceMode !== 'online' && (
                                    <div className="space-y-4 p-4 bg-neutral-50 rounded-md border border-neutral-200">
                                        <h4 className="font-heading font-semibold text-xs text-neutral-900">Physical Location Hierarchy</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            <div className="space-y-1">
                                                <label className="text-[11px] text-neutral-600">Country</label>
                                                <select
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleChange}
                                                    className="w-full bg-neutral-0 border border-neutral-200 text-xs rounded-md p-2"
                                                >
                                                    <option value="united-states">United States</option>
                                                    <option value="pakistan">Pakistan</option>
                                                    <option value="united-arab-emirates">United Arab Emirates</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[11px] text-neutral-600">Admin Area</label>
                                                <input
                                                    type="text"
                                                    name="adminArea"
                                                    value={formData.adminArea}
                                                    onChange={handleChange}
                                                    placeholder="e.g. California / Punjab"
                                                    className="w-full bg-neutral-0 border border-neutral-200 text-xs rounded-md p-2"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[11px] text-neutral-600">City</label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    placeholder="e.g. San Diego / Lahore"
                                                    className="w-full bg-neutral-0 border border-neutral-200 text-xs rounded-md p-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <label className="text-[11px] text-neutral-600">Venue Name</label>
                                                <input
                                                    type="text"
                                                    name="venueName"
                                                    value={formData.venueName}
                                                    onChange={handleChange}
                                                    placeholder="e.g. San Diego Convention Center"
                                                    className="w-full bg-neutral-0 border border-neutral-200 text-xs rounded-md p-2"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[11px] text-neutral-600">Street Address</label>
                                                <input
                                                    type="text"
                                                    name="addressLine1"
                                                    value={formData.addressLine1}
                                                    onChange={handleChange}
                                                    placeholder="e.g. 111 W Harbor Dr"
                                                    className="w-full bg-neutral-0 border border-neutral-200 text-xs rounded-md p-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center justify-between pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="border border-neutral-200 text-neutral-700 text-xs font-semibold px-4 py-2.5 rounded-md hover:bg-neutral-50 transition-colors inline-flex items-center gap-1"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        <span>Previous</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setStep(3)}
                                        className="bg-primary-600 hover:bg-primary-700 text-neutral-0 text-xs font-semibold px-6 py-2.5 rounded-md transition-colors inline-flex items-center gap-1"
                                    >
                                        <span>Next: Registration & Review</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Registration & Review */}
                        {step === 3 && (
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-neutral-800">Official Registration URL *</label>
                                    <input
                                        type="url"
                                        name="registrationUrl"
                                        required
                                        value={formData.registrationUrl}
                                        onChange={handleChange}
                                        placeholder="https://organizer.example.com/register"
                                        className="w-full bg-neutral-50 border border-neutral-200 text-xs rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary-600"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-neutral-800">Organizer Name *</label>
                                        <input
                                            type="text"
                                            name="organizerName"
                                            required
                                            value={formData.organizerName}
                                            onChange={handleChange}
                                            placeholder="e.g. Tech Events Inc"
                                            className="w-full bg-neutral-50 border border-neutral-200 text-xs rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary-600"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-neutral-800">Organizer Contact Email *</label>
                                        <input
                                            type="email"
                                            name="organizerEmail"
                                            required
                                            value={formData.organizerEmail}
                                            onChange={handleChange}
                                            placeholder="organizer@example.com"
                                            className="w-full bg-neutral-50 border border-neutral-200 text-xs rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary-600"
                                        />
                                    </div>
                                </div>

                                <div className="p-4 bg-primary-50 rounded-md border border-primary-200 text-xs text-primary-800 space-y-1">
                                    <div className="font-semibold flex items-center gap-1.5">
                                        <ShieldCheck className="w-4 h-4 text-primary-600" />
                                        <span>Submission Moderation Standard</span>
                                    </div>
                                    <p className="text-[11px] leading-relaxed text-primary-700">
                                        By submitting, you confirm that you have permission to list this event and that the event complies with local rules and accuracy guidelines.
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="border border-neutral-200 text-neutral-700 text-xs font-semibold px-4 py-2.5 rounded-md hover:bg-neutral-50 transition-colors inline-flex items-center gap-1"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        <span>Previous</span>
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-success-600 hover:bg-success-700 text-neutral-0 text-xs font-bold px-8 py-3 rounded-md transition-colors shadow-sm inline-flex items-center gap-1.5"
                                    >
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span>Submit Event for Review</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
}
