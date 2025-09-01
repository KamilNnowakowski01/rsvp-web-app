import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IconPlus } from "@tabler/icons-react";
import { ticketManager } from "@/class/TicketManager";
import { TicketsDataTable } from "@/components/ui/data-table-tickets";

interface TableData {
  id: number;
  userId: string;
  type: "standard" | "vip" | "earlybird";
  price: number;
  status: "active" | "used" | "cancelled";
  purchaseDate: string;
}

export default function TicketsView() {
  const { idEvent } = useParams<{ idEvent: string }>();
  const [data, setData] = useState<TableData[]>([]);
  const [newTicket, setNewTicket] = useState({
    userId: "",
    type: "standard" as "standard" | "vip" | "earlybird",
    price: 0,
    status: "active" as "active" | "used" | "cancelled",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = () => {
    const tickets = ticketManager.getTicketsByEventId(Number(idEvent));
    const mappedData = tickets.map((ticket) => ({
      id: ticket.ID,
      userId: ticket.UserID,
      type: ticket.Type,
      price: ticket.Price,
      status: ticket.Status,
      purchaseDate: ticket.PurchaseDate,
    }));
    setData(mappedData);
  };

  useEffect(() => {
    if (!idEvent || isNaN(Number(idEvent))) {
      setError("Invalid event ID.");
      return;
    }
    fetchTickets();
  }, [idEvent]);

  const handleAddTicket = () => {
    if (!newTicket.userId.trim()) {
      setError("User ID is required.");
      return;
    }
    if (newTicket.price <= 0) {
      setError("Price must be greater than 0.");
      return;
    }
    const newTicketData = {
      ID: ticketManager.getAllTickets().length + 1,
      EventID: Number(idEvent),
      UserID: newTicket.userId.trim(),
      Type: newTicket.type,
      Price: newTicket.price,
      Status: newTicket.status,
      PurchaseDate: new Date().toISOString().split("T")[0],
    };
    ticketManager.addTicket(newTicketData);
    setNewTicket({ userId: "", type: "standard", price: 0, status: "active" });
    setIsDialogOpen(false);
    setError(null);
    fetchTickets();
  };

  return (
    <div className="space-y-4 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tickets for Event {idEvent}</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="px-4 py-2" onClick={fetchTickets}>
            Refresh
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="px-4 py-2">
                <IconPlus className="mr-2 h-4 w-4" />
                Add Ticket
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Ticket</DialogTitle>
                <DialogDescription>
                  Enter the details of the new ticket for event {idEvent}.
                </DialogDescription>
              </DialogHeader>
              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userId" className="text-sm font-medium">
                    User ID
                  </Label>
                  <Input
                    id="userId"
                    value={newTicket.userId}
                    onChange={(e) => setNewTicket({ ...newTicket, userId: e.target.value })}
                    placeholder="Enter user ID (e.g., alice_johnson)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-sm font-medium">
                    Ticket Type
                  </Label>
                  <Select
                    value={newTicket.type}
                    onValueChange={(value: "standard" | "vip" | "earlybird") =>
                      setNewTicket({ ...newTicket, type: value })
                    }
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select ticket type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="vip">VIP</SelectItem>
                      <SelectItem value="earlybird">Early Bird</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-medium">
                    Price
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={newTicket.price}
                    onChange={(e) => setNewTicket({ ...newTicket, price: Number(e.target.value) })}
                    placeholder="Enter price (e.g., 50)"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm font-medium">
                    Status
                  </Label>
                  <Select
                    value={newTicket.status}
                    onValueChange={(value: "active" | "used" | "cancelled") =>
                      setNewTicket({ ...newTicket, status: value })
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="used">Used</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddTicket}>Submit</Button>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <TicketsDataTable data={data} />
    </div>
  );
}