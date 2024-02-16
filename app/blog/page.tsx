import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { format, parseISO } from 'date-fns'
import Markdown from 'markdown-to-jsx'
import Link from 'next/link'

export default async function Posts() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: posts } = await supabase.from('posts').select()

  return (
    <>
      <header className="max-w-screen-md p-6 prose prose-neutral w-full">
        <h1>Blog</h1>
      </header>
      <ul className="max-w-screen-md px-6 w-full">
        {posts?.map(post => (
          <Link href={`/blog/${post.slug}`}>
            <li
              className="bg-white dark:bg-neutral-950 p-6 prose prose-neutral dark:prose-invert rounded-2xl"
              key={post.id}
            >
              <h2>{post.title}</h2>

              <span className="opacity-60">
                {format(parseISO(post.created_at), 'PP')}
              </span>
              <Markdown className="line-clamp-5">{post.content}</Markdown>
            </li>
          </Link>
        ))}
      </ul>
    </>
  )
}
