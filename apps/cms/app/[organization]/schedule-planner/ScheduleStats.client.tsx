"use client"

import { ScheduleItem } from "./mockData"
import {
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiTimeLine,
} from "@remixicon/react"

interface StatsProps {
  scheduleData: ScheduleItem[]
  totalRolesNeeded: number
}

export function ScheduleStats({ scheduleData, totalRolesNeeded }: StatsProps) {
  // Calculate stats
  const totalAssignments = scheduleData.reduce(
    (total, item) => total + item.tourGroups.length,
    0,
  )

  const totalDaysOff = scheduleData.filter((item) => item.isDayOff).length
  const totalLeave = scheduleData.filter((item) => item.isLeave).length

  const completionPercentage =
    Math.round((totalAssignments / totalRolesNeeded) * 100) || 0

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-wrap gap-4">
        <div className="min-w-36 flex-1">
          <div className="flex items-center gap-2">
            <div
              className={`rounded-full p-1 ${completionPercentage >= 90 ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"}`}
            >
              {completionPercentage >= 90 ? (
                <RiCheckboxCircleLine className="size-4" />
              ) : (
                <RiErrorWarningLine className="size-4" />
              )}
            </div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Staffing
            </h3>
          </div>

          <div className="mt-2">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {completionPercentage}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {totalAssignments} of {totalRolesNeeded} roles assigned
            </div>
          </div>

          <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className={`h-2 rounded-full ${
                completionPercentage >= 90
                  ? "bg-green-500 dark:bg-green-600"
                  : completionPercentage >= 50
                    ? "bg-amber-500 dark:bg-amber-600"
                    : "bg-red-500 dark:bg-red-600"
              }`}
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Time off stats */}
        <div className="min-w-28 flex-1">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-blue-100 p-1 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <RiTimeLine className="size-4" />
            </div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Time Off
            </h3>
          </div>

          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Days Off
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {totalDaysOff}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Leave
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {totalLeave}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
