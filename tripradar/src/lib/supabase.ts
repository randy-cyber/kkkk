import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Supabase client — wired up but intentionally inert for now.
 *
 * TripRadar's UI runs entirely on mock data (see `src/lib/mockData.ts`) until
 * the backend is connected. Drop real credentials into a `.env.local`:
 *
 *   VITE_SUPABASE_URL=...
 *   VITE_SUPABASE_ANON_KEY=...
 *
 * `isSupabaseConfigured` lets feature code branch on availability so the app
 * never crashes when keys are absent.
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null
