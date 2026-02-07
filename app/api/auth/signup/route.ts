import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password, role, fullName } = await request.json() 

    // Validate inputs 
    if (!email || !password || !role || !fullName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Call Supabase auth API directly
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Missing Supabase environment variables')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Sign up using Supabase auth
    const signUpResponse = await fetch(`${supabaseUrl}/auth/v1/signup`, {
      method: 'POST',
      
      headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'X-Client-Info': 'kidguides-auth',
      },

      body: JSON.stringify({
        email,
        password,
        user_metadata: {
          full_name: fullName,
          role,
        },
        options: {
          emailRedirectTo: undefined, // Disable email confirmation redirect
        },
      }),
    })

    const signUpData = await signUpResponse.json()

    if (!signUpResponse.ok) {
      console.error('RAW SUPABASE ERROR:', signUpData)
      
      // Check if user already exists - Supabase returns different error formats
      const errorMessage = signUpData.error_description || signUpData.msg || signUpData.message || ''
      const errorCode = signUpData.error_code || signUpData.error || ''
      
      if (errorMessage.toLowerCase().includes('already registered') ||
          errorMessage.toLowerCase().includes('user already registered') ||
          errorCode === 'signup_disabled' ||
          signUpResponse.status === 422) {
        return NextResponse.json(
          { 
            error: 'User already exists', 
            userExists: true,
            message: 'An account with this email already exists. Please move to Sign In option.'
          },
          { status: 409 }
        )
      }
      
      return NextResponse.json(
        { error: errorMessage || 'Sign up failed' },
        { status: 400 }
      )
    }


    return NextResponse.json(
      {
        success: true,
        message: 'User created successfully. Please check your email to confirm your account.',
        user: signUpData.user,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred during signup' },
      { status: 500 }
    )
  }

}
