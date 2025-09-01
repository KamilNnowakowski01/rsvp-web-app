import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/content/LoginForm";
import { Card, CardContent } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Card className="w-full max-w-sm bg-white shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6">
            <a href="/" className="flex items-center gap-2 self-center font-medium">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-4" />
              </div>
              My App
            </a>
            <LoginForm isRegister />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}