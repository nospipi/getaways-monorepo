import { siteConfig } from "@/app/siteConfig"
import { RiCalendarTodoLine, RiFileListLine } from "@remixicon/react"
import { NavItem } from "./NavItem.client"
import MobileSidebar from "./MobileSidebar"
import {
  OrganizationsDropdownDesktop,
  OrganizationsDropdownMobile,
} from "./SidebarWorkspacesDropdown"
import { UserProfileDesktop, UserProfileMobile } from "./UserProfile"

const navigation = [
  {
    name: "Day Planner",
    href: siteConfig.baseLinks.dayPlanner,
    icon: RiCalendarTodoLine,
    iconName: "RiCalendarTodoLine",
  },
  {
    name: "Schedule Planner",
    href: siteConfig.baseLinks.schedulePlanner,
    icon: RiFileListLine,
    iconName: "RiFileListLine",
  },
] as const

//---------------------------------------------------------------------------

const Sidebar = async () => {
  return (
    <>
      {/* sidebar (lg+) */}
      <nav className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <aside className="flex grow flex-col gap-y-6 overflow-y-auto border-r border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
          {/* <OrganizationsSelector /> */}
          <OrganizationsDropdownDesktop />
          <nav
            aria-label="core navigation links"
            className="flex flex-1 flex-col space-y-10"
          >
            <ul role="list" className="space-y-0.5">
              {navigation.map((item) => (
                <NavItem
                  key={item.name}
                  name={item.name}
                  href={item.href}
                  iconName={item.iconName}
                />
              ))}
            </ul>
          </nav>
          <div className="mt-auto">
            <UserProfileDesktop />
          </div>
        </aside>
      </nav>
      {/* top navbar (xs-lg) */}
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-2 shadow-sm sm:gap-x-6 sm:px-4 lg:hidden dark:border-gray-800 dark:bg-gray-950">
        <OrganizationsDropdownMobile />
        <div className="flex items-center gap-1 sm:gap-2">
          <UserProfileMobile />
          <MobileSidebar />
        </div>
      </div>
    </>
  )
}

export default Sidebar
