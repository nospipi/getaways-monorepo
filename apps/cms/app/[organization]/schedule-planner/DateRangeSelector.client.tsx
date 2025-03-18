"use client"

import { useState } from "react"
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCalendar2Line,
} from "@remixicon/react"
import {
  format,
  addDays,
  addWeeks,
  startOfWeek,
  endOfWeek,
  isSameDay,
} from "date-fns"

interface DateRangeSelectorProps {
  dates: string[]
  onDateRangeChange: (newDates: string[]) => void
}

export function DateRangeSelector({
  dates,
  onDateRangeChange,
}: DateRangeSelectorProps) {
  const [currentRange, setCurrentRange] = useState<{
    startDate: Date
    endDate: Date
  }>(() => {
    if (dates.length === 0) {
      const today = new Date()
      return {
        startDate: today,
        endDate: addDays(today, 13), // Default to 2 weeks
      }
    }

    return {
      startDate: new Date(dates[0]),
      endDate: new Date(dates[dates.length - 1]),
    }
  })

  // Format date range for display
  const formatDateRange = () => {
    if (isSameDay(currentRange.startDate, currentRange.endDate)) {
      return format(currentRange.startDate, "MMMM d, yyyy")
    }

    if (
      currentRange.startDate.getMonth() === currentRange.endDate.getMonth() &&
      currentRange.startDate.getFullYear() ===
        currentRange.endDate.getFullYear()
    ) {
      return `${format(currentRange.startDate, "MMMM d")} - ${format(currentRange.endDate, "d, yyyy")}`
    }

    if (
      currentRange.startDate.getFullYear() ===
      currentRange.endDate.getFullYear()
    ) {
      return `${format(currentRange.startDate, "MMMM d")} - ${format(currentRange.endDate, "MMMM d, yyyy")}`
    }

    return `${format(currentRange.startDate, "MMMM d, yyyy")} - ${format(currentRange.endDate, "MMMM d, yyyy")}`
  }

  // Navigate to previous period
  const goToPrevious = () => {
    const daysDiff = Math.round(
      (currentRange.endDate.getTime() - currentRange.startDate.getTime()) /
        (1000 * 60 * 60 * 24),
    )
    const newStartDate = addDays(currentRange.startDate, -daysDiff - 1)
    const newEndDate = addDays(currentRange.endDate, -daysDiff - 1)

    setCurrentRange({
      startDate: newStartDate,
      endDate: newEndDate,
    })

    // Generate new date range and notify parent
    const newDates = generateDateRange(newStartDate, newEndDate)
    onDateRangeChange(newDates)
  }

  // Navigate to next period
  const goToNext = () => {
    const daysDiff = Math.round(
      (currentRange.endDate.getTime() - currentRange.startDate.getTime()) /
        (1000 * 60 * 60 * 24),
    )
    const newStartDate = addDays(currentRange.startDate, daysDiff + 1)
    const newEndDate = addDays(currentRange.endDate, daysDiff + 1)

    setCurrentRange({
      startDate: newStartDate,
      endDate: newEndDate,
    })

    // Generate new date range and notify parent
    const newDates = generateDateRange(newStartDate, newEndDate)
    onDateRangeChange(newDates)
  }

  // Go to today
  const goToToday = () => {
    const today = new Date()
    const daysDiff = Math.round(
      (currentRange.endDate.getTime() - currentRange.startDate.getTime()) /
        (1000 * 60 * 60 * 24),
    )
    const newEndDate = addDays(today, daysDiff)

    setCurrentRange({
      startDate: today,
      endDate: newEndDate,
    })

    // Generate new date range and notify parent
    const newDates = generateDateRange(today, newEndDate)
    onDateRangeChange(newDates)
  }

  // Jump to next 2 weeks
  const goToNextTwoWeeks = () => {
    const newStartDate = addDays(currentRange.endDate, 1)
    const newEndDate = addDays(newStartDate, 13) // 14 days total

    setCurrentRange({
      startDate: newStartDate,
      endDate: newEndDate,
    })

    // Generate new date range and notify parent
    const newDates = generateDateRange(newStartDate, newEndDate)
    onDateRangeChange(newDates)
  }

  // Helper to generate an array of dates in YYYY-MM-DD format
  const generateDateRange = (start: Date, end: Date): string[] => {
    const result: string[] = []
    let currentDate = start

    while (currentDate <= end) {
      result.push(format(currentDate, "yyyy-MM-dd"))
      currentDate = addDays(currentDate, 1)
    }

    return result
  }

  return (
    <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-800">
      <button
        onClick={goToPrevious}
        className="rounded-md p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700"
        aria-label="Previous period"
      >
        <RiArrowLeftSLine className="size-5 text-gray-600 dark:text-gray-400" />
      </button>

      <div className="flex items-center gap-1.5 px-2">
        <RiCalendar2Line className="size-4 text-gray-500 dark:text-gray-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {formatDateRange()}
        </span>
      </div>

      <button
        onClick={goToNext}
        className="rounded-md p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700"
        aria-label="Next period"
      >
        <RiArrowRightSLine className="size-5 text-gray-600 dark:text-gray-400" />
      </button>

      <div className="ml-2 flex items-center gap-2 border-l border-gray-200 pl-2 dark:border-gray-700">
        <button
          onClick={goToToday}
          className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          Today
        </button>

        <button
          onClick={goToNextTwoWeeks}
          className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          Next 2 Weeks
        </button>
      </div>
    </div>
  )
}
