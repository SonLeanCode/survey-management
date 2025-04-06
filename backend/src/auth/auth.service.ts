import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { GoogleProfile } from './interfaces/auth.interface';
import { User } from '../user/entities/user.entity';

interface AuthResponse {
  access_token: string;
  user: User;
}

interface JwtPayload {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  picture: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async handleGoogleLogin(profile: GoogleProfile): Promise<AuthResponse> {
    try {
      const existingUser = await this.userService.findByGoogleId(profile.googleId);
      
      const user = existingUser || await this.userService.create({
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        name: profile.name,
        picture: profile.picture,
        googleId: profile.googleId,
      });

      const payload: JwtPayload = { 
        sub: user.id, 
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
        picture: user.picture
      };

      const access_token = this.jwtService.sign(payload);

      return {
        access_token,
        user,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new UnauthorizedException(`Failed to process Google login: ${error.message}`);
      }
      throw new UnauthorizedException('Failed to process Google login');
    }
  }
}