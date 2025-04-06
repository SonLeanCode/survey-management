import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { GoogleProfile } from '../../auth/interfaces/auth.interface';
import { JwtUserPayload } from '../../auth/interfaces/auth.interface';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(userPayload: JwtUserPayload) {
    const token = await Promise.resolve(this.jwtService.sign({
      sub: userPayload.sub, 
      email: userPayload.email,
      firstName: userPayload.firstName,
      lastName: userPayload.lastName,
      name: userPayload.name,
      picture: userPayload.picture
    }));

    return {
      access_token: token,
      user: userPayload,
    };
  }

  async handleGoogleLogin(profile: GoogleProfile) {
    let user = await this.userService.findByGoogleId(profile.googleId);
    
    if (!user) {
      const createUserDto = new CreateUserDto();
      createUserDto.email = profile.email;
      createUserDto.firstName = profile.firstName;
      createUserDto.lastName = profile.lastName;
      createUserDto.name = profile.name;
      createUserDto.picture = profile.picture;
      createUserDto.googleId = profile.googleId;
      
      user = await this.userService.create(createUserDto);
    }

    const payload = { 
      sub: user.id, 
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name,
      picture: user.picture
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
} 