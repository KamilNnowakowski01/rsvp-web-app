import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userAuthService } from "@/class/UserAuthService";

interface LoginFormProps {
  isRegister?: boolean;
}

export function LoginForm({ isRegister = false }: LoginFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    username: "",
    email: isRegister ? "" : undefined,
    password: "",
  });
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isRegister) {
      if (!formData.email || !formData.username || !formData.password) {
        setError("All fields are required for registration.");
        return;
      }
      const success = userAuthService.register(formData.username, formData.email, formData.password);
      if (success) {
        navigate("/login");
      } else {
        setError("Username or email already exists.");
      }
    } else {
      if (!formData.username || !formData.password) {
        setError("Username/email and password are required.");
        return;
      }
      const success = userAuthService.login(formData.username, formData.password);
      if (success) {
        navigate("/management/event");
      } else {
        setError("Invalid username/email or password.");
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {isRegister && (
          <>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </>
        )}
        {!isRegister && (
          <>
            <Label htmlFor="username">Username or Email</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter username or email"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </>
        )}
        {isRegister && (
          <>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              value={formData.email || ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </>
        )}
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
      <Button className="w-full" onClick={handleSubmit}>
        {isRegister ? "Register" : "Login"}
      </Button>
      {!isRegister && (
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <a href="/register" className="underline hover:text-primary">
            Register
          </a>
        </p>
      )}
      {isRegister && (
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href="/login" className="underline hover:text-primary">
            Login
          </a>
        </p>
      )}
    </div>
  );
}