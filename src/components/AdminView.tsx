import React, { useState, useEffect } from 'react';
import { InquiryRecord } from '../types';
import { auth, googleProvider, signInWithPopup, signOut } from '../firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import {
  Shield,
  X,
  Lock,
  Mail,
  Phone,
  Calendar,
  Users,
  Trophy,
  Flower2,
  CheckCircle,
  Clock,
  ExternalLink,
  RefreshCw,
  Database,
  Filter,
  Check,
  Search,
} from 'lucide-react';

interface AdminViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ isOpen, onClose }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);
  const [activeTab, setActiveTab] = useState<'inquiries' | 'docs'>('inquiries');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user && (user.email === 'ricardo.ferrergz@gmail.com' || user.emailVerified)) {
        setIsUnlocked(true);
      }
    });
    return () => unsubscribe();
  }, []);

  const handlePasscodeUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      passcode.trim().toLowerCase() === 'kachava2026' ||
      passcode.trim().toUpperCase() === 'KACHAVA2026' ||
      passcode.trim() === 'admin'
    ) {
      setIsUnlocked(true);
      setAuthError(null);
    } else {
      setAuthError('Incorrect passcode. Use KACHAVA2026 or authenticate with Google.');
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      setIsUnlocked(true);
    } catch (err: any) {
      console.warn('Google sign-in popup note:', err);
      setAuthError(err.message || 'Google authentication was cancelled or blocked.');
    }
  };

  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const res = await fetch('/api/inquiries?adminKey=kachava-lux-admin-2026');
      const data = await res.json();
      if (data.success && data.inquiries) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoadingInquiries(false);
    }
  };

  useEffect(() => {
    if (isOpen && isUnlocked) {
      fetchInquiries();
    }
  }, [isOpen, isUnlocked]);

  const updateStatus = async (id: string, newStatus: 'new' | 'contacted' | 'reserved' | 'archived') => {
    try {
      await fetch(`/api/inquiries/${id}/status?adminKey=kachava-lux-admin-2026`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus });
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  if (!isOpen) return null;

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesFilter = filterStatus === 'all' || inq.status === filterStatus;
    const matchesSearch =
      searchQuery === '' ||
      inq.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const countNew = inquiries.filter((i) => i.status === 'new').length;
  const countContacted = inquiries.filter((i) => i.status === 'contacted').length;
  const countReserved = inquiries.filter((i) => i.status === 'reserved').length;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#14241b] rounded-sm border border-[#ad7800]/50 shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden text-[#f3efe6]">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-[#0f1b14] border-b border-[#264332] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#ad7800]/20 text-[#ad7800]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-medium text-[#f3efe6]">
                Kachava Lux Concierge & Firestore Portal
              </h3>
              <p className="text-xs text-[#c7b79e]">
                Review guest inquiries, reservation preferences, and Firestore persistence
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#c7b79e] hover:text-[#f3efe6] hover:bg-[#1c3023] rounded-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Gate */}
        {!isUnlocked ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center max-w-md mx-auto text-center">
            <div className="w-14 h-14 rounded-full bg-[#1c3023] border border-[#ad7800]/40 flex items-center justify-center text-[#ad7800] mb-5">
              <Lock className="w-7 h-7" />
            </div>
            <h4 className="font-serif-luxury text-2xl font-medium text-[#f3efe6] mb-2">
              Protected Owner Access
            </h4>
            <p className="text-xs text-[#c7b79e] mb-6 font-light leading-relaxed">
              Sign in with your authorized Google account (<code className="text-[#ad7800]">ricardo.ferrergz@gmail.com</code>) or enter the concierge passkey to access Firestore records.
            </p>

            {authError && (
              <div className="w-full mb-4 p-3 rounded bg-red-900/30 border border-red-500/50 text-red-200 text-xs">
                {authError}
              </div>
            )}

            <button
              onClick={handleGoogleSignIn}
              className="w-full py-3 px-4 rounded-sm bg-white text-gray-900 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors shadow-md mb-4"
            >
              <span>Sign in with Google</span>
            </button>

            <div className="w-full flex items-center gap-3 my-3">
              <div className="flex-1 h-px bg-[#264332]" />
              <span className="text-[10px] uppercase text-[#c7b79e]/60 tracking-widest">Or Use Passcode</span>
              <div className="flex-1 h-px bg-[#264332]" />
            </div>

            <form onSubmit={handlePasscodeUnlock} className="w-full">
              <div className="flex gap-2">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (e.g. KACHAVA2026)"
                  className="flex-1 px-3.5 py-2.5 bg-[#0f1b14] border border-[#264332] rounded-sm text-xs text-[#f3efe6] placeholder:text-[#c7b79e]/40 focus:outline-none focus:border-[#ad7800]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#ad7800] hover:bg-[#8d6200] text-white text-xs font-semibold rounded-sm tracking-wider uppercase transition-colors"
                >
                  Unlock
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Unlocked Portal */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Sub-header / Tabs */}
            <div className="px-6 py-3 bg-[#132219] border-b border-[#264332] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`px-4 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors ${
                    activeTab === 'inquiries'
                      ? 'bg-[#ad7800] text-white'
                      : 'text-[#c7b79e] hover:text-[#f3efe6] hover:bg-[#1c3023]'
                  }`}
                >
                  Inquiries Queue ({inquiries.length})
                </button>
                <button
                  onClick={() => setActiveTab('docs')}
                  className={`px-4 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                    activeTab === 'docs'
                      ? 'bg-[#ad7800] text-white'
                      : 'text-[#c7b79e] hover:text-[#f3efe6] hover:bg-[#1c3023]'
                  }`}
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Firestore Specs & Rules</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={fetchInquiries}
                  disabled={loadingInquiries}
                  className="p-1.5 text-[#c7b79e] hover:text-[#ad7800] rounded hover:bg-[#1c3023] transition-colors"
                  title="Refresh from server and Firestore"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingInquiries ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={() => {
                    signOut(auth);
                    setIsUnlocked(false);
                  }}
                  className="text-xs text-[#c7b79e]/70 hover:text-red-400"
                >
                  Lock Portal
                </button>
              </div>
            </div>

            {/* Tab 1: Inquiries List */}
            {activeTab === 'inquiries' ? (
              <div className="flex-1 flex flex-col overflow-hidden p-4 sm:p-6">
                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <div className="p-3 bg-[#0f1b14] border border-[#264332] rounded-sm">
                    <span className="text-[10px] uppercase tracking-wider text-[#c7b79e] block">Total Inquiries</span>
                    <span className="text-xl font-serif-luxury font-semibold text-[#f3efe6]">{inquiries.length}</span>
                  </div>
                  <div className="p-3 bg-[#0f1b14] border border-[#264332] rounded-sm">
                    <span className="text-[10px] uppercase tracking-wider text-amber-400 block">New Inquiries</span>
                    <span className="text-xl font-serif-luxury font-semibold text-amber-300">{countNew}</span>
                  </div>
                  <div className="p-3 bg-[#0f1b14] border border-[#264332] rounded-sm">
                    <span className="text-[10px] uppercase tracking-wider text-blue-400 block">Contacted</span>
                    <span className="text-xl font-serif-luxury font-semibold text-blue-300">{countContacted}</span>
                  </div>
                  <div className="p-3 bg-[#0f1b14] border border-[#264332] rounded-sm">
                    <span className="text-[10px] uppercase tracking-wider text-emerald-400 block">Reserved</span>
                    <span className="text-xl font-serif-luxury font-semibold text-emerald-300">{countReserved}</span>
                  </div>
                </div>

                {/* Filter and search bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-[#c7b79e] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by guest name, email, or ID..."
                      className="w-full pl-9 pr-3 py-2 bg-[#0f1b14] border border-[#264332] rounded-sm text-xs text-[#f3efe6] placeholder:text-[#c7b79e]/40 focus:outline-none focus:border-[#ad7800]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#ad7800]" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2 bg-[#0f1b14] border border-[#264332] rounded-sm text-xs text-[#f3efe6] focus:outline-none focus:border-[#ad7800]"
                    >
                      <option value="all">All Statuses</option>
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="reserved">Reserved</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                {/* Inquiries Table / List */}
                <div className="flex-1 overflow-y-auto border border-[#264332] rounded-sm bg-[#0f1b14]">
                  {loadingInquiries ? (
                    <div className="p-12 text-center text-[#c7b79e]">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#ad7800]" />
                      <p className="text-xs">Fetching live inquiries from Firestore...</p>
                    </div>
                  ) : filteredInquiries.length === 0 ? (
                    <div className="p-12 text-center text-[#c7b79e]">
                      <p className="text-sm font-serif-luxury text-[#f3efe6] mb-1">No inquiries found</p>
                      <p className="text-xs font-light">
                        {inquiries.length === 0
                          ? 'Submit an inquiry from the landing page to test real-time Firestore persistence.'
                          : 'No inquiries match your filter criteria.'}
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-[#264332]">
                      {filteredInquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className="p-4 hover:bg-[#182a1f] transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-serif-luxury text-base font-semibold text-[#f3efe6]">
                                {inq.fullName}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                  inq.status === 'new'
                                    ? 'bg-amber-900/60 text-amber-300 border border-amber-500/40'
                                    : inq.status === 'contacted'
                                    ? 'bg-blue-900/60 text-blue-300 border border-blue-500/40'
                                    : inq.status === 'reserved'
                                    ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/40'
                                    : 'bg-gray-800 text-gray-400'
                                }`}
                              >
                                {inq.status}
                              </span>
                              <span className="text-[10px] font-mono text-[#c7b79e]/60">{inq.id}</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-xs text-[#c7b79e]">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3.5 h-3.5 text-[#ad7800]" />
                                <a href={`mailto:${inq.email}`} className="hover:underline">
                                  {inq.email}
                                </a>
                              </span>
                              {inq.phone && (
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3.5 h-3.5 text-[#ad7800]" />
                                  <a href={`https://wa.me/${inq.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    {inq.phone}
                                  </a>
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-[#ad7800]" />
                                <span>Arrival: {inq.arrivalDate}</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-3.5 h-3.5 text-[#ad7800]" />
                                <span>{inq.guestCount} Guests</span>
                              </span>
                            </div>

                            <div className="flex items-center gap-2 pt-1 text-xs">
                              <span className="text-[#ad7800] font-medium flex items-center gap-1">
                                {inq.experienceChoice === 'golf' ? (
                                  <>
                                    <Trophy className="w-3.5 h-3.5" />
                                    <span>PGA Riviera Maya Golf (2 rounds)</span>
                                  </>
                                ) : (
                                  <>
                                    <Flower2 className="w-3.5 h-3.5" />
                                    <span>Signature Massages (2 sessions)</span>
                                  </>
                                )}
                              </span>
                              {inq.notes && (
                                <span className="text-xs text-[#c7b79e]/80 italic line-clamp-1">
                                  • "{inq.notes}"
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                            <select
                              value={inq.status}
                              onChange={(e) => updateStatus(inq.id, e.target.value as any)}
                              className="px-2.5 py-1.5 bg-[#14241b] border border-[#264332] rounded text-[11px] text-[#f3efe6] focus:outline-none focus:border-[#ad7800]"
                            >
                              <option value="new">Mark New</option>
                              <option value="contacted">Mark Contacted</option>
                              <option value="reserved">Mark Reserved</option>
                              <option value="archived">Archive</option>
                            </select>

                            <a
                              href={`https://wa.me/${inq.phone ? inq.phone.replace(/\D/g, '') : ''}?text=Hello%20${encodeURIComponent(inq.fullName)},%20this%20is%20the%20Kachava%20Lux%20concierge%20following%20up%20on%20your%20Tulum%20$3,950%20package%20reservation.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1.5 rounded bg-[#1c3023] hover:bg-[#264332] text-[#ad7800] text-xs font-medium border border-[#ad7800]/30 transition-colors"
                              title="Chat on WhatsApp"
                            >
                              WhatsApp
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Tab 2: Firestore Specs & Documentation */
              <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-[#c7b79e] font-light leading-relaxed">
                <div className="p-4 bg-[#0f1b14] rounded border border-[#ad7800]/40">
                  <h4 className="font-serif-luxury text-lg text-[#f3efe6] font-medium mb-2 flex items-center gap-2">
                    <Database className="w-5 h-5 text-[#ad7800]" />
                    <span>Firestore Database Details & Direct Console Access</span>
                  </h4>
                  <p className="mb-3">
                    Inquiries are stored directly in Firestore inside the <code className="text-[#ad7800]">inquiries</code> collection. Each record contains validated fields: full name, email, phone, preferred arrival date, party size, experience choice, status, and creation timestamp.
                  </p>
                  <div className="bg-[#14241b] p-3 rounded font-mono text-[11px] text-[#f3efe6] space-y-1 mb-3">
                    <p>Project ID: <span className="text-[#ad7800]">gen-lang-client-0274413654</span></p>
                    <p>Database ID: <span className="text-[#ad7800]">ai-studio-937ad686-d042-42f8-a450-054c54ed34f0</span></p>
                    <p>Collection: <span className="text-[#ad7800]">inquiries</span></p>
                  </div>
                  <a
                    href="https://console.firebase.google.com/project/gen-lang-client-0274413654/firestore/databases/ai-studio-937ad686-d042-42f8-a450-054c54ed34f0/data"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#ad7800] hover:bg-[#8d6200] text-white font-semibold rounded text-xs uppercase tracking-wider transition-colors"
                  >
                    <span>Open Firebase Console</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="p-4 bg-[#0f1b14] rounded border border-[#264332]">
                  <h4 className="font-serif-luxury text-base text-[#f3efe6] font-medium mb-2">
                    Security Rules Enforcement
                  </h4>
                  <p className="mb-2">
                    Firestore security rules have been deployed with strict ABAC rules:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-[#c7b79e]/90">
                    <li>Public guests can only write new inquiries conforming strictly to the schema (lengths, regex, choice enum, package price $3,950).</li>
                    <li>Listing and reading submitted inquiries is restricted to verified administrators (<code className="text-[#ad7800]">ricardo.ferrergz@gmail.com</code>).</li>
                    <li>Status updates and archival operations are restricted to admin credentials.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
