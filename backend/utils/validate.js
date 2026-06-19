const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email) {
  return typeof email === 'string' && email.length <= 254 && EMAIL_RE.test(email.trim());
}

export function validatePassword(password) {
  if (typeof password !== 'string' || password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
    return 'Password must include at least one letter and one number';
  }
  if (password.length > 128) {
    return 'Password is too long';
  }
  return null;
}

export function sanitizeText(value, maxLen = 2000) {
  if (value == null) return '';
  return String(value).trim().slice(0, maxLen);
}

export function sanitizeName(name) {
  const trimmed = sanitizeText(name, 100);
  if (!trimmed) return null;
  return trimmed;
}
