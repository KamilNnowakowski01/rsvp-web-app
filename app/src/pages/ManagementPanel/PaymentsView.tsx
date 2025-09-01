import { useParams } from "react-router-dom";

export default function PaymentsView() {
  const { idEvent } = useParams<{ idEvent: string }>();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Event Payments - ID: {idEvent}</h2>
      <p>This is a placeholder for the event payments view.</p>
    </div>
  );
}