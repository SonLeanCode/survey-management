export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  picture?: string;
  googleId?: string;
  createdAt: Date;
  updatedAt: Date;
} 