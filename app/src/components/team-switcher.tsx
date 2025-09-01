import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"
import { useNavigate, Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function EventSwitcher({
  events,
  currentEvent,
  onSelectEvent,
}: {
  events: {
    id: number
    name: string
    logo: React.ElementType
    plan: string
  }[]
  currentEvent: {
    id: number
    name: string
    logo: React.ElementType
    plan: string
  } | null
  onSelectEvent: (event: {
    id: number
    name: string
    logo: React.ElementType
    plan: string
  }) => void
}) {
  const { isMobile } = useSidebar()
  const navigate = useNavigate();

  if (!currentEvent) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <currentEvent.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{currentEvent.name}</span>
                <span className="truncate text-xs">{currentEvent.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuItem asChild>
              <Link to="/management/event" className="flex items-center gap-2 p-2">
                <div className="text-muted-foreground font-medium">Events</div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {events.map((event, index) => (
              <DropdownMenuItem
                key={event.name}
                onClick={() => onSelectEvent(event)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <event.logo className="size-3.5 shrink-0" />
                </div>
                {event.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2" onClick={() => navigate('/creator')}>
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add event</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}