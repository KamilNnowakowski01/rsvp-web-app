import { useEffect, useState } from "react";
import { EventDataTable } from "@/components/ui/event-data-table";
import { eventManager } from "@/pages/EventCreator";
import { Button } from "@/components/ui/button";

interface TableData {
  id: number;
  name: string; // Nazwa wydarzenia (Event.Name)
  type: string; // Typ (isPaid, isGuestList)
  dateTime: string; // Czas i data (Date, Time)
  location: string; // Lokalizacja (LocationName, City, StreetAddress, ZipCode)
  status: string; // Status (Upcoming, Today, Past)
}

export default function EventsView() {
  const [data, setData] = useState<TableData[]>([]);

  const fetchEvents = () => {
    const events = eventManager.getAllEvents();
    console.log("Fetched events:", events);

    const mappedData = events.map((event) => {
      const eventDate = new Date(event.Date);
      const currentDate = new Date(); // Bieżąca data: 30 sierpnia 2025

      let status = "Upcoming";
      if (eventDate < currentDate) {
        status = "Past";
      } else if (
        eventDate.getFullYear() === currentDate.getFullYear() &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getDate() === currentDate.getDate()
      ) {
        status = "Today";
      }

      return {
        id: event.ID,
        name: event.Name,
        type: `${event.isPaid ? "Paid" : "Free"} ${event.isGuestList ? "Restricted" : "Open"} Event`,
        dateTime: `${event.Date} ${event.Time}`,
        location: `${event.LocationName}, ${event.City}, ${event.StreetAddress}, ${event.ZipCode}`,
        status: status,
      };
    });

    console.log("Mapped data for EventDataTable:", mappedData);
    setData(mappedData);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="space-y-4 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Events</h2>
        <Button
          variant="outline"
          className="px-4 py-2"
          onClick={fetchEvents}
        >
          Refresh Data
        </Button>
      </div>
      <EventDataTable data={data} />
    </div>
  );
}