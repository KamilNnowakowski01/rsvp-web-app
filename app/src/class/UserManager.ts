interface User {
  User: string;
}

class UserManager {
  private users: User[] = [];
  private readonly STORAGE_KEY = "users";

  constructor() {
    // Load users from localStorage on initialization
    this.loadUsers();

    // Initialize with a sample user if no users exist
    if (this.users.length === 0) {
      this.addUser({
        User: "john_doe",
      });
    }
  }

  private loadUsers() {
    try {
      const storedUsers = localStorage.getItem(this.STORAGE_KEY);
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        // Basic validation to ensure parsed data matches User interface
        if (Array.isArray(parsedUsers)) {
          this.users = parsedUsers.filter((user: any) => this.isValidUser(user));
        }
      }
    } catch (error) {
      console.error("Error loading users from localStorage:", error);
      this.users = [];
    }
  }

  private saveUsers() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.users));
    } catch (error) {
      console.error("Error saving users to localStorage:", error);
    }
  }

  private isValidUser(user: any): user is User {
    return typeof user.User === "string";
  }

  addUser(user: User) {
    this.users.push(user);
    this.saveUsers();
  }

  getUserByName(name: string): User | undefined {
    return this.users.find(user => user.User === name);
  }

  updateUser(updatedUser: User) {
    const index = this.users.findIndex(user => user.User === updatedUser.User);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.saveUsers();
    }
  }

  deleteUser(name: string) {
    this.users = this.users.filter(user => user.User !== name);
    this.saveUsers();
  }

  getAllUsers(): User[] {
    return [...this.users];
  }
}

export const userManager = new UserManager();
export default UserManager;