import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';

export default function TutorDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInquiry, setShowInquiry] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getTutor(id)
      .then(setTutor)
      .catch(() => setTutor(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleInquiry = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const result = await api.sendInquiry({ tutorId: parseInt(id), subject, message });
      setSent(true);
      setEmailSent(result.emailSent);
      setShowInquiry(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Tutor not found</h1>
        <Link to="/tutors" className="mt-4 inline-block text-brand-600 hover:text-brand-700">
          &larr; Back to tutors
        </Link>
      </div>
    );
  }

  const initials = tutor.name.split(' ').map((n) => n[0]).join('').slice(0, 2);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/tutors" className="text-sm font-medium text-brand-600 hover:text-brand-700">
        &larr; Back to tutors
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-start gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-brand-100 text-2xl font-bold text-brand-700">
                {initials}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-900">{tutor.name}</h1>
                  {tutor.isVerified && (
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                      Verified Tutor
                    </span>
                  )}
                </div>
                {tutor.location && <p className="mt-1 text-slate-500">{tutor.location}</p>}
                {tutor.rating > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <svg key={s} className={`h-5 w-5 ${s <= Math.round(tutor.rating) ? 'text-amber-400' : 'text-slate-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="font-medium text-slate-700">{tutor.rating.toFixed(1)}</span>
                    <span className="text-slate-500">({tutor.reviewCount} reviews)</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {tutor.subjects.map((s) => (
                <span key={s} className="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
                  {s}
                </span>
              ))}
            </div>

            {tutor.bio && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-slate-900">About</h2>
                <p className="mt-2 leading-relaxed text-slate-600">{tutor.bio}</p>
              </div>
            )}

            {tutor.qualifications && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-slate-900">Qualifications</h2>
                <p className="mt-2 leading-relaxed text-slate-600">{tutor.qualifications}</p>
              </div>
            )}

            {tutor.availability && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-slate-900">Availability</h2>
                <p className="mt-2 text-slate-600">{tutor.availability}</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-center">
              <span className="text-4xl font-bold text-slate-900">${tutor.hourlyRate}</span>
              <span className="text-slate-500">/hour</span>
            </div>
            {tutor.experienceYears > 0 && (
              <p className="mt-2 text-center text-sm text-slate-500">
                {tutor.experienceYears} years of experience
              </p>
            )}

            {sent ? (
              <div className="mt-6 rounded-lg bg-emerald-50 p-4 text-center text-sm text-emerald-700">
                Your inquiry has been sent!
                {emailSent
                  ? ' The tutor has been notified by email.'
                  : ' They will see it in their dashboard.'}
              </div>
            ) : user?.role === 'student' ? (
              <button
                onClick={() => setShowInquiry(true)}
                className="mt-6 w-full rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
              >
                Contact Tutor
              </button>
            ) : user?.role === 'tutor' ? (
              <p className="mt-6 text-center text-sm text-slate-500">
                You are logged in as a tutor.
              </p>
            ) : (
              <Link
                to="/login"
                state={{ from: `/tutors/${id}` }}
                className="mt-6 block w-full rounded-xl bg-brand-600 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
              >
                Log in to Contact
              </Link>
            )}
          </div>
        </div>
      </div>

      {showInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900">Send Inquiry to {tutor.name}</h3>
            <form onSubmit={handleInquiry} className="mt-4 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Subject</label>
                <select
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                >
                  <option value="">Select a subject</option>
                  {tutor.subjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Message</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="MESSAGE"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowInquiry(false)}
                  className="flex-1 rounded-lg border border-slate-300 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="flex-1 rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
                >
                  {sending ? 'Sending...' : 'Send Inquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
