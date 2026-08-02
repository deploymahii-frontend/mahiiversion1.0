#!/usr/bin/env node
import dotenv from 'dotenv';
import path from 'path';

// Load project root .env (run this script from the backend folder or repo root)
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

try {
  const mod = await import('../config/firebase.config.js');
  // The module logs initialization result; expose the exported flag too.
  console.log('isFirebaseInitialized:', mod.isFirebaseInitialized);
} catch (err) {
  console.error('Error importing Firebase config:', err.message);
  process.exitCode = 2;
}
