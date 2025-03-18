import { title } from "process"

const dates = [
  "2025-04-01",
  "2025-04-02",
  "2025-04-03",
  "2025-04-04",
  "2025-04-05",
  "2025-04-06",
  "2025-04-07",
  "2025-04-08",
  "2025-04-09",
  "2025-04-10",
]

const staff = [
  {
    id: "some_id_8v7vgwe49857yvt45897y",
    name: "John Doe",
    roles: ["Tour Leader", "Driver"],
  },
  {
    id: "some_id_8v7vgwe49857yvt45897y",
    name: "Jane Doe",
    roles: ["Tour Leader"],
  },
  {
    id: "some_id_8v7vgweghjkghjkghkjghjk",
    name: "Mary Jane",
    roles: ["Driver"],
  },
  {
    id: "some_id_8v7vgwe49857yvt45897y",
    name: "John Smith",
    roles: ["Tour Leader"],
  },
  {
    id: "some_id_8v7vgwe49857yvt45897y",
    name: "Jane Smith",
    roles: ["Driver"],
  },
  {
    id: "some_id_8v7vgweghjkghjkghkjghjk",
    name: "Mary Smith",
    roles: ["Tour Leader"],
  },
  {
    id: "some_id_8v7vgwe49857yvt45897y",
    name: "John Johnson",
    roles: ["Driver"],
  },
]

const availableTours = [
  {
    date: "2025-04-01",
    id: "some_id_8v7vgwe49857yvt45897y",
    title: "Athens Sightseeing",
    option: "Small Group",
    start_time: "09:00",
    roles: ["Tour Leader", "Driver"],
  },
  {
    date: "2025-04-02",
    id: "some_id_8v7vgwe49857yvt45897y",
    title: "Acropolis Tour",
    option: "Private",
    start_time: "10:00",
    roles: ["Driver"],
  },
  {
    date: "2025-04-03",
    id: "some_id_8v7vgwe49857yvt45897y",
    title: "Museum Tour",
    option: "Small Group",
    start_time: "11:00",
    roles: ["Tour Leader"],
  },
  {
    date: "2025-04-04",
    id: "some_id_8v7vgwe49857yvt45897y",
    title: "Athens Sightseeing",
    option: "Private",
    start_time: "12:00",
    roles: ["Tour Leader", "Driver"],
  },
  {
    date: "2025-04-05",
    id: "some_id_8v7vgwe49857yvt45897y",
    title: "Acropolis Tour",
    option: "Small Group",
    start_time: "13:00",
    roles: ["Tour Leader"],
  },
]

export { dates, staff, availableTours }
