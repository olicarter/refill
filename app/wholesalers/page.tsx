import * as Table from '@/components/Table'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function Wholesalers() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: wholesalers } = await supabase.from('wholesalers').select()

  return (
    <Table.Root columns={[{ name: 'Name', min: '64px', max: '1fr' }]}>
      {wholesalers?.map(wholesaler => (
        <Table.Row>
          <Table.Cell>
            <Link
              className="hover:underline"
              href={`/wholesalers/${wholesaler.slug}`}
              key={wholesaler.id}
            >
              {wholesaler.name}
            </Link>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Root>
  )
}
