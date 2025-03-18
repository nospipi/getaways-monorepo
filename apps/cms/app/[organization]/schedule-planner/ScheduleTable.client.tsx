"use client"

import { useEffect, useState } from "react"
import { UserColumn } from "./UserColumn.client"
import { ScheduleCell } from "./ScheduleCell.client"
import { User, ScheduleItem } from "./mockData"
import { format, parseISO } from "date-fns"
import * as liveRegion from "@atlaskit/pragmatic-drag-and-drop-live-region"
import { ROLE_KEY, isRoleData } from "./constants"

interface ScheduleTableProps {
  users: User[]
  dates: string[]
  scheduleData: ScheduleItem[]
  onAssignRole: (
    userId: string,
    date: string,
    tourGroupId: string,
    role: string,
  ) => void
  onRemoveAssignment: (
    userId: string,
    date: string,
    tourGroupId: string,
    role: string,
  ) => void
  onToggleDayOff?: (userId: string, date: string) => void
  onToggleLeave?: (userId: string, date: string) => void
  isDraggingRole?: boolean
}

// Type definition for role data during drag and drop
export type RoleData = {
  [ROLE_KEY]: true
  tourGroupId: string
  role: string
  instanceId: symbol
}

export function ScheduleTable({
  users,
  dates,
  scheduleData,
  onAssignRole,
  onRemoveAssignment,
  onToggleDayOff,
  onToggleLeave,
  isDraggingRole = false,
}: ScheduleTableProps) {
  // Create a unique instance ID for this schedule table
  const [instanceId] = useState(() => Symbol("schedule-table-id"))

  // Cleanup live region when component unmounts
  useEffect(() => {
    return () => {
      liveRegion.cleanup()
    }
  }, [])

  // Format date for display
  const formatDateForDisplay = (dateString: string) => {
    try {
      const date = parseISO(dateString)
      return format(date, "EEE, MMM d")
    } catch (error) {
      return dateString
    }
  }

  return (
    <div className="relative min-w-max">
      <table className="table-fixed border-collapse">
        <thead>
          <tr>
            {/* Empty cell for the top-left corner */}
            <th className="sticky left-0 top-0 z-20 w-64 border-b border-r border-gray-300 bg-gray-200 p-4 text-left text-sm font-semibold text-gray-700 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
              Staff / Dates
            </th>

            {/* Date headers */}
            {dates.map((date) => (
              <th
                key={date}
                className="sticky top-0 z-10 w-36 border-b border-r border-gray-200 bg-gray-100 p-4 text-center text-sm font-semibold text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
              >
                {formatDateForDisplay(date)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {/* User column - sticky on the left */}
              <td className="sticky left-0 z-10 w-64 border-b border-r border-gray-300 bg-gray-50 shadow-sm dark:border-gray-600 dark:bg-gray-900">
                <UserColumn user={user} />
              </td>

              {/* Schedule cells for each date */}
              {dates.map((date) => {
                const scheduleItem = scheduleData.find(
                  (item) => item.user === user.id && item.date === date,
                ) || {
                  _id: `default-${user.id}-${date}`,
                  user: user.id,
                  date,
                  tourGroups: [],
                  isDayOff: false,
                  isLeave: false,
                  comments: [],
                }

                return (
                  <td
                    key={`${user.id}-${date}`}
                    className="w-36 border-b border-r border-gray-200 p-0 dark:border-gray-700"
                  >
                    <ScheduleCell
                      scheduleItem={scheduleItem}
                      user={user}
                      instanceId={instanceId}
                      onAssignRole={onAssignRole}
                      onRemoveAssignment={onRemoveAssignment}
                      onToggleDayOff={onToggleDayOff}
                      onToggleLeave={onToggleLeave}
                      isDraggingRole={isDraggingRole}
                    />
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
