import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Wholesaler({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: wholesaler } = await supabase
    .from('wholesalers')
    .select()
    .match({ slug })
    .single()

  return <h1>{wholesaler?.name}</h1>
}
