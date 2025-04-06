import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { GoogleProfile } from '../interfaces/auth.interface';


interface GoogleOAuthProfile {
  id: string;
  displayName: string;
  name: {
    givenName: string;
    familyName: string;
  };
  emails: Array<{
    value: string;
  }>;
  photos: Array<{
    value: string;
  }>;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    const clientID = configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = configService.get<string>('GOOGLE_CLIENT_SECRET');
    const callbackURL = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:4000/auth/google/callback';

    if (!clientID || !clientSecret) {
      throw new Error('Missing required Google OAuth configuration');
    }

    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: GoogleOAuthProfile,
    done: VerifyCallback,
  ): Promise<void> {
    const { name, emails, photos } = profile;
    
    if (!emails?.[0]?.value || !name?.givenName || !name?.familyName || !photos?.[0]?.value) {
      return done(new Error('Missing required Google profile information'), undefined);
    }

    const userProfile: GoogleProfile = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
      googleId: profile.id,
    };

    try {
      const result = await this.authService.handleGoogleLogin(userProfile);
      done(undefined, result.user);
    } catch (error) {
      done(error as Error, undefined);
    }
  }
}