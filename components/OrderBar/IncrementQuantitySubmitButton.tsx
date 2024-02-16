'use client'

import { useFormStatus } from 'react-dom'
import { Plus } from '@phosphor-icons/react'
import clsx from 'clsx'

export default function IncrementQuantitySubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      className={clsx(
        'bg-indigo-200 disabled:cursor-wait disabled:text-indigo-400 enabled:hover:bg-indigo-300 enabled:text-indigo-950 flex h-5 items-center justify-center rounded-full w-5 whitespace-nowrap',
        pending && 'animate-pulse',
      )}
      disabled={pending}
    >
      <Plus size={14} weight="bold" />
    </button>
  )
}
