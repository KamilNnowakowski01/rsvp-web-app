import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { userListManager } from "@/class/UserListManager";
import { Participant } from "@/class/User";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  role: "attendee" | "speaker" | "volunteer";
  phoneNumber: string;
  status: "confirmed" | "pending" | "cancelled";
}

export default function UserEditView() {
  const { idEvent, username } = useParams<{ idEvent: string; username: string }>();
  const [formData, setFormData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    role: "attendee",
    phoneNumber: "",
    status: "pending",
  });
  const [initialFormData, setInitialFormData] = useState<UserData>(formData);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const participants = userListManager.getParticipants(Number(idEvent));
    const user = participants.find(
      (participant) => `${participant.FirstName}${participant.LastName}` === username
    );
    if (user) {
      const userData: UserData = {
        firstName: user.FirstName,
        lastName: user.LastName,
        email: user.Email || "",
        role: ["attendee", "speaker", "volunteer"].includes(user.Role)
          ? (user.Role as "attendee" | "speaker" | "volunteer")
          : "attendee",
        phoneNumber: user.PhoneNumber || "",
        status: user.Status as "confirmed" | "pending" | "cancelled",
      };
      setFormData(userData);
      setInitialFormData(userData);
    }
  }, [idEvent, username]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedUser = new Participant(
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.role,
      formData.phoneNumber,
      formData.status
    );
    userListManager.removeParticipant(Number(idEvent), initialFormData.firstName, initialFormData.lastName);
    userListManager.addParticipant(Number(idEvent), updatedUser);
    setInitialFormData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="p-6 mx-auto max-w-7xl">
      <h2 className="text-2xl font-bold mb-6">Edit User: {username}</h2>
      <div className="grid gap-6">
        {/* Editor Section */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Edit User Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Separator className="my-4" />
            {(["firstName", "lastName", "email", "phoneNumber"] as (keyof UserData)[]).map((field) => (
              <div key={field} className="space-y-2">
                <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                <Input
                  id={field}
                  name={field}
                  type={field === "email" ? "email" : field === "phoneNumber" ? "tel" : "text"}
                  value={formData[field]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field}`}
                  disabled={!isEditing}
                  required={field !== "phoneNumber"}
                />
              </div>
            ))}
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value: "attendee" | "speaker" | "volunteer") =>
                  setFormData((prev) => ({ ...prev, role: value }))
                }
                disabled={!isEditing}
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
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "confirmed" | "pending" | "cancelled") =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
                disabled={!isEditing}
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
            <div className="flex justify-end space-x-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>Save</Button>
                </>
              ) : (
                <Button onClick={handleEditToggle}>Edit</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}