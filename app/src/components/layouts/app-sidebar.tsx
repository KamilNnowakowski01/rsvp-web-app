import * as React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Users,
  Settings,
  Mail,
  CreditCard,
  Ticket,
  LifeBuoy,
} from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { EventSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { eventManager } from "@/pages/EventCreator";

const availableLogos = [GalleryVerticalEnd, AudioWaveform, Command];

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  mainProjects: (eventId?: string) => [
    {
      name: "Events",
      url: "/management/event",
      icon: Bot,
    },
    {
      name: "Dashboard",
      url: eventId ? `/management/event/${eventId}/dashboard` : "#",
      icon: SquareTerminal,
    },
    {
      name: "User List",
      url: eventId ? `/management/event/${eventId}/userlist` : "#",
      icon: Users,
    },
    {
      name: "Websites",
      url: eventId ? `/management/event/${eventId}/websites` : "#",
      icon: Frame,
    },
    {
      name: "Emails",
      url: eventId ? `/management/event/${eventId}/emails` : "#",
      icon: Mail,
    },
    {
      name: "Payments",
      url: eventId ? `/management/event/${eventId}/payments` : "#",
      icon: CreditCard,
    },
    {
      name: "Tickets",
      url: eventId ? `/management/event/${eventId}/tickets` : "#",
      icon: Ticket,
    },
  ],
  bottomProjects: (eventId?: string) => [
    {
      name: "Helper",
      url: eventId ? `/management/event/${eventId}/helper` : "#",
      icon: LifeBuoy,
    },
    {
      name: "Settings",
      url: eventId ? `/management/event/${eventId}/settings` : "#",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { idEvent } = useParams<{ idEvent?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [events, setEvents] = React.useState<{
    id: number;
    name: string;
    logo: React.ElementType;
    plan: string;
  }[]>([]);
  const [activeEvent, setActiveEvent] = React.useState<{
    id: number;
    name: string;
    logo: React.ElementType;
    plan: string;
  } | null>(null);

  React.useEffect(() => {
    const fetchedEvents = eventManager.getAllEvents()?.map((event, index) => ({
      id: event.ID,
      name: event.Name,
      logo: availableLogos[index % availableLogos.length],
      plan: `${event.isPaid ? "Paid" : "Free"} ${event.isGuestList ? "Restricted" : "Open"} Event`,
    })) || [];
    setEvents(fetchedEvents);
  }, []);

  React.useEffect(() => {
    if (events.length > 0) {
      const foundEvent = idEvent ? events.find(e => e.id === Number(idEvent)) : events[0];
      setActiveEvent(foundEvent || events[0]);
    }
  }, [idEvent, events]);

  const handleSelectEvent = React.useCallback((selectedEvent: {
    id: number;
    name: string;
    logo: React.ElementType;
    plan: string;
  }) => {
    setActiveEvent(selectedEvent);
    const base = "/management/event/";
    const newPath = location.pathname.includes(base)
      ? location.pathname.replace(/\/management\/event\/\d+/, `${base}${selectedEvent.id}`)
      : `${base}${selectedEvent.id}`;
    navigate(newPath);
  }, [location.pathname, navigate]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <EventSwitcher events={events} currentEvent={activeEvent} onSelectEvent={handleSelectEvent} />
      </SidebarHeader>
      <SidebarContent className="flex flex-col h-full">
        <NavProjects projects={data.mainProjects(idEvent)} />
        <div className="mt-auto">
          <NavProjects projects={data.bottomProjects(idEvent)} />
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}