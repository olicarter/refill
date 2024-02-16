import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/')
  }

  const signUp = async (formData: FormData) => {
    'use server'

    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/login?message=Check email to continue sign in process')
  }

  return (
    <form
      className="bg-neutral-50 rounded-lg p-3 flex flex-col gap-3 max-w-md text-sm"
      action={signIn}
    >
      <h3 className="text-lg">Sign in</h3>
      <label htmlFor="email">Email</label>
      <input
        className="rounded-lg p-3 bg-neutral-50 text-sm"
        name="email"
        placeholder="you@example.com"
        required
      />
      <label htmlFor="password">Password</label>
      <input
        className="rounded-lg p-3 bg-neutral-50 text-sm"
        type="password"
        name="password"
        placeholder="••••••••"
        required
      />
      <button className="bg-indigo-600 hover:bg-indigo-700 text-indigo-50 rounded-lg p-3">
        Sign In
      </button>
      <button
        formAction={signUp}
        className="bg-indigo-200 hover:bg-indigo-300 text-indigo-950 rounded-lg p-3"
      >
        Sign Up
      </button>
      {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
    </form>
  )
}
