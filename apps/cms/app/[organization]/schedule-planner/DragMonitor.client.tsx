"use client"

import { useEffect } from "react"
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { isRoleData } from "./constants"

interface GlobalDragMonitorProps {
  onDragStart: () => void
  onDragEnd: () => void
}

export function GlobalDragMonitor({
  onDragStart,
  onDragEnd,
}: GlobalDragMonitorProps) {
  useEffect(() => {
    // Set up the monitor
    const cleanup = monitorForElements({
      canMonitor: ({ source }) => {
        // Only monitor role data
        return isRoleData(source.data)
      },
      onDragStart: () => {
        onDragStart()
      },
      onDrop: () => {
        onDragEnd()
      },
    })

    return cleanup
  }, [onDragStart, onDragEnd])

  // This component doesn't render anything
  return null
}
