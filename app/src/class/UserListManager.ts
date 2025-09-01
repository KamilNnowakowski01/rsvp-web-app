import { Participant, Organizer } from "@/class/User";
import { eventManager } from "@/pages/EventCreator"; // Assuming eventManager is exported here

interface EventUserLists {
  eventId: number;
  participants: Participant[];
  organizers: Organizer[];
}

class UserListManager {
  private eventUserLists: EventUserLists[] = [];
  private readonly STORAGE_KEY = "eventUserLists";

  constructor() {
    this.loadEventUserLists();

    if (this.eventUserLists.length === 0) {
      this.eventUserLists.push({
        eventId: 1,
        participants: [new Participant("Alice", "Johnson", "alice@example.com", "attendee", "+123456789", "confirmed")],
        organizers: [new Organizer("jane_smith", "jane@example.com", ["manage_event", "invite_users"])],
      });
      this.saveEventUserLists();
    }
  }

  private loadEventUserLists() {
    try {
      const storedLists = localStorage.getItem(this.STORAGE_KEY);
      if (storedLists) {
        const parsedLists = JSON.parse(storedLists);
        if (Array.isArray(parsedLists)) {
          this.eventUserLists = parsedLists
            .filter((list: any) => this.isValidEventUserList(list))
            .map((list: any) => ({
              eventId: list.eventId,
              participants: list.participants.map((user: any) =>
                new Participant(
                  user.FirstName,
                  user.LastName,
                  user.Email || "",
                  user.Role || "attendee",
                  user.PhoneNumber || "",
                  user.Status || "pending"
                )
              ),
              organizers: list.organizers.map((user: any) =>
                new Organizer(user.User, user.Email || "", user.Permissions || ["manage_event"])
              ),
            }));
        }
      }
    } catch (error) {
      console.error("Error loading event user lists from localStorage:", error);
      this.eventUserLists = [];
    }
  }

  private saveEventUserLists() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.eventUserLists));
    } catch (error) {
      console.error("Error saving event user lists to localStorage:", error);
    }
  }

  private isValidEventUserList(list: any): boolean {
    return (
      typeof list.eventId === "number" &&
      Array.isArray(list.participants) &&
      Array.isArray(list.organizers)
    );
  }

  addParticipant(eventId: number, user: Participant) {
    const eventList = this.eventUserLists.find(list => list.eventId === eventId);
    const username = user.User; // Uses updated userName from Participant
    if (eventList) {
      if (!eventList.participants.some(p => p.FirstName === user.FirstName && p.LastName === user.LastName)) {
        eventList.participants.push(user);
        this.saveEventUserLists();
      }
    } else {
      this.eventUserLists.push({
        eventId,
        participants: [user],
        organizers: [],
      });
      this.saveEventUserLists();
    }

    // Sync with EventManager
    const event = eventManager.getEventById(eventId);
    if (event && !event.Participants.some(p => p.User === username)) {
      event.Participants.push({ User: username });
      eventManager.updateEvent(event);
    }
  }

  addOrganizer(eventId: number, user: Organizer) {
    const eventList = this.eventUserLists.find(list => list.eventId === eventId);
    if (eventList) {
      if (!eventList.organizers.some(o => o.User === user.User)) {
        eventList.organizers.push(user);
        this.saveEventUserLists();
      }
    } else {
      this.eventUserLists.push({
        eventId,
        participants: [],
        organizers: [user],
      });
      this.saveEventUserLists();
    }
  }

  removeParticipant(eventId: number, firstName: string, lastName: string) {
    const eventList = this.eventUserLists.find(list => list.eventId === eventId);
    if (eventList) {
      eventList.participants = eventList.participants.filter(p => !(p.FirstName === firstName && p.LastName === lastName));
      this.saveEventUserLists();
    }

    // Sync with EventManager
    const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`;
    const event = eventManager.getEventById(eventId);
    if (event) {
      event.Participants = event.Participants.filter(p => p.User !== username);
      eventManager.updateEvent(event);
    }
  }

  removeOrganizer(eventId: number, userName: string) {
    const eventList = this.eventUserLists.find(list => list.eventId === eventId);
    if (eventList) {
      eventList.organizers = eventList.organizers.filter(o => o.User !== userName);
      this.saveEventUserLists();
    }
  }

  getParticipants(eventId: number): Participant[] {
    const eventList = this.eventUserLists.find(list => list.eventId === eventId);
    return eventList ? [...eventList.participants] : [];
  }

  getOrganizers(eventId: number): Organizer[] {
    const eventList = this.eventUserLists.find(list => list.eventId === eventId);
    return eventList ? [...eventList.organizers] : [];
  }

  getEventUserLists(eventId: number): EventUserLists | undefined {
    return this.eventUserLists.find(list => list.eventId === eventId);
  }

  getAllEventUserLists(): EventUserLists[] {
    return [...this.eventUserLists];
  }
}

export const userListManager = new UserListManager();
export default UserListManager;