'use client'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useMedia } from 'react-use'

export const Root = (props: NavigationMenu.NavigationMenuProps) => {
  const isPortrait = useMedia('(orientation: portrait)')

  return (
    <NavigationMenu.Root
      orientation={isPortrait ? 'horizontal' : 'vertical'}
      {...props}
    />
  )
}

export const Item = ({
  className,
  ...props
}: NavigationMenu.NavigationMenuItemProps) => (
  <NavigationMenu.Item
    className="flex items-center leading-none text-sm"
    {...props}
  />
)

export const List = NavigationMenu.List
export const Link = NavigationMenu.Link
