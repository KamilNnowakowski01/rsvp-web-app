import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Step1and2 from "@/components/creator/Step1and2"; // Updated import
import Step3 from "@/components/creator/Step3";
import Step4 from "@/components/creator/Step4";
import Step5 from "@/components/creator/Step5";
import Step6 from "@/components/creator/Step6";
import EventManager from "@/class/EventManager";

// Create a singleton instance of EventManager
const eventManager = new EventManager();

const EventCreator: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
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
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    // Back navigation is now handled in Step1and2; no action needed here for step 1
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    // Create a new event object matching the Event interface
    const newEvent = {
      ID: eventManager.getAllEvents().length + 1, // Simple ID generation (consider a more robust method)
      ID_Owner: { User: "current_user" }, // Replace with actual user data
      ID_Website: "eventplatform.com", // Replace with actual website ID
      Organizers: [{ User: "current_user" }], // Replace with actual organizers
      Participants: [], // Initially empty
      Name: formData.eventName,
      Description: formData.description,
      LocationName: formData.locationName,
      City: formData.city,
      StreetAddress: formData.streetAddress,
      ZipCode: formData.zipCode,
      Time: formData.time,
      Date: formData.date,
      isGuestList: formData.setupQuestion1,
      isPaid: formData.setupQuestion2,
    };

    // Add the event to EventManager
    eventManager.addEvent(newEvent);
    console.log("Event added:", newEvent);
    setStep(5);
  };

  const handleConfirm = () => {
    navigate("/management/event");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">Event</h1>
        <h2 className="text-4xl font-normal mt-2.5 mb-10">Creator</h2>
      </div>
      <div className="w-full max-w-md mx-auto">
        {step === 1 && (
          <Step1and2
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        )}
        {step === 2 && <Step3 formData={formData} setFormData={setFormData} onNext={handleNext} onBack={handleBack} />}
        {step === 3 && <Step4 formData={formData} setFormData={setFormData} onNext={handleNext} onBack={handleBack} />}
        {step === 4 && (
          <Step5
            formData={{
              startTime: formData.startTime,
              endTime: formData.endTime,
              startDate: formData.startDate,
              endDate: formData.endDate,
            }}
            setFormData={(data) =>
              setFormData((prev) => ({
                ...prev,
                ...data,
              }))
            }
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        )}
        {step === 5 && <Step6 onConfirm={handleConfirm} />}
      </div>
    </div>
  );
};

// Export the eventManager instance for use in other components
export { eventManager };
export default EventCreator;