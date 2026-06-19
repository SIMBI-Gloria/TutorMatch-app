import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';
import { authenticate } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimit.js';
import { isValidEmail, validatePassword, sanitizeName } from '../utils/validate.js';
import { sendWelcomeEmail } from '../services/email.js';

const router = Router();
const BCRYPT_ROUNDS = 12;

router.post('/register', authLimiter, async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password;
  const name = sanitizeName(req.body.name);
  const { role } = req.body;

  if (!email || !password || !name || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address' });
  }
  if (!['student', 'tutor'].includes(role)) {
    return res.status(400).json({ error: 'Role must be student or tutor' });
  }
  const passwordError = validatePassword(password);
  if (passwordError) {
    return res.status(400).json({ error: passwordError });
  }

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  const hashed = bcrypt.hashSync(password, BCRYPT_ROUNDS);
  const result = db.prepare(
    'INSERT INTO users (email, password, role, name) VALUES (?, ?, ?, ?)'
  ).run(email, hashed, role, name);

  if (role === 'tutor') {
    db.prepare('INSERT INTO tutor_profiles (user_id) VALUES (?)').run(result.lastInsertRowid);
  }

  const user = { id: result.lastInsertRowid, email, name, role };
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });

  sendWelcomeEmail({ email, name, role }).catch(() => {});

  res.status(201).json({ token, user });
});

router.post('/login', authLimiter, (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const payload = { id: user.id, email: user.email, name: user.name, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.json({ token, user: payload });
});

router.get('/me', authenticate, (req, res) => {
  const user = db.prepare('SELECT id, email, name, role, created_at FROM users WHERE id = ?').get(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  let profile = null;
  if (user.role === 'tutor') {
    profile = db.prepare('SELECT * FROM tutor_profiles WHERE user_id = ?').get(user.id);
  }

  res.json({ user, profile });
});

export default router;
