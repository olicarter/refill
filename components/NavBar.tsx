import * as NavigationMenu from '@/components/NavigationMenu'
import AuthButton from '@/components/AuthButton'
import Link from '@/components/Link'
import { Carrot, Storefront, Truck } from '@phosphor-icons/react/dist/ssr'
import { type ComponentPropsWithoutRef } from 'react'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

export default async function NavBar() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { count: storesCount, data: stores } = await supabase
    .from('stores')
    .select('*', { count: 'exact' })

  if (!storesCount) return notFound()

  return (
    <NavigationMenu.Root className="bg-neutral-100 z-10 shadow-2 rounded-lg">
      <NavigationMenu.List className="flex gap-3 p-3 place-items-center">
        <div className="font-black pointer-events-none text-xl">refill</div>
        <NavLink href="/admin/orders">Orders</NavLink>
        <NavLink
          href={
            storesCount > 1
              ? '/admin/stores'
              : `/admin/stores/${stores[0].id}/inventory`
          }
        >
          {storesCount > 1 ? 'Stores' : 'Inventory'}
        </NavLink>
        <NavLink href="/admin/products">Supplies</NavLink>
        <NavigationMenu.Item>
          <AuthButton />
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}

function NavLink(props: ComponentPropsWithoutRef<typeof Link>) {
  return (
    <NavigationMenu.Item>
      <Link
        activeClassName="bg-indigo-600 hover:bg-indigo-600 text-white"
        className="flex gap-3 hover:bg-indigo-200 items-center p-3 rounded-lg w-full"
        {...props}
      />
    </NavigationMenu.Item>
  )
}
