import * as Table from '@/components/Table'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function Inventory() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: stores } = await supabase.from('stores').select('id, address')

  return (
    <Table.Root columns={[{ name: 'Address', min: '64px', max: '1fr' }]}>
      {stores?.map(store => (
        <Table.Row key={store.id}>
          <Table.Cell>
            <Link
              className="hover:underline"
              href={`/stores/${store.id}/inventory`}
            >
              {store.address}
            </Link>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Root>
  )
}
