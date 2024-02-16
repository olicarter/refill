'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Tables } from '@/supabase.types'
import Link from 'next/link'
import * as Table from '@/components/Table'
import { useCallback, useEffect, useState } from 'react'
import CategorySelect from '@/components/CategorySelect'

export default function Supplies() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  )

  const [category, setCategory] = useState(
    searchParams.get('category') ?? 'all',
  )

  const [search, setSearch] = useState<string>()

  useEffect(() => {
    router.push(`?${createQueryString('category', category)}`)
  }, [category])

  return (
    <div className="flex flex-col gap-[2vmax]">
      <input
        className="shadow-1 bg-neutral-50 p-3 rounded-lg border-none focus:ring-indigo-600 focus:ring-2 w-full"
        onChange={e => setSearch(e.target.value)}
        placeholder="Search..."
        type="text"
        value={search}
      />
      <div className="flex gap-3">
        <CategorySelect onValueChange={setCategory} value={category} />
      </div>
      <ProductsTable
        category={category}
        search={search}
        setCategory={setCategory}
      />
    </div>
  )
}

interface ProductsTableProps {
  category: string
  search?: string
  setCategory: (category: string) => void
}

function ProductsTable(props: ProductsTableProps) {
  const supabase = createClient()

  const [wholesalerProducts, setWholesalerProducts] = useState<
    Tables<'wholesaler_products'>[] | null
  >([])

  useEffect(() => {
    const getData = async () => {
      let query = supabase
        .from('wholesaler_products')
        .select(
          '*, product!inner(id, name, size, type, category!inner(id, name, slug)), wholesaler(slug, name)',
        )
      if (props.search) {
        query = query.ilike('product.name', `%${props.search}%`)
      }
      if (props.category !== 'all') {
        query = query.eq('product.category.slug', props.category)
      }
      const { data } = await query
      setWholesalerProducts(data)
    }
    getData()
  }, [props.category, props.search])

  const addToOrder = async () => {
    'use server'
    // await supabase.from('...').insert({...})
  }

  return (
    <Table.Root
      columns={[
        { name: 'Product', min: '64px', max: '128px' },
        { name: 'Type', min: '64px', max: '192px' },
        { name: 'Category', min: '64px', max: '128px' },
        { name: 'Wholesaler', min: '128px', max: '128px' },
        { name: 'Quantity', min: '64px', max: '128px' },
        { name: '€/unit', min: '64px', max: '128px' },
        { name: '€', min: '64px', max: '128px' },
        { name: '', min: '128px', max: '1fr' },
      ]}
    >
      {wholesalerProducts?.map(wholesalerProduct => {
        const { product, quantity, price, unit, wholesaler } = wholesalerProduct
        return (
          <Table.Row>
            <Table.Cell>
              <Link
                className="capitalize hover:underline"
                href={`/products/${product.id}`}
              >
                {product.name}
              </Link>
            </Table.Cell>
            <Table.Cell>
              <span>{product.type}</span>
            </Table.Cell>
            <Table.Cell>
              <button
                className="hover:underline"
                onClick={() => props.setCategory(product.category.slug)}
              >
                {product.category.name}
              </button>
            </Table.Cell>
            <Table.Cell>
              <Link
                className="hover:underline"
                href={`/wholesalers/${wholesaler.slug}`}
              >
                {wholesaler.name}
              </Link>
            </Table.Cell>
            <Table.Cell>
              <span>
                {quantity}
                {unit}
              </span>
            </Table.Cell>
            <Table.Cell>
              <span>
                {(Number(price) / quantity).toFixed(2)}/{unit}
              </span>
            </Table.Cell>
            <Table.Cell>
              <span>{price}</span>
            </Table.Cell>
            <Table.Cell>
              <form onSubmit={addToOrder}>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-indigo-50 rounded-lg h-8 px-2">
                  Add to order
                </button>
              </form>
            </Table.Cell>
          </Table.Row>
        )
      })}
    </Table.Root>
  )
}
