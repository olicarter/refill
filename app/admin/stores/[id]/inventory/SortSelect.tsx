import { CaretDown } from '@phosphor-icons/react/dist/ssr'
import * as Select from '@radix-ui/react-select'

export default function ({ onValueChange, value }: Select.SelectProps) {
  return (
    <Select.Root onValueChange={onValueChange} value={value}>
      <Select.Trigger className="bg-neutral-50 flex gap-1.5 items-center p-2 rounded-lg shadow-1 text-sm">
        Sort by:{' '}
        <span className="text-indigo-600">
          <Select.Value />
        </span>
        <Select.Icon asChild>
          <CaretDown size={16} weight="bold" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="bg-neutral-50 *:first:rounded-t-md *:last:rounded-b-md rounded-lg shadow-2 text-sm">
          <Select.Viewport>
            <Select.Item
              className="cursor-pointer hover:bg-neutral-100 m-1.5 p-1.5"
              value="stock-ascending"
            >
              <Select.ItemText>Stock ascending</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>

            <Select.Item
              className="cursor-pointer hover:bg-neutral-100 m-1.5 p-1.5"
              value="stock-descending"
            >
              <Select.ItemText>Stock descending</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
