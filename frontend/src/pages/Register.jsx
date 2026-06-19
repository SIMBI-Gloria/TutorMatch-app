import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get('role') === 'tutor' ? 'tutor' : 'student';

  const [form, setForm] = useState({ name: '', email: '', password: '', role: defaultRole });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await register(form);
      navigate(user.role === 'tutor' ? '/dashboard' : '/tutors');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="Join as a student or tutor — it's free">
      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
        {error && (
          <div className="mb-5 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100">
            <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <div className="mb-6 grid grid-cols-2 gap-3">
          {[
            { role: 'student', label: 'Student', icon: '🎓' },
            { role: 'tutor', label: 'Tutor', icon: '📚' },
          ].map(({ role, label, icon }) => (
            <button
              key={role}
              type="button"
              onClick={() => setForm({ ...form, role })}
              className={`flex flex-col items-center gap-1 rounded-xl border-2 px-4 py-4 text-sm font-semibold transition ${
                form.role === role
                  ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm shadow-brand-500/10'
                  : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className="text-2xl">{icon}</span>
              I'm a {label}
            </button>
          ))}
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Full Name</label>
            <input name="name" required value={form.name} onChange={handleChange} className="input-field" placeholder="NAME" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Email</label>
            <input name="email" type="email" required value={form.email} onChange={handleChange} className="input-field" placeholder="EMAIL" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Password</label>
            <input name="password" type="password" required minLength={8} value={form.password} onChange={handleChange} className="input-field" placeholder="PASSWORD" />
            <p className="mt-1.5 text-xs text-slate-400">Minimum 8 characters with letters and numbers</p>
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary mt-6 w-full">
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-brand-600 hover:text-brand-700">Sign in</Link>
      </p>
    </AuthLayout>
  );
}
