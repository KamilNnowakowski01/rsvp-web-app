import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { texts } from "@/components/creator/eventCreatorTexts";

interface Step1Props {
  formData: { setupQuestion1: boolean };
  setFormData: (data: any) => void;
  onNext: () => void;
}

const Step1: React.FC<Step1Props> = ({ formData, setFormData, onNext }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">{texts.steps[1].title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex mt-1">
          <p className="text-justify mb-3 mt-5 px-4">{texts.step1.question}</p>
        </div>
        <div className="flex justify-center gap-4">
          <Button className="w-20" variant="default" onClick={() => { setFormData({ ...formData, setupQuestion1: false }); onNext(); }}>
            {texts.step1.buttons.no}
          </Button>
          <Button className="w-20" variant="default" onClick={() => { setFormData({ ...formData, setupQuestion1: true }); onNext(); }}>
            {texts.step1.buttons.agree}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-16 text-justify">{texts.step1.hint}</p>
      </CardContent>
    </Card>
  );
};

export default Step1;