'use client'

import { addSearchParam } from '@/utils/addSearchParam'
import { cn } from '@/utils/cn'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function CategoryCell(props: {
  category: { name: string; slug: string }
  className?: string
}) {
  const searchParams = useSearchParams()

  return (
    <Link
      className={cn('hover:underline', props.className)}
      href={{
        pathname: '/products',
        search: addSearchParam(searchParams, 'category', props.category.slug),
      }}
    >
      {props.category.name}
    </Link>
  )
}
