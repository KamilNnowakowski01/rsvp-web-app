// src/components/creator/Step5.tsx
import { useState } from "react";
import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDownIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { texts } from "@/components/creator/eventCreatorTexts";

interface FormData {
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
}

interface Step5Props {
  formData: Partial<FormData> & { [key: string]: any };
  setFormData: (data: Partial<FormData> & { [key: string]: any }) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const Step5: React.FC<Step5Props> = ({ formData, setFormData, onSubmit, onBack }) => {
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(
    formData.startDate ? parse(formData.startDate, "yyyy-MM-dd", new Date()) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    formData.endDate ? parse(formData.endDate, "yyyy-MM-dd", new Date()) : undefined
  );

  const handleDateSelect = (
    selectedDate: Date | undefined,
    type: "startDate" | "endDate",
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (type === "endDate" && startDate && selectedDate && selectedDate < startDate) {
      alert("End date cannot be before start date.");
      return;
    }

    if (type === "startDate" && endDate && selectedDate && selectedDate > endDate) {
      alert("Start date cannot be after end date.");
      return;
    }

    if (type === "startDate") {
      setStartDate(selectedDate);
    } else {
      setEndDate(selectedDate);
    }

    setFormData({
      ...formData,
      [type]: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
    });
    setOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">{texts.steps[5].title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground mb-10 text-justify">{texts.step5.hint}</p>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-4">
              <div className="flex flex-col gap-3 w-24">
                <Label htmlFor="start-time-picker" className="px-1 text-sm font-medium text-gray-700">
                  Start Time
                </Label>
                <Input
                  id="start-time-picker"
                  type="time"
                  step="60"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="bg-background text-center appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </div>
              <div className="flex flex-col gap-3 w-32">
                <Label htmlFor="start-date-picker" className="px-1 text-sm font-medium text-gray-700">
                  Start Date
                </Label>
                <Popover open={openStart} onOpenChange={setOpenStart}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="start-date-picker"
                      className={cn("justify-between font-normal", !startDate && "text-muted-foreground")}
                    >
                      {startDate ? startDate.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => handleDateSelect(date, "startDate", setOpenStart)}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Select the start date and time for your event. Ensure the time is in 24-hour format.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-4">
              <div className="flex flex-col gap-3 w-24">
                <Label htmlFor="end-time-picker" className="px-1 text-sm font-medium text-gray-700">
                  End Time
                </Label>
                <Input
                  id="end-time-picker"
                  type="time"
                  step="60"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="bg-background text-center appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </div>
              <div className="flex flex-col gap-3 w-32">
                <Label htmlFor="end-date-picker" className="px-1 text-sm font-medium text-gray-700">
                  End Date
                </Label>
                <Popover open={openEnd} onOpenChange={setOpenEnd}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="end-date-picker"
                      className={cn("justify-between font-normal", !endDate && "text-muted-foreground")}
                    >
                      {endDate ? endDate.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => handleDateSelect(date, "endDate", setOpenEnd)}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Select the end date and time for your event. Ensure the end date is not before the start date.
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Button className="w-20" variant="outline" onClick={onBack}>
            {texts.navigation.back}
          </Button>
          <Button className="w-20" variant="default" onClick={onSubmit}>
            {texts.step5.button}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step5;