"use client"

import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  ReactNode,
} from "react"

type NotificationType = "success" | "error" | "info" | "warning"

interface Notification {
  id: string
  message: string
  type: NotificationType
}

interface NotificationsContextType {
  notifications: Notification[]
  addNotification: (message: string, type: NotificationType) => void
  removeNotification: (id: string) => void
}

const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined)

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider",
    )
  }
  return context
}

interface NotificationsProviderProps {
  children: ReactNode
}

export function NotificationsProvider({
  children,
}: NotificationsProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = useCallback(
    (message: string, type: NotificationType) => {
      const id = Math.random().toString(36).substring(2, 9)
      setNotifications((prev) => [...prev, { id, message, type }])

      // Auto-remove after 3 seconds
      setTimeout(() => {
        removeNotification(id)
      }, 3000)
    },
    [],
  )

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    )
  }, [])

  const value = {
    notifications,
    addNotification,
    removeNotification,
  }

  return (
    <NotificationsContext.Provider value={value}>
      {children}
      <NotificationsList />
    </NotificationsContext.Provider>
  )
}

function NotificationsList() {
  const { notifications, removeNotification } = useNotifications()

  if (notifications.length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`animate-slide-in-right flex min-w-64 transform items-center gap-2 rounded-md p-4 text-white shadow-lg transition-all duration-200 ${
            notification.type === "success"
              ? "bg-green-600"
              : notification.type === "error"
                ? "bg-red-600"
                : notification.type === "warning"
                  ? "bg-amber-600"
                  : "bg-blue-600"
          }`}
        >
          <div className="flex-grow">{notification.message}</div>
          <button
            onClick={() => removeNotification(notification.id)}
            className="text-white/80 hover:text-white"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  )
}
