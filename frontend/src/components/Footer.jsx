import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white font-bold">
                T
              </div>
              <span className="text-lg font-bold text-slate-900">
                Tutor<span className="text-brand-600">Match</span>
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm text-slate-600">
              Connecting students with qualified tutors worldwide. Find the perfect match for your learning goals.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">For Students</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><Link to="/tutors" className="hover:text-brand-600">Browse Tutors</Link></li>
              <li><Link to="/register" className="hover:text-brand-600">Sign Up Free</Link></li>
              <li><Link to="/how-it-works" className="hover:text-brand-600">How It Works</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">For Tutors</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><Link to="/register" className="hover:text-brand-600">Become a Tutor</Link></li>
              <li><Link to="/dashboard" className="hover:text-brand-600">Tutor Dashboard</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} TutorMatch. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
