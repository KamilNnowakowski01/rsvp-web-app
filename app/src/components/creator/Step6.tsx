import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { texts } from "@/components/creator/eventCreatorTexts";

interface Step6Props {
  onConfirm: () => void;
}

const Step6: React.FC<Step6Props> = ({ onConfirm }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">{texts.steps[6].title}</CardTitle>
        <p className="text-muted-foreground">{texts.steps[6].description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="default" onClick={onConfirm}>{texts.step6.button}</Button>
      </CardContent>
    </Card>
  );
};

export default Step6;