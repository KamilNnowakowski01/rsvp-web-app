// src/pages/ManagementPanel/HelperView.tsx
import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Globe, Users } from "lucide-react";

const steps = [
	{
		id: 1,
		title: "Event Type",
		description: "Select the type of event",
	},
	{
		id: 2,
		title: "Event Details",
		description: "Provide basic event information",
	},
	{
		id: 3,
		title: "User Management",
		description: "Set up user access",
	},
	{
		id: 4,
		title: "Complete Setup",
		description: "Review and finalize",
	},
];

interface FormData {
	eventType: "public" | "private";
	eventName: string;
	eventDate: string;
	maxAttendees: "1-50" | "50-100" | "100-500" | "500+";
	organizerName: string;
}

export default function HelperView() {
	const { idEvent } = useParams<{ idEvent?: string }>();
	const [currentStep, setCurrentStep] = React.useState(1);
	const [formData, setFormData] = React.useState<FormData>({
		eventType: "public",
		eventName: "",
		eventDate: "",
		maxAttendees: "50-100",
		organizerName: "",
	});

	const handleNext = () => {
		if (currentStep < steps.length) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handlePrevious = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const updateFormData = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const renderStepContent = () => {
		const stepContent = {
			1: (
				<div className="space-y-6">
					<CardHeader className="px-0 pt-0">
						<CardTitle>Choose Event Type</CardTitle>
						<CardDescription>
							Select the type of event you're creating.{" "}
							<Link to={`/management/event/${idEvent}/settings`} className="text-purple-600 hover:underline">
								View Settings
							</Link>
							.
						</CardDescription>
					</CardHeader>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<Card
							className={cn(
								"cursor-pointer transition-all",
								formData.eventType === "public" ? "bg-muted border-purple-500 ring-2 ring-purple-500" : "border-gray-200 hover:shadow-md"
							)}
							onClick={() => updateFormData("eventType", "public")}
						>
							<CardContent className="flex items-start space-x-4 p-6">
								<div className="flex-shrink-0">
									<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
										<Globe className="h-6 w-6 text-purple-600" />
									</div>
								</div>
								<div>
									<h3 className="text-muted-foreground mb-1 font-semibold">Public Event</h3>
									<p className="text-muted-foreground text-sm">Open to all attendees</p>
								</div>
							</CardContent>
						</Card>
						<Card
							className={cn(
								"cursor-pointer transition-all",
								formData.eventType === "private" ? "bg-muted border-purple-500 ring-2 ring-purple-500" : "border-gray-200 hover:shadow-md"
							)}
							onClick={() => updateFormData("eventType", "private")}
						>
							<CardContent className="flex items-start space-x-4 p-6">
								<div className="flex-shrink-0">
									<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
										<Users className="h-6 w-6 text-purple-600" />
									</div>
								</div>
								<div>
									<h3 className="text-muted-foreground mb-1 font-semibold">Private Event</h3>
									<p className="text-muted-foreground text-sm">Restricted to invited guests</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			),

			2: (
				<div className="space-y-6">
					<CardHeader className="px-0 pt-0">
						<CardTitle>Event Details</CardTitle>
						<CardDescription>
							Provide basic information for your event.{" "}
							<Link to={`/management/event/${idEvent}/creator`} className="text-purple-600 hover:underline">
								Go to Event Creator
							</Link>
							.
						</CardDescription>
					</CardHeader>
					<div className="space-y-6">
						<div>
							<Label htmlFor="eventName" className="text-base">Event Name</Label>
							<Input
								id="eventName"
								value={formData.eventName}
								onChange={(e) => updateFormData("eventName", e.target.value)}
								className="mt-2"
								placeholder="Enter event name"
							/>
						</div>
						<div>
							<Label htmlFor="eventDate" className="text-base">Event Date</Label>
							<Input
								id="eventDate"
								type="date"
								value={formData.eventDate}
								onChange={(e) => updateFormData("eventDate", e.target.value)}
								className="mt-2"
							/>
						</div>
						<div>
							<Label className="mb-4 block text-base">Maximum Attendees</Label>
							<div className="grid grid-cols-4 gap-3">
								{["1-50", "50-100", "100-500", "500+"].map((size) => (
									<button
										key={size}
										onClick={() => updateFormData("maxAttendees", size)}
										className={cn(
											"rounded-lg border-2 p-4 text-center transition-all",
											formData.maxAttendees === size
												? "bg-muted border-purple-500 ring-2 ring-purple-500"
												: "border-gray-200 text-gray-700 hover:border-gray-300"
										)}
									>
										{size}
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			),

			3: (
				<div className="space-y-6">
					<CardHeader className="px-0 pt-0">
						<CardTitle>User Management</CardTitle>
						<CardDescription>
							Set up organizer access.{" "}
							<Link to={`/management/event/${idEvent}/userlist`} className="text-purple-600 hover:underline">
								Go to User List
							</Link>
							.
						</CardDescription>
					</CardHeader>
					<div className="space-y-4">
						<div>
							<Label htmlFor="organizerName">Organizer Name</Label>
							<Input
								id="organizerName"
								placeholder="Enter organizer name"
								className="mt-2"
								value={formData.organizerName}
								onChange={(e) => updateFormData("organizerName", e.target.value)}
							/>
						</div>
						<div>
							<Label className="mb-4 block text-base">Role</Label>
							<RadioGroup
								value={formData.eventType}
								onValueChange={(value: "admin" | "editor") => updateFormData("eventType", value)}
								className="space-y-3"
							>
								<div className="flex items-center space-x-3 rounded-lg border p-4">
									<Users className="h-6 w-6 text-gray-400" />
									<div className="flex-1">
										<div className="font-medium">Admin</div>
										<div className="text-sm text-gray-500">Full access to all settings</div>
									</div>
									<RadioGroupItem value="admin" />
								</div>
								<div className="flex items-center space-x-3 rounded-lg border p-4">
									<Users className="h-6 w-6 text-gray-400" />
									<div className="flex-1">
										<div className="font-medium">Editor</div>
										<div className="text-sm text-gray-500">Limited to specific sections</div>
									</div>
									<RadioGroupItem value="editor" />
								</div>
							</RadioGroup>
						</div>
					</div>
				</div>
			),

			4: (
				<div className="space-y-6">
					<CardHeader className="px-0 pt-0">
						<CardTitle>Complete Setup</CardTitle>
						<CardDescription>
							Review your configuration.{" "}
							<Link to={`/management/event/${idEvent}/dashboard`} className="text-purple-600 hover:underline">
								Go to Dashboard
							</Link>
							.
						</CardDescription>
					</CardHeader>
					<div className="space-y-4">
						<p className="text-gray-700">
							Your event configuration is ready to be finalized. Review the details below:
						</p>
						<ul className="list-disc pl-5 text-gray-700">
							<li>Event Type: {formData.eventType}</li>
							<li>Event Name: {formData.eventName || "Not set"}</li>
							<li>Event Date: {formData.eventDate || "Not set"}</li>
							<li>Max Attendees: {formData.maxAttendees}</li>
							<li>Organizer: {formData.organizerName || "Not set"}</li>
						</ul>
					</div>
				</div>
			),
		};

		return stepContent[currentStep as keyof typeof stepContent] || null;
	};

	return (
		<div className="flex items-center justify-center p-4">
			<Card className="w-full max-w-3xl shadow-lg">
				<CardHeader className="pb-0">
					<div className="mb-6 flex items-center justify-between">
						{steps.map((step) => (
							<div key={step.id} className="relative flex flex-1 flex-col items-center">
								<div
									className={cn(
										"flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300",
										currentStep > step.id
											? "bg-purple-600 text-white"
											: currentStep === step.id
											? "bg-purple-500 text-white"
											: "bg-gray-200 text-gray-600"
									)}
								>
									{currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
								</div>
								<div
									className={cn(
										"mt-2 text-center text-sm font-medium",
										currentStep >= step.id ? "text-gray-800" : "text-gray-500"
									)}
								>
									{step.title}
								</div>
								{step.id < steps.length && (
									<div
										className={cn(
											"absolute top-5 left-[calc(50%+20px)] h-0.5 w-[calc(100%-40px)] -translate-y-1/2 bg-gray-200 transition-colors duration-300",
											currentStep > step.id && "bg-purple-400"
										)}
									/>
								)}
							</div>
						))}
					</div>
				</CardHeader>
				<CardContent className="p-6 md:p-8">
					{renderStepContent()}
					<div className="mt-8 flex items-center justify-between border-t pt-6">
						<Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
							<ChevronLeft className="h-4 w-4" />
							<span>Previous</span>
						</Button>
						<Button onClick={handleNext} disabled={currentStep === steps.length}>
							<span>{currentStep === steps.length ? "Finish" : "Continue"}</span>
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}