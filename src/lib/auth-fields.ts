// Shared between src/lib/auth.ts (server) and src/lib/auth-client.ts (client).
// Deliberately has zero imports and zero side effects so importing it from
// a 'use client' file never pulls server-only DB/adapter code into the
// browser bundle.
export const additionalUserFields = {
  role: {
    type: 'string',
    required: false,
    defaultValue: 'user',
    input: false, // never settable by the client — prevents self-promotion to admin
  },
  country: { type: 'string', required: false },
  educationStatus: { type: 'string', required: false },
  university: { type: 'string', required: false },
  department: { type: 'string', required: false },
  cgpa: { type: 'string', required: false },
  tier: { type: 'string', required: false, defaultValue: 'free' },
} as const
