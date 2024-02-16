import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Gear } from '@phosphor-icons/react/dist/ssr'
import Link from '@/components/Link'

export default async function AuthButton() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const signOut = async () => {
    'use server'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return user ? (
    <form action={signOut}>
      <button className="hover:bg-indigo-200 p-3 rounded-lg">Sign out</button>
    </form>
  ) : (
    <Link
      activeClassName="bg-indigo-600 hover:bg-indigo-600 text-white"
      className="hover:bg-indigo-200 p-3 rounded-lg"
      href="/login"
    >
      Sign in
    </Link>
  )
}
