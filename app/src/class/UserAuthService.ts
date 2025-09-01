import { userManager } from "@/class/UserManager";

interface AuthUser {
  username: string;
  email: string;
  passwordHash: string;
}

class UserAuthService {
  private readonly STORAGE_KEY = "authUsers";
  private readonly CURRENT_USER_KEY = "currentUser";
  private authUsers: AuthUser[] = [];

  constructor() {
    this.loadUsers();
  }

  private loadUsers() {
    try {
      const storedUsers = localStorage.getItem(this.STORAGE_KEY);
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        if (Array.isArray(parsedUsers)) {
          this.authUsers = parsedUsers.filter((user: any) => this.isValidUser(user));
        }
      }
    } catch (error) {
      console.error("Error loading auth users from localStorage:", error);
      this.authUsers = [];
    }
  }

  private saveUsers() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.authUsers));
    } catch (error) {
      console.error("Error saving auth users to localStorage:", error);
    }
  }

  private isValidUser(user: any): user is AuthUser {
    return (
      typeof user.username === "string" &&
      typeof user.email === "string" &&
      typeof user.passwordHash === "string"
    );
  }

  private hashPassword(password: string): string {
    return btoa(password); // Base64 encoding as a placeholder
  }

  register(username: string, email: string, password: string): boolean {
    if (!username.trim() || !email.trim() || !password.trim()) {
      return false;
    }
    if (this.authUsers.some(u => u.username === username || u.email === email)) {
      return false; // User or email already exists
    }

    const passwordHash = this.hashPassword(password);
    this.authUsers.push({ username, email, passwordHash });
    this.saveUsers();

    // Sync with UserManager
    userManager.addUser({ User: username });
    return true;
  }

  login(usernameOrEmail: string, password: string): boolean {
    const passwordHash = this.hashPassword(password);
    const user = this.authUsers.find(
      u => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.passwordHash === passwordHash
    );
    if (user) {
      localStorage.setItem(this.CURRENT_USER_KEY, user.username);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  getCurrentUser(): AuthUser | null {
    const username = localStorage.getItem(this.CURRENT_USER_KEY);
    if (username) {
      return this.getUser(username) || null;
    }
    return null;
  }

  getUser(usernameOrEmail: string): AuthUser | undefined {
    return this.authUsers.find(u => u.username === usernameOrEmail || u.email === usernameOrEmail);
  }
}

export const userAuthService = new UserAuthService();
export default UserAuthService;