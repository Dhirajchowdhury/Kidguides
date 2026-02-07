import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type UserRole = 'parent' | 'teacher' | 'tutor' | 'admin'

export interface AuthUser {
  id: string
  email: string
  role: UserRole
}

export async function signUp(
  email: string,
  password: string,
  role: UserRole,
  fullName: string
) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    })

    if (authError) throw authError

    if (!authData.user) throw new Error('User creation failed')

    return authData.user
  } catch (error) {
    console.error('Signup error:', error)
    throw error
  }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOut() {
  return supabase.auth.signOut()
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getSession()
  
  if (!data.session) return null

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.session.user.id)
    .single()

  if (error) return null
  return user
}

export async function getAuthUser() {
  const { data } = await supabase.auth.getUser()
  return data.user
}
