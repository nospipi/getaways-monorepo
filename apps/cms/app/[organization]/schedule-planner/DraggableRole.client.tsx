"use client"

import { useEffect, useRef, useState } from "react"
import { ROLE_KEY } from "./constants"
import { cx } from "@/lib/utils"
import { RiDraggable } from "@remixicon/react"
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview"
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview"

interface DraggableRoleProps {
  tourGroupId: string
  role: string
  count: number
  instanceId: symbol
}

// Helper function to get role data
function getRoleData({
  tourGroupId,
  role,
  instanceId,
}: {
  tourGroupId: string
  role: string
  instanceId: symbol
}) {
  return {
    [ROLE_KEY]: true,
    tourGroupId,
    role,
    instanceId,
  }
}

type DraggableState =
  | { type: "idle" }
  | { type: "preview"; container: HTMLElement }
  | { type: "dragging" }

// Idle and dragging state constants
const idleState: DraggableState = { type: "idle" }
const draggingState: DraggableState = { type: "dragging" }

export function DraggableRole({
  tourGroupId,
  role,
  count,
  instanceId,
}: DraggableRoleProps) {
  const roleRef = useRef<HTMLDivElement>(null)
  const dragHandleRef = useRef<HTMLDivElement>(null)
  const [draggableState, setDraggableState] =
    useState<DraggableState>(idleState)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragged, setIsDragged] = useState(false)

  // Color scheme based on role
  const getRoleColor = (role: string) => {
    switch (role) {
      case "Tour Leader":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "Driver":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "Guide":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      case "Interpreter":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  // Set up draggable behavior
  useEffect(() => {
    const element = roleRef.current
    const dragHandle = dragHandleRef.current

    if (!element || !dragHandle) return

    const data = getRoleData({ tourGroupId, role, instanceId })

    const cleanup = draggable({
      element: dragHandle,
      getInitialData: () => data,
      onGenerateDragPreview({ nativeSetDragImage }) {
        setCustomNativeDragPreview({
          nativeSetDragImage,
          getOffset: pointerOutsideOfPreview({
            x: "10px",
            y: "10px",
          }),
          render({ container }) {
            // Create a visually appealing drag preview
            const previewElement = document.createElement("div")
            previewElement.className = cx(
              "flex items-center gap-2 rounded-md border p-2 shadow-lg",
              getRoleColor(role),
              "border-gray-200 dark:border-gray-700",
            )

            // Add role text
            const text = document.createElement("span")
            text.textContent = role
            text.className = "font-medium text-sm"

            previewElement.appendChild(text)
            container.appendChild(previewElement)

            setDraggableState({ type: "preview", container })
            return () => setDraggableState(draggingState)
          },
        })
      },
      onDragStart() {
        setDraggableState(draggingState)
        setIsDragged(true)
        // Make it visually disappear when dragged
        if (element) {
          element.style.opacity = "0.2"
        }
      },
      onDrop() {
        setDraggableState(idleState)
        // If dropped in a valid target, keep it invisible
        // Otherwise, make it visible again after a delay
        setTimeout(() => {
          if (element) {
            element.style.opacity = "1"
          }
          setIsDragged(false)
        }, 300)
      },
    })

    return cleanup
  }, [tourGroupId, role, instanceId])

  return (
    <div
      ref={roleRef}
      className={cx(
        "flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs transition-all duration-200",
        getRoleColor(role),
        isHovered && "scale-105 opacity-90",
        draggableState.type === "dragging" && "opacity-60",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={dragHandleRef}
        className={cx(
          "cursor-grab rounded p-0.5 transition-colors duration-150 active:cursor-grabbing",
          isHovered && "bg-black/5 dark:bg-white/10",
        )}
      >
        <RiDraggable className="size-3.5" />
      </div>

      <div className="flex-grow">
        <span className="font-medium">{role}</span>
        {count > 1 && (
          <span className="ml-1 text-[10px] opacity-80">x{count}</span>
        )}
      </div>
    </div>
  )
}
