const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  return data;
}

export const api = {
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  getMe: () => request('/auth/me'),
  getTutors: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/tutors${query ? `?${query}` : ''}`);
  },
  getTutor: (id) => request(`/tutors/${id}`),
  updateProfile: (body) => request('/tutors/profile', { method: 'PUT', body: JSON.stringify(body) }),
  sendInquiry: (body) => request('/inquiries', { method: 'POST', body: JSON.stringify(body) }),
  getReceivedInquiries: () => request('/inquiries/received'),
  getSentInquiries: () => request('/inquiries/sent'),
  updateInquiryStatus: (id, status) =>
    request(`/inquiries/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
};
