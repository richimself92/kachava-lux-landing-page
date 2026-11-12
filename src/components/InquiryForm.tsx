import React, { useState, useEffect } from 'react';
import { InquiryFormData, ExperienceOption, InquirySubmissionResponse } from '../types';
import { db, collection, doc, setDoc } from '../firebase';
import {
  Send,
  Sparkles,
  Calendar,
  Users,
  Trophy,
  Flower2,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  User,
  MessageSquare,
  Lock,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

interface InquiryFormProps {
  selectedChoice: ExperienceOption;
  onChoiceChange: (choice: ExperienceOption) => void;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({ selectedChoice, onChoiceChange }) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    arrivalDate: '',
    guestCount: 2,
    experienceChoice: selectedChoice,
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [submittedResponse, setSubmittedResponse] = useState<InquirySubmissionResponse | null>(null);

  // Sync prop changes to form state
  useEffect(() => {
    setFormData((prev) => ({ ...prev, experienceChoice: selectedChoice }));
  }, [selectedChoice]);

  // Set default min date to tomorrow
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];

  const validateClientSide = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!formData.arrivalDate) {
      errors.arrivalDate = 'Please select your preferred arrival date.';
    }

    if (!formData.guestCount || formData.guestCount < 1 || formData.guestCount > 12) {
      errors.guestCount = 'Guest count must be between 1 and 12 guests.';
    }

    if (!formData.experienceChoice) {
      errors.experienceChoice = 'Please select either the PGA Golf or Massage experience.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    setFieldErrors({});

    if (!validateClientSide()) {
      return;
    }

    setLoading(true);

    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      arrivalDate: formData.arrivalDate,
      guestCount: Number(formData.guestCount),
      experienceChoice: formData.experienceChoice,
      notes: formData.notes.trim(),
      packagePrice: 3950,
      currency: 'USD',
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    try {
      // 1. Submit to server-side endpoint for server validation and Firestore persistence
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          setFieldErrors(result.errors);
        }
        throw new Error(result.message || 'Unable to submit reservation inquiry.');
      }

      // 2. Also ensure client-side Firestore document write for direct Firestore integration
      try {
        const docId = result.inquiryId || `inq_${Date.now()}`;
        await setDoc(doc(db, 'inquiries', docId), {
          ...payload,
          id: docId,
        });
      } catch (fsClientErr) {
        // Server already persisted or logged, client write is supplemental
        console.info('Client Firestore mirror note:', fsClientErr);
      }

      setSubmittedResponse(result);
    } catch (err: any) {
      console.error('Submission error:', err);
      // Fallback: try direct client Firestore write if server had a network issue
      try {
        const fallbackId = `inq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        await setDoc(doc(db, 'inquiries', fallbackId), {
          ...payload,
          id: fallbackId,
        });
        setSubmittedResponse({
          success: true,
          inquiryId: fallbackId,
          message: 'Your inquiry was directly secured in our reservation queue. A concierge will reach out promptly.',
        });
      } catch (directErr: any) {
        setGeneralError(
          err.message || 'An unexpected error occurred. Please contact our concierge directly via WhatsApp.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmittedResponse(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      arrivalDate: '',
      guestCount: 2,
      experienceChoice: selectedChoice,
      notes: '',
    });
    setFieldErrors({});
    setGeneralError(null);
  };

  return (
    <section id="inquire" className="py-20 lg:py-28 bg-[#f3efe6] text-[#242924] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#faf8f5] border border-[#ad7800]/40 text-[#ad7800] text-xs font-semibold uppercase tracking-widest mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>Direct Villa Inquiries • $3,950 Package</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#132219] mb-4">
            Request Your Reservation Dates
          </h2>
          <div className="w-16 h-[2px] bg-[#ad7800] mx-auto mb-4" />
          <p className="text-sm sm:text-base text-[#705836] font-light max-w-xl mx-auto">
            Submit your party’s preferred dates below. Our private villa concierge checks real-time residence and yacht calendar availability and confirms within 4 hours.
          </p>
        </div>

        {/* Success View */}
        {submittedResponse && submittedResponse.success ? (
          <div className="bg-[#faf8f5] rounded-sm border-2 border-[#ad7800] p-8 sm:p-12 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex flex-col items-center text-center max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#ad7800]/15 flex items-center justify-center text-[#ad7800] mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#ad7800] mb-2">
                Inquiry Successfully Logged in Firestore
              </span>

              <h3 className="font-serif-luxury text-3xl font-medium text-[#132219] mb-3">
                Thank You, {formData.fullName || 'Guest'}
              </h3>

              <div className="p-4 bg-[#f3efe6] rounded border border-[#c7b79e]/60 w-full mb-6 text-left space-y-2">
                <div className="flex justify-between items-center text-xs border-b border-[#ece5d8] pb-2">
                  <span className="text-[#705836] font-medium">Reference Code:</span>
                  <span className="font-mono font-bold text-[#132219]">{submittedResponse.inquiryId}</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-[#ece5d8] pb-2">
                  <span className="text-[#705836] font-medium">Requested Arrival:</span>
                  <span className="font-semibold text-[#132219]">{formData.arrivalDate} (4 Nights)</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-[#ece5d8] pb-2">
                  <span className="text-[#705836] font-medium">Party Size:</span>
                  <span className="font-semibold text-[#132219]">{formData.guestCount} Guests</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#705836] font-medium">Selected Experience:</span>
                  <span className="font-semibold text-[#ad7800]">
                    {formData.experienceChoice === 'golf'
                      ? '2 Rounds at PGA Riviera Maya'
                      : '2 In-Villa Massage Sessions'}
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#4b554b] leading-relaxed mb-8 font-light">
                Our reservations director has received your submission and is reviewing villa and yacht schedules for your dates. We will reach out to <strong className="text-[#132219]">{formData.email}</strong> shortly.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                <a
                  href={`https://wa.me/529841234567?text=Hello%20Kachava%20Lux%20Concierge,%20I%20just%20submitted%20inquiry%20${submittedResponse.inquiryId}%20for%20arrival%20on%20${formData.arrivalDate}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-sm bg-[#132219] hover:bg-[#1c3023] text-[#f3efe6] text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
                >
                  <Phone className="w-4 h-4 text-[#ad7800]" />
                  <span>Instant WhatsApp Follow-Up</span>
                </a>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-sm bg-[#ece5d8] hover:bg-[#c7b79e] text-[#705836] text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Submit Another Inquiry</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* The Main Reservation Form */
          <form
            onSubmit={handleSubmit}
            className="bg-[#faf8f5] rounded-sm border border-[#c7b79e]/60 p-6 sm:p-10 shadow-xl"
            noValidate
          >
            {/* General Error Banner */}
            {generalError && (
              <div className="mb-8 p-4 rounded bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Inquiry Submission Notice</p>
                  <p className="text-xs text-red-700 mt-1">{generalError}</p>
                </div>
              </div>
            )}

            {/* Form Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#705836] mb-2">
                  Full Name <span className="text-[#ad7800]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#705836]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Julian Thorne"
                    className={`w-full pl-10 pr-4 py-3 bg-white rounded-sm border text-sm text-[#242924] placeholder:text-[#a49b70]/60 focus:outline-none focus:ring-1 focus:ring-[#ad7800] transition-colors ${
                      fieldErrors.fullName ? 'border-red-400 bg-red-50/20' : 'border-[#c7b79e]/60'
                    }`}
                  />
                </div>
                {fieldErrors.fullName && (
                  <p className="text-xs text-red-600 mt-1.5">{fieldErrors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#705836] mb-2">
                  Email Address <span className="text-[#ad7800]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#705836]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. julian@example.com"
                    className={`w-full pl-10 pr-4 py-3 bg-white rounded-sm border text-sm text-[#242924] placeholder:text-[#a49b70]/60 focus:outline-none focus:ring-1 focus:ring-[#ad7800] transition-colors ${
                      fieldErrors.email ? 'border-red-400 bg-red-50/20' : 'border-[#c7b79e]/60'
                    }`}
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-xs text-red-600 mt-1.5">{fieldErrors.email}</p>
                )}
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#705836] mb-2">
                  Phone / WhatsApp <span className="text-xs font-light text-[#a49b70]">(For Concierge)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#705836]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className={`w-full pl-10 pr-4 py-3 bg-white rounded-sm border text-sm text-[#242924] placeholder:text-[#a49b70]/60 focus:outline-none focus:ring-1 focus:ring-[#ad7800] transition-colors ${
                      fieldErrors.phone ? 'border-red-400' : 'border-[#c7b79e]/60'
                    }`}
                  />
                </div>
                {fieldErrors.phone && (
                  <p className="text-xs text-red-600 mt-1.5">{fieldErrors.phone}</p>
                )}
              </div>

              {/* Arrival Date */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#705836] mb-2">
                  Preferred Arrival Date <span className="text-[#ad7800]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#705836]">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input
                    type="date"
                    required
                    min={minDateStr}
                    value={formData.arrivalDate}
                    onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 bg-white rounded-sm border text-sm text-[#242924] focus:outline-none focus:ring-1 focus:ring-[#ad7800] transition-colors ${
                      fieldErrors.arrivalDate ? 'border-red-400 bg-red-50/20' : 'border-[#c7b79e]/60'
                    }`}
                  />
                </div>
                {fieldErrors.arrivalDate && (
                  <p className="text-xs text-red-600 mt-1.5">{fieldErrors.arrivalDate}</p>
                )}
              </div>
            </div>

            {/* Guest Count Selection */}
            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#705836] mb-2">
                Number of Guests in Your Party <span className="text-[#ad7800]">*</span>
              </label>
              <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setFormData({ ...formData, guestCount: count })}
                    className={`py-2 text-xs font-medium rounded-sm border transition-all ${
                      formData.guestCount === count
                        ? 'bg-[#ad7800] text-white border-[#ad7800] shadow-sm'
                        : 'bg-white text-[#705836] border-[#c7b79e]/60 hover:border-[#ad7800]'
                    }`}
                  >
                    {count} {count === 8 ? '8+' : ''}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[#705836]/80 mt-1.5">
                Standard package accommodates up to 4 villa guests with all 5 core inclusions. Additional guests can be accommodated in larger villa configurations upon request.
              </p>
            </div>

            {/* Experience Choice Radio Selector */}
            <div className="mb-6 p-5 rounded-sm bg-[#f3efe6]/70 border border-[#c7b79e]/60">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#705836] mb-3">
                Included Experience Choice <span className="text-[#ad7800]">*</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  onClick={() => {
                    setFormData({ ...formData, experienceChoice: 'golf' });
                    onChoiceChange('golf');
                  }}
                  className={`flex items-start gap-3 p-3.5 rounded-sm border cursor-pointer transition-all ${
                    formData.experienceChoice === 'golf'
                      ? 'bg-white border-[#ad7800] shadow-md ring-1 ring-[#ad7800]'
                      : 'bg-white/60 border-[#c7b79e]/40 hover:border-[#ad7800]/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="experienceChoice"
                    value="golf"
                    checked={formData.experienceChoice === 'golf'}
                    onChange={() => {}}
                    className="mt-1 accent-[#ad7800]"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#132219]">
                      <Trophy className="w-3.5 h-3.5 text-[#ad7800]" />
                      <span>Two Rounds at PGA Riviera Maya</span>
                    </div>
                    <span className="text-[11px] text-[#705836] block mt-0.5">
                      18-hole championship green fees, shared cart & practice facilities
                    </span>
                  </div>
                </label>

                <label
                  onClick={() => {
                    setFormData({ ...formData, experienceChoice: 'massage' });
                    onChoiceChange('massage');
                  }}
                  className={`flex items-start gap-3 p-3.5 rounded-sm border cursor-pointer transition-all ${
                    formData.experienceChoice === 'massage'
                      ? 'bg-white border-[#ad7800] shadow-md ring-1 ring-[#ad7800]'
                      : 'bg-white/60 border-[#c7b79e]/40 hover:border-[#ad7800]/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="experienceChoice"
                    value="massage"
                    checked={formData.experienceChoice === 'massage'}
                    onChange={() => {}}
                    className="mt-1 accent-[#ad7800]"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#132219]">
                      <Flower2 className="w-3.5 h-3.5 text-[#ad7800]" />
                      <span>Two In-Villa Massage Sessions</span>
                    </div>
                    <span className="text-[11px] text-[#705836] block mt-0.5">
                      60-min therapeutic bodywork with organic botanical essences
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Optional Notes */}
            <div className="mb-8">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#705836] mb-2">
                Special Requests or Dietary Notes <span className="text-xs font-light text-[#a49b70]">(Optional)</span>
              </label>
              <div className="relative">
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Dietary preferences for breakfast, flight details if known, or celebratory occasion..."
                  className="w-full p-3.5 bg-white rounded-sm border border-[#c7b79e]/60 text-sm text-[#242924] placeholder:text-[#a49b70]/60 focus:outline-none focus:ring-1 focus:ring-[#ad7800] transition-colors resize-none"
                  maxLength={2000}
                />
              </div>
            </div>

            {/* Submit CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#ece5d8]">
              <div className="text-xs text-[#705836] font-light">
                <span className="font-semibold text-[#132219]">No immediate payment required.</span> Our concierge confirms dates and sends secure reservation itinerary.
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-sm bg-gradient-to-r from-[#ad7800] to-[#8d6200] hover:from-[#c28702] hover:to-[#a16f00] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-xl shadow-[#ad7800]/20 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Validating & Securing in Firestore...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Inquiry — $3,950 USD</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
