'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useDebounce } from 'react-use'

export default function SearchInput() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''

  const [value, setValue] = useState(search)

  useDebounce(
    () => {
      const url = new URL(window.location.href)
      if (value === '') {
        url.searchParams.delete('search')
      } else {
        url.searchParams.set('search', value)
      }
      const pathname = url.pathname
      const search = url.search
      router.push(`${pathname}${search}`)
    },
    300,
    [value],
  )

  return (
    <input
      className="shadow-1 bg-neutral-50 p-3 rounded-lg border-none focus:ring-indigo-600 focus:ring-2 w-full"
      onChange={e => setValue(e.target.value)}
      placeholder="Search..."
      type="text"
      value={value}
    />
  )
}
