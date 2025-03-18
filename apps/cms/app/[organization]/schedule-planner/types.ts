// app/[organization]/schedule-planner/types.ts

// User information
export interface User {
  id: string
  name: string
  roles: string[]
}

// Schedule information
export interface ScheduleItem {
  _id: string
  user: string
  date: string
  tourGroups: AssignedTourGroup[]
  isDayOff: boolean
  isLeave: boolean
  comments: string[]
}

// Assigned tour group in a schedule
export interface AssignedTourGroup {
  tourGroupId: string
  role: string
}

// Tour group information
export interface TourGroup {
  id: string
  title: string
  option: string
  requiredRoles: {
    role: string
    count: number
  }[]
}

// Available tour for a specific date
export interface AvailableTour {
  date: string
  tourGroups: TourGroup[]
}
