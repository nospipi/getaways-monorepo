"use client"

import { useState, useRef, useEffect, ReactNode } from "react"
import { createPortal } from "react-dom"

interface TooltipProps {
  children: ReactNode
  content: ReactNode
  position?: "top" | "right" | "bottom" | "left"
  delay?: number
}

export function Tooltip({
  children,
  content,
  position = "top",
  delay = 300,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Calculate position
  const updateTooltipPosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()

    let top = 0
    let left = 0

    switch (position) {
      case "top":
        top = triggerRect.top - tooltipRect.height - 8
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
        break
      case "right":
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
        left = triggerRect.right + 8
        break
      case "bottom":
        top = triggerRect.bottom + 8
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
        break
      case "left":
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
        left = triggerRect.left - tooltipRect.width - 8
        break
      default:
        break
    }

    // Prevent tooltip from going off screen
    if (left < 10) left = 10
    if (left + tooltipRect.width > window.innerWidth - 10) {
      left = window.innerWidth - tooltipRect.width - 10
    }
    if (top < 10) top = 10
    if (top + tooltipRect.height > window.innerHeight - 10) {
      top = window.innerHeight - tooltipRect.height - 10
    }

    setTooltipPosition({ top, left })
  }

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
      // Update position after tooltip is visible to get correct dimensions
      setTimeout(updateTooltipPosition, 0)
    }, delay)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }

  // Update position on scroll or resize
  useEffect(() => {
    if (!isVisible) return

    const handleScrollOrResize = () => {
      updateTooltipPosition()
    }

    window.addEventListener("scroll", handleScrollOrResize, true)
    window.addEventListener("resize", handleScrollOrResize)

    return () => {
      window.removeEventListener("scroll", handleScrollOrResize, true)
      window.removeEventListener("resize", handleScrollOrResize)
    }
  }, [isVisible])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>

      {isVisible &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={tooltipRef}
            className="pointer-events-none fixed z-50 max-w-xs rounded-md bg-gray-900 px-3 py-2 text-sm text-white shadow-lg transition-opacity duration-200 dark:bg-gray-700"
            style={{
              top: tooltipPosition.top,
              left: tooltipPosition.left,
              opacity: isVisible ? 1 : 0,
            }}
          >
            {content}

            {/* Arrow */}
            <div
              className={`absolute h-2 w-2 rotate-45 bg-gray-900 dark:bg-gray-700 ${
                position === "top"
                  ? "bottom-[-4px] left-1/2 -translate-x-1/2"
                  : position === "right"
                    ? "left-[-4px] top-1/2 -translate-y-1/2"
                    : position === "bottom"
                      ? "left-1/2 top-[-4px] -translate-x-1/2"
                      : "right-[-4px] top-1/2 -translate-y-1/2"
              }`}
            />
          </div>,
          document.body,
        )}
    </>
  )
}
