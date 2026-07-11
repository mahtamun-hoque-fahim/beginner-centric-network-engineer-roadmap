import {
  pgTable,
  text,
  integer,
  numeric,
  timestamp,
  jsonb,
  pgEnum,
} from 'drizzle-orm/pg-core'

export const userRoleEnum = pgEnum('user_role', ['user', 'admin'])
export const trackStatusEnum = pgEnum('track_status', ['locked', 'teaser', 'unlocked'])

// Better Auth's core tables (user, session, account, verification) are generated
// by Better Auth's CLI schema generator — this file adds our domain fields
// on top via a separate migration once Better Auth's base schema exists.
// Domain-specific extension fields live here for reference; Better Auth's
// `additionalFields` config wires them onto the generated `user` table.

export const users = pgTable('user', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  role: userRoleEnum('role').notNull().default('user'),
  country: text('country'),
  educationStatus: text('education_status'),
  university: text('university'),
  department: text('department'),
  cgpa: numeric('cgpa'),
  tier: text('tier').notNull().default('free'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const roadmapPhases = pgTable('roadmap_phases', {
  id: text('id').primaryKey(), // slug, e.g. "phase-1-junior-it-support"
  title: text('title').notNull(),
  order: integer('order').notNull(),
  description: text('description'),
})

export const roadmapTasks = pgTable('roadmap_tasks', {
  id: text('id').primaryKey(),
  phaseId: text('phase_id')
    .notNull()
    .references(() => roadmapPhases.id),
  title: text('title').notNull(),
  scenario: text('scenario').notNull(),
  resources: jsonb('resources').$type<
    { label: string; url: string; type: 'free' | 'paid' }[]
  >(),
  order: integer('order').notNull(),
})

export const userProgress = pgTable('user_progress', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  taskId: text('task_id')
    .notNull()
    .references(() => roadmapTasks.id),
  completedAt: timestamp('completed_at').notNull().defaultNow(),
})

export const cvTrack = pgTable('cv_track', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  status: trackStatusEnum('status').notNull().default('locked'),
  data: jsonb('data'),
})

export const interviewPrepTrack = pgTable('interview_prep_track', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  status: trackStatusEnum('status').notNull().default('locked'),
  data: jsonb('data'),
})
