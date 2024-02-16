import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { Tables } from '@/supabase.types'
import StockCell from './StockCell'

interface InventoryTableProps {
  category: string
  sort: { column: string; direction: string }
  storeId: string
  search: string
}

export default async function InventoryTable(props: InventoryTableProps) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  let storeInventoryQuery = supabase
    .from('store_inventory')
    .select('*, product!inner(*, category!inner(*)), store(*)')
    .eq('store', props.storeId)

  if (props.category && props.category !== 'all') {
    storeInventoryQuery = storeInventoryQuery.eq(
      'product.category.slug',
      props.category,
    )
  }

  if (props.search) {
    storeInventoryQuery = storeInventoryQuery.ilike(
      'product.name',
      `%${props.search}%`,
    )
  }

  const { data: storeOrderItems } = await supabase
    .from('store_order_items')
    .select(
      '*, store_order!inner(status, store(id)), wholesaler_product(*, product(*))',
    )
    .eq('store_order.store.id', props.storeId)
    .in('store_order.status', [
      'paid',
      'packing',
      'packed',
      'delivering',
      'delivered',
    ])
    .order('created_at', { ascending: false })

  const { data: storeProducts } = await storeInventoryQuery

  return (
    <div className="@container bg-neutral-50 overflow-hidden rounded-lg shadow-1">
      <table>
        <thead className="text-left text-sm">
          <tr className="*:p-3">
            <th>Product</th>
            <th>Type</th>
            <th>Category</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {storeProducts?.map(storeProduct => (
            <Row
              storeOrderItems={storeOrderItems?.filter(soi => {
                return (
                  soi.wholesaler_product.product.id === storeProduct.product.id
                )
              })}
              storeProduct={storeProduct}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

async function Row({
  storeOrderItems,
  storeProduct,
}: {
  storeOrderItems: Tables<'store_order_items'>[]
  storeProduct: Tables<'store_inventory'>
}) {
  const product = storeProduct.product

  return (
    <tr className="*:p-3 odd:bg-neutral-100">
      <td>
        <Link
          className="capitalize line-clamp-1 whitespace-nowrap"
          href={`/products/${product.id}`}
        >
          {product.name}
        </Link>
      </td>
      <td>
        <span className="line-clamp-1 whitespace-nowrap">{product.type}</span>
      </td>
      <td>
        <span>{product.category.name}</span>
      </td>

      <StockCell
        storeOrderItems={storeOrderItems}
        storeProduct={storeProduct}
      />
    </tr>
  )
}
