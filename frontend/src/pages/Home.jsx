import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../api';
import TutorCard from '../components/TutorCard';

const SUBJECTS = ['Mathematics', 'English', 'Science', 'Physics', 'Chemistry', 'Computer Science', 'Languages', 'History'];

const FEATURES = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    title: 'Smart Search',
    desc: 'Filter by subject, hourly rate, and location to find your perfect match in seconds.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Verified Tutors',
    desc: 'Every profile shows qualifications, experience, and ratings so you learn with confidence.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
    title: 'Direct Contact',
    desc: 'Send inquiries instantly. Tutors respond directly so you can start learning faster.',
    color: 'from-violet-500 to-purple-600',
  },
];

const STATS = [
  { value: '50+', label: 'Subjects covered' },
  { value: 'Free', label: 'To browse & inquire' },
  { value: '24h', label: 'Avg. response time' },
];

function HeroCard({ name, subject, rate, rating, delay, className }) {
  return (
    <div className={`animate-float rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md ${className}`} style={{ animationDelay: delay }}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-violet-500 text-sm font-bold text-white">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-bold text-white">{name}</p>
          <p className="text-xs text-indigo-200">{subject}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-lg font-extrabold text-white">${rate}<span className="text-xs font-normal text-indigo-200">/hr</span></span>
        <div className="flex items-center gap-1">
          <svg className="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-xs font-semibold text-white">{rating}</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    api.getTutors().then(setTutors).catch(() => {});
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden mesh-hero">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:flex lg:items-center lg:gap-16 lg:px-8 lg:py-28">
          <div className="max-w-xl lg:flex-1">
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-indigo-200 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
              Expert tutors, one platform
            </div>

            <h1 className="animate-fade-up-delay mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Learn smarter with the{' '}
              <span className="text-gradient">right tutor</span>
            </h1>

            <p className="animate-fade-up-delay-2 mt-6 text-lg leading-relaxed text-indigo-200/90">
              Browse qualified educators, compare rates, and connect directly.
              From mathematics to languages — your perfect match is waiting.
            </p>

            <div className="animate-fade-up-delay-2 mt-10 flex flex-wrap gap-4" style={{ animationDelay: '0.45s' }}>
              <Link to="/tutors" className="btn-primary !bg-white !text-brand-700 !shadow-white/20 hover:!bg-indigo-50">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                Find a Tutor
              </Link>
              <Link to="/register?role=tutor" className="btn-ghost-white">
                Become a Tutor
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                  <p className="mt-0.5 text-xs font-medium text-indigo-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Floating cards — desktop only */}
          <div className="relative mt-16 hidden h-96 flex-1 lg:block">
            <HeroCard name="Math Expert" subject="Calculus & Algebra" rate={45} rating="4.9" delay="0s" className="absolute left-4 top-8 w-52" />
            <HeroCard name="Science Pro" subject="Chemistry & Biology" rate={50} rating="4.8" delay="1s" className="animate-float-delayed absolute right-4 top-0 w-52" />
            <div className="absolute bottom-8 left-1/2 w-56 -translate-x-1/2 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
              <p className="text-center text-sm font-semibold text-indigo-200">Students connected today</p>
              <p className="mt-1 text-center text-3xl font-extrabold text-white">128+</p>
              <div className="mt-3 flex justify-center -space-x-2">
                {['M', 'S', 'E', 'J'].map((l, i) => (
                  <div key={l} className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-900 text-xs font-bold text-white bg-gradient-to-br ${['from-blue-500 to-cyan-500', 'from-violet-500 to-purple-600', 'from-emerald-500 to-teal-600', 'from-amber-500 to-orange-500'][i]}`}>
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subject strip */}
      <section className="border-b border-slate-200 bg-white py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm font-semibold text-slate-400">Popular:</span>
            {SUBJECTS.map((s) => (
              <Link
                key={s}
                to={`/tutors?subject=${encodeURIComponent(s)}`}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm font-semibold text-slate-600 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mesh-light py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-600">Why TutorMatch</p>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Everything you need to learn better
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-500">
              A platform built for students who want results and tutors who want to make an impact.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/5"
              >
                <div className={`inline-flex rounded-2xl bg-gradient-to-br ${f.color} p-3 text-white shadow-lg`}>
                  {f.icon}
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured tutors */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-brand-600">Top Educators</p>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900">Featured Tutors</h2>
              <p className="mt-2 text-slate-500">Hand-picked profiles ready to help you succeed</p>
            </div>
            <Link to="/tutors" className="btn-secondary !text-brand-600">
              View all tutors
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tutors.length > 0 ? (
              tutors.slice(0, 3).map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))
            ) : (
              <div className="col-span-full rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100">
                  <svg className="h-8 w-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l-.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <p className="mt-4 text-lg font-bold text-slate-700">No tutors listed yet</p>
                <p className="mt-1 text-sm text-slate-500">Be the first educator on the platform</p>
                <Link to="/register?role=tutor" className="btn-primary mt-6">
                  Join as a Tutor
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How it works preview */}
      <section className="mesh-light py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-brand-600">Simple process</p>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-900">Start in 3 easy steps</h2>
              <div className="mt-8 space-y-6">
                {[
                  { step: '01', title: 'Create your free account', desc: 'Sign up as a student or tutor in under a minute.' },
                  { step: '02', title: 'Find or list your profile', desc: 'Students browse tutors. Tutors set their rate and qualifications.' },
                  { step: '03', title: 'Connect and learn', desc: 'Send an inquiry, get a response, and start your sessions.' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-xs font-extrabold text-white shadow-md">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{item.title}</h3>
                      <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/how-it-works" className="btn-primary mt-8">
                Learn more
              </Link>
            </div>

            <div className="relative rounded-3xl bg-gradient-to-br from-brand-600 to-violet-700 p-8 shadow-2xl shadow-brand-500/30">
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-accent-400/30 blur-2xl" />
              <p className="text-lg font-bold text-white">Ready to level up your learning?</p>
              <p className="mt-2 text-indigo-200">Join TutorMatch today — it's completely free to get started.</p>
              <ul className="mt-6 space-y-3">
                {['No hidden fees to browse', 'Direct tutor communication', 'Flexible scheduling'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-indigo-100">
                    <svg className="h-4 w-4 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-white py-3 text-sm font-bold text-brand-700 shadow-lg transition hover:bg-indigo-50">
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Your next breakthrough starts with the right tutor
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-500">
            Thousands of students are already finding their perfect match. Join them today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/register" className="btn-primary">Get Started Free</Link>
            <Link to="/tutors" className="btn-secondary">Browse Tutors</Link>
          </div>
        </div>
      </section>
    </>
  );
}
