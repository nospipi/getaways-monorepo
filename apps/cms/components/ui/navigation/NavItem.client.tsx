"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cx, focusRing } from "@/lib/utils"
import { RiCalendarTodoLine, RiFileListLine } from "@remixicon/react"

// Use a string ID to identify which icon to render
type NavItemProps = {
  name: string
  href: string
  iconName: string // Instead of passing the component, pass a string identifier
}

// This component maps the string identifier to the actual icon component
export function NavItem({ name, href, iconName }: NavItemProps) {
  const pathname = usePathname()

  const isActive = (itemHref: string) => {
    return pathname === itemHref || pathname?.endsWith(itemHref)
  }

  // Render the appropriate icon based on the string identifier
  const getIcon = () => {
    switch (iconName) {
      case "RiCalendarTodoLine":
        return (
          <RiCalendarTodoLine className="size-4 shrink-0" aria-hidden="true" />
        )
      case "RiFileListLine":
        return <RiFileListLine className="size-4 shrink-0" aria-hidden="true" />
      // Add other icons as needed
      default:
        return null
    }
  }

  return (
    <li>
      <Link
        href={href}
        className={cx(
          isActive(href)
            ? "text-indigo-600 dark:text-indigo-400"
            : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
          "flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
          focusRing,
        )}
      >
        {getIcon()}
        {name}
      </Link>
    </li>
  )
}
