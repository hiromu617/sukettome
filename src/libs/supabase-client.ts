import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if(!supabaseUrl){
  console.error("supabaseUrl not found!")
}

if(!supabaseAnonKey){
  console.error("supabaseAnonKey not found!")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
