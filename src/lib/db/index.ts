import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as schema from './schema'

// Neon HTTP driver — works in both Node and Edge runtimes, and on both
// Vercel and Cloudflare Workers. Never use `pg` / node-postgres here.
// Lazy singleton to avoid eager module-scope DB connection issues on
// serverless cold starts (the mockX crash pattern).

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null

export function getDb() {
  if (!_db) {
    const sql = neon(process.env.DATABASE_URL!)
    _db = drizzle(sql, { schema })
  }
  return _db
}
