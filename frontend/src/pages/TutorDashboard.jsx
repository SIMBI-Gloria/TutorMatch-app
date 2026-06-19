import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';

const SUBJECT_OPTIONS = [
  'Mathematics', 'English', 'Science', 'Computer Science',
  'Spanish', 'Chemistry', 'Biology', 'Physics', 'History',
  'French', 'SAT Prep', 'ACT Prep', 'ESL', 'Writing',
];

export default function TutorDashboard() {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    bio: '', qualifications: '', subjects: [], hourlyRate: '',
    experienceYears: '', availability: '', location: '',
  });
  const [inquiries, setInquiries] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (user && user.role !== 'tutor') {
      navigate('/tutors');
      return;
    }
    if (profile) {
      setForm({
        bio: profile.bio || '',
        qualifications: profile.qualifications || '',
        subjects: profile.subjects || [],
        hourlyRate: profile.hourlyRate || '',
        experienceYears: profile.experienceYears || '',
        availability: profile.availability || '',
        location: profile.location || '',
      });
    }
    api.getReceivedInquiries().then(setInquiries).catch(() => {});
  }, [user, profile, navigate]);

  const toggleSubject = (subject) => {
    setForm((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      await api.updateProfile({
        ...form,
        hourlyRate: parseFloat(form.hourlyRate) || 0,
        experienceYears: parseInt(form.experienceYears) || 0,
      });
      await refreshProfile();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleInquiryStatus = async (id, status) => {
    await api.updateInquiryStatus(id, status);
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Tutor Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Manage your profile and respond to student inquiries.
        </p>
      </div>

      <div className="mb-6 flex gap-2 border-b border-slate-200">
        {['profile', 'inquiries'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium capitalize transition ${
              activeTab === tab
                ? 'border-b-2 border-brand-600 text-brand-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
            {tab === 'inquiries' && inquiries.filter((i) => i.status === 'pending').length > 0 && (
              <span className="ml-2 rounded-full bg-brand-600 px-2 py-0.5 text-xs text-white">
                {inquiries.filter((i) => i.status === 'pending').length}
              </span>
            )}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <form onSubmit={handleSave} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          {saved && (
            <div className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
              Profile saved successfully! Students can now find you.
            </div>
          )}
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Bio</label>
            <textarea
              rows={4}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="BIO"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Qualifications</label>
            <textarea
              rows={3}
              value={form.qualifications}
              onChange={(e) => setForm({ ...form, qualifications: e.target.value })}
              placeholder="QUALIFICATIONS"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Subjects You Teach</label>
            <div className="flex flex-wrap gap-2">
              {SUBJECT_OPTIONS.map((subject) => (
                <button
                  key={subject}
                  type="button"
                  onClick={() => toggleSubject(subject)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    form.subjects.includes(subject)
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Hourly Rate ($)
              </label>
              <input
                type="number"
                min="0"
                step="1"
                required
                value={form.hourlyRate}
                onChange={(e) => setForm({ ...form, hourlyRate: e.target.value })}
                placeholder="RATE"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Years of Experience
              </label>
              <input
                type="number"
                min="0"
                value={form.experienceYears}
                onChange={(e) => setForm({ ...form, experienceYears: e.target.value })}
                placeholder="YEARS"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="LOCATION"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Availability</label>
            <input
              type="text"
              value={form.availability}
              onChange={(e) => setForm({ ...form, availability: e.target.value })}
              placeholder="AVAILABILITY"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-brand-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      )}

      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          {inquiries.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center">
              <p className="text-slate-600">No inquiries yet. Complete your profile to get discovered!</p>
            </div>
          ) : (
            inquiries.map((inq) => (
              <div key={inq.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">{inq.student_name}</h3>
                    <p className="text-sm text-slate-500">{inq.student_email}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                    inq.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                    inq.status === 'accepted' ? 'bg-emerald-50 text-emerald-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    {inq.status}
                  </span>
                </div>
                <p className="mt-3 text-sm font-medium text-brand-600">{inq.subject}</p>
                <p className="mt-1 text-sm text-slate-600">{inq.message}</p>
                <p className="mt-2 text-xs text-slate-400">
                  {new Date(inq.created_at).toLocaleDateString()}
                </p>
                {inq.status === 'pending' && (
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleInquiryStatus(inq.id, 'accepted')}
                      className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleInquiryStatus(inq.id, 'declined')}
                      className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
