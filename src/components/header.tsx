'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description: 'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="z-50 w-full fixed text-gray-50 border-b border-gray-50 bg-gray-800/70 backdrop-blur-xl">
      <header className="flex mx-auto items-center justify-between py-3 px-4 max-w-6xl">
        <div>
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={80} height={10} />
          </Link>
        </div>
        <nav className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-4">
              <NavigationMenuItem>
                <Link href="/about" className="font-medium text-xs">
                  About
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/success-stories" className="font-medium text-xs">
                  Success Stories
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Programmes</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {components.map((component) => (
                      <ListItem key={component.title} title={component.title} href={component.href}>
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/nutrition" className="font-medium text-xs">
                  Nutrition
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/blog" className="font-medium text-xs">
                  Blog
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/get-started" className="font-medium text-sm">
                  <Button size={'none'} className="bg-gray-50 text-gray-800 text-xs">
                    Get Started
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-800 z-50 flex flex-col h-screen">
          <div className="flex justify-end p-4">
            <button onClick={() => setIsMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-grow gap-8">
            <Link href="/about" className="font-medium text-lg">
              About
            </Link>
            <Link href="/success-stories" className="font-medium text-lg">
              Success Stories
            </Link>
            <Link href="/nutrition" className="font-medium text-lg">
              Nutrition
            </Link>
            <Link href="/blog" className="font-medium text-lg">
              Blog
            </Link>
            <Link href="/get-started" className="font-medium text-lg">
              <Button size={'lg'} className="bg-gray-50 text-gray-800">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <div className="text-xs font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = 'ListItem'

export default Header
