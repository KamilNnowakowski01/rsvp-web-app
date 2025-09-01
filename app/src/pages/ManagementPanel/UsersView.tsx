import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UsersDataTable } from "@/components/ui/data-table-users";
import { userListManager } from "@/class/UserListManager";
import { Participant } from "@/class/User";
import { IconPlus } from "@tabler/icons-react";

export default function UsersView() {
  const { idEvent } = useParams<{ idEvent: string }>();
  const [data, setData] = useState<Participant[]>([]);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "attendee" as "attendee" | "speaker" | "volunteer",
    phoneNumber: "",
    status: "pending" as "confirmed" | "pending" | "cancelled",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchParticipants = () => {
    const participants = userListManager.getParticipants(Number(idEvent));
    console.log("Fetched participants for event", idEvent, ":", participants);
    setData(participants);
  };

  useEffect(() => {
    fetchParticipants();
  }, [idEvent]);

  const handleAddUser = () => {
    if (newUser.firstName.trim() && newUser.lastName.trim()) {
      userListManager.addParticipant(
        Number(idEvent),
        new Participant(
          newUser.firstName.trim(),
          newUser.lastName.trim(),
          newUser.email,
          newUser.role,
          newUser.phoneNumber,
          newUser.status
        )
      );
      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        role: "attendee",
        phoneNumber: "",
        status: "pending",
      });
      setIsDialogOpen(false);
      fetchParticipants();
      console.log(
        `Added participant ${newUser.firstName} ${newUser.lastName} to event ${idEvent}`
      );
    }
  };

  return (
    <div className="space-y-4 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Participants for Event {idEvent}</h2>
        <div className="flex space-x-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default" className="px-4 py-2">
                <IconPlus className="mr-2 h-4 w-4" />
                Add Participant
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Participant</DialogTitle>
                <DialogDescription>
                  Enter participant details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    placeholder="Enter email (e.g., john@example.com)"
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={newUser.firstName}
                    onChange={(e) =>
                      setNewUser({ ...newUser, firstName: e.target.value })
                    }
                    placeholder="Enter first name (e.g., John)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={newUser.lastName}
                    onChange={(e) =>
                      setNewUser({ ...newUser, lastName: e.target.value })
                    }
                    placeholder="Enter last name (e.g., Doe)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    value={newUser.phoneNumber}
                    onChange={(e) =>
                      setNewUser({ ...newUser, phoneNumber: e.target.value })
                    }
                    placeholder="Enter phone number (e.g., +1234567890)"
                    type="tel"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium">
                    Role
                  </Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(
                      value: "attendee" | "speaker" | "volunteer"
                    ) => setNewUser({ ...newUser, role: value })}
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="attendee">Attendee</SelectItem>
                      <SelectItem value="speaker">Speaker</SelectItem>
                      <SelectItem value="volunteer">Volunteer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm font-medium">
                    Status
                  </Label>
                  <Select
                    value={newUser.status}
                    onValueChange={(
                      value: "confirmed" | "pending" | "cancelled"
                    ) => setNewUser({ ...newUser, status: value })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddUser}>Submit</Button>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <UsersDataTable data={data} />
    </div>
  );
}
