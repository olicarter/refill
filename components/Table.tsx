'use client'

import {
  useEffect,
  type ComponentPropsWithoutRef,
  type PropsWithChildren,
} from 'react'
import { createGlobalState } from 'react-use'
import { cn } from '@/utils/cn'

const useNumCols = createGlobalState<number>(1)

interface RootProps extends PropsWithChildren {
  columns: {
    name: string
    min: string
    max: string
  }[]
}

export function Root(props: RootProps) {
  const [, setNumCols] = useNumCols()

  useEffect(() => {
    setNumCols(props.columns.length)
  }, [props.columns])

  return (
    <div
      className="bg-neutral-50 items-center rounded-lg overflow-hidden grid text-xs shadow-1"
      style={{
        gridTemplateColumns: props.columns
          .map(column => `minmax(${column.min},${column.max})`)
          .join(' '),
      }}
    >
      {props.columns.map(column => (
        <Cell>
          <span
            className="font-bold text-sm whitespace-nowrap"
            key={column.name}
          >
            {column.name}
          </span>
        </Cell>
      ))}
      {props.children}
    </div>
  )
}

export function Row({ className, ...props }: ComponentPropsWithoutRef<'li'>) {
  const [numCols] = useNumCols()

  return (
    <li
      className={cn(
        'items-center odd:bg-neutral-100 grid grid-cols-[inherit]',
        className,
      )}
      style={{
        gridColumn: `span ${numCols} / span ${numCols}`,
      }}
      {...props}
    />
  )
}

export function Cell({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('flex gap-1 items-center p-3', className)} {...props} />
  )
}
