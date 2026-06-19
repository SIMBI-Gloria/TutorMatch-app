# TutorMatch

A professional tutor marketplace where **students** can find qualified tutors and **tutors** can list their qualifications, subjects, and hourly rates.

## Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS + React Router
- **Backend:** Node.js + Express + SQLite
- **Auth:** JWT tokens with bcrypt password hashing
- **Email:** Nodemailer (SMTP) for inquiry notifications

## Features

- Student & tutor registration and login
- Browse and search tutors by subject, keyword, and max rate
- Tutor profiles with bio, qualifications, subjects, hourly rate, availability, and location
- Tutor dashboard to manage profile and respond to inquiries
- Students can send inquiries — tutors receive email notifications
- Students receive email when a tutor accepts or declines
- Rate limiting, helmet security headers, and input validation

## Getting Started

### 1. Configure the backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env` and set:

- **JWT_SECRET** — a long random string (32+ characters)
- **SMTP_*** — your email provider settings (see below)

Remove old demo data (if any):

```bash
npm run seed
```

Start the API:

```bash
npm run dev     # http://localhost:5000
```

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev     # http://localhost:5173
```

Open **http://localhost:5173** in your browser.

## Email Setup

Inquiry notifications require SMTP credentials in `.env`.

**Gmail example:**

1. Enable 2-factor authentication on your Google account
2. Create an [App Password](https://support.google.com/accounts/answer/185833)
3. Add to `.env`:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
EMAIL_FROM=TutorMatch <your-email@gmail.com>
```

When email is configured, tutors receive an email for each new inquiry, and students receive an email when their inquiry is accepted or declined.

## Security

- Passwords hashed with bcrypt (12 rounds), minimum 8 characters with letters and numbers
- JWT authentication with configurable secret
- Rate limiting on login, registration, and inquiries
- Helmet HTTP security headers
- Tutor emails are never exposed on public profiles
- Input sanitization and length limits on all text fields

## Project Structure

```
WEBSITE/
├── backend/
│   ├── server.js
│   ├── services/email.js
│   ├── middleware/
│   └── routes/
└── frontend/
    └── src/
```
