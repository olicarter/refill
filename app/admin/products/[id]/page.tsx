import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

export default async function Supplies({
  params: { id },
}: {
  params: { id: string }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: product } = await supabase
    .from('products')
    .select()
    .match({ id })
    .single()

  if (!product) return notFound()

  return (
    <h1>
      {product.name} ({product.variant})
    </h1>
  )
}
