import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Clock, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock event data (replace with actual API call)
const mockEventData = {
  id: "123",
  title: "Annual Tech Conference 2025",
  date: "2025-10-15T09:00:00Z",
  attendees: {
    invited: 100,
    confirmed: 60,
    declined: 20,
  },
  status: "Upcoming",
};

const chartData = [
  { name: "Invited", count: mockEventData.attendees.invited },
  { name: "Confirmed", count: mockEventData.attendees.confirmed },
  { name: "Declined", count: mockEventData.attendees.declined },
];

export default function EventDashboard() {
  const { idEvent } = useParams<{ idEvent: string }>();
  const [event] = useState(mockEventData); // Use state for real API data
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    expired: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  // Countdown timer logic
  useEffect(() => {
    const targetDate = new Date(event.date).getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, expired: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [event.date]);

  // Calendar component
  const Calendar = ({ date }: { date: string }) => {
    const eventDate = new Date(date);
    const formattedDate = eventDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Event Date
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <p className="text-lg font-semibold mb-4">{formattedDate}</p>
          <CalendarComponent
            mode="single"
            selected={eventDate}
            defaultMonth={eventDate}
            
            className="rounded-lg border bg-background text-foreground opacity-100 [&_button]:text-foreground [&_button]:opacity-100 [&_button:disabled]:text-foreground [&_button:disabled]:opacity-100 [&_button:disabled]:cursor-default [&_[data-today=true]]:bg-accent [&_[data-today=true]]:text-accent-foreground [&_[data-selected=true]]:bg-primary [&_[data-selected=true]]:text-primary-foreground [&_[data-outside=true]]:text-muted-foreground"
          />
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Title and Countdown Row */}
        <div className="grid grid-cols-12 gap-6">
          {/* Event Title Card */}
          <Card className="col-span-8">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">{event.title}</CardTitle>
              <CardDescription>Event ID: {idEvent}</CardDescription>
            </CardHeader>
          </Card>
          {/* Countdown Timer */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Countdown to Event
              </CardTitle>
              <CardDescription>Time remaining until the event starts</CardDescription>
            </CardHeader>
            <CardContent>
              {timeLeft.expired ? (
                <p className="text-2xl font-bold text-primary">Event has started!</p>
              ) : (
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-white border rounded-md p-4 text-center">
                    <p className="text-3xl font-bold">{timeLeft.days}</p>
                    <p className="text-sm text-muted-foreground">Days</p>
                  </div>
                  <div className="bg-white border rounded-md p-4 text-center">
                    <p className="text-3xl font-bold">{timeLeft.hours}</p>
                    <p className="text-sm text-muted-foreground">Hours</p>
                  </div>
                  <div className="bg-white border rounded-md p-4 text-center">
                    <p className="text-3xl font-bold">{timeLeft.minutes}</p>
                    <p className="text-sm text-muted-foreground">Minutes</p>
                  </div>
                  <div className="bg-white border rounded-md p-4 text-center">
                    <p className="text-3xl font-bold">{timeLeft.seconds}</p>
                    <p className="text-sm text-muted-foreground">Seconds</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Grid for Other Dashboard Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Attendees Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Attendee Statistics
              </CardTitle>
              <CardDescription>Overview of attendee responses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Event Date Calendar */}
          <Calendar date={event.date} />

          {/* Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle>Event Summary</CardTitle>
              <CardDescription>Key event metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Total Attendees</span>
                <span className="font-semibold">
                  {event.attendees.invited + event.attendees.confirmed + event.attendees.declined}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Event Status</span>
                <span className="font-semibold">{event.status}</span>
              </div>
              <div className="flex justify-between">
                <span>Confirmation Rate</span>
                <span className="font-semibold">
                  {((event.attendees.confirmed / event.attendees.invited) * 100).toFixed(1)}%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}