import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import { getAvatarGradient, getInitials } from '../utils/avatar';

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

  const initials = getInitials(tutor.name);
  const gradient = getAvatarGradient(tutor.name);

  return (
    <>
      <div className="mesh-hero py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link to="/tutors" className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-300 transition hover:text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to tutors
          </Link>
          <div className="mt-6 flex items-center gap-5">
            <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-2xl font-extrabold text-white shadow-xl`}>
              {initials}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-extrabold text-white">{tutor.name}</h1>
                {tutor.isVerified && (
                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 ring-1 ring-emerald-400/30">
                    ✓ Verified
                  </span>
                )}
              </div>
              {tutor.location && <p className="mt-1 text-indigo-200">{tutor.location}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            {tutor.rating > 0 && (
              <div className="mb-6 flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className={`h-5 w-5 ${s <= Math.round(tutor.rating) ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-bold text-slate-800">{tutor.rating.toFixed(1)}</span>
                <span className="text-slate-400">({tutor.reviewCount} reviews)</span>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
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
          <div className="sticky top-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
            <div className="bg-gradient-to-br from-brand-600 to-violet-600 px-6 py-8 text-center text-white">
              <p className="text-sm font-semibold text-indigo-200">Hourly Rate</p>
              <div className="mt-1 flex items-baseline justify-center gap-1">
                <span className="text-5xl font-extrabold">${tutor.hourlyRate}</span>
                <span className="text-indigo-200">/hr</span>
              </div>
              {tutor.experienceYears > 0 && (
                <p className="mt-2 text-sm text-indigo-200">{tutor.experienceYears} years experience</p>
              )}
            </div>
            <div className="p-6">
            {sent ? (
              <div className="rounded-xl bg-emerald-50 p-4 text-center text-sm font-medium text-emerald-700 ring-1 ring-emerald-100">
                Your inquiry has been sent!
                {emailSent ? ' The tutor has been notified by email.' : ' They will see it in their dashboard.'}
              </div>
            ) : user?.role === 'student' ? (
              <button onClick={() => setShowInquiry(true)} className="btn-primary w-full">
                Contact Tutor
              </button>
            ) : user?.role === 'tutor' ? (
              <p className="text-center text-sm text-slate-500">You are logged in as a tutor.</p>
            ) : (
              <Link to="/login" state={{ from: `/tutors/${id}` }} className="btn-primary w-full text-center">
                Log in to Contact
              </Link>
            )}
            </div>
          </div>
        </div>
      </div>
      </div>

      {showInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900">Contact {tutor.name}</h3>
            <p className="mt-1 text-sm text-slate-500">Send an inquiry to get started</p>
            <form onSubmit={handleInquiry} className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Subject</label>
                <select required value={subject} onChange={(e) => setSubject(e.target.value)} className="input-field">
                  <option value="">Select a subject</option>
                  {tutor.subjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Message</label>
                <textarea required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="MESSAGE" className="input-field resize-none" />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowInquiry(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" disabled={sending} className="btn-primary flex-1">
                  {sending ? 'Sending...' : 'Send Inquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
