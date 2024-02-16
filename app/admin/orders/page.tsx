import { cookies } from 'next/headers'
import { format, parseISO } from 'date-fns'
import { createClient } from '@/utils/supabase/server'
import * as Table from '@/components/Table'

export default async function Orders() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: orders } = await supabase.from('consumer_orders').select(`
    *,
    consumer (name),
    consumer_order_items (
      quantity,
      unit,
      product (id, name)
    )
  `)

  return (
    <Table.Root
      columns={[
        { name: 'ID', min: '64px', max: '128px' },
        { name: 'Placed at', min: '64px', max: '192px' },
        { name: 'Customer', min: '64px', max: '192px' },
        { name: 'Status', min: '64px', max: '1fr' },
      ]}
    >
      {orders?.map(order => (
        <Table.Row key={order.id}>
          <Table.Cell>
            <p className="line-clamp-1">{order.id}</p>
          </Table.Cell>
          <Table.Cell>
            <p>{format(parseISO(order.created_at), 'Pp')}</p>
          </Table.Cell>
          <Table.Cell>
            <p>{order.consumer.name}</p>
          </Table.Cell>
          <Table.Cell>
            <p className="capitalize">{order.status}</p>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Root>
  )
}
