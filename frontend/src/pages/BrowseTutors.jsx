import { useEffect, useState } from 'react';
import { api } from '../api';
import TutorCard from '../components/TutorCard';

const SUBJECTS = [
  'Mathematics', 'English', 'Science', 'Computer Science',
  'Spanish', 'Chemistry', 'Biology', 'Physics',
];

export default function BrowseTutors() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('');
  const [maxRate, setMaxRate] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (subject) params.subject = subject;
    if (maxRate) params.maxRate = maxRate;

    const timer = setTimeout(() => {
      api.getTutors(params)
        .then(setTutors)
        .catch(() => setTutors([]))
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [search, subject, maxRate]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Find a Tutor</h1>
        <p className="mt-2 text-slate-600">
          Browse qualified tutors and find the right fit for your learning needs.
        </p>
      </div>

      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Search</label>
            <input
              type="text"
              placeholder="SEARCH"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="">All subjects</option>
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Max rate ($/hr)</label>
            <input
              type="number"
              placeholder="MAX RATE"
              min="0"
              value={maxRate}
              onChange={(e) => setMaxRate(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
        </div>
      ) : tutors.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center">
          <p className="text-lg font-medium text-slate-700">No tutors found</p>
          <p className="mt-1 text-sm text-slate-500">Try adjusting your search filters</p>
        </div>
      ) : (
        <>
          <p className="mb-6 text-sm text-slate-500">{tutors.length} tutor{tutors.length !== 1 ? 's' : ''} found</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
