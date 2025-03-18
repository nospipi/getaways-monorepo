"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { ScheduleTable } from "./ScheduleTable.client"
import { ToursPanel } from "./ToursPanel.client"
import { GlobalDragMonitor } from "./DragMonitor.client"
import { ScheduleStats } from "./ScheduleStats.client"
import { FilterBar } from "./FilterBar.client"
import { DateRangeSelector } from "./DateRangeSelector.client"
import { User, ScheduleItem, AvailableTour } from "./mockData"
import { cx } from "@/lib/utils"
import { useNotifications } from "./NotificationsContext.client"
import { Badge } from "@/components/Badge"
import { RiCalendarLine, RiInformationLine } from "@remixicon/react"

interface SchedulePlannerProps {
  users: User[]
  dates: string[]
  scheduleData: ScheduleItem[]
  availableTours: AvailableTour[]
}

export function SchedulePlanner({
  users,
  dates: initialDates,
  scheduleData: initialScheduleData,
  availableTours: initialAvailableTours,
}: SchedulePlannerProps) {
  const [scheduleData, setScheduleData] =
    useState<ScheduleItem[]>(initialScheduleData)
  const [isDraggingRole, setIsDraggingRole] = useState(false)
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users)
  const [dates, setDates] = useState<string[]>(initialDates)
  const [availableTours, setAvailableTours] = useState<AvailableTour[]>(
    initialAvailableTours,
  )
  const { addNotification } = useNotifications()

  // Create a ref for the container to sync scrolling
  const containerRef = useRef<HTMLDivElement>(null)

  // Calculate the total number of roles needed across all tours
  const totalRolesNeeded = useMemo(() => {
    return availableTours.reduce((total, availableTour) => {
      const tourGroupsRolesCount = availableTour.tourGroups.reduce(
        (tourTotal, tourGroup) => {
          const rolesCount = tourGroup.requiredRoles.reduce(
            (roleTotal, role) => {
              return roleTotal + role.count
            },
            0,
          )
          return tourTotal + rolesCount
        },
        0,
      )
      return total + tourGroupsRolesCount
    }, 0)
  }, [availableTours])

  // Handle date range changes
  const handleDateRangeChange = (newDates: string[]) => {
    setDates(newDates)

    // In a real app, we would fetch new data for the selected date range
    // For this demo, we'll simulate by filtering the existing data
    const newScheduleData = initialScheduleData.filter((item) =>
      newDates.includes(item.date),
    )

    // If date doesn't exist in the initial data, create empty schedule items
    const existingDates = new Set(newScheduleData.map((item) => item.date))

    const additionalScheduleData = []
    for (const date of newDates) {
      if (!existingDates.has(date)) {
        // Create empty schedule items for each user for this date
        for (const user of users) {
          additionalScheduleData.push({
            _id: `generated-${user.id}-${date}`,
            user: user.id,
            date,
            tourGroups: [],
            isDayOff: false,
            isLeave: false,
            comments: [],
          })
        }
      }
    }

    setScheduleData([...newScheduleData, ...additionalScheduleData])

    // Similarly, filter available tours
    const newAvailableTours = initialAvailableTours.filter((tour) =>
      newDates.includes(tour.date),
    )

    // Add empty tours for dates that don't exist
    const existingTourDates = new Set(
      newAvailableTours.map((tour) => tour.date),
    )

    const additionalTours = []
    for (const date of newDates) {
      if (!existingTourDates.has(date)) {
        additionalTours.push({
          date,
          tourGroups: [],
        })
      }
    }

    setAvailableTours([...newAvailableTours, ...additionalTours])

    addNotification(`Updated schedule to ${newDates.length} days`, "info")
  }

  // Handle role assignment
  const handleRoleAssignment = (
    userId: string,
    date: string,
    tourGroupId: string,
    role: string,
  ) => {
    // Find the existing schedule item
    const scheduleItemIndex = scheduleData.findIndex(
      (item) => item.user === userId && item.date === date,
    )

    if (scheduleItemIndex === -1) return

    // Create a copy of the schedule data
    const newScheduleData = [...scheduleData]
    const scheduleItem = { ...newScheduleData[scheduleItemIndex] }

    // Update the tour groups
    if (
      !scheduleItem.tourGroups.some(
        (tg) => tg.tourGroupId === tourGroupId && tg.role === role,
      )
    ) {
      scheduleItem.tourGroups = [
        ...scheduleItem.tourGroups,
        { tourGroupId, role },
      ]
    }

    // Update the schedule data
    newScheduleData[scheduleItemIndex] = scheduleItem
    setScheduleData(newScheduleData)

    // Find user name
    const userName = users.find((u) => u.id === userId)?.name || "Unknown"

    // Show notification
    addNotification(
      `Assigned ${role} to ${userName} on ${formatDate(date)}`,
      "success",
    )

    console.log(`Assigned ${role} on ${tourGroupId} to ${userId} on ${date}`)
  }

  // Handle removing a role assignment
  const handleRemoveAssignment = (
    userId: string,
    date: string,
    tourGroupId: string,
    role: string,
  ) => {
    // Find the existing schedule item
    const scheduleItemIndex = scheduleData.findIndex(
      (item) => item.user === userId && item.date === date,
    )

    if (scheduleItemIndex === -1) return

    // Create a copy of the schedule data
    const newScheduleData = [...scheduleData]
    const scheduleItem = { ...newScheduleData[scheduleItemIndex] }

    // Remove the tour group
    scheduleItem.tourGroups = scheduleItem.tourGroups.filter(
      (tg) => !(tg.tourGroupId === tourGroupId && tg.role === role),
    )

    // Update the schedule data
    newScheduleData[scheduleItemIndex] = scheduleItem
    setScheduleData(newScheduleData)

    // Find user name
    const userName = users.find((u) => u.id === userId)?.name || "Unknown"

    // Show notification
    addNotification(
      `Removed ${role} from ${userName} on ${formatDate(date)}`,
      "info",
    )

    console.log(`Removed ${role} on ${tourGroupId} from ${userId} on ${date}`)
  }

  // Format date for display in notifications
  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
      }
      return new Date(dateString).toLocaleDateString(undefined, options)
    } catch (error) {
      return dateString
    }
  }

  // Handle toggling day off status
  const handleToggleDayOff = (userId: string, date: string) => {
    // Find the existing schedule item
    const scheduleItemIndex = scheduleData.findIndex(
      (item) => item.user === userId && item.date === date,
    )

    if (scheduleItemIndex === -1) return

    // Create a copy of the schedule data
    const newScheduleData = [...scheduleData]
    const scheduleItem = { ...newScheduleData[scheduleItemIndex] }

    // Toggle day off status
    scheduleItem.isDayOff = !scheduleItem.isDayOff

    // If setting to day off, also clear any tour groups and leave status
    if (scheduleItem.isDayOff) {
      scheduleItem.tourGroups = []
      scheduleItem.isLeave = false
    }

    // Update the schedule data
    newScheduleData[scheduleItemIndex] = scheduleItem
    setScheduleData(newScheduleData)

    // Find user name
    const userName = users.find((u) => u.id === userId)?.name || "Unknown"

    // Show notification
    if (scheduleItem.isDayOff) {
      addNotification(
        `Set day off for ${userName} on ${formatDate(date)}`,
        "info",
      )
    } else {
      addNotification(
        `Removed day off for ${userName} on ${formatDate(date)}`,
        "info",
      )
    }
  }

  // Handle toggling leave status
  const handleToggleLeave = (userId: string, date: string) => {
    // Find the existing schedule item
    const scheduleItemIndex = scheduleData.findIndex(
      (item) => item.user === userId && item.date === date,
    )

    if (scheduleItemIndex === -1) return

    // Create a copy of the schedule data
    const newScheduleData = [...scheduleData]
    const scheduleItem = { ...newScheduleData[scheduleItemIndex] }

    // Toggle leave status
    scheduleItem.isLeave = !scheduleItem.isLeave

    // If setting to leave, also clear any tour groups and day off status
    if (scheduleItem.isLeave) {
      scheduleItem.tourGroups = []
      scheduleItem.isDayOff = false
    }

    // Update the schedule data
    newScheduleData[scheduleItemIndex] = scheduleItem
    setScheduleData(newScheduleData)

    // Find user name
    const userName = users.find((u) => u.id === userId)?.name || "Unknown"

    // Show notification
    if (scheduleItem.isLeave) {
      addNotification(
        `Set leave for ${userName} on ${formatDate(date)}`,
        "info",
      )
    } else {
      addNotification(
        `Removed leave for ${userName} on ${formatDate(date)}`,
        "info",
      )
    }
  }

  // Function to handle horizontal scroll synchronization
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const target = e.target as HTMLDivElement
      containerRef.current.scrollLeft = target.scrollLeft
    }
  }

  return (
    <div className="space-y-4">
      {/* Date Range Selector */}
      <div className="flex items-center justify-between">
        <DateRangeSelector
          dates={dates}
          onDateRangeChange={handleDateRangeChange}
        />

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredUsers.length} of {users.length} staff shown
          </span>
        </div>
      </div>

      {/* Stats Component */}
      <ScheduleStats
        scheduleData={scheduleData}
        totalRolesNeeded={totalRolesNeeded}
      />

      {/* Filter Bar */}
      <FilterBar users={users} onFilterChange={setFilteredUsers} />

      <div
        className={cx(
          "flex h-[calc(100vh-400px)] flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700",
          isDraggingRole && "dragging-active",
        )}
      >
        {/* Global drag monitor */}
        <GlobalDragMonitor
          onDragStart={() => setIsDraggingRole(true)}
          onDragEnd={() => setIsDraggingRole(false)}
        />

        {/* Schedule Table */}
        <div className="flex-grow overflow-auto" onScroll={handleScroll}>
          <ScheduleTable
            users={filteredUsers}
            dates={dates}
            scheduleData={scheduleData}
            onAssignRole={handleRoleAssignment}
            onRemoveAssignment={handleRemoveAssignment}
            onToggleDayOff={handleToggleDayOff}
            onToggleLeave={handleToggleLeave}
            isDraggingRole={isDraggingRole}
          />
        </div>

        {/* Tours Panel - Fixed at the bottom with sticky positioning */}
        <div className="sticky bottom-0 left-0 right-0 h-48 border-t border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-950">
          <div ref={containerRef} className="h-full overflow-x-auto">
            <ToursPanel dates={dates} availableTours={availableTours} />
          </div>
        </div>
      </div>
    </div>
  )
}
