import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  // Note the 'local' here
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email', // Use 'email' field instead of 'username'
      passwordField: 'password', // Specify the password field if it's not 'password'
    });
  }

  async validate(email: string, password: string): Promise<any> {
    return await this.authService.validateUser(email, password);
  }
}
