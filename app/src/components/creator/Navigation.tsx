import { Button } from "@/components/ui/button";

interface NavigationProps {
  step: number;
  onBack: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ step, onBack }) => {
  return step > 2 && step < 6 ? (
    <Button variant="outline" onClick={onBack}>Back</Button>
  ) : null;
};

export default Navigation;