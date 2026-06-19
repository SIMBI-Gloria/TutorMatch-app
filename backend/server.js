import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import './db.js';
import authRoutes from './routes/auth.js';
import tutorRoutes from './routes/tutors.js';
import inquiryRoutes from './routes/inquiries.js';
import { apiLimiter } from './middleware/rateLimit.js';
import { isEmailConfigured } from './services/email.js';

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  console.warn('WARNING: Set a strong JWT_SECRET (32+ characters) in your .env file.');
}

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '50kb' }));
app.use('/api', apiLimiter);

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    emailConfigured: isEmailConfigured(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/inquiries', inquiryRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`TutorMatch API running on http://localhost:${PORT}`);
  if (!isEmailConfigured()) {
    console.warn('Email not configured — add SMTP settings to .env for inquiry notifications.');
  }
});
