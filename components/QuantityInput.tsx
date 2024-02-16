'use client'

export default function QuantityInput(props: { quantity: number }) {
  return (
    <input
      className="bg-transparent border-t-0 border-x-0 p-0 text-xs leading-none w-12 border-b border-b-black"
      defaultValue={props.quantity}
      min={0}
      name="quantity"
      onChange={e => {
        if (e.target.value !== '') {
          e.currentTarget.form?.requestSubmit()
        }
      }}
      onBlur={e => {
        if (e.target.value === '') {
          e.target.value = '0'
          e.currentTarget.form?.requestSubmit()
        }
      }}
      type="number"
    />
  )
}
