import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gnbbuhnzzttlldhglbvi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduYmJ1aG56enR0bGxkaGdsYnZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNTYzNDMsImV4cCI6MjA4ODgzMjM0M30.CXcnK4ezqxzNE16aSbQgk13abd9Wdppe5QSVY1KMEAo'

export const supabase = createClient(supabaseUrl, supabaseKey)