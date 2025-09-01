import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { texts } from "@/components/creator/eventCreatorTexts";
import { useNavigate } from "react-router-dom";

interface Step1and2Props {
  formData: { setupQuestion1: boolean; setupQuestion2: boolean };
  setFormData: (data: any) => void;
  onNext: () => void;
}

const Step1and2: React.FC<Step1and2Props> = ({ formData, setFormData, onNext }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Event Setup</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label className="text-justify px-4">{texts.step1.question}</Label>
              <p className="text-sm text-muted-foreground px-4">{texts.step1.hint}</p>
            </div>
            <Switch
              checked={formData.setupQuestion1}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, setupQuestion1: checked })
              }
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label className="text-justify px-4">{texts.step2.question}</Label>
              <p className="text-sm text-muted-foreground px-4">{texts.step2.hint}</p>
            </div>
            <Switch
              checked={formData.setupQuestion2}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, setupQuestion2: checked })
              }
            />
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => navigate("/home")}
          >
            {texts.navigation.back}
          </Button>
          <Button
            variant="default"
            onClick={onNext}
          >
            {texts.step3.button}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step1and2;