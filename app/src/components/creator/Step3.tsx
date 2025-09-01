import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { texts } from "@/components/creator/eventCreatorTexts";

interface Step3Props {
  formData: { eventName: string; description: string };
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step3: React.FC<Step3Props> = ({ formData, setFormData, onNext, onBack }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">{texts.steps[3].title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground mb-10">{texts.step3.hint}</p>
        <div>
          <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 mb-2">
            Event Name
          </label>
          <Input
            id="eventName"
            placeholder={texts.step3.placeholders.eventName}
            value={formData.eventName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, eventName: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <Textarea
            id="description"
            placeholder={texts.step3.placeholders.description}
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div className="flex justify-center gap-4 mt-10">
          <Button className="w-20" variant="outline" onClick={onBack}>{texts.navigation.back}</Button>
          <Button className="w-20" variant="default" onClick={onNext}>{texts.step3.button}</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step3;