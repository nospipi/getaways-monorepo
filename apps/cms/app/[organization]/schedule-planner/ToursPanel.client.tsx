"use client"

import { AvailableTour } from "./mockData"
import { format, parseISO } from "date-fns"
import { TourCard } from "./TourCard.client"

interface ToursPanelProps {
  dates: string[]
  availableTours: AvailableTour[]
}

export function ToursPanel({ dates, availableTours }: ToursPanelProps) {
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
    <div className="relative h-full min-w-max">
      <div className="sticky left-0 z-10 flex h-full w-64 items-center border-r border-gray-300 bg-gray-200 p-4 shadow-sm dark:border-gray-600 dark:bg-gray-800">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Available Tours
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Drag roles to assign staff
          </p>
        </div>
      </div>

      <div className="absolute left-64 top-0 h-full">
        <div className="flex h-full">
          {dates.map((date) => {
            const toursForDate = availableTours.find((t) => t.date === date)

            return (
              <div
                key={date}
                className="h-full w-36 border-r border-gray-200 dark:border-gray-700"
              >
                {toursForDate && toursForDate.tourGroups.length > 0 ? (
                  <div className="h-full overflow-y-auto p-2">
                    {toursForDate.tourGroups.map((tourGroup) => (
                      <TourCard key={tourGroup.id} tourGroup={tourGroup} />
                    ))}
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center p-2">
                    <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                      No tours available
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
