"use client"

import { useEffect, useRef, useState } from "react"
import { ScheduleItem, User } from "./mockData"
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { cx } from "@/lib/utils"
import { isRoleData } from "./constants"
import {
  RiCalendarLine,
  RiCloseLine,
  RiMore2Line,
  RiHotelBedLine,
  RiTimeLine,
  RiInformationLine,
} from "@remixicon/react"
import { Tooltip } from "./Tooltip.client"

interface ScheduleCellProps {
  scheduleItem: ScheduleItem
  user: User
  instanceId: symbol
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

export function ScheduleCell({
  scheduleItem,
  user,
  instanceId,
  onAssignRole,
  onRemoveAssignment,
  onToggleDayOff,
  onToggleLeave,
  isDraggingRole = false,
}: ScheduleCellProps) {
  const cellRef = useRef<HTMLDivElement>(null)
  const [isDropTarget, setIsDropTarget] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    const element = cellRef.current
    if (!element) return

    // Skip setting up drop target if it's a day off or leave
    if (scheduleItem.isDayOff || scheduleItem.isLeave) {
      return
    }

    // Set up drop target
    const cleanup = dropTargetForElements({
      element,
      canDrop({ source }) {
        // Always validate data first
        if (!source.data || typeof source.data !== "object") {
          return false
        }

        // Validate data is role data
        const isValidRoleData = isRoleData(source.data)
        if (!isValidRoleData) {
          return false
        }

        // Check if user has the required role
        const roleRequired = source.data.role as any
        const hasRequiredRole = user.roles.includes(roleRequired)

        return hasRequiredRole
      },
      getData: () => ({
        userId: user.id,
        date: scheduleItem.date,
        instanceId,
      }),
      onDragEnter() {
        setIsDropTarget(true)
      },
      onDragLeave() {
        setIsDropTarget(false)
      },
      onDrop({ source }) {
        setIsDropTarget(false)

        // Validate source data
        if (!isRoleData(source.data)) {
          console.error("Invalid source data in onDrop")
          return
        }

        // Get role information
        const { tourGroupId, role } = source.data as any

        // Debug
        console.log("Dropped:", {
          tourGroupId,
          role,
          userId: user.id,
          date: scheduleItem.date,
        })

        // Assign the role to this user for this date
        onAssignRole(user.id, scheduleItem.date, tourGroupId, role)
      },
    })

    return cleanup
  }, [user, scheduleItem, instanceId, onAssignRole])

  // Determine cell background based on status
  const getCellBackground = () => {
    if (scheduleItem.isDayOff) {
      return "bg-gray-100 dark:bg-gray-800"
    }
    if (scheduleItem.isLeave) {
      return "bg-blue-50 dark:bg-blue-900/20"
    }
    if (isDropTarget) {
      return "bg-indigo-50 dark:bg-indigo-900/20"
    }
    return "bg-white dark:bg-gray-950"
  }

  // Determine cell border based on drop target status
  const getCellBorder = () => {
    if (isDropTarget) {
      return "border-2 border-indigo-400 dark:border-indigo-500"
    }

    // Check if user has roles that can be dragged (for highlighting eligible cells)
    const hasValidRoles = user.roles.length > 0
    const canDropHere = !scheduleItem.isDayOff && !scheduleItem.isLeave

    if (isDraggingRole && hasValidRoles && canDropHere) {
      return "border-2 border-dashed border-indigo-300 dark:border-indigo-700"
    }

    if (hasValidRoles && canDropHere) {
      return "border border-dashed border-gray-300 dark:border-gray-600"
    }

    return "border border-gray-200 dark:border-gray-700"
  }

  return (
    <div
      ref={cellRef}
      className={cx(
        "group relative min-h-28 min-w-36 p-2 transition-all duration-200",
        getCellBackground(),
        getCellBorder(),
      )}
    >
      {/* Context Menu Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="absolute right-1 top-1 rounded-full p-1 opacity-0 transition-opacity hover:bg-gray-200 group-hover:opacity-100 dark:hover:bg-gray-700"
      >
        <RiMore2Line className="size-4 text-gray-500 dark:text-gray-400" />
      </button>

      {/* Context Menu */}
      {showMenu && (
        <div className="absolute right-1 top-7 z-50 overflow-hidden rounded-md border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="py-1">
            <button
              onClick={() => {
                if (onToggleDayOff) onToggleDayOff(user.id, scheduleItem.date)
                setShowMenu(false)
              }}
              className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              disabled={!onToggleDayOff}
            >
              <RiCalendarLine className="mr-2 size-4" />
              {scheduleItem.isDayOff ? "Remove Day Off" : "Set Day Off"}
            </button>

            <button
              onClick={() => {
                if (onToggleLeave) onToggleLeave(user.id, scheduleItem.date)
                setShowMenu(false)
              }}
              className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              disabled={!onToggleLeave}
            >
              <RiHotelBedLine className="mr-2 size-4" />
              {scheduleItem.isLeave ? "Remove Leave" : "Set Leave"}
            </button>
          </div>
        </div>
      )}

      {/* Click overlay to close menu when clicked outside */}
      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}

      {/* Day off indicator */}
      {scheduleItem.isDayOff && (
        <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-400">
          <div className="text-center">
            <RiCalendarLine className="mx-auto size-5" />
            <p className="mt-1 text-xs font-medium">Day Off</p>
          </div>
        </div>
      )}

      {/* Leave indicator */}
      {scheduleItem.isLeave && (
        <div className="flex h-full items-center justify-center text-blue-500 dark:text-blue-400">
          <div className="text-center">
            <RiHotelBedLine className="mx-auto size-5" />
            <p className="mt-1 text-xs font-medium">Leave</p>
          </div>
        </div>
      )}

      {/* Assigned tour groups */}
      {!scheduleItem.isDayOff && !scheduleItem.isLeave && (
        <div className="space-y-2">
          {scheduleItem.tourGroups.map((tourGroup, index) => (
            <Tooltip
              key={`${tourGroup.tourGroupId}-${tourGroup.role}-${index}`}
              content={
                <div>
                  <div className="mb-1 font-medium">{tourGroup.role}</div>
                  <div className="text-xs text-gray-300">
                    Tour ID: {tourGroup.tourGroupId}
                  </div>
                  <div className="text-xs text-gray-300">
                    Assignment for: {user.name}
                  </div>
                </div>
              }
            >
              <div
                key={`${tourGroup.tourGroupId}-${tourGroup.role}-${index}`}
                className="group relative rounded-md bg-indigo-100 p-2 text-xs text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
              >
                <div className="line-clamp-1 font-medium">{tourGroup.role}</div>
                <div className="truncate text-[10px] opacity-80">
                  {tourGroup.tourGroupId.split("-")[0]}{" "}
                  {/* Display tour name part */}
                </div>

                {/* Remove button */}
                <button
                  onClick={() =>
                    onRemoveAssignment(
                      user.id,
                      scheduleItem.date,
                      tourGroup.tourGroupId,
                      tourGroup.role,
                    )
                  }
                  className="absolute -right-1 -top-1 rounded-full border border-gray-200 bg-white p-0.5 text-gray-600 opacity-0 shadow-sm transition-opacity hover:text-red-500 group-hover:opacity-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-red-400"
                >
                  <RiCloseLine className="size-3" />
                </button>
              </div>
            </Tooltip>
          ))}

          {/* Drop target indicator */}
          {isDropTarget && scheduleItem.tourGroups.length === 0 && (
            <div className="rounded-md border-2 border-dashed border-indigo-300 p-3 text-center text-xs text-indigo-700 dark:border-indigo-700 dark:text-indigo-400">
              Drop to assign role
            </div>
          )}
        </div>
      )}
    </div>
  )
}
