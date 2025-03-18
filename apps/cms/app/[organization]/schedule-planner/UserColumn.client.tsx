"use client"

import { User } from "./mockData"
import { Badge } from "@/components/Badge"

interface UserColumnProps {
  user: User
}

export function UserColumn({ user }: UserColumnProps) {
  // Generate initials from user name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="flex w-64 items-center p-3">
      {/* Avatar with initials */}
      <div className="mr-3 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
        {getInitials(user.name)}
      </div>

      <div>
        {/* User name */}
        <h3 className="truncate text-sm font-medium text-gray-900 dark:text-white">
          {user.name}
        </h3>

        {/* User roles */}
        <div className="mt-1 flex flex-wrap gap-1">
          {user.roles.map((role) => (
            <Badge key={role} variant="default" className="px-1.5 py-0 text-xs">
              {role}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
