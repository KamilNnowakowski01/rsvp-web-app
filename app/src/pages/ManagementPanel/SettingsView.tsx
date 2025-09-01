import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { eventManager } from "@/pages/EventCreator"; // Import the shared eventManager instance

interface Event {
  ID: number;
  ID_Owner: { User: string };
  ID_Website: string;
  Organizers: { User: string }[];
  Participants: { User: string }[];
  Name: string;
  Description: string;
  LocationName: string;
  City: string;
  StreetAddress: string;
  ZipCode: string;
  Time: string;
  Date: string;
  isGuestList: boolean;
  isPaid: boolean;
}

const SettingsView: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Fetch all events from EventManager
    const fetchedEvents = eventManager.getAllEvents();
    setEvents(fetchedEvents);

    console.log("Fetched Events:", fetchedEvents); // Debug log
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <div className="grid gap-6">
          {events.map((event) => (
            <Card key={event.ID}>
              <CardHeader>
                <CardTitle>{event.Name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Description:</strong> {event.Description}</p>
                <p><strong>Location:</strong> {event.LocationName}, {event.City}, {event.StreetAddress}, {event.ZipCode}</p>
                <p><strong>Date:</strong> {event.Date}</p>
                <p><strong>Time:</strong> {event.Time}</p>
                <p><strong>Restricted Guest List:</strong> {event.isGuestList ? "Yes" : "No"}</p>
                <p><strong>Paid Event:</strong> {event.isPaid ? "Yes" : "No"}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SettingsView;