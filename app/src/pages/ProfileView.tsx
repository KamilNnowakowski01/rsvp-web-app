import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Mail, MapPin, Calendar, Key, Trash2, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { userAuthService } from "@/class/UserAuthService";
import { User } from "@/class/User";

interface ProfileData {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  location?: string;
}

const ProfileHeader = ({ profile }: { profile: ProfileData }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://bundui-images.netlify.app/avatars/08.png" alt="Profile" />
            <AvatarFallback className="text-2xl">
              {profile.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Button
            size="icon"
            variant="outline"
            className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full"
            aria-label="Change profile picture"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <h1 className="text-2xl font-bold">{profile.username}</h1>
            <Badge variant="secondary">Member</Badge>
          </div>
          <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {profile.email}
            </div>
            {profile.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Joined {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </div>
          </div>
        </div>
        <Button variant="default" onClick={() => { /* Implement edit profile */ }}>
          Edit Profile
        </Button>
      </div>
    </CardContent>
  </Card>
);

const ProfileContent = ({
  profile,
  isEditing,
  setIsEditing,
  formData,
  setFormData,
  handleSave,
}: {
  profile: ProfileData;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  formData: ProfileData;
  setFormData: (data: ProfileData) => void;
  handleSave: () => void;
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Tabs defaultValue="personal" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </CardContent>
          <CardContent className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel" : "Edit"}
            </Button>
            {isEditing && <Button onClick={handleSave}>Save</Button>}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="account" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Account Status</Label>
                <p className="text-muted-foreground text-sm">Your account is currently active</p>
              </div>
              <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                Active
              </Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Account Visibility</Label>
                <p className="text-muted-foreground text-sm">
                  Make your profile visible to other users
                </p>
              </div>
              <Switch
                defaultChecked
                onCheckedChange={(checked) => console.log("Visibility toggled:", checked)}
              />
            </div>
          </CardContent>
        </Card>
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>Irreversible and destructive actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Delete Account</Label>
                <p className="text-muted-foreground text-sm">
                  Permanently delete your account and all data
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={() => {
                  userAuthService.logout();
                  // Implement actual account deletion logic with userAuthService
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage your account security.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Password</Label>
                <p className="text-muted-foreground text-sm">Last changed recently</p>
              </div>
              <Button variant="outline" onClick={() => { /* Implement password change */ }}>
                <Key className="mr-2 h-4 w-4" />
                Change Password
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Login Notifications</Label>
                <p className="text-muted-foreground text-sm">
                  Get notified when someone logs into your account
                </p>
              </div>
              <Switch
                defaultChecked
                onCheckedChange={(checked) => console.log("Notifications toggled:", checked)}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default function ProfileView() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    const currentUser = userAuthService.getCurrentUser();
    if (!currentUser) {
      navigate("/login");
      return;
    }
    const user = new User(currentUser.username, currentUser.email);
    const initialData: ProfileData = {
      username: user.User,
      email: user.Email,
      firstName: "",
      lastName: "",
      phone: "",
      location: "",
    };
    setProfile(initialData);
    setFormData(initialData);
  }, [navigate]);

  const handleSave = () => {
    if (!profile) return;
    setProfile(formData);
    setIsEditing(false);
    // Note: Update userAuthService or backend here for persistent storage
  };

  if (!profile) {
    return <div className="max-w-4xl mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm p-4 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-xl font-semibold">My App Tekst</h1>
        <div className="w-20" /> {/* Spacer for balancing layout */}
      </nav>
      <div className="max-w-4xl mx-auto space-y-6 px-4 py-10">
        <ProfileHeader profile={profile} />
        <ProfileContent
          profile={profile}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          formData={formData}
          setFormData={setFormData}
          handleSave={handleSave}
        />
      </div>
    </div>
  );
}