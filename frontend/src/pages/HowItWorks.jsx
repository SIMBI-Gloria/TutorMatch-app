import { Link } from 'react-router-dom';

const STEPS = [
  {
    step: '01',
    title: 'Create Your Account',
    description: 'Sign up as a student or tutor in under a minute. Choose the role that fits you.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Find or List Your Profile',
    description: 'Students browse tutors by subject, rate, and location. Tutors fill in qualifications and set their hourly rate.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Connect & Learn',
    description: 'Students send inquiries directly to tutors. Tutors review requests and accept the ones that fit their schedule.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <>
      <div className="mesh-hero py-16 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <p className="text-sm font-bold uppercase tracking-widest text-indigo-300">Simple & transparent</p>
          <h1 className="mt-3 text-4xl font-extrabold text-white">How TutorMatch Works</h1>
          <p className="mt-4 text-lg text-indigo-200">
            A straightforward way to connect students with qualified tutors.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative space-y-0">
          {STEPS.map((item, i) => (
            <div key={item.step} className="relative flex gap-6 pb-12">
              {i < STEPS.length - 1 && (
                <div className="absolute left-7 top-16 h-full w-0.5 bg-gradient-to-b from-brand-300 to-transparent" />
              )}
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-lg shadow-brand-500/30">
                {item.icon}
              </div>
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-500">Step {item.step}</span>
                <h2 className="mt-1 text-xl font-bold text-slate-900">{item.title}</h2>
                <p className="mt-2 leading-relaxed text-slate-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl">🎓</div>
            <h3 className="mt-4 text-xl font-bold text-slate-900">For Students</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {['Browse verified tutor profiles', 'Filter by subject and budget', 'Send inquiries for free', 'Track response status'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <svg className="h-4 w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/register" className="btn-primary mt-6">Sign Up as Student</Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-2xl">📚</div>
            <h3 className="mt-4 text-xl font-bold text-slate-900">For Tutors</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {['List your qualifications', 'Set your own hourly rate', 'Receive student inquiries', 'Manage your availability'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <svg className="h-4 w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/register?role=tutor" className="btn-primary mt-6">Become a Tutor</Link>
          </div>
        </div>
      </div>
    </>
  );
}
