'use client'

import { CaretDown } from '@phosphor-icons/react'
import * as Select from '@radix-ui/react-select'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Tables } from '@/supabase.types'

export default function CategorySelect() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategory = searchParams.get('category') ?? 'all'

  const supabase = createClient()
  const [productCategories, setProductCategories] = useState<
    Tables<'product_categories'>[] | null
  >([])

  useEffect(() => {
    const getData = async () => {
      const { data: productCategories } = await supabase
        .from('product_categories')
        .select()
      setProductCategories(productCategories)
    }
    getData()
  }, [])

  return (
    <Select.Root
      onValueChange={value => router.push(`?category=${value}`)}
      value={currentCategory}
    >
      <Select.Trigger className="bg-neutral-50 flex gap-1.5 items-center p-2 rounded-lg shadow-1 text-sm">
        Category:{' '}
        <span className="text-indigo-600">
          <Select.Value />
        </span>
        <Select.Icon asChild>
          <CaretDown size={16} weight="bold" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="bg-neutral-50 *:first:rounded-t-md *:last:rounded-b-md rounded-lg shadow-2 text-sm">
          <Select.Viewport>
            <Select.Item
              className="cursor-pointer hover:bg-neutral-100 m-1.5 p-1.5"
              value="all"
            >
              <Select.ItemText>All</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
            {productCategories?.map(category => (
              <Select.Item
                className="cursor-pointer hover:bg-neutral-100 m-1.5 p-1.5"
                key={category.id}
                value={category.slug}
              >
                <Select.ItemText>{category.name}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
