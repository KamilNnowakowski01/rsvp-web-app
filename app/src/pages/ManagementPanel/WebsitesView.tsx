import { useParams } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RotateCcw, Eye } from "lucide-react";

interface WebsiteContent {
  title: string;
  information: string;
  actionButton: string;
  subButton: string;
  footer: string;
}

type DisplayMode = "invitation" | "payment" | "payment-accent" | "payment-error" | "registration-confirm";

export default function WebsitesView() {
  const { idEvent } = useParams<{ idEvent: string }>();
  const [content, setContent] = useState<WebsiteContent>({
    title: "Welcome to Event #" + idEvent,
    information: "Join us for an unforgettable experience at our event!",
    actionButton: "Register Now",
    subButton: "Limited spots available!",
    footer: "© 2025 Event #" + idEvent + ". All rights reserved.",
  });
  const [formData, setFormData] = useState<WebsiteContent>({ ...content });
  const [isEditing, setIsEditing] = useState(false);
  const [displayMode, setDisplayMode] = useState<DisplayMode>("invitation");

  const handleContentChange = (section: keyof WebsiteContent, value: string) => {
    setFormData((prev) => ({ ...prev, [section]: value }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setFormData({ ...content }); // Revert to original content on cancel
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setContent({ ...formData }); // Save changes to content
    setIsEditing(false);
  };

  const handleReset = () => {
    setFormData({ ...content }); // Reset form to initial content
  };

  const getPreviewStyles = (mode: DisplayMode) => {
    switch (mode) {
      case "invitation":
        return { bg: "bg-gray-50", button: "bg-primary text-white", text: "text-muted-foreground" };
      case "payment":
        return { bg: "bg-blue-50", button: "bg-blue-600 text-white", text: "text-blue-800" };
      case "payment-accent":
        return { bg: "bg-green-50", button: "bg-green-600 text-white", text: "text-green-800" };
      case "payment-error":
        return { bg: "bg-red-50", button: "bg-red-600 text-white", text: "text-red-800" };
      case "registration-confirm":
        return { bg: "bg-teal-50", button: "bg-teal-600 text-white", text: "text-teal-800" };
      default:
        return { bg: "bg-gray-50", button: "bg-primary text-white", text: "text-muted-foreground" };
    }
  };

  const previewStyles = getPreviewStyles(displayMode);

  return (
    <div className="p-6 mx-auto">
      <h2 className="text-2xl font-bold mb-6">Websites  ID: {idEvent}</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Editor Section */}
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Edit Website Content</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="w-48">
                  <Label htmlFor="display-mode" className="sr-only">Display Mode</Label>
                  <Select value={displayMode} onValueChange={(value: DisplayMode) => setDisplayMode(value)}>
                    <SelectTrigger id="display-mode" className="w-full">
                      <SelectValue placeholder="Select display mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="invitation">Invitation</SelectItem>
                      <SelectItem value="payment">Payment</SelectItem>
                      <SelectItem value="payment-accent">Payment Accent</SelectItem>
                      <SelectItem value="payment-error">Payment Error</SelectItem>
                      <SelectItem value="registration-confirm">Registration Confirm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button asChild variant="default" className="bg-black text-white hover:bg-gray-800">
                  <a href="#Preview">
                    <Eye className="h-4 w-4 mr-2" />
                    Website Preview
                  </a>
                </Button>
                <Button variant="secondary" onClick={handleReset}>
                  <span className="sr-only">Reset form</span>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Separator className="my-4" />
            {(["title", "information", "actionButton", "subButton", "footer"] as (keyof WebsiteContent)[]).map((section) => (
              <div key={section} className="space-y-2">
                <Label htmlFor={`${section}-editor`}>{section.charAt(0).toUpperCase() + section.slice(1)}</Label>
                <Textarea
                  id={`${section}-editor`}
                  value={formData[section]}
                  onChange={(e) => handleContentChange(section, e.target.value)}
                  rows={section === "information" ? 6 : 3}
                  placeholder={`Enter content for ${section}`}
                  disabled={!isEditing}
                />
              </div>
            ))}
            <div className="flex justify-end space-x-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={handleEditToggle}>
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

        {/* Preview Section */}
        <Card className="w-[320px]">
          <CardHeader>
            <CardTitle>Website Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`${previewStyles.bg} p-6 rounded-lg shadow-sm`} id="Preview">
              <h1 className={`text-3xl font-bold ${previewStyles.text} mb-4`}>{content.title}</h1>
              <p className={`${previewStyles.text} mb-4`}>{content.information}</p>
              <Button className={`${previewStyles.button} mb-2`}>{content.actionButton}</Button>
              <p className={`text-sm ${previewStyles.text} mb-4`}>{content.subButton}</p>
              <footer className={`text-sm ${previewStyles.text}`}>{content.footer}</footer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}