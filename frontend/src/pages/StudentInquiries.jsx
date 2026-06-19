import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';

export default function StudentInquiries() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role !== 'student') {
      navigate('/tutors');
      return;
    }
    api.getSentInquiries()
      .then(setInquiries)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">My Inquiries</h1>
      <p className="mt-2 text-slate-600">Track your messages to tutors.</p>

      <div className="mt-8 space-y-4">
        {inquiries.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center">
            <p className="text-slate-600">You haven't sent any inquiries yet.</p>
            <a href="/tutors" className="mt-2 inline-block text-sm font-medium text-brand-600 hover:text-brand-700">
              Browse tutors &rarr;
            </a>
          </div>
        ) : (
          inquiries.map((inq) => (
            <div key={inq.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">To: {inq.tutor_name}</h3>
                  <p className="text-sm font-medium text-brand-600">{inq.subject}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                  inq.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                  inq.status === 'accepted' ? 'bg-emerald-50 text-emerald-700' :
                  'bg-red-50 text-red-700'
                }`}>
                  {inq.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-600">{inq.message}</p>
              <p className="mt-2 text-xs text-slate-400">
                Sent {new Date(inq.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
