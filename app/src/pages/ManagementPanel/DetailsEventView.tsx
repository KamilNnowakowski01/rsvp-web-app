import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as LucideCalendar, MapPin, Home, Hotel, Mail, ChevronDownIcon, Eye, RotateCcw } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { format, parse } from "date-fns";
import { eventManager } from "@/pages/EventCreator";
import { texts } from "@/components/creator/eventCreatorTexts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface EventContent {
  setupQuestion1: boolean;
  setupQuestion2: boolean;
  eventName: string;
  description: string;
  locationName: string;
  city: string;
  streetAddress: string;
  zipCode: string;
  date: string;
  time: string;
}

type DisplayMode = "default" | "highlight" | "urgent" | "confirmed";

export default function DetailsEventView() {
  const { idEvent } = useParams<{ idEvent: string }>();
  const [formData, setFormData] = useState<EventContent>({
    setupQuestion1: false,
    setupQuestion2: false,
    eventName: "",
    description: "",
    locationName: "",
    city: "",
    streetAddress: "",
    zipCode: "",
    date: "",
    time: "",
  });
  const [initialFormData, setInitialFormData] = useState<EventContent>(formData);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [displayMode, setDisplayMode] = useState<DisplayMode>("default");

  useEffect(() => {
    if (!idEvent) {
      setError("Event ID is missing.");
      return;
    }
    const event = eventManager.getEventById(Number(idEvent));
    if (event) {
      const eventData = {
        setupQuestion1: event.isGuestList,
        setupQuestion2: event.isPaid,
        eventName: event.Name,
        description: event.Description,
        locationName: event.LocationName,
        city: event.City,
        streetAddress: event.StreetAddress,
        zipCode: event.ZipCode,
        date: event.Date,
        time: event.Time,
      };
      setFormData(eventData);
      setInitialFormData(eventData);
      setDate(parse(event.Date, "yyyy-MM-dd", new Date()));
      setError(null);
    } else {
      setError("Event not found.");
    }
  }, [idEvent]);

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (name: string, value: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setFormData((prev) => ({
      ...prev,
      date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
    }));
  };

  const handleSubmit = () => {
    const requiredFields = ["eventName", "date", "time"];
    for (const field of requiredFields) {
      const value = formData[field as keyof EventContent];
      if (typeof value === "string" && !value.trim()) {
        setError(`${field} is required.`);
        return;
      }
    }

    const updatedEvent = {
      ...eventManager.getEventById(Number(idEvent))!,
      isGuestList: formData.setupQuestion1,
      isPaid: formData.setupQuestion2,
      Name: formData.eventName,
      Description: formData.description,
      LocationName: formData.locationName,
      City: formData.city,
      StreetAddress: formData.streetAddress,
      ZipCode: formData.zipCode,
      Date: formData.date,
      Time: formData.time,
    };

    eventManager.updateEvent(updatedEvent);
    setInitialFormData(formData);
    setIsEditing(false);
    setError(null);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setDate(initialFormData.date ? parse(initialFormData.date, "yyyy-MM-dd", new Date()) : undefined);
    setIsEditing(false);
    setError(null);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setDate(initialFormData.date ? parse(initialFormData.date, "yyyy-MM-dd", new Date()) : undefined);
  };

  const getPreviewStyles = (mode: DisplayMode) => {
    switch (mode) {
      case "default":
        return { bg: "bg-gray-50", button: "bg-primary text-white", text: "text-muted-foreground" };
      case "highlight":
        return { bg: "bg-blue-50", button: "bg-blue-600 text-white", text: "text-blue-800" };
      case "urgent":
        return { bg: "bg-red-50", button: "bg-red-600 text-white", text: "text-red-800" };
      case "confirmed":
        return { bg: "bg-teal-50", button: "bg-teal-600 text-white", text: "text-teal-800" };
      default:
        return { bg: "bg-gray-50", button: "bg-primary text-white", text: "text-muted-foreground" };
    }
  };

  const previewStyles = getPreviewStyles(displayMode);

  return (
    <section id="edit-event" className="max-w-7xl p-6 mx-auto">
      <h2 className="text-2xl font-bold mb-6">Event Details - ID: {idEvent}</h2>
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Editor Section */}
        <div className="space-y-6">
          {/* Step 1: Restrict Participant Additions */}
          <Card>
            <CardHeader>
              <CardTitle>Step 1: Restrict Participant Additions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="block text-sm font-medium text-gray-700">Czy wydarzenie jest ograniczone listą gości?</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="checkbox"
                    name="setupQuestion1"
                    checked={formData.setupQuestion1}
                    onChange={(e) => handleQuestionChange("setupQuestion1", e.target.checked)}
                    disabled={!isEditing}
                  />
                  <span>{formData.setupQuestion1 ? "Tak" : "Nie"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Payment System Setup */}
          <Card>
            <CardHeader>
              <CardTitle>Step 2: Payment System Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="block text-sm font-medium text-gray-700">Czy wydarzenie jest płatne?</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="checkbox"
                    name="setupQuestion2"
                    checked={formData.setupQuestion2}
                    onChange={(e) => handleQuestionChange("setupQuestion2", e.target.checked)}
                    disabled={!isEditing}
                  />
                  <span>{formData.setupQuestion2 ? "Tak" : "Nie"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 3: Event Information */}
          <Card>
            <CardHeader>
              <CardTitle>Step 3: Event Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="eventName">Nazwa wydarzenia</Label>
                <Input
                  id="eventName"
                  name="eventName"
                  placeholder={texts.step3.placeholders.eventName}
                  value={formData.eventName}
                  onChange={handleFieldChange}
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Opis</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder={texts.step3.placeholders.description}
                  value={formData.description}
                  onChange={handleFieldChange}
                  disabled={!isEditing}
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>

          {/* Step 4: Address Form */}
          <Card>
            <CardHeader>
              <CardTitle>Step 4: Address Form</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="locationName">Nazwa miejsca</Label>
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-gray-500" />
                  <Input
                    id="locationName"
                    name="locationName"
                    placeholder={texts.step4.placeholders.locationName}
                    value={formData.locationName}
                    onChange={handleFieldChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Miasto</Label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <Input
                    id="city"
                    name="city"
                    placeholder={texts.step4.placeholders.city}
                    value={formData.city}
                    onChange={handleFieldChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="streetAddress">Adres</Label>
                <div className="flex items-center gap-2">
                  <Hotel className="w-5 h-5 text-gray-500" />
                  <Input
                    id="streetAddress"
                    name="streetAddress"
                    placeholder={texts.step4.placeholders.streetAddress}
                    value={formData.streetAddress}
                    onChange={handleFieldChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">Kod pocztowy</Label>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <Input
                    id="zipCode"
                    name="zipCode"
                    placeholder={texts.step4.placeholders.zipCode}
                    value={formData.zipCode}
                    onChange={handleFieldChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 5: Event Date and Time */}
          <Card>
            <CardHeader>
              <CardTitle>Step 5: Event Date and Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="time">Godzina</Label>
                <div className="flex items-center gap-2">
                  <LucideCalendar className="w-5 h-5 text-gray-500" />
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleFieldChange}
                    disabled={!isEditing}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-between font-normal", !date && "text-muted-foreground")}
                        disabled={!isEditing}
                      >
                        {date ? format(date, "yyyy-MM-dd") : "Wybierz datę"}
                        <ChevronDownIcon className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        initialFocus
                        disabled={!isEditing}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center mt-6">
            <div className="w-48">
              <Label htmlFor="display-mode" className="sr-only">Display Mode</Label>
              <Select value={displayMode} onValueChange={(value: DisplayMode) => setDisplayMode(value)}>
                <SelectTrigger id="display-mode" className="w-full">
                  <SelectValue placeholder="Select display mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="highlight">Highlight</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button asChild variant="default" className="bg-black text-white hover:bg-gray-800">
                <a href="#Preview">
                  <Eye className="h-4 w-4 mr-2" />
                  Event Preview
                </a>
              </Button>
              <Button variant="secondary" onClick={handleReset}>
                <span className="sr-only">Reset form</span>
                <RotateCcw className="h-4 w-4" />
              </Button>
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit}>Zapisz</Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Edytuj</Button>
              )}
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <Card className="w-[320px]">
          <CardHeader>
            <CardTitle>Event Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`${previewStyles.bg} p-6 rounded-lg shadow-sm`} id="Preview">
              <h1 className={`text-3xl font-bold ${previewStyles.text} mb-4`}>{formData.eventName || "Event Name"}</h1>
              <p className={`text-sm ${previewStyles.text} mb-2`}>{formData.description || "Event Description"}</p>
              <p className={`text-sm ${previewStyles.text} mb-2`}>
                <MapPin className="inline-block w-4 h-4 mr-1" />
                {formData.locationName || "Location"}, {formData.city || "City"}
              </p>
              <p className={`text-sm ${previewStyles.text} mb-2`}>
                <Home className="inline-block w-4 h-4 mr-1" />
                {formData.streetAddress || "Street Address"}, {formData.zipCode || "Zip Code"}
              </p>
              <p className={`text-sm ${previewStyles.text} mb-4`}>
                <Calendar className="inline-block w-4 h-4 mr-1" />
                {formData.date ? format(parse(formData.date, "yyyy-MM-dd", new Date()), "PPP") : "Date"} at {formData.time || "Time"}
              </p>
              <Button className={`${previewStyles.button} mb-2`}>Join Event</Button>
              <p className={`text-sm ${previewStyles.text}`}>
                {formData.setupQuestion1 ? "Guest List Required" : "Open to All"} | {formData.setupQuestion2 ? "Paid Event" : "Free Event"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}