interface Ticket {
  ID: number;
  EventID: number;
  UserID: string;
  Type: "standard" | "vip" | "earlybird";
  Price: number;
  Status: "active" | "used" | "cancelled";
  PurchaseDate: string;
}

class TicketManager {
  private tickets: Ticket[] = [];
  private readonly STORAGE_KEY = "tickets";

  constructor() {
    this.loadTickets();

    if (this.tickets.length === 0) {
      this.addTicket({
        ID: 1,
        EventID: 1,
        UserID: "alice_johnson",
        Type: "standard",
        Price: 50.0,
        Status: "active",
        PurchaseDate: new Date().toISOString().split("T")[0],
      });
    }
  }

  private loadTickets() {
    try {
      const storedTickets = localStorage.getItem(this.STORAGE_KEY);
      if (storedTickets) {
        const parsedTickets = JSON.parse(storedTickets);
        if (Array.isArray(parsedTickets)) {
          this.tickets = parsedTickets.filter((ticket: any) => this.isValidTicket(ticket));
        }
      }
    } catch (error) {
      console.error("Error loading tickets from localStorage:", error);
      this.tickets = [];
    }
  }

  private saveTickets() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tickets));
    } catch (error) {
      console.error("Error saving tickets to localStorage:", error);
    }
  }

  private isValidTicket(ticket: any): ticket is Ticket {
    return (
      typeof ticket.ID === "number" &&
      typeof ticket.EventID === "number" &&
      typeof ticket.UserID === "string" &&
      ["standard", "vip", "earlybird"].includes(ticket.Type) &&
      typeof ticket.Price === "number" &&
      ["active", "used", "cancelled"].includes(ticket.Status) &&
      typeof ticket.PurchaseDate === "string"
    );
  }

  addTicket(ticket: Ticket) {
    this.tickets.push(ticket);
    this.saveTickets();
  }

  getTicketById(id: number): Ticket | undefined {
    return this.tickets.find((ticket) => ticket.ID === id);
  }

  getTicketsByEventId(eventId: number): Ticket[] {
    return this.tickets.filter((ticket) => ticket.EventID === eventId);
  }

  updateTicket(updatedTicket: Ticket) {
    const index = this.tickets.findIndex((ticket) => ticket.ID === updatedTicket.ID);
    if (index !== -1) {
      this.tickets[index] = updatedTicket;
      this.saveTickets();
    }
  }

  deleteTicket(id: number) {
    this.tickets = this.tickets.filter((ticket) => ticket.ID !== id);
    this.saveTickets();
  }

  getAllTickets(): Ticket[] {
    return [...this.tickets];
  }
}

export const ticketManager = new TicketManager();
export default TicketManager;