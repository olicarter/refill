import OrderBar from '@/components/OrderBar/OrderBar'
import { type ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="gap-[2vmax] grid grid-cols-[2fr_1fr]">
      {children}
      <div className="h-fit sticky top-[2vmax]">
        <OrderBar />
      </div>
    </div>
  )
}
