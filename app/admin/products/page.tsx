import CategorySelect from '@/components/CategorySelect'
import { ProductsTable } from './ProductsTable'
import SearchInput from '@/components/SearchInput'

export default function Supplies({
  searchParams,
}: {
  searchParams: { category: string; search: string }
}) {
  return (
    <div className="flex flex-col gap-[2vmax]">
      <SearchInput />
      <div className="flex gap-[2vmax]">
        <CategorySelect />
      </div>
      <ProductsTable
        category={searchParams.category}
        search={searchParams.search}
      />
    </div>
  )
}
