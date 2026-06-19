import nodemailer from 'nodemailer';

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return transporter;
}

export function isEmailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export async function sendEmail({ to, subject, text, html }) {
  const transport = getTransporter();
  if (!transport) {
    console.warn('[email] SMTP not configured — email not sent to:', to);
    return { sent: false, reason: 'not_configured' };
  }

  const from = process.env.EMAIL_FROM || process.env.SMTP_USER;

  try {
    await transport.sendMail({ from, to, subject, text, html });
    return { sent: true };
  } catch (err) {
    console.error('[email] Failed to send:', err.message);
    return { sent: false, reason: err.message };
  }
}

export async function sendInquiryToTutor({ tutorEmail, tutorName, studentName, studentEmail, subject, message }) {
  const subjectLine = `New tutoring inquiry: ${subject}`;
  const text = [
    `Hello ${tutorName},`,
    '',
    `You have received a new inquiry on TutorMatch.`,
    '',
    `From: ${studentName} (${studentEmail})`,
    `Subject: ${subject}`,
    '',
    `Message:`,
    message,
    '',
    `Log in to your dashboard to accept or decline this request.`,
  ].join('\n');

  const html = `
    <p>Hello ${escapeHtml(tutorName)},</p>
    <p>You have received a new inquiry on <strong>TutorMatch</strong>.</p>
    <table style="border-collapse:collapse;margin:16px 0">
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold">From</td><td>${escapeHtml(studentName)} (${escapeHtml(studentEmail)})</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Subject</td><td>${escapeHtml(subject)}</td></tr>
    </table>
    <p style="font-weight:bold">Message:</p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    <p>Log in to your dashboard to accept or decline this request.</p>
  `;

  return sendEmail({ to: tutorEmail, subject: subjectLine, text, html });
}

export async function sendInquiryStatusToStudent({ studentEmail, studentName, tutorName, subject, status }) {
  const accepted = status === 'accepted';
  const subjectLine = accepted
    ? `Your inquiry was accepted — ${subject}`
    : `Update on your inquiry — ${subject}`;

  const text = accepted
    ? `Hello ${studentName},\n\nGood news! ${tutorName} has accepted your inquiry for ${subject}.\n\nThey may reach out to you at ${studentEmail} to arrange sessions.`
    : `Hello ${studentName},\n\n${tutorName} is unable to take on your inquiry for ${subject} at this time.\n\nYou can browse other tutors on TutorMatch.`;

  const html = accepted
    ? `<p>Hello ${escapeHtml(studentName)},</p><p>Good news! <strong>${escapeHtml(tutorName)}</strong> has accepted your inquiry for <strong>${escapeHtml(subject)}</strong>.</p><p>They may reach out to you to arrange sessions.</p>`
    : `<p>Hello ${escapeHtml(studentName)},</p><p><strong>${escapeHtml(tutorName)}</strong> is unable to take on your inquiry for <strong>${escapeHtml(subject)}</strong> at this time.</p><p>You can browse other tutors on TutorMatch.</p>`;

  return sendEmail({ to: studentEmail, subject: subjectLine, text, html });
}

export async function sendWelcomeEmail({ email, name, role }) {
  const roleLabel = role === 'tutor' ? 'tutor' : 'student';
  const text = `Hello ${name},\n\nWelcome to TutorMatch! Your ${roleLabel} account is ready.\n\n${role === 'tutor' ? 'Complete your profile in the dashboard so students can find you.' : 'Browse tutors and send inquiries to get started.'}`;

  return sendEmail({
    to: email,
    subject: 'Welcome to TutorMatch',
    text,
    html: `<p>Hello ${escapeHtml(name)},</p><p>Welcome to <strong>TutorMatch</strong>! Your ${roleLabel} account is ready.</p>`,
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
