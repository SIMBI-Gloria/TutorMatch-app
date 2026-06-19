import { Link } from 'react-router-dom';

const STEPS = [
  {
    step: '01',
    title: 'Create Your Account',
    description: 'Sign up as a student or tutor in under a minute. Choose the role that fits you.',
  },
  {
    step: '02',
    title: 'Find or List Your Profile',
    description: 'Students browse tutors by subject, rate, and location. Tutors fill in qualifications and set their hourly rate.',
  },
  {
    step: '03',
    title: 'Connect & Learn',
    description: 'Students send inquiries directly to tutors. Tutors review requests and accept the ones that fit their schedule.',
  },
];

export default function HowItWorks() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">How TutorMatch Works</h1>
        <p className="mt-3 text-lg text-slate-600">
          A simple, transparent way to connect students with qualified tutors.
        </p>
      </div>

      <div className="mt-16 space-y-12">
        {STEPS.map((item) => (
          <div key={item.step} className="flex gap-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-sm font-bold text-white">
              {item.step}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-slate-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">For Students</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-brand-600">&#10003;</span> Browse verified tutor profiles
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-600">&#10003;</span> Filter by subject and budget
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-600">&#10003;</span> Send inquiries for free
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-600">&#10003;</span> Track response status
            </li>
          </ul>
          <Link
            to="/register"
            className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Sign Up as Student
          </Link>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">For Tutors</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-brand-600">&#10003;</span> List your qualifications
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-600">&#10003;</span> Set your own hourly rate
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-600">&#10003;</span> Receive student inquiries
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-600">&#10003;</span> Manage your availability
            </li>
          </ul>
          <Link
            to="/register?role=tutor"
            className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Become a Tutor
          </Link>
        </div>
      </div>
    </div>
  );
}
