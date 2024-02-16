import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import CategoryCell from './CategoryCell'
import { Tables } from '@/supabase.types'
import { Plus } from '@phosphor-icons/react/dist/ssr'
import { revalidatePath } from 'next/cache'

export async function ProductsTable({
  category,
  search,
}: {
  category: string
  search: string
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return <p>Unauthorized</p>

  let query = supabase
    .from('wholesaler_products')
    .select(
      '*, product!inner(id, name, size, type, category!inner(id, name, slug)), wholesaler(id, slug, name)',
    )

  if (search) {
    query = query.ilike('product.name', `%${search}%`)
  }

  if (category && category !== 'all') {
    query = query.eq('product.category.slug', category)
  }

  const { data: wholesalerProducts } = await query

  const addToOrder =
    (wholesalerProduct: Tables<'wholesaler_products'>) => async () => {
      'use server'

      const cookieStore = cookies()
      const supabase = createClient(cookieStore)

      const { data: store } = await supabase
        .from('stores')
        .select('*, retailer(retailer_staff(staff))')
        .eq('retailer.retailer_staff.staff', user.id)
        .single()

      if (!store) throw new Error('User is not member of store')

      let order

      const { data: existingOrder } = await supabase
        .from('store_orders')
        .select()
        .eq('store', store.id)
        .eq('status', 'created')
        .single()

      if (existingOrder) {
        order = existingOrder
      } else {
        const { data: newOrder } = await supabase
          .from('store_orders')
          .insert({
            store: store.id,
            wholesaler: wholesalerProduct.wholesaler.id,
          })
          .select()
          .single()
        order = newOrder
      }

      if (order) {
        await supabase
          .from('store_order_items')
          .upsert({
            store_order: order.id,
            wholesaler_product: wholesalerProduct.id,
            quantity: 1,
            price: wholesalerProduct.price,
          })
          .select()
          .single()

        revalidatePath('/products')
      }
    }

  return (
    <div className="@container bg-neutral-50 overflow-hidden rounded-lg shadow-1">
      <table className="w-full">
        <thead className="text-left text-sm">
          <tr>
            <th className="p-3">Product</th>
            <th className="p-3">Type</th>
            <th className="hidden @2xl:table-cell p-3">Category</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">€/unit</th>
            <th className="p-3">€</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {wholesalerProducts?.map(wholesalerProduct => {
            const { product, quantity, price, unit } = wholesalerProduct
            return (
              <tr className="odd:bg-neutral-100">
                <td>
                  <Link
                    className="capitalize line-clamp-1 p-3 hover:underline"
                    href={`/products/${product.id}`}
                  >
                    {product.name}
                  </Link>
                </td>
                <td className="p-3">
                  <span className="line-clamp-1">{product.type}</span>
                </td>
                <td className="hidden @2xl:table-cell">
                  <CategoryCell category={product.category} className="p-3" />
                </td>
                <td className="p-3">
                  <span>
                    {quantity}
                    {unit}
                  </span>
                </td>
                <td className="p-3">
                  <span>
                    {(Number(price) / quantity).toFixed(2)}/{unit}
                  </span>
                </td>
                <td className="p-3">
                  <span>{price}</span>
                </td>
                <td>
                  <form action={addToOrder(wholesalerProduct)}>
                    <button className="bg-indigo-200 h-5 hover:bg-indigo-300 w-5 flex items-center justify-center rounded-full text-indigo-950 whitespace-nowrap">
                      <Plus size={14} weight="bold" />
                    </button>
                  </form>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
