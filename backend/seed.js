import db from './db.js';

// Remove any previously seeded demo accounts
const removed = db.prepare("DELETE FROM users WHERE email LIKE '%@example.com'").run();

console.log(`Cleanup complete. Removed ${removed.changes} demo account(s).`);
console.log('TutorMatch is ready for real user registrations.');
