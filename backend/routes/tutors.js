import { Router } from 'express';
import db from '../db.js';
import { authenticate, requireRole } from '../middleware/auth.js';

import { sanitizeText } from '../utils/validate.js';

const router = Router();

function formatTutor(row, { includeEmail = false } = {}) {
  const tutor = {
    id: row.user_id,
    name: row.name,
    bio: row.bio,
    qualifications: row.qualifications,
    subjects: row.subjects ? row.subjects.split(',').map(s => s.trim()).filter(Boolean) : [],
    hourlyRate: row.hourly_rate,
    experienceYears: row.experience_years,
    availability: row.availability,
    location: row.location,
    isVerified: Boolean(row.is_verified),
    rating: row.rating,
    reviewCount: row.review_count,
    updatedAt: row.updated_at,
  };
  if (includeEmail) tutor.email = row.email;
  return tutor;
}

router.get('/', (req, res) => {
  const { subject, maxRate, search } = req.query;

  let query = `
    SELECT u.id as user_id, u.name, u.email,
           tp.bio, tp.qualifications, tp.subjects, tp.hourly_rate,
           tp.experience_years, tp.availability, tp.location,
           tp.is_verified, tp.rating, tp.review_count, tp.updated_at
    FROM tutor_profiles tp
    JOIN users u ON u.id = tp.user_id
    WHERE tp.hourly_rate > 0 AND tp.subjects != ''
  `;
  const params = [];

  if (subject) {
    query += ` AND tp.subjects LIKE ?`;
    params.push(`%${subject}%`);
  }
  if (maxRate) {
    query += ` AND tp.hourly_rate <= ?`;
    params.push(parseFloat(maxRate));
  }
  if (search) {
    query += ` AND (u.name LIKE ? OR tp.subjects LIKE ? OR tp.qualifications LIKE ? OR tp.bio LIKE ?)`;
    const term = `%${search}%`;
    params.push(term, term, term, term);
  }

  query += ' ORDER BY tp.rating DESC, tp.review_count DESC';

  const tutors = db.prepare(query).all(...params).map(formatTutor);
  res.json(tutors);
});

router.get('/:id', (req, res) => {
  const row = db.prepare(`
    SELECT u.id as user_id, u.name, u.email,
           tp.bio, tp.qualifications, tp.subjects, tp.hourly_rate,
           tp.experience_years, tp.availability, tp.location,
           tp.is_verified, tp.rating, tp.review_count, tp.updated_at
    FROM tutor_profiles tp
    JOIN users u ON u.id = tp.user_id
    WHERE u.id = ?
  `).get(req.params.id);

  if (!row) return res.status(404).json({ error: 'Tutor not found' });
  res.json(formatTutor(row));
});

router.put('/profile', authenticate, requireRole('tutor'), (req, res) => {
  const bio = req.body.bio != null ? sanitizeText(req.body.bio, 2000) : undefined;
  const qualifications = req.body.qualifications != null ? sanitizeText(req.body.qualifications, 1000) : undefined;
  const subjects = req.body.subjects;
  const hourlyRate = req.body.hourlyRate;
  const experienceYears = req.body.experienceYears;
  const availability = req.body.availability != null ? sanitizeText(req.body.availability, 200) : undefined;
  const location = req.body.location != null ? sanitizeText(req.body.location, 100) : undefined;

  const subjectsStr = Array.isArray(subjects) ? subjects.join(', ') : (subjects || '');

  if (hourlyRate !== undefined && (hourlyRate < 0 || hourlyRate > 1000)) {
    return res.status(400).json({ error: 'Hourly rate must be between 0 and 1000' });
  }

  db.prepare(`
    UPDATE tutor_profiles SET
      bio = COALESCE(?, bio),
      qualifications = COALESCE(?, qualifications),
      subjects = COALESCE(?, subjects),
      hourly_rate = COALESCE(?, hourly_rate),
      experience_years = COALESCE(?, experience_years),
      availability = COALESCE(?, availability),
      location = COALESCE(?, location),
      updated_at = datetime('now')
    WHERE user_id = ?
  `).run(
    bio ?? null,
    qualifications ?? null,
    subjectsStr || null,
    hourlyRate ?? null,
    experienceYears ?? null,
    availability ?? null,
    location ?? null,
    req.user.id
  );

  const row = db.prepare(`
    SELECT u.id as user_id, u.name, u.email,
           tp.bio, tp.qualifications, tp.subjects, tp.hourly_rate,
           tp.experience_years, tp.availability, tp.location,
           tp.is_verified, tp.rating, tp.review_count, tp.updated_at
    FROM tutor_profiles tp
    JOIN users u ON u.id = tp.user_id
    WHERE u.id = ?
  `).get(req.user.id);

  res.json(formatTutor(row, { includeEmail: true }));
});

export default router;
