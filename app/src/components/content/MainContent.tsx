import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Globe, Sparkles, Ticket, Users } from "lucide-react";

const categories: {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}[] = [
  { 
    title: "Paid with Attendee List", 
    description: "Organize paid events with a visible attendee list, enabling seamless registration tracking and participant communication.",
    features: ["Visible attendee list", "Secure payment processing", "Real-time registration updates"],
    icon: <Ticket className="w-8 h-8 text-primary" />
  },
  { 
    title: "Paid without Attendee List", 
    description: "Host paid events with private attendee details, featuring ticket purchasing, capacity management, and efficient check-in via ticket scanner.",
    features: ["Private attendee data", "Ticket scanner for entry", "Capacity management tools"],
    icon: <Users className="w-8 h-8 text-primary" />
  },
  { 
    title: "Free with Attendee List", 
    description: "Manage free events with a public attendee list, perfect for community gatherings with easy registration tracking.",
    features: ["Public attendee list", "Free registration", "Event analytics dashboard"],
    icon: <Calendar className="w-8 h-8 text-primary" />
  },
  { 
    title: "Free without Attendee List", 
    description: "Run free events without disclosing attendee details, ideal for open-access events with minimal management needs.",
    features: ["No attendee disclosure", "Simple event setup", "Scalable for large crowds"],
    icon: <Globe className="w-8 h-8 text-primary" />
  },
];

export default function MainContent() {
  return (
    <>
      <section className="mt-16 min-h-[55vh] flex items-start justify-center bg-white py-16">
        <div className="text-center max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Create Your Perfectly <span className="block">Organized Event</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Bring your ideas to life! Whether it’s a birthday party, a wedding,
            or a community gathering, create an unforgettable event with ease
            and share it with your guests.
          </p>
          <Button className="mt-6" size="lg" asChild>
            <a href="/creator">
              Get Started <Sparkles className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-3/5 text-center lg:text-left max-w-md mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Create Unforgettable Events with Ease</h2>
            <p className="text-lg text-gray-600">
              Transform your vision into reality with our intuitive event management platform. Whether you're planning a vibrant birthday bash, an elegant wedding, or a lively community gathering, our user-friendly interface ensures effortless setup and a seamless experience for you and your guests. Discover the joy of organizing events with a sleek, modern design that simplifies every step.
            </p>
          </div>
          <div className="lg:w-2/5">
            <img src="/address-form.png" alt="Address Form Example" className="max-w-full h-auto" />
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Discover Our Event Management Solutions
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Tailored event management features to suit every need, from paid
            ticketing to free community events.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-3">
                  {category.icon}
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    {category.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-gray-600 mb-4">
                  {category.description}
                </CardDescription>
                <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
                  {category.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <Button
                  className="w-full bg-primary text-white hover:bg-primary/90 transition-colors"
                  variant="default"
                >
                  Explore {category.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}