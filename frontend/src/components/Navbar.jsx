import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-brand-600' : 'text-slate-600 hover:text-brand-600'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white font-bold text-lg">
            T
          </div>
          <span className="text-xl font-bold text-slate-900">
            Tutor<span className="text-brand-600">Match</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/tutors" className={linkClass}>Find Tutors</NavLink>
          <NavLink to="/how-it-works" className={linkClass}>How It Works</NavLink>
          {user?.role === 'tutor' && (
            <NavLink to="/dashboard" className={linkClass}>My Dashboard</NavLink>
          )}
          {user?.role === 'student' && (
            <NavLink to="/my-inquiries" className={linkClass}>My Inquiries</NavLink>
          )}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden text-sm text-slate-600 sm:block">
                Hi, <span className="font-medium text-slate-900">{user.name.split(' ')[0]}</span>
              </span>
              <button
                onClick={logout}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:text-brand-600 sm:block"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
