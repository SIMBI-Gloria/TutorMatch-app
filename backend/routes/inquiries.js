import { Router } from 'express';
import db from '../db.js';
import { authenticate, requireRole } from '../middleware/auth.js';
import { inquiryLimiter } from '../middleware/rateLimit.js';
import { sanitizeText } from '../utils/validate.js';
import { sendInquiryToTutor, sendInquiryStatusToStudent } from '../services/email.js';

const router = Router();

router.post('/', authenticate, requireRole('student'), inquiryLimiter, async (req, res) => {
  const tutorId = parseInt(req.body.tutorId, 10);
  const subject = sanitizeText(req.body.subject, 100);
  const message = sanitizeText(req.body.message, 2000);

  if (!tutorId || !subject || !message) {
    return res.status(400).json({ error: 'Tutor, subject, and message are required' });
  }
  if (message.length < 10) {
    return res.status(400).json({ error: 'Message must be at least 10 characters' });
  }

  const tutor = db.prepare("SELECT id, name, email FROM users WHERE id = ? AND role = 'tutor'").get(tutorId);
  if (!tutor) return res.status(404).json({ error: 'Tutor not found' });

  const student = db.prepare('SELECT name, email FROM users WHERE id = ?').get(req.user.id);

  const result = db.prepare(
    'INSERT INTO inquiries (student_id, tutor_id, subject, message) VALUES (?, ?, ?, ?)'
  ).run(req.user.id, tutorId, subject, message);

  const emailResult = await sendInquiryToTutor({
    tutorEmail: tutor.email,
    tutorName: tutor.name,
    studentName: student.name,
    studentEmail: student.email,
    subject,
    message,
  });

  res.status(201).json({
    id: result.lastInsertRowid,
    message: 'Inquiry sent successfully',
    emailSent: emailResult.sent,
  });
});

router.get('/received', authenticate, requireRole('tutor'), (req, res) => {
  const inquiries = db.prepare(`
    SELECT i.*, u.name as student_name, u.email as student_email
    FROM inquiries i
    JOIN users u ON u.id = i.student_id
    WHERE i.tutor_id = ?
    ORDER BY i.created_at DESC
  `).all(req.user.id);

  res.json(inquiries);
});

router.get('/sent', authenticate, requireRole('student'), (req, res) => {
  const inquiries = db.prepare(`
    SELECT i.*, u.name as tutor_name
    FROM inquiries i
    JOIN users u ON u.id = i.tutor_id
    WHERE i.student_id = ?
    ORDER BY i.created_at DESC
  `).all(req.user.id);

  res.json(inquiries);
});

router.patch('/:id/status', authenticate, requireRole('tutor'), async (req, res) => {
  const { status } = req.body;
  if (!['accepted', 'declined'].includes(status)) {
    return res.status(400).json({ error: 'Status must be accepted or declined' });
  }

  const inquiry = db.prepare(`
    SELECT i.*, s.name as student_name, s.email as student_email, t.name as tutor_name
    FROM inquiries i
    JOIN users s ON s.id = i.student_id
    JOIN users t ON t.id = i.tutor_id
    WHERE i.id = ? AND i.tutor_id = ?
  `).get(req.params.id, req.user.id);

  if (!inquiry) return res.status(404).json({ error: 'Inquiry not found' });

  db.prepare('UPDATE inquiries SET status = ? WHERE id = ?').run(status, req.params.id);

  const emailResult = await sendInquiryStatusToStudent({
    studentEmail: inquiry.student_email,
    studentName: inquiry.student_name,
    tutorName: inquiry.tutor_name,
    subject: inquiry.subject,
    status,
  });

  res.json({ message: `Inquiry ${status}`, emailSent: emailResult.sent });
});

export default router;
