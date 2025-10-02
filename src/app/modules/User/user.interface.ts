export interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: "SUPER_ADMIN" | "USER";
  createdAt?: Date;
  updatedAt?: Date;
}
