'use client'

import { useFormStatus } from 'react-dom'
import { Minus } from '@phosphor-icons/react'
import clsx from 'clsx'

export default function DecrementQuantitySubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      className={clsx(
        'bg-red-200 disabled:cursor-wait disabled:text-red-400 enabled:hover:bg-red-300 enabled:text-red-950 flex h-5 items-center justify-center rounded-full w-5 whitespace-nowrap',
        pending && 'animate-pulse',
      )}
      disabled={pending}
    >
      <Minus size={14} weight="bold" />
    </button>
  )
}
