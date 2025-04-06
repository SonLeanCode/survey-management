import { Request } from 'express';
import { User } from '../../user/entities/user.entity';

export interface GoogleProfile {
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  picture: string;
  googleId: string;
}

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
  accessToken: string;
  googleId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JwtPayload {
  sub: string;
  email: string;
  name?: string;
  picture?: string;
}

export interface JwtUser {
  id: string;
  email: string;
  name?: string;
  picture?: string;
}

export interface JwtUserPayload {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  picture: string;
}

export interface AuthRequest extends Request {
  user: User;
}

export interface LoginResponse {
  access_token: string;
} 