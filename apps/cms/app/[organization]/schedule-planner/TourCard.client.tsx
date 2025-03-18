"use client"

import { useState } from "react"
import { TourGroup } from "./mockData"
import { DraggableRole } from "./DraggableRole.client"
import { Badge } from "@/components/Badge"
import { RiMapPinLine } from "@remixicon/react"

interface TourCardProps {
  tourGroup: TourGroup
}

export function TourCard({ tourGroup }: TourCardProps) {
  // Create a unique instance ID for this tour card
  const [instanceId] = useState(() => Symbol("tour-card-id"))

  return (
    <div className="mb-3 overflow-hidden rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      {/* Tour header */}
      <div className="border-b border-gray-100 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-700/50">
        <h3 className="truncate text-sm font-medium text-gray-900 dark:text-white">
          {tourGroup.title}
        </h3>
        <div className="mt-1 flex items-center">
          <Badge variant="default" className="px-1.5 py-0 text-xs">
            {tourGroup.option}
          </Badge>
        </div>
      </div>

      {/* Required roles */}
      <div className="space-y-1.5 p-2">
        <div className="mb-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
          <RiMapPinLine className="mr-1 size-3" />
          Required Roles:
        </div>

        {tourGroup.requiredRoles.map((requiredRole, index) => (
          <DraggableRole
            key={`${tourGroup.id}-${requiredRole.role}-${index}`}
            tourGroupId={tourGroup.id}
            role={requiredRole.role}
            count={requiredRole.count}
            instanceId={instanceId}
          />
        ))}
      </div>
    </div>
  )
}
