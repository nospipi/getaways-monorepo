"use client"

import { useState, useMemo } from "react"
import { User } from "./mockData"
import {
  RiFilterLine,
  RiSearch2Line,
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "@remixicon/react"

interface FilterBarProps {
  users: User[]
  onFilterChange: (filteredUsers: User[]) => void
}

export function FilterBar({ users, onFilterChange }: FilterBarProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set())
  const [showFilters, setShowFilters] = useState(false)

  // Extract unique roles from all users
  const availableRoles = useMemo(() => {
    const roles = new Set<string>()
    users.forEach((user) => {
      user.roles.forEach((role) => roles.add(role))
    })
    return Array.from(roles).sort()
  }, [users])

  // Apply filters
  const applyFilters = () => {
    let filteredUsers = [...users]

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(term),
      )
    }

    // Filter by selected roles (if any are selected)
    if (selectedRoles.size > 0) {
      filteredUsers = filteredUsers.filter((user) =>
        user.roles.some((role) => selectedRoles.has(role)),
      )
    }

    onFilterChange(filteredUsers)
  }

  // Toggle role selection
  const toggleRole = (role: string) => {
    const newSelectedRoles = new Set(selectedRoles)
    if (newSelectedRoles.has(role)) {
      newSelectedRoles.delete(role)
    } else {
      newSelectedRoles.add(role)
    }
    setSelectedRoles(newSelectedRoles)
  }

  // React to changes
  useMemo(() => {
    applyFilters()
  }, [searchTerm, selectedRoles])

  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center gap-3">
        {/* Search bar */}
        <div className="relative flex-grow">
          <RiSearch2Line className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search staff..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-indigo-400"
          />
        </div>

        {/* Filter toggle button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-1.5 rounded-md border px-3 py-2 transition-colors ${
            showFilters
              ? "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          <RiFilterLine className="size-4" />
          <span className="font-medium">Filter</span>
          {selectedRoles.size > 0 && (
            <span className="rounded-full bg-indigo-100 px-1.5 py-0.5 text-xs text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
              {selectedRoles.size}
            </span>
          )}
        </button>
      </div>

      {/* Filter options */}
      {showFilters && (
        <div className="mt-3 border-t border-gray-200 pt-3 dark:border-gray-700">
          <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Filter by role:
          </h3>
          <div className="flex flex-wrap gap-2">
            {availableRoles.map((role) => (
              <button
                key={role}
                onClick={() => toggleRole(role)}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                  selectedRoles.has(role)
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {selectedRoles.has(role) ? (
                  <RiCheckboxCircleFill className="size-4" />
                ) : (
                  <RiCheckboxBlankCircleLine className="size-4" />
                )}
                {role}
              </button>
            ))}

            {selectedRoles.size > 0 && (
              <button
                onClick={() => setSelectedRoles(new Set())}
                className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
