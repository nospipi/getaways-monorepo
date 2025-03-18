"use client"

import { useState } from "react"
import { RiQuestionLine, RiCloseLine } from "@remixicon/react"

export function HelpTooltip() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        <RiQuestionLine className="size-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-medium text-gray-900 dark:text-white">
              How to use
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <RiCloseLine className="size-5" />
            </button>
          </div>

          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                1.
              </span>{" "}
              Drag roles from the bottom panel and drop them onto staff members.
            </p>
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                2.
              </span>{" "}
              Use the filter bar to find specific staff members.
            </p>
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                3.
              </span>{" "}
              Click the menu (⋮) in any cell to set days off or leave.
            </p>
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                4.
              </span>{" "}
              Hover over assigned roles for more details.
            </p>
          </div>

          <div className="mt-3 border-t border-gray-200 pt-2 dark:border-gray-700">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span>&gt;90% Staffed</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
              <div className="h-3 w-3 rounded-full bg-amber-500"></div>
              <span>50-90% Staffed</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span>&lt;50% Staffed</span>
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  )
}
