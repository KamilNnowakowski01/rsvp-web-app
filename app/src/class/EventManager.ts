interface User {
  User: string;
}

interface Event {
  ID: number;
  ID_Owner: User;
  ID_Website: string;
  Organizers: User[];
  Participants: User[];
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

class EventManager {
  private events: Event[] = [];
  private readonly STORAGE_KEY = "events";

  constructor() {
    // Load events from localStorage on initialization
    this.loadEvents();

    // Initialize with a sample event if no events exist
    if (this.events.length === 0) {
      this.addEvent({
        ID: 1,
        ID_Owner: { User: "john_doe" },
        ID_Website: "eventplatform.com",
        Organizers: [{ User: "jane_smith" }],
        Participants: [{ User: "alice_johnson" }],
        Name: "Tech Conference 2025",
        Description: "A gathering of tech enthusiasts to explore innovations.",
        LocationName: "Convention Center",
        City: "Berlin",
        StreetAddress: "Mitte Str. 10",
        ZipCode: "10115",
        Time: "14:00",
        Date: "2025-09-15",
        isGuestList: true,
        isPaid: true,
      });
    }
  }

  private loadEvents() {
    try {
      const storedEvents = localStorage.getItem(this.STORAGE_KEY);
      if (storedEvents) {
        const parsedEvents = JSON.parse(storedEvents);
        // Basic validation to ensure parsed data matches Event interface
        if (Array.isArray(parsedEvents)) {
          this.events = parsedEvents.filter((event: any) => this.isValidEvent(event));
        }
      }
    } catch (error) {
      console.error("Error loading events from localStorage:", error);
      this.events = [];
    }
  }

  private saveEvents() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.events));
    } catch (error) {
      console.error("Error saving events to localStorage:", error);
    }
  }

  private isValidEvent(event: any): event is Event {
    return (
      typeof event.ID === "number" &&
      typeof event.ID_Owner === "object" &&
      typeof event.ID_Owner.User === "string" &&
      typeof event.ID_Website === "string" &&
      Array.isArray(event.Organizers) &&
      event.Organizers.every((org: any) => typeof org.User === "string") &&
      Array.isArray(event.Participants) &&
      event.Participants.every((part: any) => typeof part.User === "string") &&
      typeof event.Name === "string" &&
      typeof event.Description === "string" &&
      typeof event.LocationName === "string" &&
      typeof event.City === "string" &&
      typeof event.StreetAddress === "string" &&
      typeof event.ZipCode === "string" &&
      typeof event.Time === "string" &&
      typeof event.Date === "string" &&
      typeof event.isGuestList === "boolean" &&
      typeof event.isPaid === "boolean"
    );
  }

  addEvent(event: Event) {
    this.events.push(event);
    this.saveEvents();
  }

  getEventById(id: number): Event | undefined {
    return this.events.find(event => event.ID === id);
  }

  updateEvent(updatedEvent: Event) {
    const index = this.events.findIndex(event => event.ID === updatedEvent.ID);
    if (index !== -1) {
      this.events[index] = updatedEvent;
      this.saveEvents();
    }
  }

  deleteEvent(id: number) {
    this.events = this.events.filter(event => event.ID !== id);
    this.saveEvents();
  }

  getAllEvents(): Event[] {
    return [...this.events];
  }
}

export default EventManager;