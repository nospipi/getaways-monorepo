// app/[organization]/schedule-planner/page.tsx
import { SchedulePlanner } from "./SchedulePlanner.client"
import { generateMockData } from "./mockData"
import { NotificationsProvider } from "./NotificationsContext.client"
import { HelpTooltip } from "./HelpTooltip.client"

export default function SchedulePlannerPage() {
  // Generate mock data - in a real application, this would be fetched from an API
  const { users, dates, scheduleData, availableTours } = generateMockData()

  return (
    <div className="h-screen overflow-hidden">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Schedule Planner
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Assign tour roles to users by dragging and dropping.
            </p>
          </div>

          <div className="flex items-center">
            <span className="mr-2 hidden text-sm text-gray-500 md:inline-block dark:text-gray-400">
              Need help?
            </span>
            <HelpTooltip />
          </div>
        </div>

        <NotificationsProvider>
          <SchedulePlanner
            users={users}
            dates={dates}
            scheduleData={scheduleData}
            availableTours={availableTours}
          />
        </NotificationsProvider>
      </div>
    </div>
  )
}
