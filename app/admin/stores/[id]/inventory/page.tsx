import CategorySelect from '@/components/CategorySelect'
import InventoryTable from './InventoryTable'
import SearchInput from '@/components/SearchInput'

// const reducer: Reducer<{ column: string; direction: string }, string> = (
//   _state,
//   action,
// ) => {
//   const [column, direction] = action.split('-')
//   return { column, direction }
// }

export default function Inventory({
  params: { id: storeId },
  searchParams: { category, search },
}: {
  params: { id: string }
  searchParams: { category: string; search: string }
}) {
  // const [sort, setSort] = useReducer(reducer, {
  //   column: 'stock',
  //   direction: 'ascending',
  // })

  return (
    <div className="flex flex-col gap-[2vmax]">
      <SearchInput />
      <div className="flex gap-3">
        {/* <SortSelect
          onValueChange={setSort}
          value={`${sort.column}-${sort.direction}`}
        /> */}
        <CategorySelect />
      </div>
      <InventoryTable category={category} search={search} storeId={storeId} />
    </div>
  )
}
