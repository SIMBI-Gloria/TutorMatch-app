import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api';
import TutorCard from '../components/TutorCard';

const SUBJECTS = [
  'Mathematics', 'English', 'Science', 'Computer Science',
  'Spanish', 'Chemistry', 'Biology', 'Physics',
];

export default function BrowseTutors() {
  const [searchParams] = useSearchParams();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState(searchParams.get('subject') || '');
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
    <>
      {/* Page header */}
      <div className="mesh-hero relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-widest text-indigo-300">Find your match</p>
          <h1 className="mt-2 text-4xl font-extrabold text-white">Browse Expert Tutors</h1>
          <p className="mt-3 max-w-lg text-indigo-200">
            Filter by subject, rate, or keyword to find the perfect educator for your goals.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="relative -mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                <svg className="h-4 w-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                Search
              </label>
              <input type="text" placeholder="SEARCH" value={search} onChange={(e) => setSearch(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                <svg className="h-4 w-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                Subject
              </label>
              <select value={subject} onChange={(e) => setSubject(e.target.value)} className="input-field">
                <option value="">All subjects</option>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                <svg className="h-4 w-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Max rate ($/hr)
              </label>
              <input type="number" placeholder="MAX RATE" min="0" value={maxRate} onChange={(e) => setMaxRate(e.target.value)} className="input-field" />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600" />
            <p className="mt-4 text-sm font-medium text-slate-500">Finding tutors...</p>
          </div>
        ) : tutors.length === 0 ? (
          <div className="mt-10 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 py-20 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-200">
              <svg className="h-7 w-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
            </div>
            <p className="mt-4 text-lg font-bold text-slate-700">No tutors found</p>
            <p className="mt-1 text-sm text-slate-500">Try adjusting your filters or check back soon</p>
          </div>
        ) : (
          <>
            <p className="mb-6 mt-8 text-sm font-semibold text-slate-500">
              {tutors.length} tutor{tutors.length !== 1 ? 's' : ''} available
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tutors.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
