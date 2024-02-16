'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Sparkle } from '@phosphor-icons/react'
import clsx from 'clsx'
import { type Tables } from '@/supabase.types'
import Link from 'next/link'

interface ProductCardProps {
  product: Partial<Tables<'products'>>
}

export default function ProductCard(props: ProductCardProps) {
  const [isAIResupplyChecked, setIsAIResupplyChecked] = useState(
    Math.random() > 0.5,
  )
  const maxKg = 25
  const resupplyThresholdKg = 5
  const resupplyThresholdPercentage = (resupplyThresholdKg / maxKg) * 100
  const [stockKg] = useState(Math.round(Math.random() * maxKg))
  const stockPercentage = (stockKg / maxKg) * 100

  return (
    <li
      className="bg-neutral-50 shadow-1 overflow-hidden rounded-lg"
      key={props.product.id}
    >
      <div className="aspect-video bg-neutral-100 relative">
        <Image
          alt={props.product.name ?? 'Product image'}
          className="object-cover"
          fill
          src="/wheat-flour-whole.jpg"
        />
      </div>
      <div className="flex flex-col gap-3 p-3">
        <p className="font-bold">{props.product.name}</p>
        <div className="flex leading-none text-xs font-bold gap-1.5">
          <span>Stock</span>
          <div className="flex grow bg-neutral-200 rounded-lg h-3 overflow-hidden relative">
            <div
              className="absolute bg-black h-full w-0.5"
              style={{ left: `${resupplyThresholdPercentage}%` }}
            />
            <div
              className={clsx(
                stockPercentage < 25 && 'bg-red-500',
                stockPercentage >= 25 &&
                  stockPercentage < 50 &&
                  'bg-yellow-500',
                stockPercentage >= 50 && 'bg-green-500',
              )}
              style={{ width: `${stockPercentage}%` }}
            />
          </div>
          <span>
            {stockKg}/{maxKg}kg
          </span>
        </div>
      </div>
      <div
        className={clsx(
          'p-3 text-indigo-600 text-xs gap-1.5 flex flex-col',
          isAIResupplyChecked && 'bg-indigo-600 text-white',
        )}
      >
        <div className="flex gap-[inherit] font-bold">
          <input
            checked={isAIResupplyChecked}
            className="check-indigo-600 bg-indigo-200 border-none focus:ring-indigo-600 rounded text-indigo-200"
            type="checkbox"
            onChange={e => setIsAIResupplyChecked(e.target.checked)}
            id={`ai-resupply-${props.product.id}`}
            name="ai-resupply"
          />
          <label
            className="flex gap-1.5"
            htmlFor={`ai-resupply-${props.product.id}`}
          >
            ResupplAI {isAIResupplyChecked ? 'on' : 'off'}
            <Sparkle size={16} weight={isAIResupplyChecked ? 'fill' : 'bold'} />
          </label>
        </div>
        {isAIResupplyChecked && (
          <div className="flex flex-col items-start gap-[inherit]">
            <p>
              {isAIResupplyChecked && stockPercentage < 25
                ? `${maxKg}kg will be delivered tomorrow`
                : `${maxKg}kg will be ordered when ${resupplyThresholdKg}kg remains`}
            </p>
            <Link className="underline" href="/">
              {isAIResupplyChecked && stockPercentage < 25
                ? 'View tracking'
                : 'Change'}
            </Link>
          </div>
        )}
      </div>
    </li>
  )
}
