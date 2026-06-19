import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../api';
import TutorCard from '../components/TutorCard';

export default function Home() {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    api.getTutors().then(setTutors).catch(() => {});
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-brand-300 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-200">
              Connect with qualified educators
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Find the perfect tutor for your goals
            </h1>
            <p className="mt-6 text-lg text-brand-100">
              Browse qualified educators, compare rates, and connect with tutors who match your
              learning style. From math to languages — we've got you covered.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/tutors"
                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-lg transition hover:bg-brand-50"
              >
                Browse Tutors
              </Link>
              <Link
                to="/register"
                className="rounded-xl border-2 border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Become a Tutor
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            { title: 'Search & Compare', desc: 'Filter by subject, rate, and location to find your ideal match.' },
            { title: 'Verified Profiles', desc: 'Review qualifications, experience, and ratings before you connect.' },
            { title: 'Direct Contact', desc: 'Send inquiries directly to tutors and start learning faster.' },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Featured Tutors</h2>
              <p className="mt-1 text-slate-600">Top-rated educators ready to help you succeed</p>
            </div>
            <Link to="/tutors" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              View all &rarr;
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tutors.length > 0 ? (
              tutors.slice(0, 3).map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))
            ) : (
              <div className="col-span-full rounded-2xl border border-dashed border-slate-300 py-12 text-center">
                <p className="text-slate-600">No tutors listed yet.</p>
                <Link to="/register?role=tutor" className="mt-2 inline-block text-sm font-medium text-brand-600 hover:text-brand-700">
                  Be the first to join &rarr;
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-brand-600 px-8 py-12 text-center text-white sm:px-16">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to start learning?</h2>
          <p className="mx-auto mt-3 max-w-lg text-brand-100">
            Create your account and start connecting with tutors today.
          </p>
          <Link
            to="/register"
            className="mt-8 inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold text-brand-700 shadow-lg transition hover:bg-brand-50"
          >
            Create Free Account
          </Link>
        </div>
      </section>
    </>
  );
}
