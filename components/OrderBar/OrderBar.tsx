import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { Minus } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import IncrementQuantitySubmitButton from './IncrementQuantitySubmitButton'
import DecrementQuantitySubmitButton from './DecrementQuantitySubmitButton'

export default async function OrderBar() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: retailerOrderProducts } = await supabase
    .from('store_order_items')
    .select(
      `id, quantity,
      store_order!inner(
        *,
        wholesaler(
          id,
          name,
          slug
        )
      ),
      wholesaler_product(
        price,
        quantity,
        unit,
        product(
          name,
          type
        )
      )`,
    )
    .eq('store_order.status', 'created')
    .order('created_at', { ascending: true })

  const minOrderValue = 100 // This should come from wholesaler data

  const totalPrice =
    retailerOrderProducts?.reduce((acc, orderItem) => {
      return acc + orderItem.quantity * orderItem.wholesaler_product.price
    }, 0) || 0

  const changeQuantity = async (formData: FormData) => {
    'use server'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const rawFormData = {
      orderItemId: formData.get('orderItemId'),
      quantity: formData.get('quantity'),
    }

    if (!rawFormData.quantity || !rawFormData.orderItemId) {
      throw new Error('Invalid form data')
    }

    if (Number(rawFormData.quantity) === 0) {
      await supabase
        .from('store_order_items')
        .delete()
        .eq('id', rawFormData.orderItemId)
    } else {
      await supabase
        .from('store_order_items')
        .update({ quantity: Number(rawFormData.quantity) })
        .eq('id', rawFormData.orderItemId)
    }

    revalidatePath('/products')
  }

  return (
    <div className="bg-neutral-50 rounded-lg gap-3 text-xs flex flex-col h-fit shadow-1 p-3">
      <h5 className="font-bold text-base">Your order</h5>
      <table className="rounded-lg overflow-hidden">
        <tbody>
          {retailerOrderProducts?.map(orderItem => (
            <tr className="even:bg-neutral-100" key={orderItem.id}>
              <td className="w-5">
                <form action={changeQuantity}>
                  <input
                    type="hidden"
                    name="orderItemId"
                    value={orderItem.id}
                  />
                  <input
                    type="hidden"
                    name="quantity"
                    value={orderItem.quantity - 1}
                  />
                  <DecrementQuantitySubmitButton />
                </form>
              </td>
              <td className="w-8 text-center">{orderItem.quantity}</td>
              <td>
                <form action={changeQuantity}>
                  <input
                    type="hidden"
                    name="orderItemId"
                    value={orderItem.id}
                  />
                  <input
                    type="hidden"
                    name="quantity"
                    value={orderItem.quantity + 1}
                  />
                  <IncrementQuantitySubmitButton />
                </form>
              </td>
              <td>x</td>
              <td className="whitespace-nowrap align-top p-1.5">
                {orderItem.wholesaler_product.quantity}{' '}
                {orderItem.wholesaler_product.unit}
              </td>
              <td className="p-1.5">
                <span className="line-clamp-1">
                  {orderItem.wholesaler_product.product.name}{' '}
                  {orderItem.wholesaler_product.product.type}
                </span>
              </td>
              <td className="p-1.5 text-right">
                €
                {(
                  orderItem.quantity * orderItem.wholesaler_product.price
                ).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end font-bold px-1.5">
        Total €{totalPrice.toFixed(2)}
      </div>
      {/* {totalPrice < minOrderValue && (
        <p className="text-red-500">Minimum order value is €{minOrderValue}</p>
      )} */}
      <Link
        className="bg-indigo-600 flex items-center justify-center data-[disabled=true]:cursor-not-allowed data-[disabled=true]:bg-neutral-300 data-[disabled=true]:text-neutral-500 h-8 hover:bg-indigo-700 px-2 rounded-lg text-indigo-50 text-sm whitespace-nowrap"
        href="/checkout"
        data-disabled={totalPrice < minOrderValue}
      >
        Check out
      </Link>
    </div>
  )
}
