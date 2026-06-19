import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-lg shadow-brand-500/30 transition group-hover:shadow-brand-500/50">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 8.68L5.15 9.96 12 6.32l6.85 3.64L12 11.68zM3 13.5V18c0 1.1.9 2 2 2h3v-5.5H3zm16 0v4.5h3c1.1 0 2-.9 2-2v-4.5h-5z" />
        </svg>
      </div>
      <span className="text-xl font-extrabold tracking-tight text-slate-900">
        Tutor<span className="bg-gradient-to-r from-brand-600 to-violet-600 bg-clip-text text-transparent">Match</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `relative text-sm font-semibold transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-brand-600 after:transition-transform hover:after:scale-x-100 ${
      isActive ? 'text-brand-600 after:scale-x-100' : 'text-slate-600 hover:text-brand-600'
    }`;

  const navLinks = (
    <>
      <NavLink to="/tutors" className={linkClass} onClick={() => setOpen(false)}>Find Tutors</NavLink>
      <NavLink to="/how-it-works" className={linkClass} onClick={() => setOpen(false)}>How It Works</NavLink>
      {user?.role === 'tutor' && (
        <NavLink to="/dashboard" className={linkClass} onClick={() => setOpen(false)}>Dashboard</NavLink>
      )}
      {user?.role === 'student' && (
        <NavLink to="/my-inquiries" className={linkClass} onClick={() => setOpen(false)}>My Inquiries</NavLink>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Logo />

        <div className="hidden items-center gap-8 md:flex">{navLinks}</div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <div className="flex items-center gap-2 rounded-full bg-slate-100 py-1.5 pl-1.5 pr-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-600 text-xs font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-slate-700">{user.name.split(' ')[0]}</span>
              </div>
              <button
                onClick={logout}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 transition hover:text-brand-600">
                Log In
              </Link>
              <Link to="/register" className="btn-primary !py-2.5 !shadow-md">
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-600 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">{navLinks}</div>
          <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4">
            {user ? (
              <button onClick={logout} className="btn-secondary w-full">Log Out</button>
            ) : (
              <>
                <Link to="/login" className="btn-secondary w-full text-center" onClick={() => setOpen(false)}>Log In</Link>
                <Link to="/register" className="btn-primary w-full text-center" onClick={() => setOpen(false)}>Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
