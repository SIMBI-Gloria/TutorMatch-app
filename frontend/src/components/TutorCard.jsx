import { Link } from 'react-router-dom';
import { getAvatarGradient, getInitials } from '../utils/avatar';

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-3.5 w-3.5 ${star <= Math.round(rating) ? 'text-amber-400' : 'text-slate-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TutorCard({ tutor }) {
  const initials = getInitials(tutor.name);
  const gradient = getAvatarGradient(tutor.name);

  return (
    <Link
      to={`/tutors/${tutor.id}`}
      className="card-shine group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10"
    >
      <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-brand-100 to-violet-100 opacity-0 transition group-hover:opacity-100" />

      <div className="relative flex items-start gap-4">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-lg font-bold text-white shadow-md`}>
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-lg font-bold text-slate-900 transition group-hover:text-brand-600">
              {tutor.name}
            </h3>
            {tutor.isVerified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified
              </span>
            )}
          </div>
          {tutor.rating > 0 && (
            <div className="mt-1.5 flex items-center gap-2">
              <Stars rating={tutor.rating} />
              <span className="text-sm font-semibold text-slate-700">{tutor.rating.toFixed(1)}</span>
              <span className="text-xs text-slate-400">({tutor.reviewCount})</span>
            </div>
          )}
          {tutor.location && (
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {tutor.location}
            </p>
          )}
        </div>
      </div>

      <div className="relative mt-4 flex flex-wrap gap-1.5">
        {tutor.subjects.slice(0, 3).map((subject) => (
          <span
            key={subject}
            className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700"
          >
            {subject}
          </span>
        ))}
        {tutor.subjects.length > 3 && (
          <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
            +{tutor.subjects.length - 3}
          </span>
        )}
      </div>

      {tutor.bio && (
        <p className="relative mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500">{tutor.bio}</p>
      )}

      <div className="relative mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-extrabold text-slate-900">${tutor.hourlyRate}</span>
          <span className="text-sm font-medium text-slate-400">/hr</span>
        </div>
        <div className="flex items-center gap-3">
          {tutor.experienceYears > 0 && (
            <span className="text-xs font-medium text-slate-400">{tutor.experienceYears}y exp</span>
          )}
          <span className="flex items-center gap-1 text-sm font-semibold text-brand-600 opacity-0 transition group-hover:opacity-100">
            View
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
