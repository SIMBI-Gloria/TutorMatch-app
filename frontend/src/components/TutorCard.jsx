import { Link } from 'react-router-dom';

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-4 w-4 ${star <= Math.round(rating) ? 'text-amber-400' : 'text-slate-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-sm font-medium text-slate-700">{rating.toFixed(1)}</span>
      {rating > 0 && (
        <span className="text-sm text-slate-500">({/* review count shown by parent */})</span>
      )}
    </div>
  );
}

export default function TutorCard({ tutor }) {
  const initials = tutor.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <Link
      to={`/tutors/${tutor.id}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-200 hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-lg font-bold text-brand-700">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-lg font-semibold text-slate-900 group-hover:text-brand-600">
              {tutor.name}
            </h3>
            {tutor.isVerified && (
              <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                Verified
              </span>
            )}
          </div>
          {tutor.rating > 0 && (
            <div className="mt-1 flex items-center gap-1">
              <StarRating rating={tutor.rating} />
              <span className="text-sm text-slate-500">({tutor.reviewCount})</span>
            </div>
          )}
          {tutor.location && (
            <p className="mt-1 text-sm text-slate-500">{tutor.location}</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {tutor.subjects.slice(0, 3).map((subject) => (
          <span
            key={subject}
            className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700"
          >
            {subject}
          </span>
        ))}
        {tutor.subjects.length > 3 && (
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">
            +{tutor.subjects.length - 3} more
          </span>
        )}
      </div>

      <p className="mt-3 line-clamp-2 flex-1 text-sm text-slate-600">{tutor.bio}</p>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <div>
          <span className="text-2xl font-bold text-slate-900">${tutor.hourlyRate}</span>
          <span className="text-sm text-slate-500">/hour</span>
        </div>
        {tutor.experienceYears > 0 && (
          <span className="text-sm text-slate-500">{tutor.experienceYears} yrs exp.</span>
        )}
      </div>
    </Link>
  );
}
