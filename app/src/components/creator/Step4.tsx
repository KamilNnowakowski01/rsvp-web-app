import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { texts } from "@/components/creator/eventCreatorTexts";
import { MapPin, Home, Hotel, Mail } from "lucide-react";

interface Step4Props {
  formData: { locationName: string; city: string; streetAddress: string; zipCode: string };
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step4: React.FC<Step4Props> = ({ formData, setFormData, onNext, onBack }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">{texts.steps[4].title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground mb-10 text-justify">{texts.step4.hint}</p>
        <div>
          <label htmlFor="locationName" className="block text-sm font-medium text-gray-700 mb-2">
            Location Name
          </label>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            <Input
              id="locationName"
              placeholder={texts.step4.placeholders.locationName}
              value={formData.locationName}
              onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <div className="flex items-center gap-2">
            <Hotel className="w-5 h-5 text-gray-500" />
            <Input
              id="city"
              placeholder={texts.step4.placeholders.city}
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-2">
            Street Address
          </label>
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-gray-500" />
            <Input
              id="streetAddress"
              placeholder={texts.step4.placeholders.streetAddress}
              value={formData.streetAddress}
              onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
            Zip Code
          </label>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-500" />
            <Input
              id="zipCode"
              placeholder={texts.step4.placeholders.zipCode}
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            />
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Button className="w-20" variant="outline" onClick={onBack}>{texts.navigation.back}</Button>
          <Button className="w-20" variant="default" onClick={onNext}>{texts.step4.button}</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step4;