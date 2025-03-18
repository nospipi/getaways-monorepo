import { addDays, format } from "date-fns"

export interface User {
  id: string
  name: string
  roles: string[]
}

export interface ScheduleItem {
  _id: string
  user: string
  date: string
  tourGroups: AssignedTourGroup[]
  isDayOff: boolean
  isLeave: boolean
  comments: string[]
}

export interface AssignedTourGroup {
  tourGroupId: string
  role: string
}

export interface TourGroup {
  id: string
  title: string
  option: string
  requiredRoles: {
    role: string
    count: number
  }[]
}

export interface AvailableTour {
  date: string
  tourGroups: TourGroup[]
}

export interface MockData {
  users: User[]
  dates: string[]
  scheduleData: ScheduleItem[]
  availableTours: AvailableTour[]
}

export function generateMockData(): MockData {
  // Generate 10 dates starting from today
  const startDate = new Date()
  const dates = Array.from({ length: 14 }, (_, i) =>
    format(addDays(startDate, i), "yyyy-MM-dd"),
  )

  // Create sample users
  const users: User[] = [
    { id: "user1", name: "John Smith", roles: ["Tour Leader", "Driver"] },
    { id: "user2", name: "Emma Johnson", roles: ["Tour Leader"] },
    { id: "user3", name: "Michael Brown", roles: ["Driver", "Guide"] },
    { id: "user4", name: "Sophia Williams", roles: ["Guide", "Interpreter"] },
    { id: "user5", name: "James Davis", roles: ["Driver"] },
    {
      id: "user6",
      name: "Olivia Miller",
      roles: ["Tour Leader", "Interpreter"],
    },
    { id: "user7", name: "William Wilson", roles: ["Guide"] },
    {
      id: "user8",
      name: "Ava Moore",
      roles: ["Tour Leader", "Driver", "Guide"],
    },
  ]

  // Create sample tour groups
  const tourGroupTemplates: TourGroup[] = [
    {
      id: "tour1",
      title: "Athens Sightseeing",
      option: "Small Group Tour",
      requiredRoles: [
        { role: "Tour Leader", count: 1 },
        { role: "Driver", count: 1 },
      ],
    },
    {
      id: "tour2",
      title: "Acropolis Explorer",
      option: "Private Tour",
      requiredRoles: [
        { role: "Guide", count: 1 },
        { role: "Driver", count: 1 },
      ],
    },
    {
      id: "tour3",
      title: "Delphi Day Trip",
      option: "Full Day Tour",
      requiredRoles: [
        { role: "Tour Leader", count: 1 },
        { role: "Driver", count: 1 },
        { role: "Guide", count: 1 },
      ],
    },
    {
      id: "tour4",
      title: "Greek Island Hopping",
      option: "Premium Experience",
      requiredRoles: [
        { role: "Tour Leader", count: 1 },
        { role: "Guide", count: 2 },
        { role: "Interpreter", count: 1 },
      ],
    },
  ]

  // Create available tours for each date
  const availableTours: AvailableTour[] = dates.map((date) => {
    // Randomly select 1-3 tour groups for each date
    const numberOfTours = Math.floor(Math.random() * 3) + 1
    const tourGroups = [...tourGroupTemplates]
      .sort(() => Math.random() - 0.5)
      .slice(0, numberOfTours)
      .map((tour) => ({
        ...tour,
        id: `${tour.id}-${date}`, // Make unique ID for each date
      }))

    return {
      date,
      tourGroups,
    }
  })

  // Create schedule data
  const scheduleData: ScheduleItem[] = []

  // For each user, create schedule entries for each date
  users.forEach((user) => {
    dates.forEach((date) => {
      // Random decision for day off and leave
      const isDayOff = Math.random() < 0.1
      const isLeave = !isDayOff && Math.random() < 0.05

      // 20% chance of having an assigned tour
      const hasAssignedTour = !isDayOff && !isLeave && Math.random() < 0.2

      // Find available tours for this date
      const toursForDate =
        availableTours.find((t) => t.date === date)?.tourGroups || []

      // Create assigned tour groups if applicable
      const tourGroups: AssignedTourGroup[] = []

      if (hasAssignedTour && toursForDate.length > 0) {
        // Randomly select a tour
        const randomTour =
          toursForDate[Math.floor(Math.random() * toursForDate.length)]

        // Find a role that the user can perform
        const possibleRoles = randomTour.requiredRoles
          .filter((required) => user.roles.includes(required.role))
          .map((r) => r.role)

        if (possibleRoles.length > 0) {
          const assignedRole =
            possibleRoles[Math.floor(Math.random() * possibleRoles.length)]
          tourGroups.push({
            tourGroupId: randomTour.id,
            role: assignedRole,
          })
        }
      }

      scheduleData.push({
        _id: `schedule-${user.id}-${date}`,
        user: user.id,
        date,
        tourGroups,
        isDayOff,
        isLeave,
        comments: [],
      })
    })
  })

  return { users, dates, scheduleData, availableTours }
}
