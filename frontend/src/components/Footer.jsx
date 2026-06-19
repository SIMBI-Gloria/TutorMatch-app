import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-950 text-slate-300">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -right-32 top-0 h-64 w-64 rounded-full bg-brand-600 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-violet-600 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-white">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                </svg>
              </div>
              <span className="text-xl font-extrabold text-white">
                Tutor<span className="text-brand-300">Match</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              The modern way to connect students with expert tutors. Browse profiles, compare rates, and start learning today.
            </p>
            <div className="mt-6 flex gap-3">
              {['Mathematics', 'Science', 'Languages'].map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Students</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/tutors" className="transition hover:text-white">Browse Tutors</Link></li>
              <li><Link to="/register" className="transition hover:text-white">Create Account</Link></li>
              <li><Link to="/how-it-works" className="transition hover:text-white">How It Works</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Tutors</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/register?role=tutor" className="transition hover:text-white">Join as Tutor</Link></li>
              <li><Link to="/dashboard" className="transition hover:text-white">Dashboard</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} TutorMatch. All rights reserved.</p>
          <p className="text-sm text-slate-500">Built for learners everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
