'use client'

import { type PropsWithChildren } from 'react'
import NextLink, { type LinkProps as NextLinkProps } from 'next/link'
import * as NavigationMenu from '@/components/NavigationMenu'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

interface LinkProps extends PropsWithChildren<NextLinkProps> {
  activeClassName?: string
  className?: string
}

export default function Link({
  activeClassName,
  className,
  href,
  ...props
}: LinkProps) {
  const pathname = usePathname()
  const isActive = pathname.startsWith(href.toString())

  return (
    <NextLink href={href} passHref legacyBehavior>
      <NavigationMenu.Link
        active={isActive}
        className={clsx(className, isActive && activeClassName)}
        {...props}
      />
    </NextLink>
  )
}
