import { createClient } from '@supabase/supabase-js';

// Use environment variables for security
const URL = process.env.REACT_APP_SUPABASE_URL;
const API_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(URL, API_KEY);
