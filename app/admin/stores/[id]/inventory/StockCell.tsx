'use client'

import * as Tooltip from '@radix-ui/react-tooltip'
import { type Tables } from '@/supabase.types'

export default function StockCell(props: {
  storeOrderItems: Tables<'store_order_items'>[]
  storeProduct: Tables<'store_inventory'>
}) {
  const unit = props.storeProduct.unit
  const stock = props.storeProduct.stock
  const orderedStock = props.storeOrderItems
    ?.filter(soi => soi.store_order.status !== 'delivered')
    .reduce(
      (acc, storeOrderItem) =>
        acc +
        storeOrderItem.quantity * storeOrderItem.wholesaler_product.quantity,
      0,
    )
  const maxStock = Math.max(
    stock + orderedStock,
    ...props.storeOrderItems?.map(
      soi => soi.quantity * soi.wholesaler_product.quantity,
    ),
  )

  const stockPercentage = (stock / maxStock) * 100
  const orderedStockPercentage = (orderedStock / maxStock) * 100

  return (
    <Tooltip.Provider>
      <td className="w-full">
        <div className="flex gap-1.5 items-center">
          <span className="w-8">
            {stock}
            {unit}
          </span>
          <div className="flex grow rounded-lg h-3 overflow-hidden relative">
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <div
                  className="bg-indigo-600 cursor-help"
                  style={{ width: `${stockPercentage}%` }}
                />
              </Tooltip.Trigger>
              <Tooltip.Content
                className="bg-indigo-600 py-1 px-2 rounded-lg text-indigo-50"
                side="top"
              >
                {stock}
                {unit} in stock
                <Tooltip.Arrow className="fill-indigo-600" />
              </Tooltip.Content>
            </Tooltip.Root>
            <Tooltip.Root delayDuration={500}>
              <Tooltip.Trigger asChild>
                <div
                  className="animate-pulse bg-indigo-300 cursor-help"
                  style={{ width: `${orderedStockPercentage}%` }}
                />
              </Tooltip.Trigger>
              <Tooltip.Content
                className="bg-indigo-300 font-medium py-1 px-2 rounded-lg text-indigo-950"
                side="top"
              >
                {orderedStock}
                {unit} arriving DELIVERY_DATE
                <Tooltip.Arrow className="fill-indigo-300" />
              </Tooltip.Content>
            </Tooltip.Root>
            <div className="bg-neutral-200 grow" />
          </div>
          <span>
            {maxStock}
            {unit}
          </span>
        </div>
      </td>
    </Tooltip.Provider>
  )
}
