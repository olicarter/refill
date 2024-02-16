'use client'

import { useState, type ComponentPropsWithoutRef } from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'
import clsx from 'clsx'
import { CircleNotch, Sparkle } from '@phosphor-icons/react/dist/ssr'

export default function CheckboxAI({
  checked,
  ...props
}: ComponentPropsWithoutRef<'input'>) {
  const [loading, setLoading] = useState(false)
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)

  return (
    <Tooltip.Root onOpenChange={setIsTooltipOpen}>
      <Tooltip.Trigger asChild>
        <label
          className={clsx(
            '*:cursor-pointer cursor-pointer flex gap-1 items-center p-0.5 pr-1 rounded select-none w-fit',
            checked
              ? 'bg-indigo-600 text-indigo-50'
              : 'bg-indigo-200 text-indigo-950',
            isTooltipOpen && 'rounded-t-none',
          )}
          htmlFor={props.id}
        >
          <input
            checked={checked}
            className={clsx(
              'bg-indigo-300 border-none focus:border-0 focus:ring-0 focus:ring-offset-0 rounded text-indigo-500',
            )}
            type="checkbox"
            {...props}
          />
          {loading ? (
            <CircleNotch className="animate-spin" weight="bold" />
          ) : (
            <Sparkle weight="fill" />
          )}
        </label>
      </Tooltip.Trigger>
      <Tooltip.Content
        className={clsx(
          'rounded-lg rounded-bl-none p-1.5 w-[260px] will-change-[transform,opacity]',
          checked
            ? 'bg-indigo-600 text-indigo-50'
            : 'bg-indigo-200 text-indigo-950',
        )}
        side="top"
        align="start"
      >
        {checked
          ? 'AI is enabled to automatically order more stock.'
          : 'Check this box to enable AI to automatically order more stock.'}
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
