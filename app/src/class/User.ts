export class User {
  protected userName: string;
  protected email: string;

  constructor(userName: string, email: string = "") {
    this.userName = userName;
    this.email = email;
  }

  get User(): string {
    return this.userName;
  }

  set User(userName: string) {
    this.userName = userName;
  }

  get Email(): string {
    return this.email;
  }

  set Email(email: string) {
    this.email = email;
  }

  toJSON(): object {
    return {
      User: this.userName,
      Email: this.email,
    };
  }
}

export class Participant extends User {
  private firstName: string;
  private lastName: string;
  private role: "attendee" | "speaker" | "volunteer";
  private phoneNumber: string;
  private status: "confirmed" | "pending" | "cancelled";

  constructor(
    firstName: string,
    lastName: string,
    email: string = "",
    role: "attendee" | "speaker" | "volunteer" = "attendee",
    phoneNumber: string = "",
    status: "confirmed" | "pending" | "cancelled" = "pending"
  ) {
    super(firstName, email);
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.phoneNumber = phoneNumber;
    this.status = status;
    this.updateUserName();
  }

  private updateUserName() {
    this.userName = `${this.firstName.toLowerCase()}_${this.lastName.toLowerCase()}`;
  }

  get FirstName(): string {
    return this.firstName;
  }

  set FirstName(firstName: string) {
    this.firstName = firstName;
    this.updateUserName();
  }

  get LastName(): string {
    return this.lastName;
  }

  set LastName(lastName: string) {
    this.lastName = lastName;
    this.updateUserName();
  }

  get Role(): string {
    return this.role;
  }

  set Role(role: "attendee" | "speaker" | "volunteer") {
    this.role = role;
  }

  get PhoneNumber(): string {
    return this.phoneNumber;
  }

  set PhoneNumber(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }

  get Status(): string {
    return this.status;
  }

  setStatus(status: "confirmed" | "pending" | "cancelled"): void {
    this.status = status;
  }

  joinEvent(): string {
    return `${this.firstName} ${this.lastName} joined the event as ${this.role} with status: ${this.status}.`;
  }

  toJSON(): object {
    return {
      FirstName: this.firstName,
      LastName: this.lastName,
      Email: this.email,
      Role: this.role,
      PhoneNumber: this.phoneNumber,
      Status: this.status,
    };
  }
}

export class Organizer extends User {
  private permissions: string[];

  constructor(userName: string, email: string = "", permissions: string[] = ["manage_event", "invite_users"]) {
    super(userName, email);
    this.permissions = permissions;
  }

  get Permissions(): string[] {
    return [...this.permissions];
  }

  addPermission(permission: string): void {
    if (!this.permissions.includes(permission)) {
      this.permissions.push(permission);
    }
  }

  removePermission(permission: string): void {
    this.permissions = this.permissions.filter(p => p !== permission);
  }

  manageEvent(): string {
    return `${this.userName} is managing the event with permissions: ${this.permissions.join(", ")}.`;
  }

  toJSON(): object {
    return {
      ...super.toJSON(),
      Permissions: this.permissions,
    };
  }
}