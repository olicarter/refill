import { CaretDown } from '@phosphor-icons/react'
import * as Select from '@radix-ui/react-select'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { useEffect, useState } from 'react'
import { Tables } from '@/supabase.types'

export default function CategorySelect(props: Select.SelectProps) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const [stores, setStores] = useState<
    Pick<Tables<'stores'>, 'id' | 'address'>[] | null
  >()

  useEffect(() => {
    const getData = async () => {
      const { data: stores } = await supabase
        .from('stores')
        .select('id, address')
      console.log(stores)
      setStores(stores)
      const firstStore = stores?.[0]
      if (firstStore) props.onValueChange?.(firstStore.id)
    }
    getData()
  }, [])

  return (
    <Select.Root onValueChange={props.onValueChange} value={props.value}>
      <Select.Trigger className="bg-neutral-50 flex gap-1.5 items-center p-2 rounded-lg shadow-1 text-sm">
        Store:{' '}
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
            {stores?.map(store => (
              <Select.Item
                className="cursor-pointer hover:bg-neutral-100 m-1.5 p-1.5"
                key={store.id}
                value={store.id}
              >
                <Select.ItemText>{store.address}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
