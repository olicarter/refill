import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { format, parseISO } from 'date-fns'
import Markdown from 'markdown-to-jsx'
import Link from 'next/link'

export default async function Posts({ params }: { params: { slug: string } }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: post } = await supabase
    .from('posts')
    .select()
    .eq('slug', params.slug)
    .single()

  if (!post) {
    return <h1>Post not found</h1>
  }

  return (
    <div className="p-6 prose prose-neutral dark:prose-invert rounded-2xl">
      <Link className="w-full" href="/blog">
        Back
      </Link>
      <h1>{post.title}</h1>
      <span className="opacity-60">
        {format(parseISO(post.created_at), 'PP')}
      </span>
      <Markdown>{post.content}</Markdown>
    </div>
  )
}
