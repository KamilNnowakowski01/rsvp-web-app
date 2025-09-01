import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { texts } from "@/components/creator/eventCreatorTexts";

interface Step2Props {
  formData: { setupQuestion2: boolean };
  setFormData: (data: any) => void;
  onNext: () => void;
}

const Step2: React.FC<Step2Props> = ({ formData, setFormData, onNext }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">{texts.steps[2].title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex mt-1">
          <p className="text-justify mb-3 mt-5 px-4">{texts.step2.question}</p>
        </div>
        <div className="flex justify-center gap-4">
          <Button className="w-20" variant="default" onClick={() => { setFormData({ ...formData, setupQuestion2: false }); onNext(); }}>
            {texts.step2.buttons.no}
          </Button>
          <Button className="w-20" variant="default" onClick={() => { setFormData({ ...formData, setupQuestion2: true }); onNext(); }}>
            {texts.step2.buttons.agree}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-16 text-justify">{texts.step2.hint}</p>
      </CardContent>
    </Card>
  );
};

export default Step2;